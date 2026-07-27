// Shared Framer Motion variants and easing tokens.
export const EASE = [0.16, 1, 0.3, 1];

export const revealUp = {
  hidden: { y: 40, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: EASE },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: EASE } },
};

export const scaleIn = {
  hidden: { scale: 0.92, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.7, ease: EASE } },
};

export const staggerContainer = (stagger = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const lineReveal = {
  hidden: { y: "110%" },
  show: (i = 0) => ({
    y: "0%",
    transition: { duration: 0.9, ease: EASE, delay: 0.15 * i },
  }),
};

export const viewport = { once: true, margin: "-80px" };
