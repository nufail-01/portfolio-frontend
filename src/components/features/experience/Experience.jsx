import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Container from '../../ui/layout-primitives/Container'
import FilterTabs from '../../ui/navigation/FilterTabs'
import TimelineItem from './TimelineItem'
import ExperienceSidebar from './ExperienceSidebar'
import { EXPERIENCE_ITEMS, FILTERS } from '../../../constants/experience/experience'

const lineGrow = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

const fadeX = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const tabsIn = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const headerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
}

const timelineContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
}

const timelineItemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const Experience = () => {
  const [filter, setFilter] = useState('all')
  const [hasBeenSeen, setHasBeenSeen] = useState(false)

  const filteredItems = useMemo(() => {
    if (filter === 'all') return EXPERIENCE_ITEMS
    return EXPERIENCE_ITEMS.filter((item) => item.type === filter)
  }, [filter])

  return (
    <section id="experience" className="py-16 md:px-8 md:py-20 lg:px-12">
      <Container>
        <motion.div
          className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.75 }}
          onViewportEnter={() => setHasBeenSeen(true)}
        >
          <div>
            <div className="mb-6 flex items-center gap-3">
              <motion.span
                variants={lineGrow}
                style={{ transformOrigin: 'left' }}
                className="h-px w-8 bg-accent"
              />
              <motion.span
                variants={fadeX}
                className="font-mono text-sm tracking-widest text-accent"
              >
                BACKGROUND
              </motion.span>
            </div>

            <motion.h2
              variants={fadeUp}
              className="font-display text-6xl leading-[1.05] tracking-tight md:text-7xl md:leading-[0.85]"
            >
              EXPERIENCE &amp; <span className="text-outline">EDUCATION</span>
            </motion.h2>
          </div>

          <motion.div variants={tabsIn}>
            <FilterTabs options={FILTERS} active={filter} onChange={setFilter} />
          </motion.div>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <motion.div
            key={filter}
            className="lg:col-span-2"
            variants={timelineContainer}
            initial="hidden"
            animate={hasBeenSeen ? 'show' : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {filteredItems.map((item, index) => (
              <motion.div key={item.id} variants={timelineItemVariant}>
                <TimelineItem
                  item={item}
                  isLast={index === filteredItems.length - 1}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            <ExperienceSidebar />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export default Experience