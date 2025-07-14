import { useSelector } from 'react-redux'
import { formatCurrency } from '../../utils/helpers'
import { getCurrentQuantityById } from './cartSlice'
import UpdateItemQuantity from './UpdateItemQuantity'
import DeleteItem from './DeleteItem'

export default function CartItem({ cart }) {
  const { pizzaId, name, quantity, totalPrice } = cart
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId))

  return (
    <li className="sm:flex sm:items-center sm:justify-between py-4 my-6 text-gray-300">
      <div className="mb-1 sm:mb-0">
        <p className="text-lg">
          {quantity}&times; {name}
        </p>
        <p className="text-amber-500">{formatCurrency(totalPrice)}</p>
      </div>
      <div className="flex justify-between items-center sm:gap-6">
        <div className="flex items-center gap-3 sm:gap-8">
          <UpdateItemQuantity
            currentQuantity={currentQuantity}
            pizzaId={pizzaId}
          />
          <DeleteItem pizzaId={pizzaId} />
        </div>
      </div>
    </li>
  )
}
