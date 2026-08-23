import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkInteractive = (target) =>
      !!target.closest(
        "a, button, [role='button'], input, textarea, select, .cursor-pointer",
      );

    // ---- Mouse events ----
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseOver = (e) => {
      setIsHovering(checkInteractive(e.target));
    };

    // ---- Touch events ----
    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      setPosition({ x: touch.clientX, y: touch.clientY });
      setIsVisible(true);
      setIsClicking(true);
      setIsHovering(checkInteractive(e.target));
    };

    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      setPosition({ x: touch.clientX, y: touch.clientY });

      // Re-check what's under the finger as it moves
      const el = document.elementFromPoint(touch.clientX, touch.clientY);
      if (el) setIsHovering(checkInteractive(el));
    };

    const handleTouchEnd = () => {
      setIsClicking(false);
      setIsHovering(false);
      // Let the dot/ring linger briefly, then fade out
      setTimeout(() => setIsVisible(false), 300);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchcancel", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);

      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [isVisible]);

  return (
    <>
      <div
        className="custom-cursor-dot"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) scale(${
            isClicking ? 0.7 : 1
          })`,
          opacity: isVisible ? 1 : 0,
        }}
      />
      <div
        className="custom-cursor-ring"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) scale(${
            isHovering ? 1.8 : 1
          })`,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
};

export default CustomCursor;