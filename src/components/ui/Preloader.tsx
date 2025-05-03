import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface PreloaderProps {
  minLoadingTime?: number; // Minimum time to show the preloader in ms
  forceDisplay?: boolean; // Force display even if page is loaded
}

export const Preloader: React.FC<PreloaderProps> = ({ minLoadingTime = 8000, forceDisplay = true }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate minimum loading time to ensure animation is visible
    const timer = setTimeout(() => {
      setLoading(false);
    }, minLoadingTime);

    // Create progress animation that updates every 100ms
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (minLoadingTime / 100));
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [minLoadingTime]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <DotLottieReact
              src="https://lottie.host/cf2378d6-1bc1-4aed-b164-9ebdda2b3c43/UXi6z5rroz.lottie"
              loop
              autoplay
            />
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
              className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-primary-500 to-secondary-400 rounded-full"
            />
            <div className="absolute bottom-6 left-0 w-full text-center text-sm font-medium text-primary-500">
              {Math.round(progress)}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};