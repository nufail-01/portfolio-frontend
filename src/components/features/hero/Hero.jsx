import Container from "../../ui/layout-primitives/Container";
import Badge from "../../ui/badges/Badge";
import Button from "../../ui/buttons/Button";

// const STACK_TAGS = [
//   { label: "NEXT.JS / REACT", dot: "bg-accent" },
//   { label: "MongoDB / Mongoose", dot: "bg-blue-400" },
//   { label: "BUILDING IN PUBLIC", dot: "bg-orange-500" },
// ];

const STATS = [
  { value: "4+ MONTHS", label: "Professional Experience" },
  { value: "1+ YEARS", label: "Building & Learning" },
  { value: "10+", label: "Projects Shipped" },
];

const Hero = () => {
  return (
    //  old
    // <section className="relative overflow-hidden py-20 md:py-28">
    
    // new
    <section className="relative overflow-hidden py-16 md:px-8 md:py-20 lg:px-12">
      <Container>
        {/* Eyebrow */}
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-accent" />
          <span className="font-mono text-sm tracking-widest text-accent">
            FRONTEND ENGINEER
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

          <Button href="#projects">View Work</Button>
        </div>

        {/* Divider */}
        <div className="mt-16 h-[2px] w-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />

        {/* Stats */}

        <div className="flex flex-wrap gap-x-24 gap-y-8 border-border pt-10">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-5xl md:text-6xl">{stat.value}</p>
              <p className="mt-2 font-mono text-sm tracking-wide text-text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Hero;
