import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import nav from "@/data/navigation.json";
import profile from "@/data/profile.json";
import projects from "@/data/projects.json";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Big CTA line */}
        <div className="flex flex-col justify-between gap-8 border-b border-border pb-12 lg:flex-row lg:items-end">
          <div>
            <p className="overline mb-4 text-accent">Let's build something</p>
            <h2 className="font-display text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
              Ready to convert <br />
              <span className="text-gradient">visitors into customers?</span>
            </h2>
          </div>
          <Link
            to="/contact"
            data-testid="footer-cta-link"
            className="group inline-flex items-center gap-3 self-start rounded-full bg-foreground px-7 py-4 font-body font-semibold text-background transition-transform hover:-translate-y-1"
          >
            Start a project
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-10 py-12 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-foreground font-display text-lg font-bold text-background">D</span>
              <span className="font-display text-lg font-bold tracking-tight">Dhruv<span className="text-accent">.</span>Codes</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">{profile.tagline}</p>
            <SocialLinks size="sm" className="mt-6" />
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Quick Links</h4>
            <ul className="space-y-3">
              {nav.primary.slice(0, 6).map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-sm text-foreground/80 transition-colors hover:text-accent">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Services</h4>
            <ul className="space-y-3">
              {nav.footerServices.map((l) => (
                <li key={l.label}>
                  <Link to={l.path} className="text-sm text-foreground/80 transition-colors hover:text-accent">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Projects</h4>
            <ul className="space-y-3">
              {projects.slice(0, 5).map((p) => (
                <li key={p.slug}>
                  <Link to={`/portfolio#${p.slug}`} className="text-sm text-foreground/80 transition-colors hover:text-accent">{p.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row md:items-center">
          <p>© {year} {profile.brand}. Crafted by {profile.name}.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
              <Mail className="h-4 w-4" /> {profile.email}
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {profile.location}
            </span>
          </div>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[22vw] font-bold leading-none tracking-tighter text-foreground/[0.03]">
        DHRUV CODES
      </div>
    </footer>
  );
}
