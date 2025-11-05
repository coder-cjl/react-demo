# HTTP 封装快速使用指南 🚀

## 快速开始

### 1. 基础 GET 请求

```typescript
import { get } from '@/https/request'

// 简单 GET 请求
const response = await get('/api/users')

// 带参数的 GET 请求
const response = await get('/api/users', {
  page: 1,
  pageSize: 10,
})

// 带配置的 GET 请求
const response = await get(
  '/api/users',
  {},
  {
    showLoading: true, // 显示 loading
    showError: true, // 显示错误提示
  }
)
```

### 2. 基础 POST 请求

```typescript
import { post } from '@/https/request'

// 登录示例
const response = await post(
  '/api/login',
  {
    username: 'admin',
    password: '123456',
  },
  {
    showLoading: true,
  }
)

if (response.isSuccess) {
  console.log('登录成功', response.data)
}
```

### 3. 使用 API 模块

```typescript
import { userApi } from '@/api'

// 调用封装好的 API
const result = await userApi.login({
  username: 'admin',
  password: '123456',
})

if (result.isSuccess && result.data) {
  localStorage.setItem('token', result.data.token)
}
```

### 4. 使用 useRequest Hook

```typescript
import { useEffect } from 'react'
import { useRequest } from '@/hooks'
import { userApi } from '@/api'

function UserProfile() {
  const { data, loading, error, execute } = useRequest(userApi.getUserInfo)

  useEffect(() => {
    execute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return <div>加载中...</div>
  if (error) return <div>错误: {error}</div>
  if (!data) return null

  return (
    <div>
      <h1>{data.username}</h1>
      <p>{data.email}</p>
    </div>
  )
}
```

### 5. 文件上传

```typescript
import { upload } from '@/https/request'

function handleUpload(file: File) {
  await upload('/api/upload', file, progress => {
    console.log(`上传进度: ${progress}%`)
  })
}
```

### 6. 文件下载

```typescript
import { download } from '@/https/request'

function handleDownload() {
  await download('/api/export', 'users.xlsx')
}
```

## 配置说明

### 环境变量

修改 `.env.development` 或 `.env.production`：

```env
VITE_API_BASE_URL=http://your-api-url/api
VITE_API_TIMEOUT=10000
```

### 自定义错误处理

在 `src/https/errorHandler.ts` 中修改：

```typescript
const BUSINESS_ERROR_HANDLERS: Record<number, (message: string) => void> = {
  401: message => {
    Toast.show({ content: message })
    // 跳转登录
    window.location.href = '/login'
  },
  // 添加更多错误码处理
}
```

## 创建新的 API 模块

### 1. 创建 API 文件

`src/api/product.ts`:

```typescript
import { get, post, put, del } from '@/https/request'
import type { StandardResponse, PageData } from '@/https/types'

// 类型定义
export interface Product {
  id: number
  name: string
  price: number
}

// API 方法
export function getProducts(params: { page: number; pageSize: number }) {
  return get<PageData<Product>>('/products', params)
}

export function getProduct(id: number) {
  return get<Product>(\`/products/\${id}\`)
}

export function createProduct(data: Partial<Product>) {
  return post<Product>('/products', data)
}

export function updateProduct(id: number, data: Partial<Product>) {
  return put<Product>(\`/products/\${id}\`, data)
}

export function deleteProduct(id: number) {
  return del<void>(\`/products/\${id}\`)
}
```

### 2. 导出 API 模块

在 `src/api/index.ts` 中添加：

```typescript
import * as productApi from './product'

export { userApi, productApi }

export default {
  user: userApi,
  product: productApi,
}
```

## 常见用法

### 带类型的请求

```typescript
interface User {
  id: number
  name: string
}

const response = await get<User>('/api/user/1')
if (response.isSuccess && response.data) {
  console.log(response.data.name) // ✅ 类型安全
}
```

### 自定义错误处理

```typescript
await get(
  '/api/data',
  {},
  {
    customErrorHandler: error => {
      console.error('自定义错误:', error)
      // 你的错误处理逻辑
    },
  }
)
```

### 不需要 Token 的请求

```typescript
await post(
  '/api/public/data',
  {},
  {
    needToken: false, // 不添加 Authorization header
  }
)
```

### 分页请求

```typescript
import type { PageData } from '@/https/types'

interface User {
  id: number
  name: string
}

const response = await get<PageData<User>>('/api/users', {
  page: 1,
  pageSize: 20,
})

if (response.isSuccess && response.data) {
  console.log(response.data.list) // 用户列表
  console.log(response.data.total) // 总数
}
```

## 路径别名

使用配置好的路径别名：

```typescript
// ✅ 推荐
import { get } from '@/https/request'
import { userApi } from '@/api'
import { useRequest } from '@/hooks'
import { LucaButton } from '@/styles/antd-style'

// ❌ 不推荐
import { get } from '../../../https/request'
```

## 调试技巧

### 1. 查看请求日志

在 `src/https/http.ts` 的请求拦截器中添加：

```typescript
console.log('请求配置:', config)
```

### 2. 查看响应数据

在响应拦截器中添加：

```typescript
console.log('响应数据:', response.data)
```

### 3. 使用浏览器开发工具

打开浏览器的 Network 标签查看实际的 HTTP 请求。

## 常见问题

### Q: 401 错误后没有自动跳转登录页？

A: 检查 `src/https/errorHandler.ts` 中的 401 处理逻辑。

### Q: Token 没有被添加到请求头？

A: 确保 localStorage 中有 'authToken' 或修改 `src/https/http.ts` 中的 token 读取逻辑。

### Q: 跨域问题？

A: 在 `vite.config.ts` 中配置代理：

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://your-backend-url',
      changeOrigin: true,
    },
  },
}
```

### Q: 如何修改 baseURL？

A: 修改 `.env.development` 或 `.env.production` 中的 `VITE_API_BASE_URL`。

## 下一步

- [ ] 添加请求缓存
- [ ] 添加请求重试
- [ ] 添加请求取消
- [ ] 集成全局状态管理
- [ ] 添加单元测试
