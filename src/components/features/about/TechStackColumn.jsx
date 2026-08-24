import { motion } from 'framer-motion'
import SkillTag from '../../ui/tags/SkillTag'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const tagContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
}

const tagItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const TechStackColumn = ({ title, skills }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.p
        variants={fadeUp}
        className="font-mono text-xs tracking-widest text-text-muted"
      >
        {title.toUpperCase()}
      </motion.p>
      <motion.div
        variants={tagContainer}
        className="mt-5 flex flex-wrap gap-3"
      >
        {skills.map((skill) => (
          <motion.div key={skill} variants={tagItem}>
            <SkillTag>{skill}</SkillTag>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default TechStackColumn