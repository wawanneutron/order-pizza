import { Outlet } from 'react-router-dom'
import Header from './Header'
import CartOverview from '../features/cart/CartOverview'
import { useSelector } from 'react-redux'
import { getCarts } from '../features/cart/cartSlice'

function AppLayout() {
  const carts = useSelector(getCarts)

  return (
    <div className="h-screen bg-gray-800 grid grid-rows-[auto_1fr_auto]">
      <Header />

      <div className="my-10 overflow-auto">
        <main className="mx-auto max-w-3xl px-4 md:px-4">
          <Outlet />
        </main>
      </div>

      {carts.length && <CartOverview />}
    </div>
  )
}

export default AppLayout
