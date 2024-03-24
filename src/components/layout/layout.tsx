import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { useTheme } from '@/components/theme-provider'

import { Header } from './header'

export function Layout() {
  const { theme } = useTheme()

  return (
    <div className="relative mx-auto my-0 flex h-screen flex-col">
      <Header />
      <main className="container m-0 mx-auto max-w-7xl flex-grow px-6 py-16">
        <Outlet />
      </main>
      <ToastContainer position="bottom-center" theme={theme} />
    </div>
  )
}
