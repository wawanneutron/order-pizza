import { useRouteError } from 'react-router-dom'
import LinkButton from './LinkButton'

export default function Error() {
  const error = useRouteError()

  return (
    <div className="flex items-center justify-center h-[100%]">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-3xl text-amber-800">Something went wrong 😢.</p>

        <div className="my-4 text-yellow-500">
          <h2> {error.status} </h2>
          <h2> {error.statusText} </h2>
          <p>{error.data || error.message}</p>
        </div>

        <LinkButton to="-1">&larr; Go Back</LinkButton>
      </div>
    </div>
  )
}
