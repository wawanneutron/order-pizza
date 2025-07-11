import { useSelector } from 'react-redux'
import CreateUser from '../features/user/CreateUser'
import Button from './Button'

export default function Home() {
  const username = useSelector((state) => state.user.username)

  return (
    <section className="my-10 px-4 text-center sm:my-16">
      <div className="mb-10">
        <h1 className="mb-2 md:text-5xl text-xl font-semibold text-white ">
          The best pizza.
        </h1>
        <p className="md:text-3xl text-xl text-yellow-500">
          Straight out of the oven, straight to you.
        </p>
      </div>

      {!username ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary" size="md">
          Continue ordering, {username}!
        </Button>
      )}
    </section>
  )
}
