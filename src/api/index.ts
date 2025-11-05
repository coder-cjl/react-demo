/**
 * API 模块统一导出
 * 使用示例：
 * import { userApi } from '@/api'
 * userApi.login({ username: 'admin', password: '123456' })
 */

import * as userApi from './user'

export { userApi }

export default {
  user: userApi,
}
