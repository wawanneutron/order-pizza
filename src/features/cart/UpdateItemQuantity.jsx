import { useDispatch } from 'react-redux'
import Button from '../../ui/Button'
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice'

export default function UpdateItemQuantity({ currentQuantity, pizzaId }) {
  const dispatch = useDispatch()

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
        type="primary"
        size="small"
      >
        -
      </Button>
      <span className="text-sm font-medium text-amber-600">
        {currentQuantity}
      </span>
      <Button
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
        type="primary"
        size="small"
      >
        +
      </Button>
    </div>
  )
}
