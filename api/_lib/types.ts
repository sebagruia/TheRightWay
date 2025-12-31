// Interfaces matching frontend CalendarEvent structure
export interface CalendarEvent {
  summary: string;
  location?: string;
  description?: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
}

// API request/response types
export interface CreateEventRequest {
  accessToken: string;
  event: CalendarEvent;
}

export interface CreateEventResponse {
  success: boolean;
  data?: any;
  error?: string;
}

// OAuth token interface
export interface TokenData {
  access_token: string;
  refresh_token?: string;
  scope: string;
  token_type: string;
  expiry_date?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Token storage request interface
export interface StoreTokensRequest {
  idToken: string; // Firebase ID token for authentication
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
}

// Secure event creation request
export interface CreateEventRequestSecure {
  idToken: string; // Firebase ID token for authentication
  event: CalendarEvent;
}
