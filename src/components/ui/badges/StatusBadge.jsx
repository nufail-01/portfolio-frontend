// const STATUS_STYLES = {
//   product: 'bg-accent text-bg',
//   client: 'border border-white/30 bg-black/40 text-white backdrop-blur-sm',
//   ui: 'border border-white/30 bg-black/40 text-white backdrop-blur-sm',
// }

// const CATEGORY_LABELS = {
//   product: 'PRODUCT',
//   client: 'CLIENT WORK',
//   ui: 'UI DESIGN',
// }

// const StatusBadge = ({ category, className = '' }) => {
//   return (
//     <span
//       className={`inline-flex items-center rounded-md px-3 py-1.5 font-mono text-xs font-medium tracking-wide ${STATUS_STYLES[category]} ${className}`}
//     >
//       {CATEGORY_LABELS[category]}
//     </span>
//   )
// }

// export default StatusBadge
const CATEGORY_LABELS = {
  product: 'PRODUCT',
  client: 'CLIENT WORK',
  ui: 'UI DESIGN',
}

const StatusBadge = ({ category, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center rounded-md bg-accent px-3 py-1.5 font-mono text-xs font-medium tracking-wide text-bg ${className}`}
    >
      {CATEGORY_LABELS[category]}
    </span>
  )
}

export default StatusBadge