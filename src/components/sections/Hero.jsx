import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowRight, Sparkles, Circle } from "lucide-react";
import PremiumButton from "@/components/PremiumButton";
import profile from "@/data/profile.json";
import { EASE } from "@/utils/motion";

const LINES = ["Building Modern", "Business Websites That", "Convert Visitors", "Into Customers"];

function MaskedLine({ children, index }) {
  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.95, ease: EASE, delay: 0.35 + index * 0.12 }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden pb-16 pt-32 sm:pt-40">
      <div aria-hidden className="absolute inset-0 bg-grid" />
      <div aria-hidden className="glow-blob left-[-10%] top-[10%] h-96 w-96 bg-primary/50" />
      <div aria-hidden className="glow-blob right-[-8%] top-[30%] h-80 w-80 bg-secondary/40" />
      <div aria-hidden className="glow-blob bottom-[5%] left-[30%] h-72 w-72 bg-accent/30" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:px-8">
        {/* Left: copy */}
        <motion.div style={{ y: textY }} className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{profile.availability}</span>
          </motion.div>

          <h1 className="mt-7 font-display text-5xl font-bold leading-[0.95] tracking-tighter sm:text-6xl lg:text-7xl xl:text-[5.4rem]">
            {LINES.map((line, i) => (
              <MaskedLine key={line} index={i}>
                {i === 2 ? <span className="text-gradient">{line}</span> : line}
              </MaskedLine>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.9 }}
            className="mt-8 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            I build premium React frontends and Laravel backends for startups, local businesses and growing brands.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 1.05 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <PremiumButton size="lg" variant="primary" data-testid="hero-view-work" onClick={() => navigate("/portfolio")}>
              View My Work <ArrowRight className="h-4 w-4" />
            </PremiumButton>
            <PremiumButton size="lg" variant="accent" data-testid="hero-hire-me" onClick={() => navigate("/contact")}>
              Hire Me <ArrowUpRight className="h-4 w-4" />
            </PremiumButton>
            <PremiumButton size="lg" variant="outline" data-testid="hero-contact-me" onClick={() => navigate("/contact")}>
              Contact Me
            </PremiumButton>
          </motion.div>
        </motion.div>

        {/* Right: parallax visual */}
        <div className="relative lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.5 }}
            className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-border"
          >
            <motion.img
              src="https://images.pexels.com/photos/29450016/pexels-photo-29450016.jpeg"
              alt="Abstract 3D render"
              style={{ y: imgY, scale: imgScale }}
              className="h-[120%] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />

            {/* floating glass chips */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="glass absolute bottom-6 left-6 rounded-2xl p-4"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-accent">Full Stack</p>
              <p className="mt-1 font-display text-lg font-bold">React · Laravel</p>
            </motion.div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="glass absolute -right-2 top-8 hidden rounded-2xl p-4 sm:block"
          >
            <Sparkles className="h-5 w-5 text-accent" />
            <p className="mt-2 font-display text-2xl font-bold">6+ yrs</p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">experience</p>
          </motion.div>
        </div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="mx-auto mt-16 flex max-w-7xl items-center gap-3 px-6 lg:px-8"
      >
        <Circle className="h-3 w-3 animate-pulse fill-accent text-accent" />
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Scroll to explore the work</span>
      </motion.div>
    </section>
  );
}
