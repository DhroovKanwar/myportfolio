import { motion } from "framer-motion";
import { revealUp, staggerContainer, viewport } from "@/utils/motion";
import { cn } from "@/lib/utils";

/**
 * Standard section header: overline + big title + optional lead paragraph.
 */
export default function SectionHeading({ overline, title, lead, align = "left", className }) {
  return (
    <motion.div
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {overline && (
        <motion.p variants={revealUp} className="overline mb-4 text-accent">
          {overline}
        </motion.p>
      )}
      <motion.h2
        variants={revealUp}
        className="font-display text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl"
      >
        {title}
      </motion.h2>
      {lead && (
        <motion.p
          variants={revealUp}
          className={cn("mt-6 text-base text-muted-foreground sm:text-lg", align === "center" && "mx-auto")}
        >
          {lead}
        </motion.p>
      )}
    </motion.div>
  );
}
