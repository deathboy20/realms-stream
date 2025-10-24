import { StreamVideoClient, User } from '@stream-io/video-react-sdk';

const apiKey = 'x78rpqd5z6zd';

// Your livestream ID from Stream dashboard
export const LIVESTREAM_ID = 'livestream_c5c61e52-642d-4b49-b574-887d92e82f72';

// IMPORTANT: Paste the FULL tokens (not truncated) below
// Broadcaster token (JWT) – often your "RTMP Stream Key" is a JWT containing user_id
const BROADCASTER_TOKEN = 'REPLACE_WITH_FULL_BROADCASTER_TOKEN';
// Viewer token (JWT)
const VIEWER_TOKEN = 'REPLACE_WITH_FULL_VIEWER_TOKEN';

// Generate a random user ID
const generateUserId = () => {
  return `user-${Math.random().toString(36).substring(2, 11)}`;
};

// Decode base64url JWT payload safely
const decodeJwtPayload = (token: string): Record<string, any> | null => {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(base64);
    return JSON.parse(json);
  } catch (e) {
    console.error('Failed to decode JWT payload:', e);
    return null;
  }
};

const getUserIdFromToken = (token: string): string | undefined => {
  const payload = decodeJwtPayload(token);
  if (!payload) return undefined;
  return (
    payload.user_id ||
    payload.userId ||
    payload?.user?.id ||
    payload.sub // fallback
  );
};

// Create and initialize Stream client for broadcasters
export const initializeBroadcasterClient = async (userId?: string) => {
  const tokenUserId = BROADCASTER_TOKEN && BROADCASTER_TOKEN.startsWith('ey')
    ? getUserIdFromToken(BROADCASTER_TOKEN)
    : undefined;
  const user: User = {
    id: userId || tokenUserId || generateUserId(),
    name: 'Broadcaster',
  };

  const client = new StreamVideoClient({
    apiKey,
    user,
    token: BROADCASTER_TOKEN,
  });

  return { client, user };
};

// Create and initialize Stream client for viewers
export const initializeViewerClient = async (userId?: string) => {
  const tokenUserId = VIEWER_TOKEN && VIEWER_TOKEN.startsWith('ey')
    ? getUserIdFromToken(VIEWER_TOKEN)
    : undefined;
  const user: User = {
    id: userId || tokenUserId || generateUserId(),
    name: 'Viewer',
  };

  const client = new StreamVideoClient({
    apiKey,
    user,
    token: VIEWER_TOKEN,
  });

  return { client, user };
};

export const createLivestreamCall = async (client: StreamVideoClient) => {
  const call = client.call('livestream', LIVESTREAM_ID);
  await call.getOrCreate({
    ring: false,
    data: {
      settings_override: {
        audio: {
          default_device: 'speaker',
          mic_default_on: true,
        },
        video: {
          camera_default_on: true,
          target_resolution: {
            width: 1280,
            height: 720,
          },
        },
      },
    },
  });
  
  return call;
};
