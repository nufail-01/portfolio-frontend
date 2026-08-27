
const FilterTabs = ({ options, active, onChange }) => {
  return (
    <div className="inline-flex items-center gap-1 overflow-x-auto rounded-lg border border-border p-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {options.map((option) => {
        const isActive = active === option.value
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`shrink-0 whitespace-nowrap rounded-md px-3 py-1.5 font-mono text-xs tracking-normal transition-colors ${
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