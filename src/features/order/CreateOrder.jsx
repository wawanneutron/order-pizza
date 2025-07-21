import { useDispatch, useSelector } from 'react-redux'
import Button from '../../ui/Button'
import { formatCurrency } from '../../utils/helpers'
import { clearCarts, getCarts, getTotalCartPrice } from '../cart/cartSlice'
import { useState } from 'react'
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom'
import { fetchAddress } from '../user/userSlice'
import { createOrder } from '../../services/apiRestaurant'
import store from '../../store'

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  )

export default function CreateOrder() {
  const {
    username,
    address,
    position,
    status: addressStatus,
    error: errorAddress
  } = useSelector((state) => state.user)

  const isLoadingAddress = addressStatus === 'loading'

  const carts = useSelector(getCarts)
  const totalCartPrice = useSelector(getTotalCartPrice)

  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  const formErrors = useActionData()

  const [withPriority, setWithPriority] = useState(false)

  const dispatch = useDispatch()

  return (
    <div>
      <h2 className="text-amber-600 text-2xl font-semibold mb-8">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="POST">
        <div className="text-gray-300 mb-4 flex flex-col gap-1 sm:mb-6 sm:flex-row sm:items-center sm:gap-2">
          <label className="sm:basis-40">Full Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            required
            placeholder="Enter your full name"
            defaultValue={username}
          />
        </div>
        <div className="text-gray-300 mb-4 flex flex-col gap-1 sm:mb-6 sm:flex-row sm:items-center sm:gap-2">
          <label className="sm:basis-40">Phone Number</label>
          <div className="grow">
            <input
              className="input w-full"
              type="tel"
              name="phone"
              required
              placeholder="Enter your phone number"
            />

            {formErrors?.phone && (
              <p className="mt-2 p-2 rounded-full bg-red-100 text-red-500 text-xs">
                {formErrors?.phone}
              </p>
            )}
          </div>
        </div>
        <div className="relative text-gray-300 mb-4 flex flex-col gap-1 sm:mb-6 sm:flex-row sm:items-center sm:gap-2">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
              placeholder="Enter your address"
              disabled={isLoadingAddress}
              defaultValue={address}
            />

            {addressStatus === 'error' && (
              <p className="mt-2 p-2 rounded-full bg-red-100 text-red-500 text-xs">
                {errorAddress}
              </p>
            )}
          </div>

          {!position.latitude && !position.longitude && (
            <div className="absolute right-[3px] top-[47%] sm:top-[3px]">
              <Button
                disabled={isLoadingAddress}
                type="primary"
                size="xs"
                onClick={(e) => {
                  e.preventDefault()
                  dispatch(fetchAddress())
                }}
              >
                Get Position
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 cursor-pointer"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="text-amber-200 cursor-pointer" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div className="mt-8">
          <input type="hidden" name="cart" value={JSON.stringify(carts)} />
          <input
            type="hidden"
            name="position"
            value={`${position.latitude}, ${position.longitude}`}
          />

          <Button type="primary" size="md" disabled={isSubmitting}>
            {isSubmitting
              ? 'Placing order...'
              : `Order Now ${
                  withPriority
                    ? formatCurrency(totalCartPrice * 2)
                    : formatCurrency(totalCartPrice)
                }`}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export async function Action({ request }) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true'
  }

  const errors = {}

  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you.'

  if (Object.keys(errors).length > 0) return errors

  // If everything is okey, create new order and redirect
  const newOrder = await createOrder(order)

  // clear cart -> import store for use dispatch
  store.dispatch(clearCarts())

  // redirect page
  return redirect(`/order/${newOrder.id}`)
}
