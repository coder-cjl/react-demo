import http from './http'

export function getApi<T>(url: string, params?: never): Promise<T> {
  return http.get(url, { params })
}

export function postApi<T>(url: string, data?: never): Promise<T> {
  return http.post(url, data)
}
