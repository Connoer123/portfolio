import Spline from '@splinetool/react-spline';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function HeroScene() {
  const [isLoaded, setIsLoaded] = useState(false);
  const LoadingText = motion.div;

  return (
    <div className="relative w-full h-full">
      {/* loading screen */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#050305] flex items-center justify-center z-10">
          <LoadingText 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-[#D2A1BD] font-mono tracking-[0.5em] text-xs uppercase"
          >
            Initializing 3D Environment...
          </LoadingText>
        </div>
      )}

      <Spline 
        scene="https://prod.spline.design/BGuTRcjdOSTxwZ5I/scene.splinecode" 
        onLoad={() => setIsLoaded(true)}
        className="w-full h-full"
      />
    </div>
  );
}
