import { motion } from "framer-motion";
import {
  Briefcase, Atom, Server, Layers, Webhook, LayoutDashboard,
  Rocket, WandSparkles, ShieldCheck, Bot, ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import services from "@/data/services.json";
import { staggerContainer, revealUp, viewport } from "@/utils/motion";
import { cn } from "@/lib/utils";

const ICONS = {
  briefcase: Briefcase, atom: Atom, server: Server, layers: Layers,
  webhook: Webhook, "layout-dashboard": LayoutDashboard, rocket: Rocket,
  "wand-sparkles": WandSparkles, "shield-check": ShieldCheck, bot: Bot,
};

export default function ServicesSection() {
  const navigate = useNavigate();
  return (
    <motion.div
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {services.map((s, i) => {
        const Icon = ICONS[s.icon] || Briefcase;
        const featured = i === 0;
        return (
          <motion.button
            key={s.num}
            variants={revealUp}
            onClick={() => navigate("/contact")}
            data-testid={`service-card-${s.num}`}
            className={cn(
              "group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card/50 p-8 text-left transition-colors duration-500 hover:border-accent/60",
              featured && "sm:col-span-2 lg:col-span-1 lg:row-span-1"
            )}
          >
            <div className="absolute right-6 top-6 font-mono text-sm text-muted-foreground/50 transition-colors group-hover:text-accent">
              {s.num}
            </div>
            <div className="grid h-14 w-14 place-items-center rounded-2xl border border-border bg-background/60 text-accent transition-transform duration-500 group-hover:-translate-y-1">
              <Icon className="h-6 w-6" strokeWidth={1.6} />
            </div>
            <h3 className="mt-6 font-display text-xl font-bold tracking-tight sm:text-2xl">{s.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{s.text}</p>
            <span className="mt-6 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-foreground/70 transition-colors group-hover:text-accent">
              Discuss project <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
