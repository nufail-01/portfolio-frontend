import { motion } from "framer-motion";
import Container from "../../ui/layout-primitives/Container";
import Badge from "../../ui/badges/Badge";
import StatCard from "../../ui/cards/StatCard";
import Button from "../../ui/buttons/Button";

import { ABOUT_STATS, ABOUT_CONTENT } from "../../../constants/about/about";

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

const About = () => {
  return (
    <section id="about" className="py-16 md:px-8 md:py-20 lg:px-12">
      <Container>
        {/* Eyebrow + heading */}
        <motion.div
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.75 }}
        >
          <div className="mb-4 flex items-center gap-3">
            <motion.span
              variants={lineGrow}
              style={{ transformOrigin: "left" }}
              className="h-px w-8 bg-accent"
            />
            <motion.p
              variants={fadeX}
              className="font-mono text-sm tracking-wide text-accent"
            >
              ABOUT
            </motion.p>
          </div>

          <motion.h2
            variants={fadeUp}
            className="font-display text-6xl leading-[0.85] tracking-tight md:text-7xl"
          >
            WHO I <span className="text-outline">AM</span>
          </motion.h2>
        </motion.div>

        {/* Content grid */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          {/* Image with floating badge */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img
              src={ABOUT_CONTENT.image}
              alt="Nufail Shaikh"
              className="aspect-[4/5] w-full max-w-xl border border-border object-cover object-top"
            />
            <div className="absolute -bottom-4 right-4">
              <Badge dotColor="bg-accent">OPEN TO WORK</Badge>
            </div>
          </motion.div>

          {/* Text + stats + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            {ABOUT_CONTENT.intro.map((paragraph, index) => (
              <p
                key={index}
                className={`text-lg text-text-muted ${index > 0 ? "mt-6" : ""}`}
              >
                {index === 0 ? (
                  <>
                    Hey, I'm{" "}
                    <span className="font-semibold text-text-primary">
                      Nufail Shaikh
                    </span>
                    {paragraph.replace("Hey, I'm Nufail Shaikh", "")}
                  </>
                ) : (
                  paragraph
                )}
              </p>
            ))}

            <div className="mt-10 grid grid-cols-2 gap-4">
              {ABOUT_STATS.map((stat) => (
                <StatCard
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </div>

            <div className="mt-10 flex items-center gap-6">
              <Button href="/about" isRoute variant="brutalist">
                MORE ABOUT ME
              </Button>
              <Button
                href={ABOUT_CONTENT.resumeUrl}
                variant="brutalist"
                target="_blank"
                rel="noopener noreferrer"
              >
                RESUME
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default About;