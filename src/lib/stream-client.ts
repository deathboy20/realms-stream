import { StreamVideoClient, User } from '@stream-io/video-react-sdk';

// Prefer env var; fall back to provided publishable key for dev
const apiKey = (import.meta as any).env?.VITE_STREAM_API_KEY ?? 'x78rpqd5z6zd';

// Generate a random user ID for anonymous streaming
const generateUserId = () => {
  return `user-${Math.random().toString(36).substring(2, 11)}`;
};

// Create and initialize Stream client
export const initializeStreamClient = async (userId?: string) => {
  const user: User = {
    id: userId || generateUserId(),
    name: userId || 'Anonymous User',
  };

  // For development without backend, we'll use a client-side approach
  // In production, tokens should be generated server-side
  const client = new StreamVideoClient({
    apiKey,
    user,
    tokenProvider: async () => {
      // Generate a development token client-side
      // Note: This is for development only. Production apps should generate tokens server-side
      return client.devToken(user.id);
    },
  });

  return { client, user };
};

export const createStreamCall = async (client: StreamVideoClient, callId: string) => {
  const call = client.call('default', callId);
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
