import { useNavigateRouter } from '../../routers/navigate'
import { usePageTitle } from '../../utils/page-title'

export function useHomeViewModel() {
  const navigate = useNavigateRouter()
  usePageTitle('Home Page')

  function goToMine() {
    navigate.toName('/mine', { query: 'fromHome', id: '123' })
  }

  return {
    goToMine,
  }
}
