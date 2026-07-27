import { motion } from "framer-motion";
import techStack from "@/data/techstack.json";
import TechIcon from "@/components/TechIcon";
import { staggerContainer, revealUp, viewport } from "@/utils/motion";
import { cn } from "@/lib/utils";

export default function TechStackSection() {
  return (
    <motion.div
      variants={staggerContainer(0.06)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
    >
      {techStack.map((t, i) => {
        // create asymmetry: make a couple of tiles span 2 columns
        const wide = i === 0 || i === 7;
        return (
          <motion.div
            key={t.name}
            variants={revealUp}
            whileHover={{ y: -6 }}
            data-testid={`tech-card-${t.name.toLowerCase().replace(/\s+/g, "-")}`}
            className={cn(
              "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card/50 p-6 transition-colors duration-500 hover:border-foreground/20",
              wide && "sm:col-span-1 lg:col-span-2"
            )}
          >
            <div className="flex items-center justify-between">
              <TechIcon icon={t.icon} className="h-11 w-11 transition-transform duration-500 group-hover:scale-110" />
              <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {t.level}
              </span>
            </div>
            <div className="mt-8">
              <h3 className="font-display text-xl font-bold tracking-tight">{t.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{t.blurb}</p>
            </div>
            <span aria-hidden className="pointer-events-none absolute -bottom-6 -right-2 select-none font-display text-6xl font-bold text-foreground/[0.04]">
              {String(i + 1).padStart(2, "0")}
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
