import { useLoaderData } from 'react-router-dom'
import { getMenu } from '../../services/apiRestaurant'
import MenuItem from './MenuItem'

export default function Menu() {
  const menu = useLoaderData()

  return (
    <ul className="divide-y divide-gray-900 px-2">
      {menu.map((item) => (
        <MenuItem pizza={item} key={item.id} />
      ))}
    </ul>
  )
}

export async function Loader() {
  const menu = await getMenu()

  console.log('menu', menu)
  return menu
}
