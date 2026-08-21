import { useEffect } from "react";

/**
 * Lightweight SEO: updates document title + key meta tags per route.
 * Future-proof: swap for react-helmet or SSR meta when a backend/blog lands.
 */
const setMeta = (name, content, attr = "name") => {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

export default function SEO({ title, description, path = "" }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — Dhruv Digital Solutions` : "Dhruv Digital Solutions — Senior Full Stack Developer";
    document.title = fullTitle;
    setMeta("description", description);
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", "website", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${window.location.origin}${path}`);
  }, [title, description, path]);

  return null;
}
