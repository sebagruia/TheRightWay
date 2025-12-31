import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyFirebaseToken, getUserTokens } from '../_lib/firebase.js';
import { createCalendarEvent } from '../_lib/googleCalendar.js';
import type { CreateEventRequestSecure } from '../_lib/types.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    const { idToken, event }: CreateEventRequestSecure = req.body;

    // Validate required fields
    if (!idToken) {
      return res.status(400).json({
        success: false,
        error: 'Firebase ID token is required',
      });
    }

    if (!event) {
      return res.status(400).json({
        success: false,
        error: 'Event data is required',
      });
    }

    // Verify Firebase ID token
    const verificationResult = await verifyFirebaseToken(idToken);
    if (!verificationResult.success || !verificationResult.userId) {
      return res.status(401).json({
        success: false,
        error: 'Invalid Firebase token',
      });
    }

    // Get stored tokens for the authenticated user
    const { success, accessToken, expiresAt } = await getUserTokens(verificationResult.userId);
    if (!success) {
      return res.status(400).json({
        success: false,
        error: 'No Google Calendar access found. Please reconnect your Google account.',
      });
    }

    // Check if token is expired
    if (Date.now() >= expiresAt) {
      return res.status(401).json({
        success: false,
        error: 'Failed to refresh access token. Please reconnect your Google account.',
      });
    }

    // Create calendar event
    const result = await createCalendarEvent(accessToken, event);

    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error: any) {
    console.error('Error in calendar events handler:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}
