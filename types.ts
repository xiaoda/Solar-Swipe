export type Language = 'en' | 'zh';

export interface CelestialData {
  id: string;
  name: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  diameterRatio: number; // Relative to viewport width/height
  image: string; // URL to the real image
  aspectRatio?: number; // Width / Height ratio (default 1)
  colors: {
    base?: string; // Fallback or theme color
    shadow: string; // For text shadows
    atmosphere: string; // Glow color
  };
  hasRings?: boolean; // Kept for logic if needed, though image handles it now
  tilt?: number; // Rotation in degrees
}

export interface SwipeState {
  currentIndex: number;
  direction: number; // -1 for left, 1 for right
}
