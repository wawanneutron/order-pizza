import { useSelector } from 'react-redux'

export default function Username() {
  const username = useSelector((state) => state.user.username)

  if (!username) return null

  return (
    <div className="text-center text-2xl font-bold">
      Welcome, <span className="text-amber-800">{username}</span>!
    </div>
  )
}
