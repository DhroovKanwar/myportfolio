import apiClient from "@/api/client";
import ENDPOINTS from "@/api/endpoints";
import { USE_MOCK, withLatency } from "@/services/config";
import services from "@/data/services.json";
import techStack from "@/data/techstack.json";
import process from "@/data/process.json";
import pricing from "@/data/pricing.json";
import testimonials from "@/data/testimonials.json";
import faq from "@/data/faq.json";

/**
 * Content service — serves the static marketing content.
 * Swap USE_MOCK to false and every method hits the Laravel API instead.
 */
export const contentService = {
  async getServices() {
    if (USE_MOCK) return withLatency(services);
    const { data } = await apiClient.get(ENDPOINTS.services.list);
    return data;
  },
  async getTechStack() {
    if (USE_MOCK) return withLatency(techStack);
    const { data } = await apiClient.get(ENDPOINTS.techStack.list);
    return data;
  },
  async getProcess() {
    if (USE_MOCK) return withLatency(process);
    const { data } = await apiClient.get(ENDPOINTS.process.list);
    return data;
  },
  async getPricing() {
    if (USE_MOCK) return withLatency(pricing);
    const { data } = await apiClient.get(ENDPOINTS.pricing.list);
    return data;
  },
  async getTestimonials() {
    if (USE_MOCK) return withLatency(testimonials);
    const { data } = await apiClient.get(ENDPOINTS.testimonials.list);
    return data;
  },
  async getFaq() {
    if (USE_MOCK) return withLatency(faq);
    const { data } = await apiClient.get(ENDPOINTS.faq.list);
    return data;
  },
};

export default contentService;
