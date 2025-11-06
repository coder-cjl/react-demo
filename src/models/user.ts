/// 用户信息接口
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  phone?: string
  role?: 'admin' | 'user' | 'guest'
  token?: string
  createdAt?: string
  updatedAt?: string
}
