import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="admin-root flex min-h-screen bg-bg text-text-primary">
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-bg/90 px-4 backdrop-blur-md sm:px-6 lg:px-8">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-text-muted hover:bg-surface hover:text-text-primary lg:hidden"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="hidden lg:block">
            <p className="font-mono text-sm font-medium text-text-primary">
              Admin Dashboard
            </p>

            <p className="font-mono text-xs text-text-muted">
              Manage your portfolio
            </p>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="font-mono text-sm font-medium text-text-primary">
                Administrator
              </p>

              <p className="font-mono text-xs text-text-muted">
                Admin
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-mono font-semibold text-bg">
              A
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout