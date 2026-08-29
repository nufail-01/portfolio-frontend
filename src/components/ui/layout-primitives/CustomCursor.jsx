import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(pointer: fine)").matches;
    }
    return true;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(pointer: fine)");
    const handleMediaChange = (e) => {
      setIsFinePointer(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMediaChange);
      } else {
        mediaQuery.removeListener(handleMediaChange);
      }
    };
  }, []);

  useEffect(() => {
    if (!isFinePointer) {
      document.body.classList.remove("has-custom-cursor");
      return;
    }

    const checkInteractive = (target) => {
      if (!target || typeof target.closest !== "function") return false;
      return !!target.closest(
        "a, button, [role='button'], input, textarea, select, .cursor-pointer, [data-cursor-interactive]"
      );
    };

    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if cursor is over the portfolio app vs external popups / extension overlays
      const rootEl = document.getElementById("root");
      const isOverExternalPopup =
        (rootEl && !rootEl.contains(e.target)) ||
        e.target?.tagName === "IFRAME" ||
        e.target?.closest?.("[data-no-custom-cursor]");

      if (isOverExternalPopup) {
        setIsVisible(false);
        document.body.classList.remove("has-custom-cursor");
      } else {
        setIsVisible(true);
        document.body.classList.add("has-custom-cursor");
      }

      setIsHovering(checkInteractive(e.target));
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => {
      setIsVisible(false);
      document.body.classList.remove("has-custom-cursor");
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
      document.body.classList.add("has-custom-cursor");
    };

    const handleBlur = () => {
      setIsVisible(false);
      document.body.classList.remove("has-custom-cursor");
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("blur", handleBlur);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <>
      <div
        className="custom-cursor-dot"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${
            isClicking ? 0.7 : 1
          })`,
          opacity: isVisible ? 1 : 0,
        }}
      />
      <div
        className="custom-cursor-ring"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${
            isHovering ? 1.8 : 1
          })`,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
};

export default CustomCursor;