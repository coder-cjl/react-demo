import type { AxiosRequestConfig } from 'axios'

/**
 * 统一的 API 响应格式
 */
export interface ApiResponse<T = unknown> {
  code: number
  data: T
  message: string
  timestamp?: number
}

/**
 * 标准化的响应结构
 */
export interface StandardResponse<T = unknown> {
  isSuccess: boolean
  data: T | null
  message: string
  code?: number
}

/**
 * 分页请求参数
 */
export interface PageParams {
  page: number
  pageSize: number
  [key: string]: string | number | boolean | undefined
}

/**
 * 分页响应数据
 */
export interface PageData<T = unknown> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

/**
 * HTTP 请求配置
 */
export interface RequestConfig extends AxiosRequestConfig {
  // 是否显示 loading
  showLoading?: boolean
  // 是否显示错误提示
  showError?: boolean
  // 自定义错误处理
  customErrorHandler?: (error: Error) => void
  // 是否需要 token
  needToken?: boolean
  // 重试次数
  retry?: number
  // 重试延迟（毫秒）
  retryDelay?: number
}

/**
 * 错误响应
 */
export interface ErrorResponse {
  code: number
  message: string
  data?: unknown
}

/**
 * 上传进度回调
 */
export interface UploadProgress {
  loaded: number
  total: number
  percentage: number
}

/**
 * 下载进度回调
 */
export interface DownloadProgress {
  loaded: number
  total: number
  percentage: number
}
