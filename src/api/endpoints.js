/**
 * Endpoint registry — single source of truth for every API route.
 * Maps 1:1 to a future Laravel REST API so swapping the mock layer for
 * real HTTP calls is a config flip, not a refactor.
 */
export const ENDPOINTS = {
  projects: {
    list: "/projects",
    detail: (slug) => `/projects/${slug}`,
    create: "/projects",
    update: (id) => `/projects/${id}`,
    remove: (id) => `/projects/${id}`,
  },
  services: { list: "/services" },
  techStack: { list: "/tech-stack" },
  process: { list: "/process" },
  pricing: { list: "/pricing" },
  testimonials: { list: "/testimonials" },
  faq: { list: "/faq" },
  contact: {
    submit: "/contact",
    list: "/contact", // admin
  },
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    me: "/auth/me",
  },
  blog: {
    list: "/posts",
    detail: (slug) => `/posts/${slug}`,
  },
  uploads: "/uploads",
};

export default ENDPOINTS;
