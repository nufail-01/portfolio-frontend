// import Container from '../../ui/layout-primitives/Container'
// import ProjectCard from './ProjectCard'
// import { PROJECTS } from "../../../constants/projects/projects";
// import { Link } from "react-router-dom";

// const Projects = () => {
//   return (
//     // old
//     // <section id="projects" className="py-32">
//       // new
//       <section id="projects" className="py-16 md:px-8 md:py-20 lg:px-12">
//       <Container>
//         <div className="flex items-end justify-between gap-8">
//           <div>
//             <p className="mb-4 font-mono text-sm tracking-wide text-accent">
//               SELECTED WORK
//             </p>

//             <h2 className="font-display text-6xl leading-[0.85] tracking-tight md:text-7xl">
//               FEATURED <span className="text-outline">PROJECTS</span>
//             </h2>
//           </div>

//           <Link
//             to="/projects"
//             className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 font-mono text-sm tracking-wide text-text-primary transition-colors hover:border-accent/50"
//           >
//             VIEW ALL PROJECTS
//             <span aria-hidden="true">→</span>
//           </Link>
//         </div>

//         <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-16 lg:grid-cols-2">
//           {PROJECTS.map((project) => (
//             <ProjectCard key={project.title} project={project} />
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default Projects;


import { useState, useEffect } from 'react'
import Container from '../../ui/layout-primitives/Container'
import ProjectCard from './ProjectCard'
import { fetchProjects } from '../../../lib/api/projectsService'
import { Link } from 'react-router-dom'

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
        <div className="flex items-end justify-between gap-8">
          <div>
            <p className="mb-4 font-mono text-sm tracking-wide text-accent">
              SELECTED WORK
            </p>

            <h2 className="font-display text-6xl leading-[0.85] tracking-tight md:text-7xl">
              FEATURED <span className="text-outline">PROJECTS</span>
            </h2>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 font-mono text-sm tracking-wide text-text-primary transition-colors hover:border-accent/50"
          >
            VIEW ALL PROJECTS
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {loading && (
          <p className="mt-16 font-mono text-sm text-text-muted">Loading projects...</p>
        )}

        {error && (
          <p className="mt-16 font-mono text-sm text-red-400">{error}</p>
        )}

        {!loading && !error && (
          <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-16 lg:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}

export default Projects