import { useDispatch, useSelector } from 'react-redux'
import { clearCarts, getCarts } from './cartSlice'
import LinkButton from '../../ui/LinkButton'
import Button from '../../ui/Button'
import CartItem from './CartItem'
import EmptyCart from './EmptyCart'

export default function Carts() {
  const carts = useSelector(getCarts)
  const username = useSelector((state) => state.user.username)

  const dispatch = useDispatch()

  const handleClearCarts = () => dispatch(clearCarts())

  if (!carts.length) return <EmptyCart />

  return (
    <div className="px-2">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="text-amber-700 text-2xl">
        Your cart,{' '}
        <span className="font-semibold text-amber-600 text-xl">{username}</span>
      </h2>

      <ul className="mt-3 divide-y border-b divide-stone-600 ">
        {carts.map((item) => (
          <CartItem cart={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-3">
        <Button to="/order" type="primary" size="md">
          Order Pizzas
        </Button>

        <Button onClick={handleClearCarts} type="secondary" size="md">
          Clear Carts
        </Button>
      </div>
    </div>
  )
}
