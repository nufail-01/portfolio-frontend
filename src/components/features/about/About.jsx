import Container from '../../ui/layout-primitives/Container'
import Badge from '../../ui/badges/Badge'
import StatCard from "../../ui/cards/StatCard";
import { ABOUT_STATS, ABOUT_CONTENT } from "../../../constants/about/about";
import { Link } from "react-router-dom";

const About = () => {
  return (
    // old
    // <section id="about" className="py-32">
      // new
      <section id="about" className="py-16 md:px-8 md:py-20 lg:px-12">
      
      <Container>
        {/* Eyebrow + heading */}
        <p className="mb-4 font-mono text-sm tracking-wide text-accent">
          ABOUT
        </p>

        <h2 className="font-display text-6xl leading-[0.85] tracking-tight md:text-7xl">
          WHO I <span className="text-outline">AM</span>
        </h2>

        {/* Content grid */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          {/* Image with floating badge */}
          <div className="relative">
            <img
              src={ABOUT_CONTENT.image}
              alt="Nufail Shaikh"
              className="aspect-[0/0] w-full max-w-xl border border-border object-cover"
            />
            <div className="absolute -bottom-4 right-4">
              <Badge dotColor="bg-accent">OPEN TO WORK</Badge>
            </div>
          </div>

          {/* Text + stats + CTAs */}
          <div>
            {ABOUT_CONTENT.intro.map((paragraph, index) => (
              <p
                key={index}
                className={`text-lg text-text-muted ${index > 0 ? "mt-6" : ""}`}
              >
                {index === 0 ? (
                  <>
                    Hey, I'm{" "}
                    <span className="font-semibold text-text-primary">
                      Nufail Shaikh
                    </span>
                    {paragraph.replace("Hey, I'm Nufail Shaikh", "")}
                  </>
                ) : (
                  paragraph
                )}
              </p>
            ))}

            <div className="mt-10 grid grid-cols-2 gap-4">
              {ABOUT_STATS.map((stat) => (
                <StatCard
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </div>

            <div className="mt-10 flex items-center gap-6">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-mono text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
              >
                MORE ABOUT ME
                <span aria-hidden="true">→</span>
              </Link>

              <a
                href={ABOUT_CONTENT.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-sm text-text-muted transition-colors hover:text-text-primary"
              >
                RESUME
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;
