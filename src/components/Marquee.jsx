import { cn } from "@/lib/utils";

/**
 * Seamless CSS marquee. Duplicates children for an infinite loop.
 */
export default function Marquee({ children, speed = 40, reverse = false, className, pauseOnHover = true }) {
  return (
    <div className={cn("group relative flex w-full overflow-hidden", className)}>
      <div
        className={cn(
          "flex min-w-full shrink-0 items-center animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{ "--marquee-duration": `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
