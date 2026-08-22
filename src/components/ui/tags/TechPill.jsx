const TechPill = ({ children }) => {
  return (
    <span className="inline-flex items-center rounded-full border border-border px-4 py-1.5 font-mono text-xs tracking-wide text-text-muted">
      {children}
    </span>
  )
}

export default TechPill