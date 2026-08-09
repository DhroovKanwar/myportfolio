import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { SearchX } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { Skeleton } from "@/components/ui/skeleton";
import portfolioService from "@/services/portfolioService";
import { staggerContainer } from "@/utils/motion";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Business", "Hospitality","Ecommerce", "Automotive", "Healthcare","AI & SaaS", "Fitness", "Real Estate"];

export default function PortfolioSection({ limit, showFilter = true }) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("All");

  useEffect(() => {
    let mounted = true;
    portfolioService
      .getProjects()
      .then((data) => mounted && setProjects(data))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    let list = active === "All" ? projects : projects.filter((p) => p.category === active);
    if (limit) list = list.slice(0, limit);
    return list;
  }, [projects, active, limit]);

  const handleRequest = (project) => {
    toast.success(`Great choice! Let's build your ${project.tag} website.`, {
      description: "Tell me about your project on the contact page.",
    });
    navigate("/contact");
  };

  return (
    <div>
      {showFilter && (
        <div className="mb-10 flex flex-wrap gap-2" data-testid="portfolio-filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              data-testid={`filter-${f.toLowerCase().replace(/\s+/g, "-")}`}
              className={cn(
                "relative rounded-full border px-5 py-2 text-sm font-medium transition-colors",
                active === f
                  ? "border-transparent text-background"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {active === f && (
                <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-foreground" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
              )}
              <span className="relative z-10">{f}</span>
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {Array.from({ length: limit || 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[520px] w-full rounded-3xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-24 text-center">
          <SearchX className="h-10 w-10 text-muted-foreground" />
          <p className="mt-4 font-display text-2xl font-bold">No {active} demos yet</p>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            This category is on the roadmap. Want a {active.toLowerCase()} website built for you? Let's talk.
          </p>
          <button onClick={() => navigate("/contact")} className="mt-6 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground" data-testid="empty-request-button">
            Request a {active} website
          </button>
        </div>
      ) : (
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-8 lg:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProjectCard key={p.slug} project={p} onRequestSimilar={handleRequest} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
