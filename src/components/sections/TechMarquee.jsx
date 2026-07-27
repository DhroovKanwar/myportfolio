import { motion } from "framer-motion";
import Marquee from "@/components/Marquee";
import { Sparkle } from "lucide-react";

const WORDS = [
  "React", "Laravel", "PHP", "JavaScript", "TypeScript", "Tailwind CSS",
  "MySQL", "REST APIs", "Framer Motion", "Vite", "Git", "Responsive UI",
];

export default function TechMarquee() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-y border-border bg-card/30 py-6"
      aria-label="Technologies"
    >
      <Marquee speed={38}>
        {WORDS.map((w, i) => (
          <div key={`${w}-${i}`} className="flex items-center gap-6 px-6">
            <span className="font-display text-2xl font-semibold tracking-tight text-foreground/70 sm:text-3xl">{w}</span>
            <Sparkle className="h-4 w-4 text-accent" />
          </div>
        ))}
      </Marquee>
    </motion.section>
  );
}
