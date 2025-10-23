import { useNavigate } from 'react-router-dom';
import { Video, Monitor, Users, Zap, Globe, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Video,
      title: 'Multi-Source Streaming',
      description: 'Stream from webcam, capture cards, or screen sharing with seamless switching',
    },
    {
      icon: Zap,
      title: 'Low Latency',
      description: 'WebRTC-powered streaming for real-time, high-quality video delivery',
    },
    {
      icon: Globe,
      title: 'Adaptive Quality',
      description: 'Automatic quality adjustment based on network conditions',
    },
    {
      icon: Users,
      title: 'Multi-Viewer',
      description: 'Support unlimited concurrent viewers with shareable stream links',
    },
    {
      icon: Monitor,
      title: 'Custom Overlays',
      description: 'Add draggable text overlays and annotations to your streams',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'End-to-end encrypted streams with secure viewer authentication',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Now Live
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
              StreamNext
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Modern real-time video streaming with advanced features. 
              Stream anything, anywhere, instantly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                onClick={() => navigate('/broadcast')}
                size="lg"
                className="gap-2 bg-gradient-primary hover:opacity-90 shadow-glow text-lg px-8 py-6"
              >
                <Video className="w-5 h-5" />
                Start Broadcasting
              </Button>
              
              <Button
                onClick={() => navigate('/stream/demo')}
                variant="outline"
                size="lg"
                className="gap-2 text-lg px-8 py-6"
              >
                <Users className="w-5 h-5" />
                Watch a Stream
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Stream
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional-grade streaming features built for creators, 
            gamers, and businesses
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-glow transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <Card className="p-12 bg-gradient-primary text-primary-foreground text-center shadow-strong">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Go Live?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of streamers using StreamNext for their live broadcasts
          </p>
          <Button
            onClick={() => navigate('/broadcast')}
            size="lg"
            variant="secondary"
            className="gap-2 text-lg px-8 py-6"
          >
            <Video className="w-5 h-5" />
            Start Your Stream Now
          </Button>
        </Card>
      </section>
    </div>
  );
};

export default Index;
