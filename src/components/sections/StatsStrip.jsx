import { motion } from "framer-motion";
import { LayoutGrid, Smile, Calendar, Cpu } from "lucide-react";
import useCountUp from "@/hooks/useCountUp";
import stats from "@/data/stats.json";
import { staggerContainer, revealUp, viewport } from "@/utils/motion";
import { cn } from "@/lib/utils";

const ICONS = { "layout-grid": LayoutGrid, smile: Smile, calendar: Calendar, cpu: Cpu };

function Stat({ stat }) {
  const { ref, value } = useCountUp(stat.value, { duration: 2 });
  const Icon = ICONS[stat.icon];
  return (
    <motion.div
      variants={revealUp}
      className="group relative flex flex-col gap-3 rounded-2xl border border-border bg-card/50 p-6 transition-colors hover:border-accent/60"
      data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {Icon && <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} />}
      <span ref={ref} className="font-display text-4xl font-bold tracking-tighter sm:text-5xl">
        {value}
        {stat.suffix}
      </span>
      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</span>
    </motion.div>
  );
}

export default function StatsStrip({ className }) {
  return (
    <motion.div
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={cn("grid grid-cols-2 gap-4 lg:grid-cols-4", className)}
    >
      {stats.map((s) => (
        <Stat key={s.label} stat={s} />
      ))}
    </motion.div>
  );
}
