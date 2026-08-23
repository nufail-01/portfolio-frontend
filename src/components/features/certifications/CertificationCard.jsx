const CertificationCard = ({ certification }) => {
  const { title, issuer, date, credentialUrl, image } = certification;

  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent/50">
      <div className="aspect-video w-full overflow-hidden bg-bg">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <p className="font-mono text-xs tracking-wide text-accent">
          {issuer} · {date}
        </p>

        <h3 className="mt-2 font-display text-2xl leading-tight text-text-primary">
          {title}
        </h3>

        {credentialUrl && (
          <a
            href={credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 font-mono text-sm text-text-muted transition-colors hover:text-accent"
          >
            View Credential
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default CertificationCard;