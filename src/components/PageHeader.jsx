import { motion } from "framer-motion";
import { revealUp, viewport } from "@/utils/motion";

/**
 * Inner-page hero header with big kinetic title.
 */
export default function PageHeader({ overline, title, description, index }) {
  return (
    <header className="relative overflow-hidden pb-12 pt-36 sm:pt-44">
      <div aria-hidden className="glow-blob left-[-10%] top-0 h-72 w-72 bg-primary/40" />
      <div aria-hidden className="glow-blob right-[-5%] top-10 h-64 w-64 bg-secondary/30" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
          <div className="flex items-center gap-4">
            {index && (
              <motion.span variants={revealUp} className="font-mono text-sm text-accent">{index}</motion.span>
            )}
            <motion.p variants={revealUp} className="overline text-accent">{overline}</motion.p>
          </div>
          <motion.h1
            variants={revealUp}
            className="mt-6 max-w-5xl font-display text-5xl font-bold leading-[0.95] tracking-tighter sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p variants={revealUp} className="mt-8 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {description}
            </motion.p>
          )}
        </motion.div>
      </div>
    </header>
  );
}
