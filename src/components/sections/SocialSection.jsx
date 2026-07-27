import { motion } from "framer-motion";
import { Youtube, Instagram, Github, Linkedin, ArrowUpRight } from "lucide-react";
import socials from "@/data/socials.json";
import { staggerContainer, revealUp, viewport } from "@/utils/motion";

const ICONS = { youtube: Youtube, instagram: Instagram, github: Github, linkedin: Linkedin };

export default function SocialSection() {
  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {socials.map((s) => {
        const Icon = ICONS[s.icon];
        return (
          <motion.a
            key={s.platform}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={revealUp}
            whileHover={{ y: -6 }}
            data-testid={`social-card-${s.icon}`}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card/50 p-7 transition-colors duration-500 hover:border-foreground/20"
          >
            <div
              aria-hidden
              className="absolute inset-x-0 -top-16 h-32 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
              style={{ background: s.color }}
            />
            <div className="relative flex items-center justify-between">
              <span
                className="grid h-14 w-14 place-items-center rounded-2xl text-white transition-transform duration-500 group-hover:-translate-y-1"
                style={{ backgroundColor: s.color }}
              >
                {Icon && <Icon className="h-6 w-6" />}
              </span>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
            </div>
            <h3 className="relative mt-6 font-display text-xl font-bold tracking-tight">{s.platform}</h3>
            <p className="relative mt-1 font-mono text-xs text-accent">{s.handle}</p>
            <p className="relative mt-3 flex-1 text-sm text-muted-foreground">{s.description}</p>
            <span className="relative mt-6 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-foreground/70 transition-colors group-hover:text-accent">
              Visit Profile
            </span>
          </motion.a>
        );
      })}
    </motion.div>
  );
}
