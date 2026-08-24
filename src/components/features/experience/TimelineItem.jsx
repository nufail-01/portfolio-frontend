// import { useState } from 'react'

// const TYPE_STYLES = {
//   work: 'text-accent',
//   education: 'text-blue-400',
// }

// const DOT_STYLES = {
//   work: 'bg-accent border-accent/40',
//   education: 'bg-blue-400 border-blue-400/40',
// }

// const TimelineItem = ({ item, isLast }) => {
//   const [expanded, setExpanded] = useState(false)
//   const { type, title, org, date, location, description } = item

//   return (
//     <div className="relative pl-10">
//       {/* Timeline line + dot */}
//       <span
//         className={`absolute left-0 top-2 flex h-4 w-4 items-center justify-center rounded-full border-2 ${DOT_STYLES[type]}`}
//       >
//         <span className="h-1.5 w-1.5 rounded-full bg-current" />
//       </span>
//       {!isLast && (
//         <span className="absolute left-[7px] top-6 h-[calc(100%+2rem)] w-px bg-border" />
//       )}

//       {/* Card */}
//       <div className="mb-8 border border-border p-6 md:p-8">
//         <div className="flex flex-col justify-between gap-2 md:flex-row md:items-start">
//           <div>
//             <span className={`inline-flex items-center gap-2 font-mono text-xs tracking-widest ${TYPE_STYLES[type]}`}>
//               <span className="h-1.5 w-1.5 rounded-full bg-current" />
//               {type.toUpperCase()}
//             </span>

//             <h3 className="mt-3 font-display text-2xl md:text-3xl">{title}</h3>
//             <p className="mt-1 font-mono text-sm text-text-muted">{org}</p>
//           </div>

//           <div className="flex flex-col items-start gap-1 md:items-end">
//             <span className="font-mono text-xs tracking-wide text-text-muted">{date}</span>
//             <span className="font-mono text-xs tracking-wide text-text-muted">{location}</span>
//           </div>
//         </div>

//         {description && (
//           <>
//             <button
//               onClick={() => setExpanded((prev) => !prev)}
//               aria-expanded={expanded}
//               aria-label={expanded ? 'Collapse details' : 'Expand details'}
//               className="mt-4 flex h-8 w-8 items-center justify-center rounded-md border border-border text-text-muted transition-colors hover:border-accent/50 hover:text-text-primary"
//             >
//               {expanded ? '−' : '+'}
//             </button>

//             {expanded && (
//               <p className="mt-4 max-w-2xl text-text-muted">{description}</p>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   )
// }

// export default TimelineItem


import { useState, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const TYPE_STYLES = {
  work: 'text-accent',
  education: 'text-blue-400',
}

const DOT_STYLES = {
  work: 'bg-accent border-accent/40',
  education: 'bg-blue-400 border-blue-400/40',
}

const TimelineItem = ({ item, isLast }) => {
  const [expanded, setExpanded] = useState(false)
  const { type, title, org, date, location, description } = item

  const wrapperRef = useRef(null)
  const contentRef = useRef(null)
  const iconRef = useRef(null)

  useGSAP(() => {
    const wrapper = wrapperRef.current
    const content = contentRef.current
    if (!wrapper || !content) return

    if (expanded) {
      // measure natural height, then animate wrapper to it
      const height = content.offsetHeight
      gsap.fromTo(
        wrapper,
        { height: 0, opacity: 0 },
        {
          height,
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out',
          onComplete: () => {
            gsap.set(wrapper, { height: 'auto' })
          },
        },
      )
    } else {
      gsap.to(wrapper, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in',
      })
    }

    gsap.to(iconRef.current, {
      rotate: expanded ? 45 : 0,
      duration: 0.3,
      ease: 'power3.out',
    })
  }, [expanded])

  return (
    <div className="relative pl-10">
      {/* Timeline line + dot */}
      <span
        className={`absolute left-0 top-2 flex h-4 w-4 items-center justify-center rounded-full border-2 ${DOT_STYLES[type]}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
      </span>
      {!isLast && (
        <span className="absolute left-[7px] top-6 h-[calc(100%+2rem)] w-px bg-border" />
      )}

      {/* Card */}
      <div className="mb-8 border border-border p-6 md:p-8">
        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 font-mono text-xs tracking-widest ${TYPE_STYLES[type]}`}>
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {type.toUpperCase()}
            </span>

            <h3 className="mt-3 font-display text-2xl md:text-3xl">{title}</h3>
            <p className="mt-1 font-mono text-sm text-text-muted">{org}</p>
          </div>

          <div className="flex flex-col items-start gap-1 md:items-end">
            <span className="font-mono text-xs tracking-wide text-text-muted">{date}</span>
            <span className="font-mono text-xs tracking-wide text-text-muted">{location}</span>
          </div>
        </div>

        {description && (
          <>
            <button
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              aria-label={expanded ? 'Collapse details' : 'Expand details'}
              className="mt-4 flex h-8 w-8 items-center justify-center rounded-md border border-border text-text-muted transition-colors hover:border-accent/50 hover:text-text-primary"
            >
              <span ref={iconRef} className="inline-block">+</span>
            </button>

            <div ref={wrapperRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
              <p ref={contentRef} className="mt-4 max-w-2xl text-text-muted">
                {description}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default TimelineItem