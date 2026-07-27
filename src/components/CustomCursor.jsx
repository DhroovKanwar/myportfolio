import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import useMediaQuery from "@/hooks/useMediaQuery";

/**
 * Custom cursor: a precise dot + a lagging ring that grows over interactives.
 * Disabled on touch / coarse pointers (default cursor restored via CSS media query).
 */
export default function CustomCursor() {
  const isFinePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 220, damping: 24, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 220, damping: 24, mass: 0.6 });

  useEffect(() => {
    if (!isFinePointer) return;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
    };
    const over = (e) => {
      const el = e.target.closest("a, button, [data-cursor='hover'], input, textarea, select, [role='button']");
      setHovering(Boolean(el));
    };
    const leave = () => setHidden(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.body.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.body.removeEventListener("mouseleave", leave);
    };
  }, [isFinePointer, x, y]);

  if (!isFinePointer) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed left-0 top-0 z-[200] h-2 w-2 rounded-full bg-foreground mix-blend-difference pointer-events-none"
        style={{ x, y, translateX: "-50%", translateY: "-50%", opacity: hidden ? 0 : 1 }}
      />
      <motion.div
        aria-hidden
        className="fixed left-0 top-0 z-[200] rounded-full border border-foreground/60 mix-blend-difference pointer-events-none"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%", opacity: hidden ? 0 : 1 }}
        animate={{ width: hovering ? 56 : 30, height: hovering ? 56 : 30 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      />
    </>
  );
}
