import { Outlet, useNavigation } from 'react-router-dom'
import Header from './Header'
import CartOverview from '../features/cart/CartOverview'
import { useSelector } from 'react-redux'
import { getCarts } from '../features/cart/cartSlice'
import Loader from './Loader'

function AppLayout() {
  const carts = useSelector(getCarts)
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  return (
    <div className="h-screen bg-gray-800 grid grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
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
