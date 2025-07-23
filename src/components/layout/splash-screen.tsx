
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './logo';

interface SplashScreenProps {
  onFinished: () => void;
}

export function SplashScreen({ onFinished }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000); // Animation duration

    const finishTimer = setTimeout(() => {
        onFinished();
    }, 5000); // Total splash screen time

    return () => {
        clearTimeout(timer);
        clearTimeout(finishTimer);
    }
  }, [onFinished]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src="/video/lasertrack.mp4" type="video/mp4" />
          </video>
           <div className="absolute inset-0 bg-black/50"></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="z-10"
          >
            <Logo />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
