import admin from 'firebase-admin';
import dotenv from 'dotenv';

// Load environment variables first
dotenv.config();

// Initialize Firebase Admin SDK once
const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

// Validate required fields
if (!serviceAccount.project_id) {
  throw new Error('FIREBASE_PROJECT_ID environment variable is required');
}
if (!serviceAccount.client_email) {
  throw new Error('FIREBASE_CLIENT_EMAIL environment variable is required');
}
if (!serviceAccount.private_key) {
  throw new Error('FIREBASE_PRIVATE_KEY environment variable is required');
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

// Export reusable instances
export const firestore = admin.firestore();
export const auth = admin.auth();

// Verify Firebase ID token
export const verifyFirebaseToken = async (idToken: string) => {
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    return {
      success: true,
      userId: decodedToken.uid,
      email: decodedToken.email,
    };
  } catch (error: any) {
    console.error('Error verifying Firebase token:', error);
    return {
      success: false,
      error: error.message || 'Invalid Firebase token',
    };
  }
};

// Store Google OAuth tokens for a user
export const storeUserTokens = async (userId: string, accessToken: string, refreshToken?: string) => {
  try {
    const tokenData = {
      accessToken,
      refreshToken: refreshToken || null,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await firestore.collection('userTokens').doc(userId).set(tokenData, { merge: true });

    return { success: true };
  } catch (error: any) {
    console.error('Error storing user tokens:', error);
    return {
      success: false,
      error: error.message || 'Failed to store tokens',
    };
  }
};

// Get stored Google OAuth tokens for a user
export const getUserTokens = async (userId: string) => {
  try {
    const doc = await firestore.collection('userTokens').doc(userId).get();

    if (!doc.exists) {
      return {
        success: false,
        error: 'No tokens found for user',
      };
    }

    const data = doc.data();
    return {
      success: true,
      accessToken: data?.accessToken,
      refreshToken: data?.refreshToken,
    };
  } catch (error: any) {
    console.error('Error getting user tokens:', error);
    return {
      success: false,
      error: error.message || 'Failed to get tokens',
    };
  }
};
