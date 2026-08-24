
import Container from "../../ui/layout-primitives/Container";
import Button from "../../ui/buttons/Button";
import { CONTACT_DETAILS } from "../../../constants/contact/contactInfo";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-16 md:px-8 md:py-20 lg:px-12"
    >
      <Container>
        {/* Eyebrow */}
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-accent" />

          <p className="font-mono text-sm tracking-wide text-accent">
            LET'S WORK TOGETHER
          </p>
        </div>

        {/* Heading with inline circular CTA */}
        <h2 className="font-display text-6xl leading-[1.1] tracking-tight md:text-7xl md:leading-[0.95] lg:text-8xl">
          READY TO TAKE YOUR
          <br />

          <span className="inline-flex items-center gap-8">
            IDEA TO

            <a
              href={`mailto:${CONTACT_DETAILS.email}`}
              className="flex h-32 w-32 shrink-0 flex-col items-center justify-center rounded-full bg-accent font-mono text-sm font-medium text-bg transition-transform hover:scale-105 md:h-36 md:w-36"
            >
              <span
                aria-hidden="true"
                className="text-lg"
              >
                ↗
              </span>

              Start Project
            </a>
          </span>

          <br />

          <span className="text-outline">
            THE NEXT LEVEL?
          </span>
        </h2>

        {/* Tagline + email */}
        <div className="mt-16 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <p className="max-w-sm text-lg text-text-muted">
            {CONTACT_DETAILS.tagline}
          </p>

          <Button
            href={`mailto:${CONTACT_DETAILS.email}`}
            variant="brutalist"
          >
            {CONTACT_DETAILS.email}
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default Contact;