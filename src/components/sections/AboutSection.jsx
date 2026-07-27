import { motion } from "framer-motion";
import { Code2, Sparkles } from "lucide-react";
import profile from "@/data/profile.json";
import { revealUp, staggerContainer, viewport } from "@/utils/motion";

const EXPERTISE = ["React", "Laravel", "PHP", "JavaScript", "REST APIs", "Responsive UI", "Modern Business Websites"];

export default function AboutSection() {
  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
      {/* Sticky left */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewport}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[2rem] border border-border"
          >
            <img
              src="https://images.pexels.com/photos/34803994/pexels-photo-34803994.jpeg"
              alt={profile.name}
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <p className="overline text-accent">{profile.role}</p>
              <p className="mt-2 font-display text-4xl font-bold tracking-tighter">{profile.name}</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{profile.location}</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scrolling right */}
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="lg:col-span-7"
      >
        <motion.div variants={revealUp} className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5">
          <Sparkles className="h-4 w-4 text-accent" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">The developer</span>
        </motion.div>

        {profile.bio.map((para, i) => (
          <motion.p
            key={i}
            variants={revealUp}
            className="mt-6 text-lg leading-relaxed text-foreground/85 sm:text-xl"
          >
            {para}
          </motion.p>
        ))}

        {/* Expertise chips */}
        <motion.div variants={revealUp} className="mt-10">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Core expertise</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {EXPERTISE.map((e) => (
              <span key={e} className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 text-sm font-medium">
                <Code2 className="h-3.5 w-3.5 text-accent" /> {e}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Principles */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {profile.principles.map((p, i) => (
            <motion.div key={p.title} variants={revealUp} className="rounded-2xl border border-border bg-card/50 p-6">
              <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h4 className="mt-3 font-display text-lg font-bold tracking-tight">{p.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
