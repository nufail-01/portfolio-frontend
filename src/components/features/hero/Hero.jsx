import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Container from "../../ui/layout-primitives/Container";
import Badge from "../../ui/badges/Badge";
import Button from "../../ui/buttons/Button";
import { ArrowUpRight } from "lucide-react";

const ROLES = [
  "FRONTEND DEVELOPER",
  "UI/UX DESIGNER",
  "VIDEO EDITOR",
  "CONTENT CREATOR",
  "CREATIVE CODER",
  "VISUAL STORYTELLER",
];

const STATS = [
  { value: 4, suffix: "+", unit: "MONTHS", label: "Professional Experience" },
  { value: 1, suffix: "+", unit: "YEARS", label: "Building & Learning" },
  { value: 10, suffix: "+", unit: "", label: "Projects Shipped" },
];

const TYPE_SPEED = 60;
const DELETE_SPEED = 35;
const HOLD_TIME = 1200;

const COUNT_DURATION = 2000;

const useTypewriter = (words) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    if (!isDeleting && displayText === currentWord) {
      const holdTimeout = setTimeout(() => setIsDeleting(true), HOLD_TIME);
      return () => clearTimeout(holdTimeout);
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setDisplayText((prev) =>
          isDeleting
            ? currentWord.slice(0, prev.length - 1)
            : currentWord.slice(0, prev.length + 1),
        );
      },
      isDeleting ? DELETE_SPEED : TYPE_SPEED,
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex, words]);

  return displayText;
};

const useCountUp = (target, duration = COUNT_DURATION, startWhen = true) => {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!startWhen || hasRun.current) return;
    hasRun.current = true;

    let startTime = null;
    let frameId;

    const step = (timestamp) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration, startWhen]);

  return count;
};

const StatItem = ({ stat, startWhen }) => {
  const count = useCountUp(stat.value, COUNT_DURATION, startWhen);

  return (
    <div>
      <p className="font-display text-5xl md:text-6xl">
        {count}
        {stat.suffix} {stat.unit}
      </p>
      <p className="mt-2 font-mono text-sm tracking-wide text-text-muted">
        {stat.label}
      </p>
    </div>
  );
};

// Magnetic wrapper — pulls its children toward the cursor while hovering,
// clamped so it never drifts outside a safe range, springs back on leave
const Magnetic = ({ children, strength = 0.2, max = 16 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.2 });

  const clamp = (val, limit) => Math.max(-limit, Math.min(limit, val));

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(clamp(relX * strength, max));
    y.set(clamp(relY * strength, max));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
};

// --- Framer Motion variants ---

const lineGrow = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeX = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const badgePop = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const nameLine = {
  hidden: { y: "100%", opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: "power3" } },
};

const entrance = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const statsContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const Hero = () => {
  const roleText = useTypewriter(ROLES);
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden py-16 md:px-8 md:py-20 lg:px-12">
      <Container>
        <motion.div variants={entrance} initial="hidden" animate="show">
          {/* Eyebrow */}
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
              {roleText}
              <span className="ml-0.5 inline-block h-[1em] w-[2px] animate-pulse bg-accent align-middle" />
            </motion.span>
          </div>

          <motion.div variants={badgePop}>
            <Badge variant="filled" dotColor="bg-accent">
              AVAILABLE FOR PROJECTS
            </Badge>
          </motion.div>

          {/* Name — magnetic on hover */}
          <Magnetic strength={0.2} max={16}>
  <div className="relative mt-8">
              <div>
                <div className="overflow-hidden py-2 -my-2">
                  <motion.h1
                    variants={nameLine}
                    className="font-display text-7xl leading-[0.85] tracking-tight md:text-8xl lg:text-9xl"
                  >
                    NUFAIL
                  </motion.h1>
                </div>
                <br />
                <div className="overflow-hidden py-2 -my-2">
                  <motion.h1
                    variants={nameLine}
                    className="font-display text-outline text-7xl leading-[0.85] tracking-tight md:text-8xl lg:text-9xl"
                  >
                    SHAIKH
                  </motion.h1>
                </div>
              </div>
            </div>
          </Magnetic>

          {/* Divider */}
          <motion.div
            variants={lineGrow}
            style={{ transformOrigin: "left" }}
            className="mt-16 h-[2px] w-full bg-accent shadow-[0_0_12px_var(--color-accent)]"
          />

          {/* Tagline + CTA */}
          <div className="mt-10 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
            <motion.p
              variants={fadeUp}
              className="max-w-xl font-body text-lg text-text-muted md:text-xl"
            >
              Building{" "}
              <span className="font-semibold text-text-primary">
                production-grade web experiences
              </span>{" "}
              with modern tech — creating{" "}
              <span className="font-semibold text-text-primary">
                fast, scalable, and polished products
              </span>{" "}
              that go beyond the prototype.
            </motion.p>

            <motion.div variants={fadeUp}>
              <Button href="#projects" variant="brutalist">
                View Work 
              </Button>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            variants={lineGrow}
            style={{ transformOrigin: "left" }}
            className="mt-16 h-[2px] w-full bg-accent shadow-[0_0_12px_var(--color-accent)]"
          />
        </motion.div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          className="flex flex-wrap gap-x-24 gap-y-8 border-border pt-10"
          variants={statsContainer}
          initial="hidden"
          animate={statsInView ? "show" : "hidden"}
        >
          {STATS.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <StatItem stat={stat} startWhen={statsInView} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;