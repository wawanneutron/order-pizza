import { Outlet } from 'react-router-dom'
import Header from './Header'
import CartOverview from '../features/cart/CartOverview'

function AppLayout() {
  return (
    <div className="h-screen bg-gray-800 grid grid-rows-[auto_1fr_auto]">
      <Header />

      <div className="my-10 overflow-auto">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  )
}

export default AppLayout
