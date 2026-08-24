import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Container from '../../ui/layout-primitives/Container'
import SkillTag from '../../ui/tags/SkillTag'
import { fetchSkills } from '../../../lib/api/skillsService'

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

const markerPop = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

const headerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const cardContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
}

const Skills = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const data = await fetchSkills()
        setCategories(data)
      } catch (err) {
        setError('Failed to load skills.')
      } finally {
        setLoading(false)
      }
    }

    loadSkills()
  }, [])

  return (
    <section id="skills" className="py-16 md:px-8 md:py-20 lg:px-12">
      <Container>
        <motion.div
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.75 }}
        >
          {/* Eyebrow */}
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
              EXPERTISE
            </motion.span>
          </div>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="font-display text-6xl leading-[1.05] tracking-tight md:text-7xl md:leading-[0.85]"
          >
            MY <span className="text-outline">SKILLS</span>
          </motion.h2>

          {/* Center marker: pulsing dot + "MY SKILLS" badge */}
          <div className="mt-16 flex flex-col items-center gap-8">
            <motion.span
              variants={markerPop}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/40"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            </motion.span>

            <motion.span
              variants={markerPop}
              className="rounded-md border border-accent/50 bg-accent/10 px-8 py-3 font-mono text-sm tracking-widest text-accent"
            >
              MY SKILLS
            </motion.span>
          </div>
        </motion.div>

        {loading && (
          <p className="mt-16 text-center font-mono text-sm text-text-muted">
            Loading skills...
          </p>
        )}

        {error && (
          <p className="mt-16 text-center font-mono text-sm text-red-400">
            {error}
          </p>
        )}

        {!loading && !error && (
          <motion.div
            className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
            variants={cardContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {categories.map((category) => (
              <motion.div key={category.title} variants={fadeUp}>
                <div className="border border-border py-3 text-center font-mono text-sm tracking-widest text-text-primary">
                  {category.title.toUpperCase()}
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <SkillTag key={skill}>{skill}</SkillTag>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </Container>
    </section>
  )
}

export default Skills