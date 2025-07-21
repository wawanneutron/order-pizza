import { formatCurrency } from '../../utils/helpers'

export default function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item

  return (
    <li className="space-y-2 py-4">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p className="text-amber-500 font-semibold">
          <span className="font-bold text-green-600">{quantity}&times;</span>{' '}
          {name}
        </p>
        <p className="font-bold text-green-600">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm capitalize italic text-stone-300">
        {isLoadingIngredients ? 'Loading...' : ingredients.join(', ')}
      </p>
    </li>
  )
}
