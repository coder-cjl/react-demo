import { apiGet, apiPost } from '@/https/request'

/**
 * 请求重试功能示例
 */

// 示例 1: 基础重试
export async function example1() {
  try {
    const response = await apiGet(
      '/api/unstable-endpoint',
      {},
      {
        retry: 3, // 失败后重试 3 次
        retryDelay: 1000, // 每次重试间隔 1 秒
        showLoading: true,
      }
    )
    console.log('请求成功:', response.data)
  } catch (error) {
    console.error('请求失败:', error)
  }
}

// 示例 2: 结合超时配置
// 示例 2: 结合超时配置
export async function example2() {
  try {
    const response = await apiGet(
      '/api/slow-endpoint',
      {},
      {
        timeout: 5000, // 5 秒超时
        retry: 2, // 超时后重试 2 次
        retryDelay: 2000, // 每次重试间隔 2 秒
      }
    )
    console.log('请求成功:', response.data)
  } catch (error) {
    console.error('请求失败（已重试 2 次）:', error)
  }
}

// 示例 3: POST 请求重试
export async function example3() {
  try {
    const response = await apiPost(
      '/api/submit',
      { name: 'Test' },
      {
        retry: 3, // 失败后重试 3 次
        retryDelay: 1000, // 每次重试间隔 1 秒
      }
    )
    console.log('请求成功:', response.data)
  } catch (error) {
    console.error('请求失败:', error)
  }
}

// 示例 4: 不重试 4xx 错误
export async function example4() {
  try {
    // 对于 4xx 错误（客户端错误），不会重试
    // 只对网络错误、超时、5xx 错误进行重试
    const response = await apiGet(
      '/api/protected',
      {},
      {
        retry: 0, // 不重试
      }
    )

    console.log('请求成功:', response.data)
  } catch (error) {
    console.error('401/403 等客户端错误不会重试:', error)
  }
}

// 示例 5: 查看重试日志
export async function example5() {
  try {
    // 打开浏览器控制台，可以看到重试日志：
    // "请求失败，正在进行第 1/3 次重试..."
    // "请求失败，正在进行第 2/3 次重试..."
    // "请求失败，正在进行第 3/3 次重试..."

    const response = await get(
      '/api/test',
      {},
      {
        retry: 3,
        retryDelay: 1000,
      }
    )
    console.log('请求成功:', response.data)
  } catch (error) {
    console.error('所有重试都失败:', error)
  }
}

/**
 * 重试策略说明
 *
 * 🔄 会重试的情况：
 * 1. 网络错误（无法连接到服务器）
 * 2. 请求超时（ECONNABORTED）
 * 3. 服务器错误（500-599）
 *
 * ❌ 不会重试的情况：
 * 1. 客户端错误（400-499）：如 401、403、404
 * 2. 业务逻辑错误（code !== 200）
 * 3. 成功响应（200）
 *
 * ⚙️ 默认配置：
 * - retry: undefined（不重试）
 * - retryDelay: 1000ms
 */
