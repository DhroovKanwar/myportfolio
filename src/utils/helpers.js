// Tiny helpers.
export const cx = (...c) => c.filter(Boolean).join(" ");

export const formatCount = (n) => new Intl.NumberFormat("en-US").format(n);

export const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};
