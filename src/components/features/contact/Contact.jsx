import Container from "../../ui/layout-primitives/Container";
import { CONTACT_DETAILS } from "../../../constants/contact/contactInfo";
const Contact = () => {
  return (
    // old
    // <section id="contact " className="py-32">
    // new
    <section id="contact " className="py-16 md:px-8 md:py-20 lg:px-12">
      <Container>
        {/* Eyebrow */}
        <p className="mb-6 font-mono text-sm tracking-wide text-accent">
          LET'S WORK TOGETHER
        </p>

        {/* Heading with inline circular CTA */}
        <h2 className="font-display text-6xl leading-[0.9] tracking-tight md:text-7xl lg:text-8xl">
          READY TO TAKE YOUR
          <br />
          <span className="inline-flex items-center gap-8">
            IDEA TO
            <a
              href={`mailto:${CONTACT_DETAILS.email}`}
              className="flex h-32 w-32 shrink-0 flex-col items-center justify-center rounded-full bg-accent font-mono text-sm font-medium text-bg transition-transform hover:scale-105 md:h-36 md:w-36"
            >
              <span aria-hidden="true" className="text-lg">
                ↗
              </span>
              Start Project
            </a>
          </span>
          <br />
          <span className="text-outline">THE NEXT LEVEL?</span>
        </h2>

        {/* Tagline + email */}
        <div className="mt-16 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <p className="max-w-sm text-lg text-text-muted">
            {CONTACT_DETAILS.tagline}
          </p>

          <a
            href={`mailto:${CONTACT_DETAILS.email}`}
            className="inline-flex items-center gap-3 rounded-md bg-accent px-6 py-4 font-mono text-sm text-bg transition-transform hover:-translate-y-0.5"
          >
            {CONTACT_DETAILS.email}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
