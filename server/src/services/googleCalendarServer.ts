import { google } from 'googleapis';
import type { CalendarEvent, ApiResponse } from '../types/index.js';

// Create Google Calendar client with access token
const createCalendarClient = (accessToken: string) => {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  return google.calendar({ version: 'v3', auth: oauth2Client });
};

// Create calendar event
export const createCalendarEvent = async (accessToken: string, eventData: CalendarEvent): Promise<ApiResponse> => {
  try {
    const calendar = createCalendarClient(accessToken);

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: eventData,
    });

    return {
      success: true,
      data: response.data,
      message: 'Event created successfully',
    };
  } catch (error: any) {
    console.error('Error creating calendar event:', error);

    return {
      success: false,
      error: error.message || 'Failed to create calendar event',
      data: error.response?.data || null,
    };
  }
};

// Validate access token by making a API call
export const validateAccessToken = async (accessToken: string): Promise<boolean> => {
  try {
    const calendar = createCalendarClient(accessToken);
    await calendar.calendarList.list({ maxResults: 1 });
    return true;
  } catch (error) {
    console.error('Invalid access token:', error);
    return false;
  }
};

// Get calendar list (for potential future use)
export const getCalendarList = async (accessToken: string): Promise<ApiResponse> => {
  try {
    const calendar = createCalendarClient(accessToken);

    const response = await calendar.calendarList.list();

    return {
      success: true,
      data: response.data.items,
      message: 'Calendar list retrieved successfully',
    };
  } catch (error: any) {
    console.error('Error getting calendar list:', error);

    return {
      success: false,
      error: error.message || 'Failed to get calendar list',
    };
  }
};
