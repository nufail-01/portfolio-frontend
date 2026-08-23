import { useState, useEffect, useRef } from "react";
import Container from "../../ui/layout-primitives/Container";
import Badge from "../../ui/badges/Badge";
import Button from "../../ui/buttons/Button";

// const STACK_TAGS = [
//   { label: "NEXT.JS / REACT", dot: "bg-accent" },
//   { label: "MongoDB / Mongoose", dot: "bg-blue-400" },
//   { label: "BUILDING IN PUBLIC", dot: "bg-orange-500" },
// ];

const ROLES = [
  "FRONTEND DEVELOPER",
  "CREATIVE DEVELOPER",
  "VIDEO EDITOR",
  "UI/UX DESIGNER",
];

const STATS = [
  { value: 4, suffix: "+", unit: "MONTHS", label: "Professional Experience" },
  { value: 1, suffix: "+", unit: "YEARS", label: "Building & Learning" },
  { value: 10, suffix: "+", unit: "", label: "Projects Shipped" },
];

const TYPE_SPEED = 60; // ms per character while typing
const DELETE_SPEED = 35; // ms per character while deleting
const HOLD_TIME = 1200; // ms to pause once fully typed

const COUNT_DURATION = 2000; // ms — how long each number takes to reach its target

const useTypewriter = (words) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    // Fully typed — pause, then start deleting
    if (!isDeleting && displayText === currentWord) {
      const holdTimeout = setTimeout(() => setIsDeleting(true), HOLD_TIME);
      return () => clearTimeout(holdTimeout);
    }

    // Fully deleted — move to next word
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

// Counts up from 0 to `target` once, then stops — no loop.
// `startWhen` lets us trigger it only when the stats section is actually visible.
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

      // ease-out — starts fast, settles gently into the final number
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(target); // snap exactly to target, no rounding drift
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration, startWhen]);

  return count;
};

// Renders one stat with its own count-up instance
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

const Hero = () => {
  const roleText = useTypewriter(ROLES);
  const statsRef = useRef(null);
  const [statsInView, setStatsInView] = useState(false);

  // Trigger the count-up only once the stats row scrolls into view,
  // so it doesn't just fire instantly on page load off-screen.
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
          observer.disconnect(); // only need this once
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
        {/* Eyebrow */}
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-accent" />
          <span className="font-mono text-sm tracking-widest text-accent">
            {roleText}
            <span className="ml-0.5 inline-block h-[1em] w-[2px] animate-pulse bg-accent align-middle" />
          </span>
        </div>

        <Badge variant="filled" dotColor="bg-accent">
          AVAILABLE FOR PROJECTS
        </Badge>

        {/* Name + floating stack tags */}
        <div className="relative mt-8">
          <div>
            <h1 className="font-display text-7xl leading-[0.85] tracking-tight md:text-8xl lg:text-9xl">
              NUFAIL
            </h1>
            <br />
            <h1 className="font-display text-outline text-7xl leading-[0.85] tracking-tight md:text-8xl lg:text-9xl">
              SHAIKH
            </h1>
          </div>

          {/* <div className="mt-10 hidden flex-col items-end gap-4 lg:absolute lg:right-0 lg:top-4 lg:mt-0 lg:flex">
            {STACK_TAGS.map((tag) => (
              <Badge key={tag.label} dotColor={tag.dot}>
                {tag.label}
              </Badge>
            ))}
          </div> */}
        </div>

        {/* Divider */}
        <div className="mt-16 h-[2px] w-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />

        {/* Tagline + CTA */}

        <div className="mt-10 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <p className="max-w-xl font-body text-lg text-text-muted md:text-xl">
            Building{" "}
            <span className="font-semibold text-text-primary">
              production-grade web experiences
            </span>{" "}
            with modern tech — creating{" "}
            <span className="font-semibold text-text-primary">
              fast, scalable, and polished products
            </span>{" "}
            that go beyond the prototype.
          </p>

          <Button href="#projects" variant="brutalist">View Work</Button>
        </div>

        {/* Divider */}
        <div className="mt-16 h-[2px] w-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />

        {/* Stats */}

        <div
          ref={statsRef}
          className="flex flex-wrap gap-x-24 gap-y-8 border-border pt-10"
        >
          {STATS.map((stat) => (
            <StatItem key={stat.label} stat={stat} startWhen={statsInView} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Hero;
 