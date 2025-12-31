import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyFirebaseToken, storeUserTokens } from '../_lib/firebase.js';
import type { StoreTokensRequest } from '../_lib/types.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    const { idToken, accessToken, expiresAt }: StoreTokensRequest = req.body;

    // Validate required fields
    if (!idToken) {
      return res.status(400).json({
        success: false,
        error: 'Firebase ID token is required',
      });
    }

    if (!accessToken) {
      return res.status(400).json({
        success: false,
        error: 'Access token is required',
      });
    }

    // Verify Firebase ID token
    const verificationResult = await verifyFirebaseToken(idToken);
    if (!verificationResult.success) {
      return res.status(401).json({
        success: false,
        error: 'Invalid Firebase token',
      });
    }

    // Store tokens for the authenticated user
    const storeResult = await storeUserTokens(verificationResult.userId!, accessToken, expiresAt);

    if (storeResult.success) {
      return res.status(200).json({
        success: true,
        message: 'Tokens stored successfully',
      });
    } else {
      return res.status(500).json({
        success: false,
        error: storeResult.error || 'Failed to store tokens',
      });
    }
  } catch (error: any) {
    console.error('Error in store-tokens handler:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}
