import React from 'react';
import { CelestialData, Language } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Globe } from 'lucide-react';

interface InfoOverlayProps {
  currentPlanet: CelestialData;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  language: Language;
  onToggleLanguage: () => void;
}

const InfoOverlay: React.FC<InfoOverlayProps> = ({ 
  currentPlanet, 
  index, 
  total, 
  onPrev, 
  onNext,
  language,
  onToggleLanguage
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between pb-12 pt-8 px-6 safe-area-inset">
      {/* Top Bar: Title & Controls */}
      <div className="flex justify-between items-start opacity-70 pointer-events-auto w-full">
        <div className="flex flex-col">
          <span className="text-xs tracking-[0.2em] font-light uppercase">
            {language === 'en' ? 'Solar System Tour' : '星际之旅'}
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          <button 
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-[10px] font-bold tracking-wider uppercase transition-colors"
          >
            <Globe size={12} />
            <span>{language === 'en' ? 'ZH' : 'EN'}</span>
          </button>
        </div>
      </div>

      {/* Bottom: Info & Controls */}
      <div className="flex flex-col items-center text-center gap-6">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPlanet.id + language}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <h1 
                className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-2"
                style={{ textShadow: `0 0 30px ${currentPlanet.colors.shadow}` }}
            >
              {currentPlanet.name[language]}
            </h1>
            <p className="text-sm md:text-base max-w-md text-gray-300 font-light leading-relaxed">
              {currentPlanet.description[language]}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Hints (Clickable for desktop/a11y) */}
        <div className="flex items-center gap-8 pointer-events-auto">
          <button 
            onClick={onPrev}
            disabled={index === 0}
            className={`p-3 rounded-full backdrop-blur-md bg-white/5 border border-white/10 transition-all hover:bg-white/20 active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed`}
            aria-label="Previous Planet"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
             <motion.div 
               className="h-full bg-white"
               initial={false}
               animate={{ width: `${((index + 1) / total) * 100}%` }}
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
             />
          </div>

          <button 
            onClick={onNext}
            disabled={index === total - 1}
            className={`p-3 rounded-full backdrop-blur-md bg-white/5 border border-white/10 transition-all hover:bg-white/20 active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed`}
            aria-label="Next Planet"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoOverlay;
