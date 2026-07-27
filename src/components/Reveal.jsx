import { motion } from "framer-motion";
import { revealUp, viewport } from "@/utils/motion";

/**
 * Simple scroll reveal wrapper.
 */
export default function Reveal({ children, className, delay = 0, as = "div" }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      variants={revealUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      transition={{ delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
