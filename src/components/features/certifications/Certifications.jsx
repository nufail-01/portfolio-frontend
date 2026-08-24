// import { useEffect, useState } from "react";
// import Container from "../../ui/layout-primitives/Container";
// import DriftWall from "../../ui/gallery/DriftWall";
// import { CERTIFICATIONS } from "../../../constants/certifications/certifications";

// // Mirrors DriftWall.css's own breakpoints (480 / 700 / 900 / 1200) so the
// // column count shrinks in step with the tile size, instead of staying
// // fixed at 3 and getting clipped by overflow:hidden on narrow screens.
// const useResponsiveColumns = () => {
//   const [columns, setColumns] = useState(3);

//   useEffect(() => {
//     const updateColumns = () => {
//       const width = window.innerWidth;

//       if (width < 480) {
//         setColumns(2);
//       } else if (width < 900) {
//         setColumns(2);
//       } else {
//         setColumns(3);
//       }
//     };

//     updateColumns();
//     window.addEventListener("resize", updateColumns);
//     return () => window.removeEventListener("resize", updateColumns);
//   }, []);

//   return columns;
// };

// const Certifications = () => {
//   const columns = useResponsiveColumns();

//   const driftItems = CERTIFICATIONS.map((cert) => ({
//     image: cert.image,
//     title: cert.title,
//     href: cert.credentialUrl,
//   }));

//   return (
//     <section className="py-16 md:px-8 md:py-20 lg:px-12">
//       <Container>
//         <div className="mb-6 flex items-center gap-3">
//           <span className="h-px w-8 bg-accent" />

//           <span className="font-mono text-sm tracking-widest text-accent">
//             CREDENTIALS
//           </span>
//         </div>

//         <h1 className="font-display text-6xl leading-[1.05] tracking-tight md:text-7xl md:leading-[0.85]">
//           CERTIFICATIONS
//         </h1>

//         {CERTIFICATIONS.length === 0 ? (
//           <p className="mt-16 font-mono text-sm text-text-muted">
//             No certifications added yet.
//           </p>
//         ) : (
//           <div
//             className="mt-16"
//             style={{
//               height: "700px",
//             }}
//           >
//             <DriftWall
//               items={driftItems}

//               /*
//                * Responsive column count — 3 on desktop, 2 on tablet/mobile
//                */
//               columns={columns}

//               /*
//                * Large certificate cards
//                */
//               tileWidth={380}
//               tileHeight={250}
//               gap={28}

//               /*
//                * Vertical movement
//                */
//               speed={38}
//               direction="up"
//               variance={0.25}

//               /*
//                * Interaction
//                */
//               pauseOnHover={false}
//               lift={1.025}

//               /*
//                * Appearance
//                */
//               fade={0.6}
//               dim={0.25}
//               grayscale={false}
//               overlayColor="#0a0a0a"
//             />
//           </div>
//         )}
//       </Container>
//     </section>
//   );
// };

// export default Certifications;


import Container from "../../ui/layout-primitives/Container";
import DriftWall from "../../ui/gallery/DriftWall";
import { CERTIFICATIONS } from "../../../constants/certifications/certifications";

const Certifications = () => {
  const driftItems = CERTIFICATIONS.map((certification) => ({
    image: certification.image,
    title: certification.title,
    href: certification.credentialUrl,
  }));

  return (
    <section className="relative overflow-hidden py-16 md:px-8 md:py-20 lg:px-12">
      <Container>
        {/* Section Label */}
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-accent" />

          <span className="font-mono text-sm tracking-widest text-accent">
            CREDENTIALS
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-display text-6xl leading-[1.05] tracking-tight md:text-7xl md:leading-[0.85]">
          CERTIFICATIONS
        </h1>

        {/* Certificates */}
        {CERTIFICATIONS.length === 0 ? (
          <p className="mt-16 font-mono text-sm text-text-muted">
            No certifications added yet.
          </p>
        ) : (
          <div
            className="
              mt-16
              h-[700px]
              w-full
              overflow-hidden
              md:h-[760px]
            "
          >
            <DriftWall
              items={driftItems}
              columns={3}
              tileWidth={380}
              tileHeight={250}
              gap={28}
              tilt={0}
              turn={0}
              roll={0}
              perspective={1200}
              depth={0}
              speed={38}
              direction="up"
              variance={0}
              parallax={0}
              lift={1.025}
              fade={0.6}
              dim={0.25}
              overlayColor="#0a0a0a"
            />
          </div>
        )}
      </Container>
    </section>
  );
};

export default Certifications;