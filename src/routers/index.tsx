import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '../pages/home/view'
import { MinePage } from '../pages/mine/view'
import { Layout } from './layout'
import SettingPage from '@/pages/setting/view'
import { ExportPage } from '@/pages/export/view'

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
      {
        path: '/setting',
        element: <SettingPage />,
      },
      {
        path: '/export',
        element: <ExportPage />,
      },
    ],
  },
])
