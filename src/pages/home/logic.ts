import { apiGet } from '@/https/request'
import { useNavigateRouter } from '../../routers/navigate'
import type { HomePageData } from './model'
import { logger } from '@/utils/log'

export function useHomeLogic() {
  const navigate = useNavigateRouter()

  function goToMine() {
    navigate.toName('/mine', { query: 'fromHome', id: '123' })
  }

  async function fetchData() {
    const resp = await apiGet<HomePageData>('/home/data')
    if (resp.isSuccess) {
      logger.debug('Home page data:', resp.data)
    } else {
      logger.error('Failed to fetch home page data:', resp.message)
    }
  }

  return {
    goToMine,
    fetchData,
  }
}
