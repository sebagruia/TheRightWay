import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createCalendarEvent } from './services/googleCalendar';
import { verifyFirebaseToken, storeUserTokens, getUserTokens } from './services/firebase_server';
import { errorHandler, asyncHandler } from './middleware/errorHandler';
import type { Request, Response } from 'express';
import type { StoreTokensRequest, CreateEventRequestSecure } from './types/index';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);

// Body parsing middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Store OAuth tokens endpoint
app.post(
  '/api/auth/store-tokens',
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { idToken, accessToken, refreshToken }: StoreTokensRequest = req.body;

    if (!idToken) {
      res.status(400).json({
        success: false,
        error: 'Firebase ID token is required',
      });
      return;
    }

    if (!accessToken) {
      res.status(400).json({
        success: false,
        error: 'Access token is required',
      });
      return;
    }

    // Verify Firebase ID token
    const verificationResult = await verifyFirebaseToken(idToken);
    if (!verificationResult.success) {
      res.status(401).json({
        success: false,
        error: 'Invalid Firebase token',
      });
      return;
    }

    // Store tokens for the authenticated user
    const storeResult = await storeUserTokens(verificationResult.userId!, accessToken, refreshToken);

    if (storeResult.success) {
      res.status(200).json({
        success: true,
        message: 'Tokens stored successfully',
      });
    } else {
      res.status(500).json({
        success: false,
        error: storeResult.error || 'Failed to store tokens',
      });
    }
  }),
);

// Create Google Calendar event endpoint (secure version)
app.post(
  '/api/calendar/events',
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { idToken, event }: CreateEventRequestSecure = req.body;

    if (!idToken) {
      res.status(400).json({
        success: false,
        error: 'Firebase ID token is required',
      });
      return;
    }

    if (!event) {
      res.status(400).json({
        success: false,
        error: 'Event data is required',
      });
      return;
    }

    // Verify Firebase ID token
    const verificationResult = await verifyFirebaseToken(idToken);
    if (!verificationResult.success) {
      res.status(401).json({
        success: false,
        error: 'Invalid Firebase token',
      });
      return;
    }

    // Get stored tokens for the authenticated user
    const tokensResult = await getUserTokens(verificationResult.userId!);
    if (!tokensResult.success) {
      res.status(400).json({
        success: false,
        error: 'No Google Calendar access found. Please reconnect your Google account.',
      });
      return;
    }

    // Create calendar event using stored access token
    const result = await createCalendarEvent(tokensResult.accessToken!, event);

    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  }),
);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🔐 Store tokens endpoint: http://localhost:${PORT}/api/auth/store-tokens`);
  console.log(`📅 Google Calendar API endpoint: http://localhost:${PORT}/api/calendar/events`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});
