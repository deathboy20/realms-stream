import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface QualitySelectorProps {
  quality: string;
  onQualityChange: (quality: string) => void;
}

const QualitySelector = ({ quality, onQualityChange }: QualitySelectorProps) => {
  const qualities = [
    { value: 'auto', label: 'Auto' },
    { value: '1080p', label: '1080p (FHD)' },
    { value: '720p', label: '720p (HD)' },
    { value: '480p', label: '480p' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 bg-black/50 hover:bg-black/70"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {qualities.map((q) => (
          <DropdownMenuItem
            key={q.value}
            onClick={() => onQualityChange(q.value)}
            className={quality === q.value ? 'bg-primary/10' : ''}
          >
            {q.label}
            {quality === q.value && (
              <span className="ml-auto text-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QualitySelector;
