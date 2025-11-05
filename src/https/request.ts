import http from './http'
import type { RequestConfig, ApiResponse } from './types'

/**
 * GET 请求
 */
export function apiGet<T = unknown>(
  url: string,
  params?: Record<string, unknown>,
  config?: RequestConfig
): Promise<ApiResponse<T>> {
  return http.get(url, { params, ...config })
}

/**
 * POST 请求
 */
export function apiPost<T = unknown>(
  url: string,
  data?: unknown,
  config?: RequestConfig
): Promise<ApiResponse<T>> {
  return http.post(url, data, config)
}

// 导出默认请求方法
export default {
  apiGet,
  apiPost,
}
