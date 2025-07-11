import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './ui/Home'
import Menu from './ui/Menu'
import AppLayout from './ui/AppLayout'

const router = createBrowserRouter([
  {
    element: <AppLayout />,

    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/menu',
        element: <Menu />
      }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
