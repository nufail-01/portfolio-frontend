import { motion } from "framer-motion";
import Container from "../../ui/layout-primitives/Container";
import Button from "../../ui/buttons/Button";
import { CONTACT_DETAILS } from "../../../constants/contact/contactInfo";
import Magnet from '../../ui/effects/Magnet' // adjust path to wherever you saved Magnet.jsx

const lineGrow = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeX = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const headerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-16 md:px-8 md:py-20 lg:px-12"
    >
      <Container>
        {/* Eyebrow */}
        <motion.div
          className="mb-6 flex items-center gap-3"
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.75 }}
        >
          <motion.span
            variants={lineGrow}
            style={{ transformOrigin: "left" }}
            className="h-px w-8 bg-accent"
          />

          <motion.p
            variants={fadeX}
            className="font-mono text-sm tracking-wide text-accent"
          >
            LET'S WORK TOGETHER
          </motion.p>
        </motion.div>

        {/* Heading with inline circular CTA */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-display text-6xl leading-[1.1] tracking-tight md:text-7xl md:leading-[0.95] lg:text-8xl"
        >
          READY TO TAKE YOUR
          <br />

          {/* <span className="inline-flex items-center gap-8">
            IDEA TO

            <motion.a
              href={`mailto:${CONTACT_DETAILS.email}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-32 w-32 shrink-0 flex-col items-center justify-center rounded-full bg-accent font-mono text-sm font-medium text-bg md:h-36 md:w-36"
            >
              <span
                aria-hidden="true"
                className="text-lg"
              >
                ↗
              </span>

              Start Project
            </motion.a>
          </span> */}

          <span className="inline-flex items-center gap-8">
  IDEA TO
 
  <Magnet padding={60} magnetStrength={6}>
    <motion.a
      href={`mailto:${CONTACT_DETAILS.email}`}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      className="flex h-32 w-32 shrink-0 flex-col items-center justify-center rounded-full bg-accent text-center font-mono text-sm font-medium leading-relaxed tracking-wide text-bg md:h-36 md:w-36"
    >
      <span>Start</span>
      <span>Project</span>
    </motion.a>
  </Magnet>
</span>

          <br />

          <span className="text-outline">
            THE NEXT LEVEL?
          </span>
        </motion.h2>

        {/* Tagline + email */}
        <motion.div
          className="mt-16 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <p className="max-w-sm text-lg text-text-muted">
            {CONTACT_DETAILS.tagline}
          </p>

          <Button
            href={`mailto:${CONTACT_DETAILS.email}`}
            variant="brutalist"
          >
            {CONTACT_DETAILS.email}
          </Button>
        </motion.div>
      </Container>
    </section>
  );
};

export default Contact;