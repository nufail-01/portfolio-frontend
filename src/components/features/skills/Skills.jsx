// import Container from '../../ui/layout-primitives/Container'
// import SkillTag from '../../ui/tags/SkillTag'
// import { SKILL_CATEGORIES } from '../../../constants/skills/skills'

// const Skills = () => {
//   return (
//     // old
//     // <section id="skills" className="py-32">
//     // new 
// <section id="skills" className="py-16 md:px-8 md:py-20 lg:px-12">
//      <Container>
//         {/* Eyebrow */}
//         <div className="mb-6 flex items-center gap-3">
//           <span className="h-px w-8 bg-accent" />
//           <span className="font-mono text-sm tracking-widest text-accent">
//             EXPERTISE
//           </span>
//         </div>

//         {/* Heading */}
//         <h2 className="font-display text-6xl leading-[1.05] tracking-tight md:text-7xl md:leading-[0.85]">
//           MY <span className="text-outline">SKILLS</span>
//         </h2>

//         {/* Center marker: pulsing dot + "MY SKILLS" badge */}
//         <div className="mt-16 flex flex-col items-center gap-8">
//           <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/40">
//             <span className="h-2.5 w-2.5 rounded-full bg-accent" />
//           </span>

//           <span className="rounded-md border border-accent/50 bg-accent/10 px-8 py-3 font-mono text-sm tracking-widest text-accent">
//             MY SKILLS
//           </span>
//         </div>

//         {/* Category columns */}
//         <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
//           {SKILL_CATEGORIES.map((category) => (
//             <div key={category.title}>
//               <div className="border border-border py-3 text-center font-mono text-sm tracking-widest text-text-primary">
//                 {category.title.toUpperCase()}
//               </div>

//               <div className="mt-4 flex flex-wrap gap-3">
//                 {category.skills.map((skill) => (
//                   <SkillTag key={skill}>{skill}</SkillTag>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </Container>
//     </section>
//   )
// }

// export default Skills


import { useState, useEffect } from 'react'
import Container from '../../ui/layout-primitives/Container'
import SkillTag from '../../ui/tags/SkillTag'
import { fetchSkills } from '../../../lib/api/skillsService'

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
        {/* Eyebrow */}
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-accent" />
          <span className="font-mono text-sm tracking-widest text-accent">
            EXPERTISE
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-display text-6xl leading-[1.05] tracking-tight md:text-7xl md:leading-[0.85]">
          MY <span className="text-outline">SKILLS</span>
        </h2>

        {/* Center marker: pulsing dot + "MY SKILLS" badge */}
        <div className="mt-16 flex flex-col items-center gap-8">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/40">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          </span>

          <span className="rounded-md border border-accent/50 bg-accent/10 px-8 py-3 font-mono text-sm tracking-widest text-accent">
            MY SKILLS
          </span>
        </div>

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
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <div key={category.title}>
                <div className="border border-border py-3 text-center font-mono text-sm tracking-widest text-text-primary">
                  {category.title.toUpperCase()}
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <SkillTag key={skill}>{skill}</SkillTag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}

export default Skills