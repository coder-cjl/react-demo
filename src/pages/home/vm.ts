import { useNavigateRouter } from '../../routers/navigate'
import type { HomePageData } from './model'

export function useHomeViewModel() {
  const navigate = useNavigateRouter()

  function goToMine() {
    navigate.toName('/mine', { query: 'fromHome', id: '123' })
  }

  async function fetchData() {}

  return {
    goToMine,
    fetchData,
  }
}
