import { motion } from 'framer-motion'
import TechPill from '../../ui/tags/TechPill'
import StatusBadge from '../../ui/badges/StatusBadge'

const ProjectCard = ({ project }) => {
  const {
    title,
    description,
    image,
    link,
    tags = [],
    category,
    year,
  } = project

  // Add protocol if the link doesn't already have one.
  const safeLink =
    link && !/^https?:\/\//i.test(link)
      ? `https://${link}`
      : link

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Project Image */}
      <a
        href={safeLink}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block overflow-hidden rounded-2xl border border-border"
      >
        <div className="overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.06 },
            }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
            className="aspect-video w-full object-cover"
          />
        </div>

        {year && (
          <span className="absolute left-4 top-4 rounded-md border border-white/20 bg-black/50 px-3 py-1.5 font-mono text-xs text-white backdrop-blur-sm">
            {year}
          </span>
        )}

        {category && (
          <StatusBadge
            category={category}
            className="absolute right-4 top-4"
          />
        )}
      </a>

      {/* Project Title + External Link */}
      <div className="mt-6 flex items-start justify-between gap-4">
        <h3 className="font-display text-2xl">
          {title}
        </h3>

        <a
          href={safeLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${title}`}
          className="mt-1 text-text-muted transition-colors hover:text-accent"
        >
          <motion.span
            variants={{
              rest: { x: 0, y: 0 },
              hover: { x: 3, y: -3 },
            }}
            transition={{
              duration: 0.3,
              ease: 'easeOut',
            }}
            className="inline-block"
          >
            ↗
          </motion.span>
        </a>
      </div>

      {/* Description */}
      <p className="mt-2 max-w-md text-text-muted">
        {description}
      </p>

      {/* Technologies */}
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <TechPill key={tag}>{tag}</TechPill>
        ))}
      </div>
    </motion.div>
  )
}

export default ProjectCard