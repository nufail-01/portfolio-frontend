import { useRef, useState } from "react";

const InteractiveName = ({ children, className = "" }) => {
  const nameRef = useRef(null);
  const [fillPosition, setFillPosition] = useState(100);

  const handleMouseMove = (event) => {
    if (!nameRef.current) return;

    const rect = nameRef.current.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;

    const position = Math.max(
      0,
      Math.min(mouseX, rect.width)
    );

    setFillPosition(position);
  };

  const handleMouseEnter = (event) => {
    handleMouseMove(event);
  };

  const handleMouseLeave = () => {
    setFillPosition(100);
  };

  return (
    <span
      ref={nameRef}
      className={`interactive-name ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="interactive-name__outline">
        {children}
      </span>

      <span
        className="interactive-name__fill"
        style={{
          clipPath: `inset(0 0 0 ${fillPosition}px)`,
        }}
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
};

export default InteractiveName;