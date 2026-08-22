const TECH = [
  "HTML",
  "CSS",
  "SCSS",
  "JAVASCRIPT",
  "TYPESCRIPT",
  "TAILWIND CSS",
  "REACT.JS",
  "NEXT.JS",
  "GSAP",
  "GIT",
  "GITHUB",
  "CANVA",
  "FIGMA",
];
const Marquee = () => {
  const items = [...TECH, ...TECH, ...TECH]; // duplicate for seamless loop

  return (
    <div className="overflow-hidden border-y border-border bg-accent py-4">
      <div className="animate-marquee flex w-max gap-10">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-mono text-sm font-bold tracking-wide text-bg"
          >
            {item}
            <span aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
