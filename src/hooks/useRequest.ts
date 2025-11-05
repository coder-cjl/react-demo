import { useState } from 'react'
import type { StandardResponse } from '@/https/types'

/**
 * useRequest Hook
 * 封装请求逻辑，自动处理 loading、error 状态
 *
 * @example
 * const { data, loading, error, execute } = useRequest(userApi.getUserInfo)
 *
 * useEffect(() => {
 *   execute()
 * }, [])
 */
export function useRequest<T, P extends unknown[] = []>(
  requestFn: (...args: P) => Promise<StandardResponse<T>>
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = async (...args: P) => {
    try {
      setLoading(true)
      setError(null)
      const response = await requestFn(...args)

      if (response.isSuccess) {
        setData(response.data)
        return response.data
      } else {
        setError(response.message)
        return null
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '请求失败'
      setError(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setData(null)
    setError(null)
    setLoading(false)
  }

  return {
    data,
    loading,
    error,
    execute,
    reset,
  }
}
