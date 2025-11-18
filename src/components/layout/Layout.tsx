import { Outlet, useLocation } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { Navbar } from "./Navbar"

export function Layout() {
  const location = useLocation()
  const isHomePage = location.pathname === "/"

  if (isHomePage) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <Outlet />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64">
        <Outlet />
      </main>
    </div>
  )
}

