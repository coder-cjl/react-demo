import { useEffect } from 'react'
import { useNavigateRouter } from '../../routers/navigate'

export function useMineViewModel() {
  const navigate = useNavigateRouter()

  useEffect(() => {
    const query = navigate.getQueryParam('query')
    console.log('Navigated to MinePage with query param:', query)

    const id = navigate.getQueryParam('id')
    console.log('Navigated to MinePage with id param:', id)
  }, [])

  function onBack() {
    navigate.back()
  }

  return { onBack }
}
