import { useFetcher, useLoaderData } from 'react-router-dom'
import { getOrder } from '../../services/apiRestaurant'
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate
} from '../../utils/helpers'
import OrderItem from './OrderItem'
import { useEffect } from 'react'
import UpdateOrder from './UpdateOrder'

export default function Order() {
  const order = useLoaderData()

  const fetcher = useFetcher()

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu')
  }, [fetcher])

  console.log('user order', order)

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart
  } = order

  const deliveryIn = calcMinutesLeft(estimatedDelivery)

  return (
    <section className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-amber-600">
          Order #{id} status
        </h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {' '}
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-amber-200 rounded px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map((item) => (
          <OrderItem
            item={item}
            isLoadingIngredients={fetcher.state === 'loading'}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId)
                ?.ingredients ?? []
            }
            key={item.id}
          />
        ))}
      </ul>

      <div className="space-y-3 bg-amber-200 rounded px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      {!priority && <UpdateOrder />}
    </section>
  )
}

export async function Loader({ params }) {
  const order = await getOrder(params.orderId)
  return order
}
