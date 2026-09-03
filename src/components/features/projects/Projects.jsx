import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Container from '../../ui/layout-primitives/Container'
import ProjectCard from './ProjectCard'
import { fetchProjects } from '../../../lib/api/projectsService'
import { Link } from 'react-router-dom'

const lineGrow = {
  hidden: { opacity: 0, scaleX: 0 },
  show: { opacity: 1, scaleX: 1, transition: { duration: 0.3, ease: 'easeOut' } },
}

const fadeX = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const headerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
}

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects()
        setProjects(data.slice(0, 4)) // show only first 4 on homepage preview
      } catch (err) {
        setError('Failed to load projects.')
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  return (
    <section id="projects" className="py-16 md:px-8 md:py-20 lg:px-12">
      <Container>
        <motion.div
          className="flex items-end justify-between gap-8"
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.75 }}
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <motion.span
                variants={lineGrow}
                style={{ transformOrigin: 'left' }}
                className="h-px w-8 bg-accent"
              />
              <motion.p
                variants={fadeX}
                className="font-mono text-sm tracking-wide text-accent"
              >
                SELECTED WORK
              </motion.p>
            </div>

            {/* <motion.h2
              variants={fadeUp}
              className="font-display text-6xl leading-[1.05] tracking-tight md:text-7xl md:leading-[0.85]"
            >
              FEATURED <span className="text-outline">PROJECTS</span>
            </motion.h2> */}
            <motion.h2
  variants={fadeUp}
  className="font-display text-6xl leading-[1.05] tracking-tight md:text-7xl md:leading-[0.85]"
>
  FEATURED <span className="text-outline">PROJECTS</span>
  <span className="sr-only"> — Developer Portfolio Projects</span>
</motion.h2>
          </div>

          <motion.div variants={fadeUp}>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 font-mono text-sm tracking-wide text-text-primary transition-colors hover:border-accent/50"
            >
              VIEW ALL PROJECTS
              <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </motion.div>

        {loading && (
          <p className="mt-16 font-mono text-sm text-text-muted">Loading projects...</p>
        )}

        {error && (
          <p className="mt-16 font-mono text-sm text-red-400">{error}</p>
        )}

        {!loading && !error && (
          <motion.div
            className="mt-16 grid grid-cols-1 gap-x-10 gap-y-16 lg:grid-cols-2"
            variants={cardContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {projects.map((project) => (
              <motion.div key={project.id} variants={fadeUp}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </Container>
    </section>
  )
}

export default Projects