import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import testimonials from "@/data/testimonials.json";

function Card({ t }) {
  return (
    <div
      className="relative flex w-[85vw] shrink-0 select-none flex-col rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-xl sm:w-[420px]"
      data-testid={`testimonial-${t.name.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <Quote className="h-8 w-8 text-accent/40" />
      <div className="mt-4 flex gap-1">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-accent text-accent" />
        ))}
      </div>
      <p className="mt-5 flex-1 text-base leading-relaxed text-foreground/90">"{t.quote}"</p>
      <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">
        <img src={t.avatar} alt={t.name} loading="lazy" className="h-12 w-12 rounded-full object-cover" draggable={false} />
        <div>
          <p className="font-display font-bold tracking-tight">{t.name}</p>
          <p className="font-mono text-xs text-muted-foreground">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [dragWidth, setDragWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current && trackRef.current) {
        setDragWidth(Math.max(0, trackRef.current.scrollWidth - containerRef.current.offsetWidth));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden">
      <motion.div
        ref={trackRef}
        drag="x"
        dragConstraints={{ left: -dragWidth, right: 0 }}
        dragElastic={0.08}
        className="flex cursor-grab gap-6 active:cursor-grabbing"
        data-testid="testimonials-track"
      >
        {testimonials.map((t) => (
          <Card key={t.name} t={t} />
        ))}
      </motion.div>
      <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">← Drag to explore reviews →</p>
    </div>
  );
}
