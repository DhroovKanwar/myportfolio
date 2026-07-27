import { motion } from "framer-motion";

export default function RouteLoader() {
  return (
    <div className="grid min-h-screen place-items-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <motion.span
          className="h-10 w-10 rounded-full border-2 border-border border-t-accent"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
        />
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Loading
        </span>
      </div>
    </div>
  );
}
