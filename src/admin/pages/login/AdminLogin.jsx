import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { loginAdmin } from '../../lib/auth/authService'

const AdminLogin = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const from = location.state?.from || '/admin'

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }

    try {
      setLoading(true)
      await loginAdmin(email, password)
      navigate(from, { replace: true })
    } catch (error) {
      setError(error.message || 'Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-root flex min-h-screen items-center justify-center bg-bg px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl lg:grid-cols-2">
        {/* Left — brand panel */}
        <div className="relative hidden flex-col items-center justify-center gap-6 overflow-hidden bg-gradient-to-br from-accent-dim via-bg to-bg p-12 lg:flex">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-accent font-mono text-3xl font-bold text-bg shadow-[0_0_30px_var(--color-accent)]">
            N
          </div>

          <div className="relative text-center">
            <h1 className="font-display text-4xl leading-[0.9] tracking-tight text-text-primary">
              NUFAIL<span className="text-accent">.</span>
            </h1>
            <p className="mt-3 font-mono text-xs tracking-[0.3em] text-text-muted">
              PORTFOLIO ADMIN
            </p>
          </div>

          <p className="relative max-w-xs text-center text-sm leading-6 text-text-muted">
            Manage your projects and contact messages from one
            dashboard.
          </p>
        </div>

        {/* Right — sign in card */}
        <div className="flex flex-col justify-center p-8 sm:p-12">
          <div className="mb-8 lg:hidden">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent font-mono font-bold text-bg">
              N
            </div>
            <h1 className="font-display text-2xl text-text-primary">
              NUFAIL<span className="text-accent">.</span>
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="font-display text-3xl tracking-tight text-text-primary">
              Sign In
            </h2>
            <p className="mt-2 font-mono text-sm text-text-muted">
              Enter your credentials to access the dashboard.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@example.com"
                autoComplete="email"
                className="w-full rounded-xl border border-border bg-bg px-4 py-3.5 text-sm text-text-primary outline-none transition placeholder:text-text-faint focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </div>

            <div>
              <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••••"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-border bg-bg px-4 py-3.5 pr-16 text-sm text-text-primary outline-none transition placeholder:text-text-faint focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs font-semibold tracking-wide text-text-muted transition hover:text-accent"
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-accent px-4 py-3.5 font-mono text-sm font-semibold text-bg transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Enter Dashboard'}
            </button>
          </form>

          <p className="mt-8 text-center font-mono text-xs text-text-faint">
            This area is restricted to authorized administrators.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin