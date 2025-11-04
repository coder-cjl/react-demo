import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '../pages/home'
import { MinePage } from '../pages/mine'
import { Layout } from './layout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/mine',
        element: <MinePage />,
      },
    ],
  },
])
