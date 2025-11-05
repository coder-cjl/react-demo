import { Toast } from 'antd-mobile'

function showToast(message: string, duration = 2000) {
  Toast.show({
    content: message,
    duration,
  })
}

function showLoadingToast(message = '加载中...', duration = 0) {
  Toast.show({
    icon: 'loading',
    content: message,
    duration,
  })
}

function hideToast() {
  Toast.clear()
}

export { showToast, showLoadingToast, hideToast }
