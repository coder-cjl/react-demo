import { get, post, put, del } from '../https/request'
import type { StandardResponse } from '../https/types'

/**
 * 用户相关 API
 */

// 用户信息类型定义
export interface UserInfo {
  id: string | number
  username: string
  email: string
  avatar?: string
  nickname?: string
}

// 登录参数
export interface LoginParams {
  username: string
  password: string
}

// 登录响应
export interface LoginResponse {
  token: string
  userInfo: UserInfo
}

/**
 * 用户登录
 */
export function login(
  params: LoginParams
): Promise<StandardResponse<LoginResponse>> {
  return post<LoginResponse>('/auth/login', params)
}

/**
 * 用户登出
 */
export function logout(): Promise<StandardResponse<void>> {
  return post<void>('/auth/logout')
}

/**
 * 获取用户信息
 */
export function getUserInfo(): Promise<StandardResponse<UserInfo>> {
  return get<UserInfo>('/user/info')
}

/**
 * 更新用户信息
 */
export function updateUserInfo(
  data: Partial<UserInfo>
): Promise<StandardResponse<UserInfo>> {
  return put<UserInfo>('/user/info', data)
}

/**
 * 删除用户
 */
export function deleteUser(
  userId: string | number
): Promise<StandardResponse<void>> {
  return del<void>(`/user/${userId}`)
}
