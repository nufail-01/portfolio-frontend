const FilterTabs = ({ options, active, onChange }) => {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-border p-1">
      {options.map((option) => {
        const isActive = active === option.value
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`rounded-md px-4 py-2 font-mono text-xs tracking-wide transition-colors ${
              isActive
                ? 'bg-text-primary text-bg'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            {option.label.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}

export default FilterTabs