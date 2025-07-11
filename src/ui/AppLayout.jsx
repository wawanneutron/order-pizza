import { Outlet } from 'react-router-dom'
import Header from './Header'

function AppLayout() {
  return (
    <div className="h-screen bg-gray-800 grid grid-rows-[auto_1fr_auto]">
      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
