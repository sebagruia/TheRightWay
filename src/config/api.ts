// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4010';

// API Endpoints
export const API_ENDPOINTS = {
  STORE_TOKENS: `${API_BASE_URL}/api/auth/store-tokens`,
  CALENDAR_EVENTS: `${API_BASE_URL}/api/calendar/events`,
} as const;
