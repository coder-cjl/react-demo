import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '../pages/home'
import { MinePage } from '../pages/mine'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/mine',
    element: <MinePage />,
  },
])
