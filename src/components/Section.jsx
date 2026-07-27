import { cn } from "@/lib/utils";

/**
 * Consistent vertical rhythm wrapper for page sections.
 */
export default function Section({ children, id, className, container = true, tight }) {
  return (
    <section id={id} className={cn(tight ? "py-16 sm:py-20" : "py-24 sm:py-32", className)}>
      {container ? <div className="mx-auto max-w-7xl px-6 lg:px-8">{children}</div> : children}
    </section>
  );
}
