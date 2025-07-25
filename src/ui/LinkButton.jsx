import { Link, useNavigate } from 'react-router-dom'

export default function LinkButton({ to, children }) {
  const navigate = useNavigate()
  const className =
    'text-blue-500 hover:text-blue-700 hover:underline cursor-pointer'

  if (to === '-1')
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    )

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  )
}
