import { motion } from 'framer-motion'

const ContactInfoRow = ({ label, value, href }) => {
  return (
    <motion.a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group flex items-center justify-between border-b border-border py-5 transition-colors hover:border-accent/40"
    >
      <span className="font-mono text-xs tracking-widest text-text-muted">
        {label.toUpperCase()}
      </span>

      <span className="flex items-center gap-2 font-mono text-sm text-text-primary transition-colors group-hover:text-accent">
        {value}
        <motion.span
          aria-hidden="true"
          variants={{
            rest: { x: 0, y: 0 },
            hover: { x: 3, y: -3 },
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="inline-block"
        >
          ↗
        </motion.span>
      </span>
    </motion.a>
  )
}

export default ContactInfoRow