import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Container from "../../ui/layout-primitives/Container";
import Button from "../../ui/buttons/Button";
import { NAV_LINKS } from "../../../constants/navigation/navigation";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Don't hide navbar while mobile menu is open
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

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close menu on Escape key
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
    <header
      className={`sticky top-0 z-50 w-full border-border/60 bg-bg/90 backdrop-blur-sm transition-transform duration-500 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
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
            {NAV_LINKS.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="group relative font-mono text-sm tracking-wide text-text-muted transition-colors hover:text-text-primary"
                >
                  {link.label.toUpperCase()}

                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative font-mono text-sm tracking-wide text-text-muted transition-colors hover:text-text-primary"
                >
                  {link.label.toUpperCase()}

                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </a>
              ),
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button href="/contact" isRoute variant="brutalist">
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
              <span
                className={`absolute left-0 block h-[1.5px] w-6 bg-text-primary transition-all duration-300 ease-out ${
                  isMenuOpen
                    ? "top-1/2 -translate-y-1/2 rotate-45"
                    : "top-0"
                }`}
              />

              {/* Middle line */}
              <span
                className={`absolute left-0 top-1/2 block h-[1.5px] w-6 -translate-y-1/2 bg-text-primary transition-opacity duration-200 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />

              {/* Bottom line */}
              <span
                className={`absolute left-0 block h-[1.5px] w-6 bg-text-primary transition-all duration-300 ease-out ${
                  isMenuOpen
                    ? "top-1/2 -translate-y-1/2 -rotate-45"
                    : "top-full"
                }`}
              />
            </span>
          </button>
        </div>
      </Container>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-x-0 top-0 z-40 h-screen w-full bg-bg transition-all duration-500 ease-out md:hidden ${
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <nav className="flex h-full flex-col items-start justify-center gap-2 px-8">
          {NAV_LINKS.map((link) =>
            link.isRoute ? (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="group py-3 font-display text-4xl uppercase text-text-primary transition-colors"
              >
                <span className="transition-colors group-hover:text-accent">
                  {link.label}
                </span>
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="group py-3 font-display text-4xl uppercase text-text-primary transition-colors"
              >
                <span className="transition-colors group-hover:text-accent">
                  {link.label}
                </span>
              </a>
            ),
          )}

          <div className="mt-8">
            <Button
              href="/contact"
              isRoute
              variant="brutalist"
              onClick={() => setIsMenuOpen(false)}
            >
              Hire Me
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;