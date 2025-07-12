import { useDispatch, useSelector } from 'react-redux'
import Button from '../../ui/Button'
import { formatCurrency } from '../../utils/helpers'
import { addItem, getCurrentQuantityById } from '../cart/cartSlice'
import UpdateItemQuantity from '../cart/UpdateItemQuantity'
import DeleteItem from '../cart/DeleteItem'

export default function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza

  const dispatch = useDispatch()

  const currentQuantity = useSelector(getCurrentQuantityById(id))
  const isInCart = currentQuantity > 0

  const handleAddToCart = () => {
    const cartItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: 1 * unitPrice
    }

    dispatch(addItem(cartItem))

    console.log('cart item payload:', cartItem)
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        className={`h-24 rounded md:h-32 ${soldOut && 'opacity-70 grayscale'}`}
        src={imageUrl}
        alt={name}
      />

      <div className="flex grow flex-col pt-0.5 text-sm sm:text-base">
        <p className="font-medium text-lg text-amber-700">{name}</p>
        <p className="text-sm capitalize italic text-amber-500">
          {ingredients.join(', ')}
        </p>

        <div className="mt-auto flex justify-between items-end">
          {soldOut ? (
            <p className="text-red-800 font-bold">Sold Out</p>
          ) : (
            <p className="text-amber-700 font-medium">
              {formatCurrency(unitPrice)}
            </p>
          )}

          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity
                currentQuantity={currentQuantity}
                pizzaId={id}
              />
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button onClick={handleAddToCart} type="primary" size="xs">
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  )
}
