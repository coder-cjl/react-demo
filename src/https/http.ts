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
import { logger } from '@/utils/log'

/**
 * 延迟函数
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * 重试请求
 */
async function retryRequest(
  error: AxiosError,
  retryCount: number,
  retryDelay: number
): Promise<ApiResponse> {
  const config = error.config as RequestConfig

  // 如果没有配置重试次数或已达到重试上限
  if (!config || retryCount <= 0) {
    return Promise.reject(error)
  }

  // 初始化重试计数
  config.__retryCount = config.__retryCount || 0

  // 检查是否已达到最大重试次数
  if (config.__retryCount >= retryCount) {
    return Promise.reject(error)
  }

  // 增加重试计数
  config.__retryCount += 1

  logger.warn(
    `请求失败，正在进行第 ${config.__retryCount}/${retryCount} 次重试...`
  )

  // 延迟后重试
  await delay(retryDelay)

  // 重新发起请求
  return http.request(config)
}

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
  async (error: AxiosError) => {
    const customConfig = error.config as RequestConfig

    // 判断是否需要重试
    const shouldRetry =
      customConfig?.retry &&
      customConfig.retry > 0 &&
      // 只对网络错误、超时、5xx 错误进行重试
      (!error.response ||
        error.code === 'ECONNABORTED' ||
        (error.response.status >= 500 && error.response.status < 600))

    if (shouldRetry) {
      try {
        // 尝试重试请求
        return await retryRequest(
          error,
          customConfig.retry!,
          customConfig.retryDelay || 1000
        )
      } catch (retryError) {
        // 重试失败，继续执行下面的错误处理
        error = retryError as AxiosError
      }
    }

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
