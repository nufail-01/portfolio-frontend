import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../../ui/layout-primitives/Container";
import Button from "../../ui/buttons/Button";
import { NAV_LINKS } from "../../../constants/navigation/navigation";

const menuContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const menuItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const underline = {
  rest: { scaleX: 0 },
  hover: {
    scaleX: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (isMenuOpen) return;

      if (currentScrollY < 80) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: "-100%", opacity: 0 }}
      animate={{
        y: isVisible ? 0 : "-100%",
        opacity: 1,
      }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="sticky top-0 z-50 w-full border-border/60 bg-bg/90 backdrop-blur-sm"
    >
      <Container>
        <div className="flex items-center justify-between px-5 py-4 md:px-8 lg:px-10">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="font-display text-2xl font-bold text-text-primary"
          >
            NUFAIL.
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((link) => {
              const content = (
                <motion.span
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  className="relative inline-block font-mono text-sm tracking-wide text-text-muted transition-colors hover:text-text-primary"
                >
                  {link.label.toUpperCase()}

                  <motion.span
                    variants={underline}
                    style={{ transformOrigin: "left" }}
                    className="absolute -bottom-1 left-0 h-px w-full bg-accent"
                  />
                </motion.span>
              );

              return link.isRoute ? (
                <Link key={link.href} to={link.href}>
                  {content}
                </Link>
              ) : (
                <a key={link.href} href={link.href}>
                  {content}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              href="/contact"
              isRoute
              variant="brutalist"
            >
              Hire Me
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          >
            <span className="relative block h-4 w-6">
              {/* Top line */}
              <motion.span
                animate={
                  isMenuOpen
                    ? {
                        top: "50%",
                        y: "-50%",
                        rotate: 45,
                      }
                    : {
                        top: 0,
                        y: 0,
                        rotate: 0,
                      }
                }
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className="absolute left-0 block h-[1.5px] w-6 bg-text-primary"
              />

              {/* Middle line */}
              <motion.span
                animate={{
                  opacity: isMenuOpen ? 0 : 1,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="absolute left-0 top-1/2 block h-[1.5px] w-6 -translate-y-1/2 bg-text-primary"
              />

              {/* Bottom line */}
              <motion.span
                animate={
                  isMenuOpen
                    ? {
                        top: "50%",
                        y: "-50%",
                        rotate: -45,
                      }
                    : {
                        top: "100%",
                        y: 0,
                        rotate: 0,
                      }
                }
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className="absolute left-0 block h-[1.5px] w-6 bg-text-primary"
              />
            </span>
          </button>
        </div>
      </Container>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -16,
            }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed inset-x-0 top-0 z-40 h-screen w-full bg-bg md:hidden"
          >
            <motion.nav
              variants={menuContainer}
              initial="hidden"
              animate="show"
              className="flex h-full flex-col items-start justify-center gap-2 px-8"
            >
              {NAV_LINKS.map((link) => {
                const content = (
                  <motion.span
                    variants={menuItem}
                    className="group py-3 font-display text-4xl uppercase text-text-primary"
                  >
                    <span className="transition-colors group-hover:text-accent">
                      {link.label}
                    </span>
                  </motion.span>
                );

                return link.isRoute ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {content}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {content}
                  </a>
                );
              })}

              {/* Mobile CTA */}
              <motion.div
                variants={menuItem}
                className="mt-8"
              >
                <Button
                  href="/contact"
                  isRoute
                  variant="brutalist"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Hire Me
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;