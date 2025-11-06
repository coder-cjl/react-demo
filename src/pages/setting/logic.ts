import { useNavigateRouter } from '@/routers/navigate'
import type { SettingPageData } from './model'
import { useState } from 'react'

export default function useSettingLogic() {
  const navigate = useNavigateRouter()
  const [model, setModel] = useState<SettingPageData>({ theme: 'light' })

  function onBack() {
    navigate.back()
  }

  function onToggleTheme() {
    setModel(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }))
  }

  return { onBack, onToggleTheme, model }
}
