import { useNavigateRouter } from '../../routers/navigate'

export function useHomeViewModel() {
  const navigate = useNavigateRouter()

  function goToMine() {
    navigate.toName('/mine', { query: 'fromHome', id: '123' })
  }

  return {
    goToMine,
  }
}
