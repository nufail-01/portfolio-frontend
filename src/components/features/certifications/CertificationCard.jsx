import { motion } from "framer-motion";

const CertificationCard = ({ certification }) => {
  const { title, issuer, date, credentialUrl, image } = certification;

  return (
    <motion.div
      className="group overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent/50"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="aspect-video w-full overflow-hidden bg-bg">
        <motion.img
          src={image}
          alt={title}
          initial="rest"
          whileHover="hover"
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.06 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full w-full object-cover"
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
          <motion.a
            href={credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="mt-4 inline-flex items-center gap-2 font-mono text-sm text-text-muted transition-colors hover:text-accent"
          >
            View Credential
            <motion.span
              aria-hidden="true"
              variants={{
                rest: { x: 0, y: 0 },
                hover: { x: 3, y: -3 },
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="inline-block"
            >
              ↗
            </motion.span>
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

export default CertificationCard;