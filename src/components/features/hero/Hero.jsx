import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Container from "../../ui/layout-primitives/Container";
import Badge from "../../ui/badges/Badge";
import Button from "../../ui/buttons/Button";

gsap.registerPlugin(useGSAP);

// const STACK_TAGS = [
//   { label: "NEXT.JS / REACT", dot: "bg-accent" },
//   { label: "MongoDB / Mongoose", dot: "bg-blue-400" },
//   { label: "BUILDING IN PUBLIC", dot: "bg-orange-500" },
// ];

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

const Hero = () => {
  const roleText = useTypewriter(ROLES);
  const [statsInView, setStatsInView] = useState(false);

  // GSAP scope + targets
  const containerRef = useRef(null);
  const eyebrowLineRef = useRef(null);
  const roleTextRef = useRef(null);
  const badgeRef = useRef(null);
  const nameRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const divider1Ref = useRef(null);
  const taglineRef = useRef(null);
  const buttonRef = useRef(null);
  const divider2Ref = useRef(null);
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

  // Entrance timeline — runs once on mount
  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          // Free the outlined text from clipping once the reveal is done,
          // so stroke edges (from text-outline) never get chopped off.
          gsap.set([line1Ref.current, line2Ref.current], {
            overflow: "visible",
          });
        },
      });

      tl.fromTo(
        eyebrowLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, transformOrigin: "left" },
      )
        .from(
          roleTextRef.current,
          { opacity: 0, x: -10, duration: 0.4 },
          "<0.1",
        )
        .from(
          badgeRef.current,
          { opacity: 0, y: 10, scale: 0.9, duration: 0.5 },
          "-=0.2",
        )
        .from(
          nameRef.current.querySelectorAll("h1"),
          { yPercent: 100, opacity: 0, duration: 0.9, stagger: 0.12 },
          "-=0.2",
        )
        .fromTo(
          divider1Ref.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7, transformOrigin: "left" },
          "-=0.4",
        )
        .from(taglineRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.3")
        .from(buttonRef.current, { opacity: 0, y: 20, duration: 0.5 }, "-=0.4")
        .fromTo(
          divider2Ref.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7, transformOrigin: "left" },
          "-=0.2",
        );
    },
    { scope: containerRef },
  );

  // Stats reveal — fires once the row scrolls into view
  useGSAP(
    () => {
      if (!statsInView) return;
      gsap.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" },
      );
    },
    { dependencies: [statsInView], scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-16 md:px-8 md:py-20 lg:px-12"
    >
      <Container>
        {/* Eyebrow */}
        <div className="mb-6 flex items-center gap-3">
          <span ref={eyebrowLineRef} className="h-px w-8 bg-accent" />
          <span
            ref={roleTextRef}
            className="font-mono text-sm tracking-widest text-accent"
          >
            {roleText}
            <span className="ml-0.5 inline-block h-[1em] w-[2px] animate-pulse bg-accent align-middle" />
          </span>
        </div>

        <div ref={badgeRef}>
          <Badge variant="filled" dotColor="bg-accent">
            AVAILABLE FOR PROJECTS
          </Badge>
        </div>

        {/* Name */}
        <div className="relative mt-8" ref={nameRef}>
          <div>
            <div ref={line1Ref} className="overflow-hidden py-2 -my-2">
              <h1 className="font-display text-7xl leading-[0.85] tracking-tight md:text-8xl lg:text-9xl">
                NUFAIL
              </h1>
            </div>
            <br />
            <div ref={line2Ref} className="overflow-hidden py-2 -my-2">
              <h1 className="font-display text-outline text-7xl leading-[0.85] tracking-tight md:text-8xl lg:text-9xl">
                SHAIKH
              </h1>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          ref={divider1Ref}
          className="mt-16 h-[2px] w-full bg-accent shadow-[0_0_12px_var(--color-accent)]"
        />

        {/* Tagline + CTA */}
        <div className="mt-10 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <p
            ref={taglineRef}
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
          </p>

          <div ref={buttonRef}>
            <Button href="#projects" variant="brutalist">
              View Work
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div
          ref={divider2Ref}
          className="mt-16 h-[2px] w-full bg-accent shadow-[0_0_12px_var(--color-accent)]"
        />

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