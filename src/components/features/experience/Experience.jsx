import { useState, useMemo } from 'react'
import Container from '../../ui/layout-primitives/Container'
import FilterTabs from '../../ui/navigation/FilterTabs'
import TimelineItem from './TimelineItem'
import ExperienceSidebar from './ExperienceSidebar'
import { EXPERIENCE_ITEMS, FILTERS } from '../../../constants/experience/experience'

const Experience = () => {
  const [filter, setFilter] = useState('all')

  const filteredItems = useMemo(() => {
    if (filter === 'all') return EXPERIENCE_ITEMS
    return EXPERIENCE_ITEMS.filter((item) => item.type === filter)
  }, [filter])

  return (
    // old
    // <section id="experience" className="py-32">
      // new
      <section id="experience" className="py-16 md:px-8 md:py-20 lg:px-12">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <span className="font-mono text-sm tracking-widest text-accent">
                BACKGROUND
              </span>
            </div>

            <h2 className="font-display text-6xl leading-[1.05] tracking-tight md:text-7xl md:leading-[0.85]">
              EXPERIENCE &amp; <span className="text-outline">EDUCATION</span>
            </h2>
          </div>

          <FilterTabs options={FILTERS} active={filter} onChange={setFilter} />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {filteredItems.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                isLast={index === filteredItems.length - 1}
              />
            ))}
          </div>

          <ExperienceSidebar />
        </div>
      </Container>
    </section>
  )
}

export default Experience