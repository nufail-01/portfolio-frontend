import Navbar from "../../components/layout/navbar/Navbar";
import Footer from "../../components/layout/footer/Footer";
import Badge from "../../components/ui/badges/Badge";
import Container from "../../components/ui/layout-primitives/Container";
import Button from "../../components/ui/buttons/Button";
// import BackLink from "../components/common/BackLink";
import { ABOUT_PAGE_CONTENT } from "../../constants/about/aboutPage";
import WorkPrincipleCard from "../../components/features/about/WorkPrincipleCard";
import TechStackColumn from "../../components/features/about/TechStackColumn";
import { HOW_I_WORK } from "../../constants/about/howIWork";
import { SKILL_CATEGORIES } from "../../constants/skills/skills";
// import ContactCTA from "../components/sections/Contact";
import Contact from "../../components/features/contact/Contact";
import LiquidImage from "../../components/ui/media/LiquidImage";

const AboutPage = () => {
  return (
    <>
      <Navbar />

      {/* <section className="py-16"> */}
      <section className="py-16 md:px-8 md:py-20 lg:px-12">
        <Container>
          {/* <BackLink to="/" label="Back" /> */}

          <div className="  mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />
            <span className="font-mono text-sm tracking-widest text-accent">
              ABOUT ME
            </span>
          </div>

          <h1 className="font-display text-6xl leading-[1.05] tracking-tight md:text-7xl md:leading-[0.85]">
            NUFAIL <span className="text-outline">SHAIKH</span>
          </h1>

          <div className="mt-8 grid grid-cols-1 gap-16 lg:mt-0 lg:grid-cols-2 lg:items-center">
            {/* Text */}
            <div>
              {ABOUT_PAGE_CONTENT.paragraphs.map((p, index) => (
                <p
                  key={index}
                  className={`text-lg text-text-muted ${
                    index > 0 ? "mt-6" : ""
                  }`}
                >
                  {p.lead && (
                    <span className="font-semibold text-text-primary">
                      {p.lead}
                    </span>
                  )}
                  {p.rest}
                </p>
              ))}

              <div className="mt-10 flex items-center gap-6">
                <Button href="/contact" isRoute variant="brutalist">
                  GET IN TOUCH
                </Button>

                {/* <Button
                  href={ABOUT_PAGE_CONTENT.resumeUrl}
                  variant="brutalist"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  RESUME
                </Button> */}
                <Button
  href={ABOUT_PAGE_CONTENT.resumeUrl}
  variant="brutalist"
  target="_blank"
  rel="noopener noreferrer"
>
  RESUME
</Button>
              </div>
            </div>
            {/* Image with floating badge */}
            <div className="relative mx-auto w-full max-w-xl">
              <LiquidImage
                src={ABOUT_PAGE_CONTENT.announcement}
                alt="Nufail Shaikh"
                className="aspect-square w-full border-border"
                objectFit="contain"
              />
            </div>
            {/* <div className="absolute bottom-4 right-4">
              <Badge dotColor="bg-accent">OPEN TO WORK</Badge>
             </div> */}
            {/* </div> */}
          </div>
          {/* How I Work */}
          <div className="mt-32">
            <div className="mb-10 flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <span className="font-mono text-sm tracking-widest text-accent">
                HOW I WORK
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {HOW_I_WORK.map((item) => (
                <WorkPrincipleCard
                  key={item.number}
                  number={item.number}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mt-24">
            <div className="mb-10 flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <span className="font-mono text-sm tracking-widest text-accent">
                TECH STACK
              </span>
            </div>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
              {SKILL_CATEGORIES.map((category) => (
                <TechStackColumn
                  key={category.title}
                  title={category.title}
                  skills={category.skills}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>
      <Contact />
      <Footer />
    </>
  );
};

export default AboutPage;
