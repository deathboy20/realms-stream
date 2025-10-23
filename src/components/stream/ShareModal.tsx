import { Copy, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

interface ShareModalProps {
  streamUrl: string;
  onClose: () => void;
}

const ShareModal = ({ streamUrl, onClose }: ShareModalProps) => {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(streamUrl);
    toast({
      title: "Copied!",
      description: "Stream URL copied to clipboard",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md p-6 space-y-6 relative">
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
        >
          <X className="w-4 h-4" />
        </Button>

        <div>
          <h2 className="text-2xl font-bold mb-2">Share Your Stream</h2>
          <p className="text-muted-foreground text-sm">
            Share this URL or QR code with viewers to join your stream
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={streamUrl}
              readOnly
              className="bg-secondary font-mono text-sm"
            />
            <Button onClick={handleCopy} size="icon" className="shrink-0">
              <Copy className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex justify-center p-6 bg-secondary rounded-lg">
            <QRCodeSVG
              value={streamUrl}
              size={200}
              level="H"
              includeMargin
              className="rounded-lg"
            />
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Scan the QR code or copy the link to share
        </div>
      </Card>
    </div>
  );
};

export default ShareModal;
