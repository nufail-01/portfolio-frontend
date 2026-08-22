const SkillTag = ({ children }) => {
  return (
    <span className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2.5 font-mono text-xs tracking-wide text-text-muted transition-colors hover:border-accent/50 hover:text-text-primary">
      {children.toUpperCase()}
    </span>
  )
}

export default SkillTag