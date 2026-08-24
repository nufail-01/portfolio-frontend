import { motion } from 'framer-motion'

const WorkPrincipleCard = ({ number, title, description }) => {
  return (
    <motion.div
      className="border border-border p-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      whileHover={{ y: -4, borderColor: 'var(--color-accent)' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <p className="font-mono text-sm text-accent">{number}</p>
      <h3 className="mt-4 font-display text-2xl">{title}</h3>
      <p className="mt-3 text-text-muted">{description}</p>
    </motion.div>
  )
}

export default WorkPrincipleCard