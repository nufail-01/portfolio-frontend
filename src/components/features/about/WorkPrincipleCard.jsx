const WorkPrincipleCard = ({ number, title, description }) => {
  return (
    <div className="border border-border p-8">
      <p className="font-mono text-sm text-accent">{number}</p>
      <h3 className="mt-4 font-display text-2xl">{title}</h3>
      <p className="mt-3 text-text-muted">{description}</p>
    </div>
  )
}

export default WorkPrincipleCard