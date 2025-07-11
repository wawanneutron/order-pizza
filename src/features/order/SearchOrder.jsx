import { useState } from 'react'

export default function SearchOrder() {
  const [search, setSearch] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    console.log('log search:', search)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search orded #"
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-600 focus:ring-opacity-50 sm:w-64 sm:focus:w-100"
      />
    </form>
  )
}
