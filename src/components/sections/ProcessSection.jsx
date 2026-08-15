import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Search, Map, PenTool, Code, Bug, Rocket, LifeBuoy } from "lucide-react";
import process from "@/data/process.json";
import { revealUp } from "@/utils/motion";

const ICONS = { search: Search, map: Map, "pen-tool": PenTool, code: Code, bug: Bug, rocket: Rocket, "life-buoy": LifeBuoy };

export default function ProcessSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div ref={ref} className="relative mx-auto max-w-4xl">
      {/* track */}
      <div className="absolute left-5 top-0 h-full w-px bg-border sm:left-8" aria-hidden />
      <motion.div
        className="absolute left-5 top-0 w-px origin-top bg-accent sm:left-8"
        style={{ scaleY, height: "100%" }}
        aria-hidden
      />

      <div className="space-y-10">
        {process.map((p) => {
          const Icon = ICONS[p.icon] || Search;
          return (
            <motion.div
              key={p.step}
              variants={revealUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="relative flex items-start gap-6 pl-16 sm:pl-24"
              data-testid={`process-step-${p.step}`}
            >
              <div className="absolute left-0 grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-accent shadow-sm sm:h-[3.75rem] sm:w-[3.75rem]">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.6} />
              </div>
              <div className="flex-1 rounded-3xl border border-border bg-card/50 p-6 transition-colors hover:border-accent/50 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-accent">{p.step}</span>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{p.title}</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground sm:text-base">{p.text}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
