// import { useState, useMemo } from 'react'
// import Navbar from '../../components/layout/navbar/Navbar'
// import Footer from '../../components/layout/footer/Footer'
// import Contact from '../../components/features/contact/Contact'
// import Container from '../../components/ui/layout-primitives/Container'
// import ProjectCard from '../../components/features/projects/ProjectCard'
// import FilterTabs from '../../components/ui/navigation/FilterTabs'
// import { PROJECTS, PROJECT_CATEGORIES } from '../../constants/projects/projects'
// import { fetchProjects } from '../../lib/api/projectsService'

// const ProjectsPage = () => {
//   const [filter, setFilter] = useState('all')

//   const filteredProjects = useMemo(() => {
//     if (filter === 'all') return PROJECTS
//     return PROJECTS.filter((project) => project.category === filter)
//   }, [filter])

//   return (
//     <>
//       <Navbar />

//       {/* <section className="py-16"> */}
//       <section className="py-16 md:px-8 md:py-20 lg:px-12">
//         <Container>
//           <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
//             <div>
//               <div className="mb-6 flex items-center gap-3">
//                 <span className="h-px w-8 bg-accent" />
//                 <span className="font-mono text-sm tracking-widest text-accent">WORK</span>
//               </div>

//               <h1 className="font-display text-6xl leading-[1.05] tracking-tight md:text-7xl md:leading-[0.85]">
//                 ALL <span className="text-outline">PROJECTS</span>
//               </h1>
//             </div>

//             <FilterTabs options={PROJECT_CATEGORIES} active={filter} onChange={setFilter} />
//           </div>

//           <p className="mt-12 font-mono text-sm tracking-widest text-text-muted">
//             {filteredProjects.length} PROJECT{filteredProjects.length !== 1 ? 'S' : ''}
//           </p>

//           <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-16 lg:grid-cols-2">
//             {filteredProjects.map((project) => (
//               <ProjectCard key={project.title} project={project} />
//             ))}
//           </div>
//         </Container>
//       </section>

//       <Contact />
//       <Footer />
//     </>
//   )
// }

// export default ProjectsPage



import { useState, useEffect, useMemo } from 'react'
import Navbar from '../../components/layout/navbar/Navbar'
import Footer from '../../components/layout/footer/Footer'
import Contact from '../../components/features/contact/Contact'
import Container from '../../components/ui/layout-primitives/Container'
import ProjectCard from '../../components/features/projects/ProjectCard'
import FilterTabs from '../../components/ui/navigation/FilterTabs'
import { PROJECT_CATEGORIES } from '../../constants/projects/projects'
import { fetchProjects } from '../../lib/api/projectsService'

const ProjectsPage = () => {
  const [filter, setFilter] = useState('all')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects()
        setProjects(data)
      } catch (err) {
        setError('Failed to load projects.')
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return projects
    return projects.filter((project) => project.category === filter)
  }, [filter, projects])

  return (
    <>
      <Navbar />

      <section className="py-16 md:px-8 md:py-20 lg:px-12">
        <Container>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-accent" />
                <span className="font-mono text-sm tracking-widest text-accent">WORK</span>
              </div>

              <h1 className="font-display text-6xl leading-[1.05] tracking-tight md:text-7xl md:leading-[0.85]">
                ALL <span className="text-outline">PROJECTS</span>
              </h1>
            </div>

            <FilterTabs options={PROJECT_CATEGORIES} active={filter} onChange={setFilter} />
          </div>

          {loading && (
            <p className="mt-12 font-mono text-sm text-text-muted">Loading projects...</p>
          )}

          {error && (
            <p className="mt-12 font-mono text-sm text-red-400">{error}</p>
          )}

          {!loading && !error && (
            <>
              <p className="mt-12 font-mono text-sm tracking-widest text-text-muted">
                {filteredProjects.length} PROJECT{filteredProjects.length !== 1 ? 'S' : ''}
              </p>

              <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-16 lg:grid-cols-2">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </>
          )}
        </Container>
      </section>

      <Contact />
      <Footer />
    </>
  )
}

export default ProjectsPage