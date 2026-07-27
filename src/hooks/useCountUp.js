import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

/**
 * Animated number counter that runs once when scrolled into view.
 */
export default function useCountUp(to, { duration = 2, decimals = 0 } = {}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(decimals ? Number(v.toFixed(decimals)) : Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration, decimals]);

  return { ref, value };
}
