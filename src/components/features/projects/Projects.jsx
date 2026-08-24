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

//             <h2 className="font-display text-6xl leading-[1.05] tracking-tight md:text-7xl md:leading-[0.85]">
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


// import { useState, useEffect } from 'react'
// import Container from '../../ui/layout-primitives/Container'
// import ProjectCard from './ProjectCard'
// import { fetchProjects } from '../../../lib/api/projectsService'
// import { Link } from 'react-router-dom'

// const Projects = () => {
//   const [projects, setProjects] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const loadProjects = async () => {
//       try {
//         const data = await fetchProjects()
//         setProjects(data.slice(0, 4)) // show only first 4 on homepage preview
//       } catch (err) {
//         setError('Failed to load projects.')
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadProjects()
//   }, [])

//   return (
//     <section id="projects" className="py-16 md:px-8 md:py-20 lg:px-12">
//       <Container>
//         <div className="flex items-end justify-between gap-8">
//           <div>
//             <p className="mb-4 font-mono text-sm tracking-wide text-accent">
//               SELECTED WORK
//             </p>

//             <h2 className="font-display text-6xl leading-[1.05] tracking-tight md:text-7xl md:leading-[0.85]">
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

//         {loading && (
//           <p className="mt-16 font-mono text-sm text-text-muted">Loading projects...</p>
//         )}

//         {error && (
//           <p className="mt-16 font-mono text-sm text-red-400">{error}</p>
//         )}

//         {!loading && !error && (
//           <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-16 lg:grid-cols-2">
//             {projects.map((project) => (
//               <ProjectCard key={project.id} project={project} />
//             ))}
//           </div>
//         )}
//       </Container>
//     </section>
//   )
// }

// export default Projects



// import { useState, useEffect, useRef } from 'react'
// import gsap from 'gsap'
// import { useGSAP } from '@gsap/react'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import Container from '../../ui/layout-primitives/Container'
// import ProjectCard from './ProjectCard'
// import { fetchProjects } from '../../../lib/api/projectsService'
// import { Link } from 'react-router-dom'

// gsap.registerPlugin(useGSAP, ScrollTrigger)

// const Projects = () => {
//   const [projects, setProjects] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   const sectionRef = useRef(null)
//   const eyebrowRef = useRef(null)
//   const headingRef = useRef(null)
//   const linkRef = useRef(null)
//   const gridRef = useRef(null)

//   useEffect(() => {
//     const loadProjects = async () => {
//       try {
//         const data = await fetchProjects()
//         setProjects(data.slice(0, 4)) // show only first 4 on homepage preview
//       } catch (err) {
//         setError('Failed to load projects.')
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadProjects()
//   }, [])

//   // Header row — same rhythm as Hero/Skills, triggered on scroll
//   useGSAP(
//     () => {
//       gsap
//         .timeline({
//           defaults: { ease: 'power3.out' },
//           scrollTrigger: {
//             trigger: sectionRef.current,
//             start: 'top 75%',
//             once: true,
//           },
//         })
//         .from(eyebrowRef.current, { opacity: 0, x: -10, duration: 0.4 })
//         .from(headingRef.current, { opacity: 0, y: 20, duration: 0.6 }, '-=0.2')
//         .from(linkRef.current, { opacity: 0, y: 10, duration: 0.5 }, '-=0.3')
//     },
//     { scope: sectionRef },
//   )

//   // Project cards — stagger reveal once loaded and in view
//   useGSAP(
//     () => {
//       if (loading || error || projects.length === 0) return
//       if (!gridRef.current) return

//       gsap.fromTo(
//         gridRef.current.children,
//         { opacity: 0, y: 20 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.6,
//           stagger: 0.15,
//           ease: 'power3.out',
//           scrollTrigger: {
//             trigger: gridRef.current,
//             start: 'top 85%',
//             once: true,
//           },
//         },
//       )
//     },
//     { dependencies: [loading, error, projects], scope: sectionRef },
//   )

//   return (
//     <section
//       ref={sectionRef}
//       id="projects"
//       className="py-16 md:px-8 md:py-20 lg:px-12"
//     >
//       <Container>
//         <div className="flex items-end justify-between gap-8">
//           <div>
//             <p
//               ref={eyebrowRef}
//               className="mb-4 font-mono text-sm tracking-wide text-accent"
//             >
//               SELECTED WORK
//             </p>

//             <h2
//               ref={headingRef}
//               className="font-display text-6xl leading-[1.05] tracking-tight md:text-7xl md:leading-[0.85]"
//             >
//               FEATURED <span className="text-outline">PROJECTS</span>
//             </h2>
//           </div>

//           <Link
//             ref={linkRef}
//             to="/projects"
//             className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 font-mono text-sm tracking-wide text-text-primary transition-colors hover:border-accent/50"
//           >
//             VIEW ALL PROJECTS
//             <span aria-hidden="true">→</span>
//           </Link>
//         </div>

//         {loading && (
//           <p className="mt-16 font-mono text-sm text-text-muted">Loading projects...</p>
//         )}

//         {error && (
//           <p className="mt-16 font-mono text-sm text-red-400">{error}</p>
//         )}

//         {!loading && !error && (
//           <div
//             ref={gridRef}
//             className="mt-16 grid grid-cols-1 gap-x-10 gap-y-16 lg:grid-cols-2"
//           >
//             {projects.map((project) => (
//               <ProjectCard key={project.id} project={project} />
//             ))}
//           </div>
//         )}
//       </Container>
//     </section>
//   )
// }

// export default Projects


import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Container from '../../ui/layout-primitives/Container'
import ProjectCard from './ProjectCard'
import { fetchProjects } from '../../../lib/api/projectsService'
import { Link } from 'react-router-dom'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const sectionRef = useRef(null)
  const eyebrowLineRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headingRef = useRef(null)
  const linkRef = useRef(null)
  const gridRef = useRef(null)

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

  // Header row — same rhythm as Hero/Skills, triggered on scroll
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
        .from(eyebrowLineRef.current, { opacity: 0, scaleX: 0, transformOrigin: 'left', duration: 0.3 })
        .from(eyebrowRef.current, { opacity: 0, x: -10, duration: 0.4 }, '-=0.15')
        .from(headingRef.current, { opacity: 0, y: 20, duration: 0.6 }, '-=0.2')
        .from(linkRef.current, { opacity: 0, y: 10, duration: 0.5 }, '-=0.3')
    },
    { scope: sectionRef },
  )

  // Project cards — stagger reveal once loaded and in view
  useGSAP(
    () => {
      if (loading || error || projects.length === 0) return
      if (!gridRef.current) return

      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            once: true,
          },
        },
      )
    },
    { dependencies: [loading, error, projects], scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-16 md:px-8 md:py-20 lg:px-12"
    >
      <Container>
        <div className="flex items-end justify-between gap-8">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span ref={eyebrowLineRef} className="h-px w-8 bg-accent" />
              <p
                ref={eyebrowRef}
                className="font-mono text-sm tracking-wide text-accent"
              >
                SELECTED WORK
              </p>
            </div>

            <h2
              ref={headingRef}
              className="font-display text-6xl leading-[1.05] tracking-tight md:text-7xl md:leading-[0.85]"
            >
              FEATURED <span className="text-outline">PROJECTS</span>
            </h2>
          </div>

          <Link
            ref={linkRef}
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
          <div
            ref={gridRef}
            className="mt-16 grid grid-cols-1 gap-x-10 gap-y-16 lg:grid-cols-2"
          >
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