import { useEffect } from 'react'
import { useNavigateRouter } from '../../routers/navigate'
import { logger } from '@/utils/log'

export function useMineLogic() {
  const navigate = useNavigateRouter()

  useEffect(() => {
    const query = navigate.getQueryParam('query')
    logger.debug('Navigated to MinePage with query param:', query)

    const id = navigate.getQueryParam('id')
    logger.debug('Navigated to MinePage with id param:', id)
  }, [])

  function onBack() {
    navigate.back()
  }

  function onToSetting() {
    navigate.toName('/setting')
  }

  return { onBack, onToSetting }
}
