import apiClient from "@/api/client";
import ENDPOINTS from "@/api/endpoints";
import { USE_MOCK, withLatency } from "@/services/config";
import projects from "@/data/projects.json";

/**
 * Portfolio service — dummy JSON today, Laravel-ready tomorrow.
 */
export const portfolioService = {
  async getProjects() {
    if (USE_MOCK) return withLatency(projects);
    const { data } = await apiClient.get(ENDPOINTS.projects.list);
    return data;
  },

  async getProject(slug) {
    if (USE_MOCK) {
      const found = projects.find((p) => p.slug === slug) || null;
      return withLatency(found);
    }
    const { data } = await apiClient.get(ENDPOINTS.projects.detail(slug));
    return data;
  },
};

export default portfolioService;
