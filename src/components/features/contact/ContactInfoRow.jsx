const ContactInfoRow = ({ label, value, href }) => {
  return (
    <a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="group flex items-center justify-between border-b border-border py-5 transition-colors hover:border-accent/40"
    >
      <span className="font-mono text-xs tracking-widest text-text-muted">
        {label.toUpperCase()}
      </span>

      <span className="flex items-center gap-2 font-mono text-sm text-text-primary transition-colors group-hover:text-accent">
        {value}
        <span aria-hidden="true">↗</span>
      </span>
    </a>
  )
}

export default ContactInfoRow