import type { User } from '@/models/user'
import { logger } from '@/utils/log'
import { useEffect, useState } from 'react'

/// 用户 Hook - 管理用户状态和操作
export function useUser() {
  // ==================== 状态管理 ====================

  // 用户信息
  const [user, setUser] = useState<User | null>(null)

  // 登录状态
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  /// 从本地存储恢复用户信息
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const savedToken = localStorage.getItem('authToken')

    if (savedUser && savedToken) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        setIsLoggedIn(true)
        logger.debug('用户信息已从本地存储恢复:', userData)
      } catch (e) {
        logger.error('恢复用户信息失败:', e)
        // 清除无效数据
        localStorage.removeItem('user')
        localStorage.removeItem('authToken')
      }
    }
  }, [])

  return {
    user,
    isLoggedIn,
  }
}
