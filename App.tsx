import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { SOLAR_SYSTEM } from './constants';
import CelestialBody from './components/CelestialBody';
import Starfield from './components/Starfield';
import InfoOverlay from './components/InfoOverlay';
import { Language } from './types';

// Thresholds for swipe action
const SWIPE_THRESHOLD_RATIO = 0.2; // 20% of screen width to trigger flip
const SWIPE_VELOCITY = 300; // px/s

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [language, setLanguage] = useState<Language>('en');
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize width
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    // Set initial
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Motion values for the drag gesture
  // We use raw 'x' for the starfield to ensure it moves exactly in sync with the drag (no lag)
  const x = useMotionValue(0);

  // Handle Drag End
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    const currentWidth = width || window.innerWidth;
    
    // We calculate the swipe "power" to see if it's a decisive gesture
    const swipe = Math.abs(offset.x) * velocity.x;
    const isSwipe = Math.abs(offset.x) > currentWidth * SWIPE_THRESHOLD_RATIO || Math.abs(velocity.x) > SWIPE_VELOCITY;

    let newIndex = currentIndex;

    if (isSwipe) {
      // Dragged Left -> Next Slide
      if (offset.x < 0) {
        newIndex = Math.min(currentIndex + 1, SOLAR_SYSTEM.length - 1);
      } 
      // Dragged Right -> Prev Slide
      else {
        newIndex = Math.max(currentIndex - 1, 0);
      }
    }

    setCurrentIndex(newIndex);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentIndex(prev => Math.min(prev + 1, SOLAR_SYSTEM.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      className="relative w-full h-screen bg-black overflow-hidden text-white"
      ref={containerRef}
    >
      {/* 1. Starfield Background (Directly linked to x for tight sync) */}
      <Starfield x={x} />

      {/* 2. Main Swipe Container */}
      <motion.div
        className="flex w-full h-full cursor-grab active:cursor-grabbing touch-pan-y"
        drag="x"
        // Allow dragging across the full width of the solar system
        dragConstraints={{ 
          left: -((SOLAR_SYSTEM.length - 1) * width), 
          right: 0 
        }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        animate={{ x: -currentIndex * width }}
        style={{ x }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 40,
          mass: 1 
        }}
      >
        {SOLAR_SYSTEM.map((planet, index) => {
          // Transform logic for individual 3D effect based on screen position
          const planetOffset = useTransform(x, (latestX) => latestX + (index * width));
          
          // Parallax Rotation: Rotate slightly based on how far from center it is
          const rotateY = useTransform(planetOffset, [-width, width], [-25, 25]);
          
          // Scale: Slight zoom effect when centering
          const scale = useTransform(planetOffset, [-width, 0, width], [0.8, 1, 0.8]);
          
          return (
            <div 
              key={planet.id} 
              className="min-w-[100vw] h-full flex items-center justify-center relative perspective-1000"
              style={{ width: width }}
            >
              {/* Individual Planet Container */}
              <motion.div
                className="relative flex items-center justify-center"
                style={{
                  rotateY: rotateY,
                  scale: scale,
                  // Always fully opaque
                  opacity: 1
                }}
              >
                <CelestialBody data={planet} isActive={index === currentIndex} language={language} />
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* 3. UI Overlay (Fixed on top) */}
      <InfoOverlay 
        currentPlanet={SOLAR_SYSTEM[currentIndex]} 
        index={currentIndex}
        total={SOLAR_SYSTEM.length}
        onPrev={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
        onNext={() => setCurrentIndex(Math.min(SOLAR_SYSTEM.length - 1, currentIndex + 1))}
        language={language}
        onToggleLanguage={toggleLanguage}
      />
    </div>
  );
};

export default App;