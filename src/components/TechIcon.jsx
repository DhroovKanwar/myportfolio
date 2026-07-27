import { Atom, Webhook } from "lucide-react";
import { useTheme } from "next-themes";

/**
 * Renders official brand marks via the Simple Icons CDN (colored),
 * with sensible fallbacks for marks the CDN doesn't provide.
 */
const SLUGS = {
  react: "react",
  laravel: "laravel",
  php: "php",
  javascript: "javascript",
  typescript: "typescript",
  tailwind: "tailwindcss",
  mysql: "mysql",
  git: "git",
  github: "github",
  axios: "axios",
  vite: "vite",
};

export default function TechIcon({ icon, className = "h-10 w-10" }) {
  const { resolvedTheme } = useTheme();

  if (icon === "api") {
    return <Webhook className={className} strokeWidth={1.5} />;
  }

  const slug = SLUGS[icon];
  if (!slug) return <Atom className={className} strokeWidth={1.5} />;

  // GitHub / Git marks are near-black; force white in dark mode for contrast.
  const forceLight = resolvedTheme === "dark" && (icon === "github");
  const src = forceLight
    ? `https://cdn.simpleicons.org/${slug}/ffffff`
    : `https://cdn.simpleicons.org/${slug}`;

  return <img src={src} alt={`${icon} logo`} loading="lazy" className={className} draggable={false} />;
}
