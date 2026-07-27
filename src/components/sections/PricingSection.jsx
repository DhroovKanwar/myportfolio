import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check, Sparkles } from "lucide-react";
import pricing from "@/data/pricing.json";
import { staggerContainer, revealUp, viewport } from "@/utils/motion";
import { cn } from "@/lib/utils";

export default function PricingSection() {
  const navigate = useNavigate();
  return (
    <motion.div
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3"
    >
      {pricing.map((tier) => (
        <motion.div
          key={tier.name}
          variants={revealUp}
          data-testid={`pricing-card-${tier.name.toLowerCase()}`}
          className={cn(
            "relative flex flex-col rounded-3xl border p-8 transition-colors duration-500",
            tier.highlight
              ? "border-transparent bg-card lg:-my-4 lg:scale-[1.03]"
              : "border-border bg-card/50 hover:border-foreground/20"
          )}
        >
          {tier.highlight && (
            <>
              <div aria-hidden className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-b from-primary via-secondary to-accent opacity-90" />
              <div aria-hidden className="absolute inset-[1.5px] -z-10 rounded-[calc(1.5rem-1.5px)] bg-card" />
              <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-accent px-4 py-1 font-mono text-[11px] uppercase tracking-wider text-accent-foreground">
                <Sparkles className="h-3 w-3" /> Most Popular
              </span>
            </>
          )}

          <h3 className="font-display text-2xl font-bold tracking-tight">{tier.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{tier.tagline}</p>

          <div className="mt-6 flex items-end gap-2">
            <span className="font-display text-5xl font-bold tracking-tighter">{tier.price}</span>
            <span className="mb-2 font-mono text-xs text-muted-foreground">/ {tier.period}</span>
          </div>

          <ul className="mt-8 flex-1 space-y-3">
            {tier.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-foreground/85">{f}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => navigate("/contact")}
            data-testid={`pricing-cta-${tier.name.toLowerCase()}`}
            className={cn(
              "mt-8 w-full rounded-full py-3.5 text-sm font-semibold transition-transform hover:-translate-y-0.5",
              tier.highlight ? "bg-accent text-accent-foreground" : "bg-foreground text-background"
            )}
          >
            {tier.cta}
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
}
