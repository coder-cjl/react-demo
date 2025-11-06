import { logger } from '@/utils/log'
import { useEffect, useLayoutEffect, useState } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  )

  useLayoutEffect(() => {
    logger.debug('应用主题设置:', theme)
    document.documentElement.setAttribute('data-prefers-color-scheme', theme)
  }, [theme])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = () => setTheme(media.matches ? 'dark' : 'light')
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    logger.debug('保存主题设置:', theme)
  }, [theme])

  function toggleTheme() {
    setTheme((prev: string) => (prev === 'light' ? 'dark' : 'light'))
  }

  return {
    theme,
    toggleTheme,
  }
}
