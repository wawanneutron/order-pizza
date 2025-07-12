import { useState } from 'react'
import Button from '../../ui/Button'
import { updateName } from './userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function CreateUser() {
  const [username, setUserName] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()

    if (!username) return

    dispatch(updateName(username))
    navigate('/menu')
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <p className="mb-4 text-lg text-amber-600">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Your full name"
        className="input mb-8 w-72"
      />

      {username !== '' && (
        <div>
          <Button type="primary" size="md">
            Start Ordering
          </Button>
        </div>
      )}
    </form>
  )
}
