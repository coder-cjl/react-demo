import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // 路径别名配置
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@api': path.resolve(__dirname, './src/api'),
      '@https': path.resolve(__dirname, './src/https'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },

  // 开发服务器配置
  // server: {
  //   port: 3000,
  //   open: true,
  //   cors: true,
  //   // 代理配置
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:8080',
  //       changeOrigin: true,
  //       rewrite: path => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },

  // 构建配置
  // build: {
  //   outDir: 'dist',
  //   sourcemap: false,
  //   // 代码分割
  //   rollupOptions: {
  //     output: {
  //       manualChunks(id) {
  //         if (id.includes('node_modules')) {
  //           if (
  //             id.includes('react') ||
  //             id.includes('react-dom') ||
  //             id.includes('react-router')
  //           ) {
  //             return 'react-vendor'
  //           }
  //           if (
  //             id.includes('antd-mobile') ||
  //             id.includes('styled-components')
  //           ) {
  //             return 'ui-vendor'
  //           }
  //           return 'vendor'
  //         }
  //       },
  //     },
  //   },
  //   // 消除打包大小超过警告
  //   chunkSizeWarningLimit: 2000,
  // },
})
