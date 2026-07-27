import { Youtube, Instagram, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import socials from "@/data/socials.json";
import { cn } from "@/lib/utils";

const ICONS = { youtube: Youtube, instagram: Instagram, github: Github, linkedin: Linkedin };

export default function SocialLinks({ className, size = "md", variant = "solid" }) {
  const dims = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {socials.map((s) => {
        const Icon = ICONS[s.icon];
        return (
          <motion.a
            key={s.platform}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.platform}
            data-testid={`social-link-${s.icon}`}
            whileHover={{ y: -3 }}
            className={cn(
              "grid place-items-center rounded-full transition-colors",
              dims,
              variant === "solid"
                ? "border border-border bg-card/60 text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {Icon ? <Icon className={iconSize} /> : null}
          </motion.a>
        );
      })}
    </div>
  );
}
