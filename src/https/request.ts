import http from './http'
import type { RequestConfig, StandardResponse } from './types'

/**
 * GET 请求
 */
export function get<T = unknown>(
  url: string,
  params?: Record<string, unknown>,
  config?: RequestConfig
): Promise<StandardResponse<T>> {
  return http.get(url, { params, ...config })
}

/**
 * POST 请求
 */
export function post<T = unknown>(
  url: string,
  data?: unknown,
  config?: RequestConfig
): Promise<StandardResponse<T>> {
  return http.post(url, data, config)
}

/**
 * PUT 请求
 */
export function put<T = unknown>(
  url: string,
  data?: unknown,
  config?: RequestConfig
): Promise<StandardResponse<T>> {
  return http.put(url, data, config)
}

/**
 * DELETE 请求
 */
export function del<T = unknown>(
  url: string,
  params?: Record<string, unknown>,
  config?: RequestConfig
): Promise<StandardResponse<T>> {
  return http.delete(url, { params, ...config })
}

/**
 * PATCH 请求
 */
export function patch<T = unknown>(
  url: string,
  data?: unknown,
  config?: RequestConfig
): Promise<StandardResponse<T>> {
  return http.patch(url, data, config)
}

/**
 * 上传文件
 */
export function upload<T = unknown>(
  url: string,
  file: File | Blob,
  onProgress?: (progress: number) => void,
  config?: RequestConfig
): Promise<StandardResponse<T>> {
  const formData = new FormData()
  formData.append('file', file)

  return http.post(url, formData, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: progressEvent => {
      if (onProgress && progressEvent.total) {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        onProgress(progress)
      }
    },
  })
}

/**
 * 下载文件
 */
export function download(
  url: string,
  filename?: string,
  params?: Record<string, unknown>,
  config?: RequestConfig
): Promise<void> {
  return http
    .get(url, {
      params,
      ...config,
      responseType: 'blob',
    })
    .then((response: unknown) => {
      const blob = new Blob([response as BlobPart])
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = filename || 'download'
      link.click()
      window.URL.revokeObjectURL(link.href)
    })
}

// 导出默认请求方法
export default {
  get,
  post,
  put,
  delete: del,
  patch,
  upload,
  download,
}
