import Button from '../../ui/Button'

function EmptyCart() {
  return (
    <div className="px-4 py-3 text-center">
      <h2 className="my-8 text-2xl text-gray-200 font-semibold">
        Your cart is still empty. Start adding some pizzas :)
      </h2>

      <Button to="/menu" type="primary" size="small">
        Browse Pizzas
      </Button>
    </div>
  )
}

export default EmptyCart
