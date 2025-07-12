import { Link } from 'react-router-dom'
import { formatCurrency } from '../../utils/helpers'
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice'
import { useSelector } from 'react-redux'

export default function CartOverview() {
  const totalCartPrice = useSelector(getTotalCartPrice)
  const totalCartQuantity = useSelector(getTotalCartQuantity)

  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 sm:px-6 uppercase">
      <p className="text-amber-700 font-semibold space-x-4 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link className="text-amber-500" to="/cart">
        Open Cart &rarr;
      </Link>
    </div>
  )
}
