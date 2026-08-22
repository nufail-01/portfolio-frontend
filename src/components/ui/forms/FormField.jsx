const FormField = ({ label, as = 'input', ...props }) => {
  const Tag = as
  const baseClasses =
    'w-full border border-border bg-transparent px-4 py-3 font-body text-sm text-text-primary placeholder:text-text-faint outline-none transition-colors focus:border-accent/50'

  return (
    <div>
      <label className="mb-2 block font-mono text-xs tracking-widest text-text-muted">
        {label.toUpperCase()}
      </label>
      <Tag className={baseClasses} {...props} />
    </div>
  )
}

export default FormField