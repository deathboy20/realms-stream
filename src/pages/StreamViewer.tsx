import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Maximize, Volume2, VolumeX, Settings, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import QualitySelector from '@/components/stream/QualitySelector';

const StreamViewer = () => {
  const { callId } = useParams();
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [quality, setQuality] = useState('auto');
  const [viewers, setViewers] = useState(1);

  useEffect(() => {
    // Simulate viewer count updates
    const interval = setInterval(() => {
      setViewers(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
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
            {/* Video placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  StreamNext
                </div>
                <p className="text-muted-foreground">Live stream would appear here</p>
              </div>
            </div>

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
  );
};

export default StreamViewer;
