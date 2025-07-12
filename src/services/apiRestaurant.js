const API_URL = 'https://react-fast-pizza-api.onrender.com/api'

export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`)

  if (!res.ok) throw Error('Failed to fetch menu')

  const { data } = await res.json()
  return data
}
