import { NavLink, useNavigate } from 'react-router-dom'
import { logoutAdmin } from '../../lib/auth/authService'

const Icon = ({ children }) => (
  <span className="flex h-5 w-5 items-center justify-center">
    {children}
  </span>
)

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logoutAdmin()
    navigate('/admin/login', { replace: true })
  }

  // const navigation = [
  //   {
  //     name: 'Dashboard',
  //     path: '/admin',
  //     icon: (
  //       <Icon>
  //         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
  //           <rect x="3" y="3" width="7" height="7" rx="1" />
  //           <rect x="14" y="3" width="7" height="7" rx="1" />
  //           <rect x="3" y="14" width="7" height="7" rx="1" />
  //           <rect x="14" y="14" width="7" height="7" rx="1" />
  //         </svg>
  //       </Icon>
  //     ),
  //   },
  //   {
  //     name: 'Projects',
  //     path: '/admin/projects',
  //     icon: (
  //       <Icon>
  //         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
  //           <path d="M4 7h6l2 2h8v10H4z" />
  //           <path d="M4 7V5h6l2 2" />
  //         </svg>
  //       </Icon>
  //     ),
  //   },
  //   {
  //     name: 'Contacts',
  //     path: '/admin/contacts',
  //     icon: (
  //       <Icon>
  //         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
  //           <rect x="3" y="5" width="18" height="14" rx="2" />
  //           <path d="m3 7 9 6 9-6" />
  //         </svg>
  //       </Icon>
  //     ),
  //   },
  // ]
  
  const navigation = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: (
        <Icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        </Icon>
      ),
    },
    {
      name: 'Projects',
      path: '/admin/projects',
      icon: (
        <Icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 7h6l2 2h8v10H4z" />
            <path d="M4 7V5h6l2 2" />
          </svg>
        </Icon>
      ),
    },
    {
      name: 'Contacts',
      path: '/admin/contacts',
      icon: (
        <Icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
        </Icon>
      ),
    },
    {
      name: 'Skills',
      path: '/admin/skills',
      icon: (
        <Icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 2l2.5 6.5L21 9l-5 4.5L17.5 20 12 16.5 6.5 20 8 13.5 3 9l6.5-.5z" />
          </svg>
        </Icon>
      ),
    },
  ]

  return (
    <>
      {mobileOpen && (
        <button
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-72 flex-col
          border-r border-border bg-bg
          transition-transform duration-300
          lg:static lg:translate-x-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex h-20 items-center gap-3 border-b border-border px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent font-mono font-bold text-bg">
            P
          </div>
          <h1 className="text-base font-semibold text-text-primary">Portfolio</h1>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-2 px-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            Menu
          </p>

          <nav className="space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-accent/10 text-text-primary font-semibold'
                      : 'text-text-muted hover:bg-surface hover:text-text-primary'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full transition ${
                        isActive ? 'bg-accent' : 'bg-transparent'
                      }`}
                    />
                    <span className={isActive ? 'text-accent' : ''}>{item.icon}</span>
                    {item.name}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          
           
        </div>
      </aside>
    </>
  )
}

export default Sidebar