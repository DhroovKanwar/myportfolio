/**
 * Service layer configuration.
 *
 * USE_MOCK = true  -> data resolves from local JSON (current, no backend).
 * USE_MOCK = false -> requests go through the Axios client to a real
 *                     (Laravel) backend using the endpoints registry.
 *
 * Every service method returns a Promise and mimics network latency so the
 * loading states you see today behave identically against a real API.
 */
export const USE_MOCK = true;

export const MOCK_LATENCY = 650; // ms

export const withLatency = (data, ms = MOCK_LATENCY) =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

export const maybeFail = (chance = 0) => Math.random() < chance;
