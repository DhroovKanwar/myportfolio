import apiClient from "@/api/client";
import ENDPOINTS from "@/api/endpoints";
import { USE_MOCK, withLatency, maybeFail } from "@/services/config";

/**
 * Contact service.
 *
 * Today: simulates a POST /api/contact with latency + a tiny random failure
 * rate so the UI's success/error toasts are both exercisable.
 *
 * Tomorrow (Laravel): flip USE_MOCK -> false in services/config.js and this
 * fires a real POST to `${REACT_APP_BACKEND_URL}/api/contact`. No UI change.
 */
export const contactService = {
  async submitInquiry(payload) {
    if (USE_MOCK) {
      if (maybeFail(0.12)) {
        await withLatency(null, 900);
        throw { status: 500, message: "Server is busy. Please retry in a moment." };
      }
      const receipt = {
        id: `INQ-${Date.now().toString(36).toUpperCase()}`,
        received_at: new Date().toISOString(),
        ...payload,
      };
      return withLatency({ success: true, data: receipt }, 1100);
    }
    const { data } = await apiClient.post(ENDPOINTS.contact.submit, payload);
    return data;
  },
};

export default contactService;
