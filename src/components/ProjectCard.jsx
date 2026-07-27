import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, FileText } from "lucide-react";
import { revealUp } from "@/utils/motion";
import { cn } from "@/lib/utils";

/**
 * Premium portfolio card — clipped, spotlit thumbnail with hover reveal.
 */
export default function ProjectCard({ project, onRequestSimilar, large }) {
  return (
    <motion.article
      id={project.slug}
      variants={revealUp}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card/50 transition-colors duration-500 hover:border-foreground/20 scroll-mt-28",
        large && "lg:col-span-2"
      )}
      data-testid={`project-card-${project.slug}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `radial-gradient(600px circle at 50% 0%, ${project.accent}22, transparent 60%)` }}
        />
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
        <span
          className="absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white backdrop-blur"
          style={{ backgroundColor: `${project.accent}cc` }}
        >
          {project.category}
        </span>
        <span className="absolute right-4 top-4 font-mono text-xs text-white/80">{project.year}</span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{project.type}</p>
            <h3 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">{project.title}</h3>
          </div>
          <ArrowUpRight className="h-6 w-6 shrink-0 text-muted-foreground transition-all duration-300 group-hover:text-accent group-hover:-translate-y-1 group-hover:translate-x-1" />
        </div>

        <p className="mt-4 text-sm text-muted-foreground">{project.overview}</p>

        {/* Features */}
        <ul className="mt-5 grid grid-cols-2 gap-2">
          {project.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-xs text-foreground/80">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: project.accent }} />
              {f}
            </li>
          ))}
        </ul>

        {/* Tech */}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <span key={t} className="rounded-full border border-border bg-background/60 px-3 py-1 font-mono text-[11px] text-muted-foreground">
              {t}
            </span>
          ))}
        </div>

        {/* Future backend note */}
        <div className="mt-5 rounded-2xl border border-dashed border-border bg-background/40 p-4">
          <p className="font-mono text-[11px] uppercase tracking-widest text-accent">Future Laravel Backend</p>
          <p className="mt-2 text-xs text-muted-foreground">{project.futureBackend.join(" · ")}</p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap items-center gap-3 pt-2">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`project-live-${project.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs font-semibold text-background transition-transform hover:-translate-y-0.5"
          >
            <ExternalLink className="h-4 w-4" /> Live Demo
          </a>
          <a
            href={project.caseStudyUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`project-case-${project.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-card"
          >
            <FileText className="h-4 w-4" /> Case Study
          </a>
          <button
            type="button"
            onClick={() => onRequestSimilar?.(project)}
            data-testid={`project-request-${project.slug}`}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold text-accent transition-colors hover:underline"
          >
            Request Similar
          </button>
        </div>
      </div>
    </motion.article>
  );
}
