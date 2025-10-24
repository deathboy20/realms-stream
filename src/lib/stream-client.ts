import { StreamVideoClient, User } from '@stream-io/video-react-sdk';

const apiKey = 'x78rpqd5z6zd';

// Your livestream ID from Stream dashboard
export const LIVESTREAM_ID = 'livestream_c5c61e52-642d-4b49-b574-887d92e82f72';

// Viewer token from Stream dashboard (replace with your full token)
const VIEWER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJAc3RyZWFtLWlvL2Rhc2hib2FyZCIsImlhdCI6MTc2MTI1MDIz...';

// Generate a random user ID for anonymous streaming
const generateUserId = () => {
  return `user-${Math.random().toString(36).substring(2, 11)}`;
};

// Create and initialize Stream client for broadcasters
export const initializeBroadcasterClient = async (userId?: string) => {
  const user: User = {
    id: userId || 'broadcaster-' + generateUserId(),
    name: userId || 'Broadcaster',
  };

  const client = new StreamVideoClient({
    apiKey,
    user,
    tokenProvider: async () => {
      // Using dev token for broadcaster
      // In production, generate this server-side with proper permissions
      return client.devToken(user.id);
    },
  });

  return { client, user };
};

// Create and initialize Stream client for viewers
export const initializeViewerClient = async (userId?: string) => {
  const user: User = {
    id: userId || 'viewer-' + generateUserId(),
    name: userId || 'Anonymous Viewer',
  };

  const client = new StreamVideoClient({
    apiKey,
    user,
    token: VIEWER_TOKEN, // Use the viewer token directly
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
