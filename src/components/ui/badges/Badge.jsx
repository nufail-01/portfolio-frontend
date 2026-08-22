const Badge = ({ children, dotColor = 'bg-accent', variant = 'outline' }) => {
  const variants = {
    outline: 'border border-border text-text-muted',
    filled: 'border border-accent/40 bg-accent/10 text-accent',
  }

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 font-mono text-xs tracking-wide ${variants[variant]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
      {children}
    </span>
  )
}

export default Badge