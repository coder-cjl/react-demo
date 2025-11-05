import type { AxiosInstance } from 'axios'
import axios from 'axios'

/// 1. 创建 Axios 实例
const http: AxiosInstance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/// 2. 请求拦截器
http.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/// 3. 响应拦截器
http.interceptors.response.use(
  response => {
    const data = response.data
    if (data && data.code !== 200) {
      console.error('请求失败:', data.message || '未知错误')
      return Promise.reject(data)
    }
    return data
  },
  error => {
    if (error.response) {
      console.error('响应错误:', error.response.status, error.response.data)
    } else if (error.request) {
      console.error('请求未响应:', error.request)
    } else {
      console.error('其他错误:', error.message)
    }
    return Promise.reject(error)
  }
)

export default http
