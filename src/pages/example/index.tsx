import { useEffect } from 'react'
import { useRequest } from '@/hooks'
import { userApi } from '@/api'
import { LucaButton } from '@/styles/antd-style'
import { LucaColumn, LucaContainer, LucaText } from '@/styles/global-style'

/**
 * 使用示例：展示如何使用新的 HTTP 封装
 */
export function ExamplePage() {
  // 使用 useRequest Hook
  const { data, loading, error, execute } = useRequest(userApi.getUserInfo)

  // 页面加载时获取用户信息
  useEffect(() => {
    execute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 手动登录示例
  const handleLogin = async () => {
    const result = await userApi.login({
      username: 'admin',
      password: '123456',
    })

    if (result.isSuccess) {
      console.log('登录成功', result.data)
      // 保存 token
      if (result.data?.token) {
        localStorage.setItem('authToken', result.data.token)
      }
    }
  }

  return (
    <LucaContainer width='100vw' height='100vh' $justifyContent='center'>
      <LucaColumn $align='center' $itemMargin='20px'>
        <LucaText fontSize='24px'>HTTP 封装使用示例</LucaText>

        {loading && <LucaText>加载中...</LucaText>}

        {error && <LucaText color='red'>{error}</LucaText>}

        {data && (
          <LucaColumn>
            <LucaText>用户名: {data.username}</LucaText>
            <LucaText>邮箱: {data.email}</LucaText>
          </LucaColumn>
        )}

        <LucaButton
          onClick={() => {
            void handleLogin()
          }}
        >
          测试登录
        </LucaButton>

        <LucaButton
          onClick={async () => {
            await execute()
          }}
        >
          刷新用户信息
        </LucaButton>
      </LucaColumn>
    </LucaContainer>
  )
}
