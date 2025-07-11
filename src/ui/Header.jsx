import { Link } from 'react-router-dom'
import SearchOrder from '../features/order/SearchOrder'
import Username from '../features/user/Username'

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-amber-500 bg-amber-400 mx-6 px-4 py-6 rounded-b-xl uppercase">
      <Link to="/" className="tracking-widest">
        <h1 className="text-2xl text-amber-800 font-bold mb-2">
          Fast Order Pizza
        </h1>
      </Link>

      <SearchOrder />
      <Username />
    </header>
  )
}

export default Header
