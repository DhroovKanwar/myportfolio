import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Premium pill button used across the site.
 * variants: primary | outline | ghost | accent
 */
const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold tracking-tight transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 disabled:pointer-events-none";

const sizes = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-7 text-sm",
  lg: "h-14 px-9 text-base",
};

const variants = {
  primary: "bg-foreground text-background hover:opacity-90",
  accent: "bg-accent text-accent-foreground hover:brightness-110",
  gradient: "text-white",
  outline: "border border-border bg-transparent text-foreground hover:bg-card",
  ghost: "text-foreground hover:bg-card",
};

const PremiumButton = forwardRef(
  ({ children, className, variant = "primary", size = "md", asChild, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={cn(base, sizes[size], variants[variant], className)}
        {...props}
      >
        {variant === "gradient" && (
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-accent via-accent/90 to-accent/70" />
        )}
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </motion.button>
    );
  }
);
PremiumButton.displayName = "PremiumButton";

export default PremiumButton;
