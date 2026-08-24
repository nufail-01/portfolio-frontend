// import { useState, useMemo } from 'react'
// import Container from '../../ui/layout-primitives/Container'
// import FilterTabs from '../../ui/navigation/FilterTabs'
// import TimelineItem from './TimelineItem'
// import ExperienceSidebar from './ExperienceSidebar'
// import { EXPERIENCE_ITEMS, FILTERS } from '../../../constants/experience/experience'

// const Experience = () => {
//   const [filter, setFilter] = useState('all')

//   const filteredItems = useMemo(() => {
//     if (filter === 'all') return EXPERIENCE_ITEMS
//     return EXPERIENCE_ITEMS.filter((item) => item.type === filter)
//   }, [filter])

//   return (
  
//       <section id="experience" className="py-16 md:px-8 md:py-20 lg:px-12">
//       <Container>
//         <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
//           <div>
//             <div className="mb-6 flex items-center gap-3">
//               <span className="h-px w-8 bg-accent" />
//               <span className="font-mono text-sm tracking-widest text-accent">
//                 BACKGROUND
//               </span>
//             </div>

//             <h2 className="font-display text-6xl leading-[1.05] tracking-tight md:text-7xl md:leading-[0.85]">
//               EXPERIENCE &amp; <span className="text-outline">EDUCATION</span>
//             </h2>
//           </div>

//           <FilterTabs options={FILTERS} active={filter} onChange={setFilter} />
//         </div>

//         <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
//           <div className="lg:col-span-2">
//             {filteredItems.map((item, index) => (
//               <TimelineItem
//                 key={item.id}
//                 item={item}
//                 isLast={index === filteredItems.length - 1}
//               />
//             ))}
//           </div>

//           <ExperienceSidebar />
//         </div>
//       </Container>
//     </section>
//   )
// }

// export default Experience


import { useState, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Container from '../../ui/layout-primitives/Container'
import FilterTabs from '../../ui/navigation/FilterTabs'
import TimelineItem from './TimelineItem'
import ExperienceSidebar from './ExperienceSidebar'
import { EXPERIENCE_ITEMS, FILTERS } from '../../../constants/experience/experience'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Experience = () => {
  const [filter, setFilter] = useState('all')

  const filteredItems = useMemo(() => {
    if (filter === 'all') return EXPERIENCE_ITEMS
    return EXPERIENCE_ITEMS.filter((item) => item.type === filter)
  }, [filter])

  const sectionRef = useRef(null)
  const eyebrowLineRef = useRef(null)
  const eyebrowTextRef = useRef(null)
  const headingRef = useRef(null)
  const filterTabsRef = useRef(null)
  const timelineRef = useRef(null)
  const sidebarRef = useRef(null)

  // Header + sidebar — reveal once, on scroll into view
  useGSAP(
    () => {
      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        })
        .fromTo(
          eyebrowLineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6, transformOrigin: 'left' },
        )
        .from(
          eyebrowTextRef.current,
          { opacity: 0, x: -10, duration: 0.4 },
          '<0.1',
        )
        .from(headingRef.current, { opacity: 0, y: 20, duration: 0.6 }, '-=0.2')
        .from(
          filterTabsRef.current,
          { opacity: 0, y: 10, duration: 0.5 },
          '-=0.3',
        )
        .from(
          sidebarRef.current,
          { opacity: 0, y: 20, duration: 0.6 },
          '-=0.3',
        )
    },
    { scope: sectionRef },
  )

  // Timeline items — stagger reveal on scroll, and re-animate whenever the filter changes
  useGSAP(
    () => {
      if (!timelineRef.current) return
      const items = timelineRef.current.children
      if (items.length === 0) return

      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 85%',
            once: true,
            // once the section has already been seen, filter switches
            // should animate immediately without waiting to scroll again
            refreshPriority: -1,
          },
        },
      )
    },
    { dependencies: [filter], scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-16 md:px-8 md:py-20 lg:px-12"
    >
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span ref={eyebrowLineRef} className="h-px w-8 bg-accent" />
              <span
                ref={eyebrowTextRef}
                className="font-mono text-sm tracking-widest text-accent"
              >
                BACKGROUND
              </span>
            </div>

            <h2
              ref={headingRef}
              className="font-display text-6xl leading-[1.05] tracking-tight md:text-7xl md:leading-[0.85]"
            >
              EXPERIENCE &amp; <span className="text-outline">EDUCATION</span>
            </h2>
          </div>

          <div ref={filterTabsRef}>
            <FilterTabs options={FILTERS} active={filter} onChange={setFilter} />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div ref={timelineRef} className="lg:col-span-2">
            {filteredItems.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                isLast={index === filteredItems.length - 1}
              />
            ))}
          </div>

          <div ref={sidebarRef}>
            <ExperienceSidebar />
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Experience