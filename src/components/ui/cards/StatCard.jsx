const StatCard = ({ value, label }) => {
  return (
    <div className="border border-border p-6">
      <p className="font-display text-4xl text-text-primary">{value}</p>
      <p className="mt-2 font-mono text-xs tracking-wide text-text-muted">{label}</p>
    </div>
  )
}

export default StatCard