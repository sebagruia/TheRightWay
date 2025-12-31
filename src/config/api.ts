// API Configuration
// Use relative URLs for both dev and production (works with vercel dev and Vercel deployment)
export const API_BASE_URL = '';

export const API_ENDPOINTS = {
  STORE_TOKENS: `${API_BASE_URL}/api/auth/store-tokens`,
  CALENDAR_EVENTS: `${API_BASE_URL}/api/calendar/events`,
} as const;
