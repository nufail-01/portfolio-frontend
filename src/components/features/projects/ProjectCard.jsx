// import TechPill from '../../ui/tags/TechPill'
// import StatusBadge from '../../ui/badges/StatusBadge'

// const ProjectCard = ({ project }) => {
//   const { title, description, image, link, tags, category, year } = project

//   return (
//     <div>
//       <a
//         href={link}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="group relative block overflow-hidden rounded-2xl border border-border"
//       >
//         <img
//           src={image}
//           alt={title}
//           className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
//         />

//         {year && (
//           <span className="absolute left-4 top-4 rounded-md border border-white/20 bg-black/50 px-3 py-1.5 font-mono text-xs text-white backdrop-blur-sm">
//             {year}
//           </span>
//         )}

//         {category && (
//           <StatusBadge
//             category={category}
//             className="absolute right-4 top-4"
//           />
//         )}
//       </a>

//       <div className="mt-6 flex items-start justify-between gap-4">
//         <h3 className="font-display text-2xl">{title}</h3>

//         <a
//           href={link}
//           target="_blank"
//           rel="noopener noreferrer"
//           aria-label={`Open ${title}`}
//           className="mt-1 text-text-muted transition-colors hover:text-accent"
//         >
//           ↗
//         </a>
//       </div>

//       <p className="mt-2 max-w-md text-text-muted">{description}</p>

//       <div className="mt-4 flex flex-wrap gap-2">
//         {tags.map((tag) => (
//           <TechPill key={tag}>{tag}</TechPill>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default ProjectCard


import TechPill from '../../ui/tags/TechPill'
import StatusBadge from '../../ui/badges/StatusBadge'

const ProjectCard = ({ project }) => {
  const { title, description, image, link, tags = [], category, year } = project

  // Add protocol if the link doesn't already have one.
  const safeLink =
    link && !/^https?:\/\//i.test(link) ? `https://${link}` : link

  return (
    <div>
      <a
        href={safeLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block overflow-hidden rounded-2xl border border-border"
      >
        <img
          src={image}
          alt={title}
          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

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

      <div className="mt-6 flex items-start justify-between gap-4">
        <h3 className="font-display text-2xl">{title}</h3>

        <a
          href={safeLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${title}`}
          className="mt-1 text-text-muted transition-colors hover:text-accent"
        >
          ↗
        </a>
      </div>

      <p className="mt-2 max-w-md text-text-muted">{description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <TechPill key={tag}>{tag}</TechPill>
        ))}
      </div>
    </div>
  )
}

export default ProjectCard