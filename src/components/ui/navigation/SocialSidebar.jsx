import { useState } from "react";
import { SOCIALS } from "../../../constants/socials/socials";

const SocialSidebar = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="fixed bottom-10 right-5 z-40 flex flex-col gap-3">
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
          className="group relative flex h-[56px] w-[56px] items-center justify-center rounded-full text-white shadow-lg shadow-black/30 transition-transform duration-300 hover:scale-110"
          style={{ background: social.bg }}
        >
          {/* Icon */}
          <i className={`${social.icon} text-3xl`} />

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
    </div>
  );
};

export default SocialSidebar;