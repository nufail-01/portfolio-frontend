import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Container from "../../ui/layout-primitives/Container";
import Button from "../../ui/buttons/Button";
import { NAV_LINKS } from "../../../constants/navigation/navigation";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full  border-border/60 bg-bg/90 backdrop-blur-sm transition-transform duration-500 ${
        isVisible ? "translate-y-0 " : "-translate-y-full "
      }`}
    >
      <Container>
        <div className="flex items-center justify-between px-5 py-4 md:px-8 lg:px-10">
          <Link
            to="/"
            className="font-display text-2xl font-bold text-text-primary"
          >
            NUFAIL.
          </Link>

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

          <Button href="/contact" isRoute>
            Hire Me
          </Button>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
