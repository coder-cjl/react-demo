import type { AxiosRequestConfig } from 'axios'

/**
 * 标准化的响应结构
 */
export interface ApiResponse<T = unknown> {
  isSuccess: boolean
  data: T | null
  message: string
  code?: number
}

/**
 * HTTP 请求配置
 */
export interface RequestConfig extends AxiosRequestConfig {
  // 是否显示 loading
  showLoading?: true | boolean
  // 是否显示错误提示
  showError?: true | boolean
  // 自定义错误处理
  customErrorHandler?: (error: Error) => void
  // 是否需要 token
  needToken?: true | boolean
  // 重试次数
  retry?: number
  // 重试延迟（毫秒）
  retryDelay?: number
}
