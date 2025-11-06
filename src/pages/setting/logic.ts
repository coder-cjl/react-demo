import { useNavigateRouter } from '@/routers/navigate'

export default function useSettingLogic() {
  const navigate = useNavigateRouter()

  function onBack() {
    navigate.back()
  }

  return { onBack }
}
