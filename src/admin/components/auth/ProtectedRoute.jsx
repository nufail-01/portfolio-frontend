import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCurrentAdmin } from '../../lib/auth/authService'

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  const location = useLocation()

  useEffect(() => {
    let mounted = true

    const checkAuthentication = async () => {
      const admin = await getCurrentAdmin()

      if (mounted) {
        setAuthenticated(Boolean(admin))
        setLoading(false)
      }
    }

    checkAuthentication()

    return () => {
      mounted = false
    }
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-border border-t-accent" />

          <p className="font-mono text-sm text-text-muted">
            Checking authentication...
          </p>
        </div>
      </div>
    )
  }

  if (!authenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname }}
      />
    )
  }

  return <Outlet />
}

export default ProtectedRoute