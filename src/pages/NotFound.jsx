import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home as HomeIcon, ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";

export default function NotFound() {
  return (
    <>
      <SEO title="404 — Page Not Found" description="The page you're looking for doesn't exist." path="/404" />
      <section className="relative grid min-h-screen place-items-center overflow-hidden px-6">
        <div aria-hidden className="absolute inset-0 bg-grid" />
        <div aria-hidden className="glow-blob left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 bg-primary/40" />

        <div className="relative text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[28vw] font-bold leading-none tracking-tighter text-gradient sm:text-[20rem]"
          >
            404
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-md font-display text-2xl font-bold tracking-tight"
          >
            This page took a detour.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-3 max-w-md text-muted-foreground"
          >
            The link may be broken or the page may have been moved. Let's get you back on track.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Link to="/" data-testid="notfound-home-link" className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5">
              <HomeIcon className="h-4 w-4" /> Back Home
            </Link>
            <Link to="/portfolio" className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-card">
              <ArrowLeft className="h-4 w-4" /> View Work
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
