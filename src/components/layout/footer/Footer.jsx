import { motion } from "framer-motion";
import Icon3D from "../../ui/media/Icon3D";
import Container from "../../ui/layout-primitives/Container";
import Badge from "../../ui/badges/Badge";
import {
  GithubIcon,
  LinkedinIcon,
  XIcon,
  WhatsappIcon,
  InstagramIcon,
  ArrowUp,
} from "../../ui/icons/SocialIcons";

import {
  FOOTER_NAV,
  PROFICIENT_WITH,
  SOCIAL_LINKS,
} from "../../../constants/footer/footer";

const ICONS = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  whatsapp: WhatsappIcon,
  instagram: InstagramIcon,
  x: XIcon,
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const columnsContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const iconPop = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const Footer = () => {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="md:px-8">
      <Container>
        <motion.div
          className="grid grid-cols-1 gap-12 py-16 md:grid-cols-[2fr_1px_1fr_1px_1fr]"
          variants={columnsContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Brand */}
          <motion.div variants={fadeUp}>
            <h2 className="font-display text-4xl">
              NUFAIL
              <br />
              SHAIKH
            </h2>

            <p className="mt-6 font-mono text-xs tracking-widest text-text-muted">
              FRONTEND ENGINEER
            </p>

            <p className="mt-10 font-mono text-xs tracking-widest text-text-muted">
              FIND ME ONLINE
            </p>

            <motion.div
              className="mt-4 flex items-center gap-3"
              variants={columnsContainer}
            >
              {SOCIAL_LINKS.map((social) => {
                const Icon = ICONS[social.icon];

                if (!Icon) return null;

                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    variants={iconPop}
                    whileHover={{
                      y: -3,
                      borderColor: "var(--color-accent)",
                    }}
                    transition={{
                      duration: 0.25,
                      ease: "easeOut",
                    }}
                    className="flex h-11 w-11 items-center justify-center rounded-md border border-border text-text-muted transition-colors hover:text-text-primary"
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}

              <Badge dotColor="bg-accent">AVAILABLE</Badge>
            </motion.div>
          </motion.div>

          {/* Divider (desktop only) */}
          <div className="hidden w-px bg-border md:block" />

          {/* Navigation */}
          <motion.div variants={fadeUp}>
            <p className="font-mono text-xs tracking-widest text-text-muted">
              NAVIGATION
            </p>

            <nav className="mt-6 flex flex-col gap-4">
              {FOOTER_NAV.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-text-primary transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Divider (desktop only) */}
          <div className="hidden w-px bg-border md:block" />

          {/* Proficient With */}
          {/* <motion.div variants={fadeUp}>
            <p className="font-mono text-xs tracking-widest text-text-muted">
              WHAT I'M IN LOVE WITH
            </p>

            <div className="mt-6 flex flex-wrap gap-6">
              {PROFICIENT_WITH.map((tech) => (
                <div
                  key={tech.name}
                  className="flex flex-col items-center gap-2"
                >
                  <Icon3D src={tech.icon} alt={tech.name} size={50} />
                  <span className="font-mono text-[10px] text-text-muted">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div> */}
          {/* Proficient With */}
<motion.div variants={fadeUp}>
  <p className="font-mono text-xs tracking-widest text-text-muted">
    WHAT I'M IN LOVE WITH
  </p>

  <div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6">
    {PROFICIENT_WITH.map((tech) => (
      <div key={tech.name} className="flex flex-col items-center gap-2">
        <Icon3D src={tech.icon} alt={tech.name} size={48} />
        <span className="font-mono text-[10px] text-text-muted">
          {tech.name}
        </span>
      </div>
    ))}
  </div>
</motion.div>
        </motion.div>

        {/* Back to top (mobile only) */}
        <div className="flex justify-end pb-8 md:hidden">
          <motion.button
            type="button"
            onClick={scrollToTop}
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="flex items-center gap-2 font-mono text-xs tracking-widest text-text-muted transition-colors hover:text-text-primary"
          >
            BACK TO TOP
            <motion.span
              variants={{
                rest: { y: 0 },
                hover: { y: -3 },
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-border"
            >
              <ArrowUp size={14} />
            </motion.span>
          </motion.button>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-border py-6 font-mono text-xs tracking-wide text-text-muted md:flex-row md:items-center">
          <p>© {year} Nufail Shaikh. All rights reserved.</p>

          <motion.button
            type="button"
            onClick={scrollToTop}
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="hidden items-center gap-2 transition-colors hover:text-text-primary md:flex"
          >
            BACK TO TOP
            <motion.span
              variants={{
                rest: { y: 0 },
                hover: { y: -3 },
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-border"
            >
              <ArrowUp size={14} />
            </motion.span>
          </motion.button>

          {/* <p>Designed &amp; developed by NUFAIL SHAIKH</p> */}
          <p>
  Designed &amp; developed by{" "}
  <span className="font-bold text-accent">NUFAIL SHAIKH</span>
</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
