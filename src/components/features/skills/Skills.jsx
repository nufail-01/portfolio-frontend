import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Container from '../../ui/layout-primitives/Container'
import SkillTag from '../../ui/tags/SkillTag'
import { fetchSkills } from '../../../lib/api/skillsService'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Skills = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const sectionRef = useRef(null)
  const eyebrowLineRef = useRef(null)
  const eyebrowTextRef = useRef(null)
  const headingRef = useRef(null)
  const markerDotRef = useRef(null)
  const markerBadgeRef = useRef(null)
  const gridRef = useRef(null)

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

  // Header + marker — same timeline shape/easing as Hero, triggered on scroll instead of mount
  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })

      tl.fromTo(
        eyebrowLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, transformOrigin: 'left' },
      )
        .from(
          eyebrowTextRef.current,
          { opacity: 0, x: -10, duration: 0.4 },
          '<0.1',
        )
        .from(headingRef.current, { opacity: 0, y: 20, duration: 0.6 }, '-=0.2')
        .from(
          markerDotRef.current,
          { opacity: 0, y: 10, scale: 0.9, duration: 0.5 },
          '-=0.2',
        )
        .from(
          markerBadgeRef.current,
          { opacity: 0, y: 10, scale: 0.9, duration: 0.5 },
          '-=0.3',
        )
    },
    { scope: sectionRef },
  )

  // Category cards — same stagger fade/slide-up as Hero's stats row
  useGSAP(
    () => {
      if (loading || error || categories.length === 0) return
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
    { dependencies: [loading, error, categories], scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-16 md:px-8 md:py-20 lg:px-12"
    >
      <Container>
        {/* Eyebrow */}
        <div className="mb-6 flex items-center gap-3">
          <span ref={eyebrowLineRef} className="h-px w-8 bg-accent" />
          <span
            ref={eyebrowTextRef}
            className="font-mono text-sm tracking-widest text-accent"
          >
            EXPERTISE
          </span>
        </div>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-display text-6xl leading-[1.05] tracking-tight md:text-7xl md:leading-[0.85]"
        >
          MY <span className="text-outline">SKILLS</span>
        </h2>

        {/* Center marker: pulsing dot + "MY SKILLS" badge */}
        <div className="mt-16 flex flex-col items-center gap-8">
          <span
            ref={markerDotRef}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/40"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          </span>

          <span
            ref={markerBadgeRef}
            className="rounded-md border border-accent/50 bg-accent/10 px-8 py-3 font-mono text-sm tracking-widest text-accent"
          >
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
          <div
            ref={gridRef}
            className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
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