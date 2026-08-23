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
  BUILT_WITH,
  SOCIAL_LINKS,
} from "../../../constants/footer/footer";
const ICONS = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  whatsapp: WhatsappIcon,
  instagram: InstagramIcon,
  x: XIcon,
};

const Footer = () => {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    
    <footer className="md:px-8">
      <Container>
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-[2fr_1px_1fr_1px_1fr]">
          {/* Brand */}
          <div>
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

            <div className="mt-4 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = ICONS[social.icon];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-md border border-border text-text-muted transition-colors hover:border-accent/50 hover:text-text-primary"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}

              <Badge dotColor="bg-accent">AVAILABLE</Badge>
            </div>
          </div>

          {/* Divider (desktop only) */}
          <div className="hidden w-px bg-border md:block" />

          {/* Navigation */}
          <div>
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
          </div>

          {/* Divider (desktop only) */}
          <div className="hidden w-px bg-border md:block" />

          {/* Built with */}
          <div>
            <p className="font-mono text-xs tracking-widest text-text-muted">
              BUILT WITH
            </p>

            <ul className="mt-6 flex flex-col gap-4">
              {BUILT_WITH.map((tech) => (
                <li key={tech} className="text-text-primary">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        

        {/* Back to top (own row, right-aligned) */}
        <div className="flex justify-end pb-8 md:hidden">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 font-mono text-xs tracking-widest text-text-muted transition-colors hover:text-text-primary"
          >
            BACK TO TOP
            <span className="flex h-8 w-8 items-center justify-center rounded-md border border-border">
              <ArrowUp size={14} />
            </span>
          </button>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-border py-6 font-mono text-xs tracking-wide text-text-muted md:flex-row md:items-center">
          <p>© {year} Nufail Shaikh. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="hidden items-center gap-2 transition-colors hover:text-text-primary md:flex"
          >
            BACK TO TOP
            <span className="flex h-8 w-8 items-center justify-center rounded-md border border-border">
              <ArrowUp size={14} />
            </span>
          </button>

          <p>Designed &amp; developed by NUFAIL SHAIKH</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
