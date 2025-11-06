import { useState } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  function toggleTheme() {
    setTheme((prev: string) => (prev === 'light' ? 'dark' : 'light'))
  }

  return {
    theme,
    toggleTheme,
  }
}
