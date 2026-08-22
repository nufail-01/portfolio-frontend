import { Link } from 'react-router-dom'

const BackLink = ({ to = '/', label = 'Back' }) => {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-text-muted transition-colors hover:text-text-primary"
    >
      <span aria-hidden="true">←</span>
      {label.toUpperCase()}
    </Link>
  )
}

export default BackLink