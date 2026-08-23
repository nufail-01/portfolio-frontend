import { useState } from "react";

const SOCIALS = [
  {
    name: "Call",
    href: "tel:+9923313525",
    bg: "#EA580C",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4.5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
      </svg>
    ),
  },

  {
  name: "WhatsApp",
  href: "https://wa.me/9923313525?text=Hi%20Nufail%2C%20I%20am%20fascinated%20by%20your%20work%20and%20would%20love%20to%20work%20with%20you.",
  bg: "#25D366",
  icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.06c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.05.3-3.53-.74-2.99-1.24-4.9-4.29-5.05-4.49-.15-.2-1.21-1.61-1.21-3.07 0-1.46.77-2.18 1.04-2.47.27-.29.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.68.53.25.6.85 2.07.92 2.22.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.4-.45.54-.15.15-.3.31-.13.6.17.3.76 1.26 1.64 2.04 1.13 1 2.08 1.32 2.38 1.47.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.68-.15.28.1 1.75.83 2.05.98.3.15.5.22.58.35.08.13.08.75-.16 1.43Z" />
    </svg>
  ),
},

  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/nufailshaikh/",
    bg: "#0A66C2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
      </svg>
    ),
  },
];

const SocialSidebar = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="fixed bottom-10 right-5 z-40 hidden flex-col gap-3 md:flex">
      {SOCIALS.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target={social.href.startsWith("http") ? "_blank" : undefined}
          rel={
            social.href.startsWith("http")
              ? "noopener noreferrer"
              : undefined
          }
          aria-label={social.name}
          onMouseEnter={() => setHovered(social.name)}
          onMouseLeave={() => setHovered(null)}
 
        className="group relative flex h-13 w-13 items-center justify-center rounded-full text-white shadow-lg shadow-black/30 transition-transform duration-300 hover:scale-110"
          style={{ background: social.bg }}
        >
          {social.icon}

          {/* Tooltip */}
          <span
            className={`pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text-primary shadow-lg transition-all duration-200 ${
              hovered === social.name
                ? "translate-x-0 opacity-100"
                : "translate-x-2 opacity-0"
            }`}
          >
            {social.name}
          </span>
        </a>
      ))}

      {/* Decorative line below icons */}
      {/* <div className="mx-auto h-16 w-px bg-gradient-to-b from-border to-transparent" /> */}
    </div>
  );
};

export default SocialSidebar;