import { useNavigate, useSearchParams } from 'react-router-dom'

export function useNavigateRouter() {
  const navigate = useNavigate()
  const searchParams = useSearchParams()[0]

  /// 返回上一级
  /// 如果是根路径，则不进行任何操作
  function back(steps: number = -1) {
    if (window.location.pathname === '/') return
    navigate(steps)
  }

  /// 跳转到指定路径，支持传递查询参数
  function toName(path: string, params?: Record<string, string>) {
    if (params) {
      const query = new URLSearchParams(params).toString()
      navigate(`${path}?${query}`)
    } else {
      navigate(path)
    }
  }

  /// 重定向
  function replaceTo(path: string, params?: Record<string, any>) {
    if (params) {
      const query = new URLSearchParams(params).toString()
      navigate(`${path}?${query}`, { replace: true })
    } else {
      navigate(path, { replace: true })
    }
  }

  /// 获取查询参数
  function getQueryParam(key: string, defaultValue?: string): string | null {
    return searchParams.get(key) || defaultValue || null
  }

  /// 获取所有同名查询参数
  function getQueryAll(key: string): string[] {
    return searchParams.getAll(key)
  }

  /// 获取所有查询参数的键
  function getQueryParamKeys(): string[] {
    const keys: string[] = []
    searchParams.forEach((_, key) => {
      keys.push(key)
    })
    return keys
  }

  return {
    back,
    toName,
    getQueryParam,
    replaceTo,
    getQueryAll,
    getQueryParamKeys,
  }
}
