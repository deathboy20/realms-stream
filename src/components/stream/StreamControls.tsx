import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StreamControlsProps {
  overlayText: string;
  onOverlayChange: (text: string) => void;
}

const StreamControls = ({ overlayText, onOverlayChange }: StreamControlsProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="overlay">Overlay Text</Label>
        <Input
          id="overlay"
          value={overlayText}
          onChange={(e) => onOverlayChange(e.target.value)}
          placeholder="Enter overlay text..."
          className="bg-secondary"
        />
      </div>

      <div className="space-y-2">
        <Label>Stream Quality</Label>
        <Select defaultValue="auto">
          <SelectTrigger className="bg-secondary">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="auto">Auto</SelectItem>
            <SelectItem value="1080p">1080p (FHD)</SelectItem>
            <SelectItem value="720p">720p (HD)</SelectItem>
            <SelectItem value="480p">480p</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Bitrate</Label>
        <div className="flex items-center gap-4">
          <Slider
            defaultValue={[5000]}
            max={10000}
            min={1000}
            step={500}
            className="flex-1"
          />
          <span className="text-sm text-muted-foreground min-w-[60px]">5000 kbps</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Frame Rate</Label>
        <Select defaultValue="30">
          <SelectTrigger className="bg-secondary">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="60">60 FPS</SelectItem>
            <SelectItem value="30">30 FPS</SelectItem>
            <SelectItem value="24">24 FPS</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default StreamControls;
