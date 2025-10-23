import { useState } from 'react';
import Draggable from 'react-draggable';

interface StreamOverlayProps {
  text: string;
}

const StreamOverlay = ({ text }: StreamOverlayProps) => {
  const [position, setPosition] = useState({ x: 20, y: 20 });

  return (
    <Draggable
      position={position}
      onStop={(e, data) => setPosition({ x: data.x, y: data.y })}
    >
      <div className="absolute cursor-move select-none">
        <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-semibold shadow-lg border border-white/10">
          {text}
        </div>
      </div>
    </Draggable>
  );
};

export default StreamOverlay;
