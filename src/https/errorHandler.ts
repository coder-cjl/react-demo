import type { AxiosError } from 'axios'
import { Toast } from 'antd-mobile'
import type { ApiResponse } from './types'

/**
 * HTTP 状态码错误信息映射
 */
const HTTP_ERROR_MESSAGES: Record<number, string> = {
  400: '请求参数错误',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求的资源不存在',
  405: '请求方法不允许',
  408: '请求超时',
  500: '服务器内部错误',
  501: '服务未实现',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
  505: 'HTTP版本不受支持',
}

/**
 * 业务错误码处理
 */
const BUSINESS_ERROR_HANDLERS: Record<number, (message: string) => void> = {
  // 未登录或 token 过期
  401: (message: string) => {
    Toast.show({
      icon: 'fail',
      content: message || '登录已过期，请重新登录',
    })
    // 清除 token
    localStorage.removeItem('authToken')
    // 跳转到登录页
    setTimeout(() => {
      window.location.href = '/login'
    }, 1500)
  },
  // 无权限
  403: (message: string) => {
    Toast.show({
      icon: 'fail',
      content: message || '无权限访问',
    })
  },
  // 服务器错误
  500: (message: string) => {
    Toast.show({
      icon: 'fail',
      content: message || '服务器错误，请稍后重试',
    })
  },
}

/**
 * 处理 HTTP 错误
 */
export function handleHttpError(error: AxiosError): ApiResponse {
  if (error.response) {
    // 服务器返回了错误状态码
    const { status, data } = error.response
    const errorData = data as ApiResponse

    const message =
      errorData?.message ||
      HTTP_ERROR_MESSAGES[status] ||
      `请求失败 (${status})`

    // 执行特定状态码的处理
    const handler = BUSINESS_ERROR_HANDLERS[status]
    if (handler) {
      handler(message)
    }

    return {
      isSuccess: false,
      data: null,
      message,
      code: status,
    }
  } else if (error.request) {
    // 请求已发送但没有收到响应
    const message = '网络连接失败，请检查网络'
    Toast.show({
      icon: 'fail',
      content: message,
    })
    return {
      isSuccess: false,
      data: null,
      message,
      code: -1,
    }
  } else {
    // 请求配置出错
    const message = error.message || '请求配置错误'
    return {
      isSuccess: false,
      data: null,
      message,
      code: -1,
    }
  }
}

/**
 * 处理业务错误（后端返回的错误码）
 */
export function handleBusinessError(
  code: number,
  message: string
): ApiResponse {
  // 执行特定业务码的处理
  const handler = BUSINESS_ERROR_HANDLERS[code]
  if (handler) {
    handler(message)
  } else {
    // 默认显示错误提示
    Toast.show({
      icon: 'fail',
      content: message || '操作失败',
    })
  }

  return {
    isSuccess: false,
    data: null,
    message,
    code,
  }
}

/**
 * 显示成功提示
 */
export function showSuccessToast(message: string) {
  Toast.show({
    icon: 'success',
    content: message,
  })
}

/**
 * 显示错误提示
 */
export function showErrorToast(message: string) {
  Toast.show({
    icon: 'fail',
    content: message,
  })
}

/**
 * 显示加载提示
 */
export function showLoading(message = '加载中...') {
  return Toast.show({
    icon: 'loading',
    content: message,
    duration: 0, // 持续显示
  })
}

/**
 * 隐藏加载提示
 */
export function hideLoading(toastHandler?: ReturnType<typeof Toast.show>) {
  if (toastHandler) {
    toastHandler.close()
  } else {
    Toast.clear()
  }
}
