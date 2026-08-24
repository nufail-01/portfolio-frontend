import { motion } from "framer-motion";
import Container from "../../ui/layout-primitives/Container";
import DriftWall from "../../ui/gallery/DriftWall";
import { CERTIFICATIONS } from "../../../constants/certifications/certifications";

const lineGrow = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeX = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const headerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const Certifications = () => {
  const driftItems = CERTIFICATIONS.map((certification) => ({
    image: certification.image,
    title: certification.title,
    // href intentionally omitted — clicking a certificate tile should not navigate
  }));

  return (
    <section className="relative overflow-hidden py-16 md:px-8 md:py-20 lg:px-12">
      <Container>
        <motion.div
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.75 }}
        >
          {/* Section Label */}
          <div className="mb-6 flex items-center gap-3">
            <motion.span
              variants={lineGrow}
              style={{ transformOrigin: "left" }}
              className="h-px w-8 bg-accent"
            />

            <motion.span
              variants={fadeX}
              className="font-mono text-sm tracking-widest text-accent"
            >
              CREDENTIALS
            </motion.span>
          </div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-6xl leading-[1.05] tracking-tight md:text-7xl md:leading-[0.85]"
          >
            CERTIFICATIONS
          </motion.h1>
        </motion.div>

        {/* Certificates */}
        {CERTIFICATIONS.length === 0 ? (
          <p className="mt-16 font-mono text-sm text-text-muted">
            No certifications added yet.
          </p>
        ) : (
          <motion.div
            className="
              mt-16
              h-[700px]
              w-full
              overflow-hidden
              md:h-[760px]
            "
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          >
            <DriftWall
              items={driftItems}
              columns={3}
              tileWidth={380}
              tileHeight={250}
              gap={28}
              tilt={0}
              turn={0}
              roll={0}
              perspective={1200}
              depth={0}
              speed={38}
              direction="up"
              variance={0}
              parallax={0}
              lift={1.025}
              fade={0.6}
              dim={0.25}
              overlayColor="#0a0a0a"
            />
          </motion.div>
        )}
      </Container>
    </section>
  );
};

export default Certifications;