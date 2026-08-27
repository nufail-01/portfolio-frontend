// const StatCard = ({ value, label }) => {
//   return (
//     <div className="border border-border p-6">
//       <p className="font-display text-4xl text-text-primary">{value}</p>
//       <p className="mt-2 font-mono text-xs tracking-wide text-text-muted">{label}</p>
//     </div>
//   )
// }

// export default StatCard


import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const StatCard = ({ value, label }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState(0)

  // Split the raw value into a numeric portion and a trailing suffix,
  // e.g. "10+" -> number: 10, suffix: "+". Values with no leading
  // number (like "∞") won't match and are just shown as-is.
  const match = /^(\d+)(.*)$/.exec(value)
  const target = match ? parseInt(match[1], 10) : null
  const suffix = match ? match[2] : ''

  useEffect(() => {
    if (!isInView || target === null) return

    const duration = 1400 // ms
    const start = performance.now()

    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic so the count decelerates into its final value
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * target))

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    const frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isInView, target])

  const shown = target === null ? value : `${display}${suffix}`

  return (
    <div ref={ref} className="border border-border p-6">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="font-display text-4xl text-text-primary"
      >
        {shown}
      </motion.p>
      <p className="mt-2 font-mono text-xs tracking-wide text-text-muted">{label}</p>
    </div>
  )
}

export default StatCard