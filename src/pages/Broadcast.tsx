import { useState } from 'react';
import { Video, VideoOff, Mic, MicOff, Monitor, Settings, Users, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import StreamControls from '@/components/stream/StreamControls';
import StreamOverlay from '@/components/stream/StreamOverlay';
import ShareModal from '@/components/stream/ShareModal';
import { useToast } from '@/components/ui/use-toast';

const Broadcast = () => {
  const { toast } = useToast();
  const [isStreaming, setIsStreaming] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [streamUrl, setStreamUrl] = useState('');
  const [overlayText, setOverlayText] = useState('');

  const handleStartStream = async () => {
    try {
      // Generate a unique stream ID
      const streamId = `stream-${Date.now()}`;
      const url = `${window.location.origin}/stream/${streamId}`;
      setStreamUrl(url);
      setIsStreaming(true);
      
      toast({
        title: "Stream Started",
        description: "Your broadcast is now live!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start stream. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleStopStream = () => {
    setIsStreaming(false);
    setIsCameraOn(false);
    setIsScreenSharing(false);
    toast({
      title: "Stream Ended",
      description: "Your broadcast has been stopped.",
    });
  };

  const toggleCamera = async () => {
    try {
      if (!isCameraOn) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: !isMuted });
        // Handle stream
        setIsCameraOn(true);
      } else {
        // Stop stream
        setIsCameraOn(false);
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        setIsScreenSharing(true);
        setIsCameraOn(false);
      } else {
        setIsScreenSharing(false);
      }
    } catch (error) {
      toast({
        title: "Screen Share Error",
        description: "Unable to start screen sharing.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Video className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">StreamNext</h1>
              <p className="text-xs text-muted-foreground">Broadcast Studio</p>
            </div>
          </div>
          
          {isStreaming && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-destructive/10 text-destructive px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                <span className="text-sm font-medium">LIVE</span>
              </div>
              <Button
                onClick={() => setShowShareModal(true)}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr,320px] gap-6">
          {/* Video Preview */}
          <div className="space-y-4">
            <Card className="relative aspect-video bg-secondary overflow-hidden shadow-strong">
              {!isCameraOn && !isScreenSharing ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <VideoOff className="w-16 h-16 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">No video source active</p>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    {isScreenSharing ? <Monitor className="w-20 h-20" /> : <Video className="w-20 h-20" />}
                  </div>
                </div>
              )}
              
              {overlayText && (
                <StreamOverlay text={overlayText} />
              )}
            </Card>

            {/* Stream Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button
                onClick={toggleCamera}
                variant={isCameraOn ? "default" : "outline"}
                size="lg"
                className="gap-2"
              >
                {isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                Camera
              </Button>

              <Button
                onClick={toggleScreenShare}
                variant={isScreenSharing ? "default" : "outline"}
                size="lg"
                className="gap-2"
              >
                <Monitor className="w-5 h-5" />
                Screen
              </Button>

              <Button
                onClick={() => setIsMuted(!isMuted)}
                variant={isMuted ? "destructive" : "outline"}
                size="lg"
                className="gap-2"
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                {isMuted ? "Unmute" : "Mute"}
              </Button>

              {!isStreaming ? (
                <Button
                  onClick={handleStartStream}
                  disabled={!isCameraOn && !isScreenSharing}
                  size="lg"
                  className="gap-2 bg-gradient-primary hover:opacity-90 shadow-glow"
                >
                  <Video className="w-5 h-5" />
                  Go Live
                </Button>
              ) : (
                <Button
                  onClick={handleStopStream}
                  variant="destructive"
                  size="lg"
                  className="gap-2"
                >
                  Stop Stream
                </Button>
              )}
            </div>
          </div>

          {/* Settings Panel */}
          <div className="space-y-4">
            <Card className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Stream Settings
                </h3>
                <StreamControls
                  overlayText={overlayText}
                  onOverlayChange={setOverlayText}
                />
              </div>

              {isStreaming && (
                <div className="pt-4 border-t border-border">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Viewers
                  </h3>
                  <div className="text-2xl font-bold text-primary">0</div>
                  <p className="text-xs text-muted-foreground">Currently watching</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>

      {showShareModal && (
        <ShareModal
          streamUrl={streamUrl}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
};

export default Broadcast;
