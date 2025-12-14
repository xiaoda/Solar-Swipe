import React from 'react';
import { CelestialData, Language } from '../types';

interface CelestialBodyProps {
  data: CelestialData;
  isActive: boolean;
  language: Language;
}

const CelestialBody: React.FC<CelestialBodyProps> = ({ data, isActive, language }) => {
  const isSaturn = data.id === 'saturn';

  // Base size calculation
  // For round planets, width = height = diameterRatio
  // For Saturn, height = diameterRatio, Width is auto (controlled by aspect ratio of image)
  const baseHeight = `min(${data.diameterRatio * 100}vw, ${data.diameterRatio * 100}vh)`;
  
  const containerStyle = {
    height: baseHeight,
    width: isSaturn ? 'auto' : baseHeight,
    aspectRatio: isSaturn ? `${data.aspectRatio}` : '1',
    transform: `rotate(${data.tilt}deg)`,
  };

  return (
    <div className="relative flex items-center justify-center pointer-events-none select-none">
      <div 
        className="relative transition-transform duration-1000 ease-out flex items-center justify-center"
        style={containerStyle}
      >
        {isSaturn ? (
          /* Saturn Special Rendering: Image with screen blend mode to hide black background */
          <img 
            src={data.image} 
            alt={data.name[language]}
            className="w-full h-full object-contain mix-blend-screen"
            draggable={false}
          />
        ) : (
          /* Standard Planet Rendering: Circle with Background Image + Inner Shadow */
          <div className="w-full h-full relative rounded-full overflow-hidden">
             {/* The Image */}
             <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${data.image})` }}
                role="img"
                aria-label={data.name[language]}
             />
             
             {/* Additional Gradient for Dark Side */}
             <div 
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 30% 30%, transparent 40%, #000 130%)`,
                  mixBlendMode: 'multiply',
                  opacity: 0.8
                }}
             />
          </div>
        )}
      </div>
    </div>
  );
};

export default CelestialBody;
