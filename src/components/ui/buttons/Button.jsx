// import { Link } from 'react-router-dom'

// const Button = ({ children, href = '#', variant = 'primary', className = '', isRoute = false }) => {
//   const base =
//     'inline-flex items-center gap-2 rounded-md px-5 py-3 font-mono text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5'

//   const variants = {
//     primary: 'bg-accent text-bg hover:bg-accent/90',
//     ghost: 'border border-border text-text-primary hover:border-accent/50',
//   }

//   // 'brutalist' skips the shared `base`/`variants` styling above and relies
//   // entirely on the .btn-brutalist CSS in index.css (offset shadow, shine
//   // sweep, and press-in effect — can't be expressed as plain utilities).
//   if (variant === 'brutalist') {
//     const classes = `btn-brutalist ${className}`
//     const content = (
//       <span className="btn-brutalist-text">
//         {children}
//         <span aria-hidden="true" className="ml-2">→</span>
//       </span>
//     )

//     if (isRoute) {
//       return (
//         <Link to={href} className={classes}>
//           {content}
//         </Link>
//       )
//     }

//     return (
//       <a href={href} className={classes}>
//         {content}
//       </a>
//     )
//   }

//   const classes = `${base} ${variants[variant]} ${className}`
//   const content = (
//     <>
//       {children}
//       <span aria-hidden="true">→</span>
//     </>
//   )

//   if (isRoute) {
//     return (
//       <Link to={href} className={classes}>
//         {content}
//       </Link>
//     )
//   }

//   return (
//     <a href={href} className={classes}>
//       {content}
//     </a>
//   )
// }

// export default Button

import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

const Button = ({
  children,
  href = '#',
  variant = 'primary',
  className = '',
  isRoute = false,
}) => {
  const base =
    'inline-flex items-center gap-2 rounded-md px-5 py-3 font-mono text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5'

  const variants = {
    primary: 'bg-accent text-bg hover:bg-accent/90',
    ghost: 'border border-border text-text-primary hover:border-accent/50',
  }

  if (variant === 'brutalist') {
    const classes = `btn-brutalist ${className}`

    const content = (
      <span className="btn-brutalist-text inline-flex items-center gap-2">
        <span>{children}</span>

        <span className="relative inline-flex h-[18px] w-[18px] overflow-hidden">
          <ArrowRight
            aria-hidden="true"
            size={18}
            strokeWidth={1.8}
            className="absolute inset-0 transition-all duration-300 ease-out group-hover:translate-x-5 group-hover:opacity-0"
          />

          <ArrowUpRight
            aria-hidden="true"
            size={18}
            strokeWidth={1.8}
            className="absolute inset-0 -translate-x-5 translate-y-1 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
          />
        </span>
      </span>
    )

    if (isRoute) {
      return (
        <Link to={href} className={`group ${classes}`}>
          {content}
        </Link>
      )
    }

    return (
      <a href={href} className={`group ${classes}`}>
        {content}
      </a>
    )
  }

  const classes = `${base} ${variants[variant]} ${className}`

  const content = <>{children}</>

  if (isRoute) {
    return (
      <Link to={href} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <a href={href} className={classes}>
      {content}
    </a>
  )
}

export default Button