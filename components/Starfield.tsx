import React, { useEffect, useRef } from 'react';
import { MotionValue, useTransform } from 'framer-motion';

interface StarfieldProps {
  x: MotionValue<number>;
}

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

const Starfield: React.FC<StarfieldProps> = ({ x }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Directly map the container's X position to a parallax offset for stars.
  // Multiply by a small factor (e.g., 0.1) so stars move slower than the foreground (planets).
  // We remove the internal spring to ensure the movement feels "tight" and perfectly synced with the finger/swipe.
  const parallaxX = useTransform(x, (latest) => latest * 0.1); 

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let stars: Star[] = [];

    const initStars = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      // Keep star density relatively low for a clean look
      const starCount = Math.floor((width * height) / 10000); 
      stars = [];
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random(),
          // Speed factor varies to create depth within the starfield itself
          speed: Math.random() * 0.2 + 0.05,
        });
      }
    };

    let animationFrameId: number;
    
    const render = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, width, height);
      
      // Get current parallax offset directly from the MotionValue
      const offsetX = parallaxX.get();

      stars.forEach((star) => {
        // Simple twinkle
        star.opacity += (Math.random() - 0.5) * 0.05;
        if (star.opacity < 0.1) star.opacity = 0.1;
        if (star.opacity > 1) star.opacity = 1;

        // Apply Parallax:
        // offsetX is the global swipe offset scaled down.
        // We multiply by star.speed so distinct stars move at different rates (depth).
        // The factor '5' adjusts the overall sensitivity of the star layer relative to the parallaxX input.
        let drawX = (star.x + offsetX * star.speed * 5) % width; 
        
        // Wrap around logic for infinite scrolling effect
        if (drawX < 0) drawX += width;
        if (drawX > width) drawX -= width;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.arc(drawX, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    initStars();
    render();

    const handleResize = () => {
      initStars();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [parallaxX]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
};

export default Starfield;