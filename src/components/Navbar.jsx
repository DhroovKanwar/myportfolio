import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import nav from "@/data/navigation.json";
import ThemeToggle from "@/components/ThemeToggle";
import SocialLinks from "@/components/SocialLinks";
import PremiumButton from "@/components/PremiumButton";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] px-4 pt-4 sm:px-6">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5",
          scrolled ? "glass shadow-lg" : "bg-transparent"
        )}
      >
        <Link
          to="/"
          data-testid="navbar-brand"
          className="flex items-center gap-2 pl-2"
          aria-label="Dhruv Digital Solutions home"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-foreground font-display text-lg font-bold text-background">
            D
          </span>
          <span className="font-display text-lg font-bold tracking-tight">Dhruv Digital Solutions</span>
        </Link>

        <div className="hidden items-center gap-1 xl:flex">
          {nav.primary.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              data-testid={`nav-link-${item.label.toLowerCase()}`}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  isActive && "text-foreground"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <SocialLinks size="sm" className="hidden lg:flex" />
          <ThemeToggle />
          <PremiumButton
            size="sm"
            variant="accent"
            data-testid="navbar-hire-button"
            className="hidden sm:inline-flex"
            onClick={() => navigate("/contact")}
          >
            Hire Me <ArrowUpRight className="h-4 w-4" />
          </PremiumButton>
          <button
            type="button"
            data-testid="mobile-menu-toggle"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card/60 text-foreground xl:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-0 z-[-1] xl:hidden"
          >
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass absolute inset-x-4 top-24 rounded-3xl p-6"
              data-testid="mobile-menu-panel"
            >
              <div className="flex flex-col">
                {nav.primary.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <NavLink
                      to={item.path}
                      onClick={() => setOpen(false)}
                      data-testid={`mobile-nav-link-${item.label.toLowerCase()}`}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center justify-between border-b border-border py-4 font-display text-2xl font-semibold tracking-tight",
                          isActive ? "text-accent" : "text-foreground"
                        )
                      }
                    >
                      {item.label}
                      <ArrowUpRight className="h-5 w-5 opacity-40" />
                    </NavLink>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between">
                <SocialLinks size="sm" />
                <PremiumButton
                  size="sm"
                  variant="accent"
                  onClick={() => { setOpen(false); navigate("/contact"); }}
                  data-testid="mobile-hire-button"
                >
                  Hire Me <ArrowUpRight className="h-4 w-4" />
                </PremiumButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
