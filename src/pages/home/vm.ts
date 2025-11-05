import { getApi } from '../../https/request'
import { useNavigateRouter } from '../../routers/navigate'
import { usePageTitle } from '../../utils/page-title'
import type { HomePageData } from './model'

export function useHomeViewModel() {
  const navigate = useNavigateRouter()
  usePageTitle('Home Page')

  function goToMine() {
    navigate.toName('/mine', { query: 'fromHome', id: '123' })
  }

  async function fetchData() {
    const data = await getApi<HomePageData>('/api/data')
    console.log('Fetched data:', data.welcomeMessage)
  }

  return {
    goToMine,
    fetchData,
  }
}
