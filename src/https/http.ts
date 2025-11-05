import type {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios'
import axios from 'axios'
import type { ApiResponse, RequestConfig } from './types'
import {
  handleHttpError,
  handleBusinessError,
  showLoading,
  hideLoading,
} from './errorHandler'

/**
 * 创建 Axios 实例
 */
const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * 请求拦截器
 */
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const customConfig = config as RequestConfig

    // 显示 loading
    if (customConfig.showLoading) {
      showLoading()
    }

    // 添加 token
    if (customConfig.needToken !== false) {
      const token = localStorage.getItem('authToken')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    // 添加时间戳防止缓存
    if (config.method === 'get' && config.params) {
      config.params = {
        ...config.params,
        _t: Date.now(),
      }
    }

    return config
  },
  (error: AxiosError) => {
    hideLoading()
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 */
http.interceptors.response.use(
  response => {
    const customConfig = response.config as RequestConfig

    // 隐藏 loading
    if (customConfig.showLoading) {
      hideLoading()
    }

    const { data } = response
    const apiResponse = data as ApiResponse

    // 判断业务状态码
    if (apiResponse.code !== undefined && apiResponse.code !== 200) {
      // 业务错误
      const errorResult = handleBusinessError(
        apiResponse.code,
        apiResponse.message || '请求失败'
      )

      // 如果有自定义错误处理
      if (customConfig.customErrorHandler) {
        customConfig.customErrorHandler(new Error(apiResponse.message))
      }

      return Promise.reject(errorResult)
    }

    // 成功响应
    const result: ApiResponse = {
      isSuccess: true,
      data: apiResponse.data,
      message: apiResponse.message || '操作成功',
      code: apiResponse.code,
    }

    return result as never
  },
  (error: AxiosError) => {
    const customConfig = error.config as RequestConfig

    // 隐藏 loading
    if (customConfig?.showLoading) {
      hideLoading()
    }

    // 处理 HTTP 错误
    const errorResult = handleHttpError(error)

    // 如果有自定义错误处理
    if (customConfig?.customErrorHandler) {
      customConfig.customErrorHandler(error)
    }

    return Promise.reject(errorResult)
  }
)

export default http
