import Container from "../../ui/layout-primitives/Container";
import DriftWall from "../../ui/gallery/DriftWall";
import { CERTIFICATIONS } from "../../../constants/certifications/certifications";

const Certifications = () => {
  const driftItems = CERTIFICATIONS.map((cert) => ({
    image: cert.image,
    title: cert.title,
    href: cert.credentialUrl,
  }));

  return (
    <section className="py-16 md:px-8 md:py-20 lg:px-12">
      <Container>
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-accent" />

          <span className="font-mono text-sm tracking-widest text-accent">
            CREDENTIALS
          </span>
        </div>

        <h1 className="font-display text-6xl leading-[1.05] tracking-tight md:text-7xl md:leading-[0.85]">
          CERTIFICATIONS
        </h1>

        {CERTIFICATIONS.length === 0 ? (
          <p className="mt-16 font-mono text-sm text-text-muted">
            No certifications added yet.
          </p>
        ) : (
          <div
            className="mt-16"
            style={{
              height: "700px",
            }}
          >
            <DriftWall
              items={driftItems}

              /*
               * 3 columns
               */
              columns={3}

              /*
               * Large certificate cards
               */
              tileWidth={380}
              tileHeight={250}
              gap={28}

              /*
               * Vertical movement
               */
              speed={38}
              direction="up"
              variance={0.25}

              /*
               * Interaction
               */
              pauseOnHover={false}
              lift={1.025}

              /*
               * Appearance
               */
              fade={0.6}
              dim={0.25}
              grayscale={false}
              overlayColor="#0a0a0a"
            />
          </div>
        )}
      </Container>
    </section>
  );
};

export default Certifications;