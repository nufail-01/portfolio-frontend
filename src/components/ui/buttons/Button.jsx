import { Link } from 'react-router-dom'

const Button = ({ children, href = '#', variant = 'primary', className = '', isRoute = false }) => {
  const base =
    'inline-flex items-center gap-2 rounded-md px-5 py-3 font-mono text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5'

  const variants = {
    primary: 'bg-accent text-bg hover:bg-accent/90',
    ghost: 'border border-border text-text-primary hover:border-accent/50',
  }

  const classes = `${base} ${variants[variant]} ${className}`
  const content = (
    <>
      {children}
      <span aria-hidden="true">→</span>
    </>
  )

  if (isRoute) {
    return (
      <Link to={href} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <a href={href} className={classes}>
      {content}
    </a>
  )
}

export default Button