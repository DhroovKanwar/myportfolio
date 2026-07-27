import axios from "axios";

/**
 * Central Axios instance.
 * Base URL is driven purely by environment configuration so the same UI
 * can later point at a Laravel backend without touching component code.
 *
 * To switch to a real Laravel API in the future:
 *   1. Set REACT_APP_BACKEND_URL to your Laravel host.
 *   2. Flip USE_MOCK to false in src/services/config.js.
 * The service layer signatures stay identical — components never change.
 */
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";

const apiClient = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor — attach auth token when auth is added later.
apiClient.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? window.localStorage.getItem("dc_token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — normalize errors for the whole app.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalized = {
      status: error?.response?.status || 0,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.",
      data: error?.response?.data || null,
    };
    return Promise.reject(normalized);
  }
);

export default apiClient;
