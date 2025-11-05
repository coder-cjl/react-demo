# HTTP 封装重构完成 ✅

## 📦 新增文件结构

```
search-app/
├── .env                      # 通用环境变量
├── .env.development          # 开发环境变量
├── .env.production           # 生产环境变量
├── src/
│   ├── api/                  # API 模块
│   │   ├── index.ts         # API 统一导出
│   │   └── user.ts          # 用户相关 API
│   └── https/               # HTTP 封装
│       ├── http.ts          # Axios 实例（重构）
│       ├── request.ts       # 请求方法（重构）
│       ├── types.ts         # 类型定义（新增）
│       └── errorHandler.ts  # 错误处理（新增）
├── vite.config.ts           # 更新：路径别名、代理、构建优化
└── tsconfig.app.json        # 更新：路径别名
```

## ✨ 核心改进

### 1. 环境变量支持

- ✅ `.env.development` - 开发环境配置
- ✅ `.env.production` - 生产环境配置
- ✅ 从环境变量读取 API baseURL 和 timeout

### 2. 完善的类型系统

- ✅ `ApiResponse<T>` - 统一 API 响应格式
- ✅ `StandardResponse<T>` - 标准化响应结构
- ✅ `PageData<T>` - 分页数据类型
- ✅ `RequestConfig` - 扩展的请求配置
- ✅ `ErrorResponse` - 错误响应类型

### 3. 错误处理模块

- ✅ HTTP 状态码错误映射
- ✅ 业务错误码处理
- ✅ 401/403/500 等特定状态码处理
- ✅ Toast 提示集成
- ✅ 自动跳转登录页（401）

### 4. HTTP 拦截器增强

**请求拦截器：**

- ✅ 自动添加 Token
- ✅ 支持 showLoading 配置
- ✅ GET 请求自动添加时间戳防缓存
- ✅ 支持 needToken 配置

**响应拦截器：**

- ✅ 统一响应格式转换
- ✅ 业务错误码判断
- ✅ 自定义错误处理
- ✅ 自动显示/隐藏 loading

### 5. 完整的 HTTP 方法

- ✅ `get()` - GET 请求
- ✅ `post()` - POST 请求
- ✅ `put()` - PUT 请求
- ✅ `del()` - DELETE 请求
- ✅ `patch()` - PATCH 请求
- ✅ `upload()` - 文件上传（带进度）
- ✅ `download()` - 文件下载

### 6. 路径别名配置

- ✅ `@/` → `src/`
- ✅ `@components/` → `src/components/`
- ✅ `@pages/` → `src/pages/`
- ✅ `@utils/` → `src/utils/`
- ✅ `@styles/` → `src/styles/`
- ✅ `@api/` → `src/api/`
- ✅ `@https/` → `src/https/`
- ✅ `@assets/` → `src/assets/`

### 7. Vite 配置优化

- ✅ 开发服务器配置（端口、代理）
- ✅ 代码分割优化
- ✅ 第三方库分包（react、ui 库）

## 📝 使用示例

### 基础用法

\`\`\`typescript
import { get, post } from '@/https/request'

// GET 请求
const response = await get<UserInfo>('/user/info')
if (response.isSuccess) {
console.log(response.data)
}

// POST 请求（自动显示 loading）
const result = await post('/user/update',
{ name: 'John' },
{ showLoading: true }
)
\`\`\`

### API 模块化管理

\`\`\`typescript
// src/api/user.ts
import { post } from '@/https/request'

export function login(params: LoginParams) {
return post<LoginResponse>('/auth/login', params, {
showLoading: true,
showError: true,
})
}

// 使用
import { userApi } from '@/api'

const result = await userApi.login({
username: 'admin',
password: '123456'
})
\`\`\`

### 文件上传

\`\`\`typescript
import { upload } from '@/https/request'

const file = document.querySelector('input[type="file"]').files[0]
await upload('/upload', file, (progress) => {
console.log(\`上传进度: \${progress}%\`)
})
\`\`\`

### 文件下载

\`\`\`typescript
import { download } from '@/https/request'

await download('/export', 'data.xlsx')
\`\`\`

### 自定义错误处理

\`\`\`typescript
import { get } from '@/https/request'

await get('/api/data', {}, {
customErrorHandler: (error) => {
// 自定义错误处理逻辑
console.error('Custom error:', error)
}
})
\`\`\`

## 🔧 配置说明

### 环境变量

在 `.env.development` 或 `.env.production` 中配置：

\`\`\`env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000
\`\`\`

### 修改业务错误码处理

在 `src/https/errorHandler.ts` 中修改 `BUSINESS_ERROR_HANDLERS`：

\`\`\`typescript
const BUSINESS_ERROR_HANDLERS: Record<number, (message: string) => void> = {
401: (message) => {
// 自定义 401 处理
},
// 添加更多错误码处理
}
\`\`\`

### 修改 API 代理

在 `vite.config.ts` 中修改 proxy 配置：

\`\`\`typescript
server: {
proxy: {
'/api': {
target: 'http://your-backend-url',
changeOrigin: true,
},
},
}
\`\`\`

## 🎯 类型安全

所有请求方法都支持泛型，确保类型安全：

\`\`\`typescript
interface UserInfo {
id: number
name: string
}

// response 的类型为 StandardResponse<UserInfo>
const response = await get<UserInfo>('/user/info')

// TypeScript 会自动推断 data 的类型
if (response.isSuccess && response.data) {
console.log(response.data.name) // ✅ 类型安全
}
\`\`\`

## 🚀 下一步建议

1. **状态管理**：添加 Zustand 或 Redux Toolkit
2. **Git Hooks**：配置 Husky + lint-staged
3. **测试**：添加 Vitest + React Testing Library
4. **工具函数**：完善 utils 目录
5. **自定义 Hooks**：创建 hooks 目录
6. **移动端适配**：添加 viewport 适配方案
7. **常量管理**：创建 constants 目录

## 📚 技术栈

- Vite 7.x
- React 19.x
- TypeScript 5.x
- Axios 1.x
- Antd Mobile 5.x
- React Router 7.x
