import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './ui/Home'
import Menu, { Loader as menuLoader } from './features/menu/Menu'
import AppLayout from './ui/AppLayout'
import Error from './ui/Error'
import Carts from './features/cart/Carts'
import CreateOrder, {
  Action as createOrderAction
} from './features/order/CreateOrder'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />
      },
      {
        path: '/cart',
        element: <Carts />
      },
      {
        path: '/order',
        element: <CreateOrder />,
        action: createOrderAction
      }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
