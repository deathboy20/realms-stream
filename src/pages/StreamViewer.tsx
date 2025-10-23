import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Maximize, Volume2, VolumeX, Users, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import QualitySelector from '@/components/stream/QualitySelector';
import { StreamVideo, StreamCall, Call, ParticipantView } from '@stream-io/video-react-sdk';
import { initializeStreamClient } from '@/lib/stream-client';
import { useToast } from '@/components/ui/use-toast';
import '@stream-io/video-react-sdk/dist/css/styles.css';

const StreamViewer = () => {
  const { callId } = useParams();
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [quality, setQuality] = useState('auto');
  const [viewers] = useState(1);
  const [client, setClient] = useState<any>(null);
  const [call, setCall] = useState<Call | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const joinStream = async () => {
      if (!callId) {
        navigate('/');
        return;
      }

      try {
        const { client: streamClient } = await initializeStreamClient();
        setClient(streamClient);

        const streamCall = streamClient.call('default', callId);
        await streamCall.join();
        
        setCall(streamCall);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to join stream:', error);
        toast({
          title: 'Connection Error',
          description: 'Failed to connect to the stream',
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    };

    joinStream();

    return () => {
      if (call) {
        call.leave();
      }
      if (client) {
        client.disconnectUser();
      }
    };
  }, [callId, navigate]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Video className="w-16 h-16 mx-auto text-primary animate-pulse" />
          <p className="text-muted-foreground">Connecting to stream...</p>
          <p className="text-muted-foreground/60 text-sm">Stream ID: {callId}</p>
        </div>
      </div>
    );
  }

  if (!client || !call) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Video className="w-16 h-16 mx-auto text-muted-foreground" />
          <p className="text-muted-foreground">Unable to connect to stream</p>
          <Button onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </div>
    );
  }

  return (
    <StreamVideo client={client}>
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
              >
                ← Back
              </Button>
              <div className="text-sm">
                <span className="text-muted-foreground">Stream ID:</span>
                <span className="ml-2 font-mono text-foreground">{callId}</span>
              </div>
              <div className="flex items-center gap-2 bg-destructive/10 text-destructive px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                <span className="text-xs font-medium">LIVE</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="font-semibold text-foreground">{Math.max(1, viewers)}</span>
              <span className="text-muted-foreground">watching</span>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <Card className="relative aspect-video bg-secondary overflow-hidden shadow-strong">
              <StreamCall call={call}>
                <div className="absolute inset-0">
                  {call.state.remoteParticipants.length > 0 ? (
                    <ParticipantView
                      participant={call.state.remoteParticipants[0]}
                      ParticipantViewUI={null}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary/20 to-accent/20">
                      <div className="text-center space-y-4">
                        <Video className="w-16 h-16 mx-auto text-muted-foreground" />
                        <p className="text-muted-foreground">Waiting for broadcaster...</p>
                      </div>
                    </div>
                  )}
                </div>
              </StreamCall>

            {/* Stream Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => setIsMuted(!isMuted)}
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 bg-black/50 hover:bg-black/70"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </Button>
                  
                  <QualitySelector
                    quality={quality}
                    onQualityChange={setQuality}
                  />
                </div>

                <Button
                  onClick={toggleFullscreen}
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 bg-black/50 hover:bg-black/70"
                >
                  <Maximize className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Quality Indicator */}
            <div className="absolute top-4 right-4">
              <div className="bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                {quality === 'auto' ? 'Auto' : quality.toUpperCase()}
              </div>
            </div>
          </Card>

          {/* Stream Info */}
          <div className="mt-6 space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-2">About This Stream</h2>
              <p className="text-muted-foreground">
                You're watching a live stream on StreamNext. This is a modern real-time video streaming platform
                with support for webcam, screen sharing, and custom overlays.
              </p>
            </Card>
          </div>
          </div>
        </main>
      </div>
    </StreamVideo>
  );
};

export default StreamViewer;
