import { EXPERIENCE_ITEMS, SIDEBAR_INFO } from '../../../constants/experience/experience'

const ExperienceSidebar = () => {
  const current = EXPERIENCE_ITEMS.find((item) => item.current)

  return (
    <div className="space-y-6">
      {/* Currently */}
      {current && (
        <div className="border border-border p-6">
          <p className="font-mono text-xs tracking-widest text-text-muted">
            CURRENTLY
          </p>

          <h3 className="mt-4 font-display text-xl">{current.title}</h3>
          <p className="mt-1 font-mono text-sm text-text-muted">
            @ {current.org}
          </p>
          <p className="mt-4 text-sm text-text-muted">
            {current.description}
          </p>
        </div>
      )}

      {/* Open to */}
      <div className="border border-accent/40 bg-accent-dim/40 p-6">
        <p className="font-mono text-xs tracking-widest text-text-muted">
          OPEN TO
        </p>

        <ul className="mt-4 space-y-2">
          {SIDEBAR_INFO.openTo.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-sm text-text-primary"
            >
              <span className="h-1 w-1 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="mt-6 flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 font-mono text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
        >
          GET IN TOUCH
          <span aria-hidden="true">→</span>
        </a>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 border border-border px-5 py-4 font-mono text-xs tracking-wide text-text-muted">
        <span aria-hidden="true">📍</span>
        {SIDEBAR_INFO.location} ·{' '}
        <span className="text-accent">{SIDEBAR_INFO.mode}</span>
      </div>
    </div>
  )
}

export default ExperienceSidebar