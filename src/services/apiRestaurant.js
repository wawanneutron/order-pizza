const API_URL = 'https://react-fast-pizza-api.onrender.com/api'

export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`)

  if (!res.ok) throw Error('Failed to fetch menu')

  const { data } = await res.json()
  return data
}

export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!res.ok) throw Error()

    const { data } = await res.json()
    return data
  } catch {
    throw Error('Failed to creating your order')
  }
}

export async function updateOrder(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateObj),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!res.ok) throw Error()
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error('Failed updating your order')
  }
}

export async function getOrder(orderId) {
  const res = await fetch(`${API_URL}/order/${orderId}`)
  if (!res.ok) throw Error(`Could't find order ${orderId}`)

  const { data } = await res.json()
  return data
}
