import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { ChevronDown } from 'lucide-react';
import { Globe } from '../ui/Globe';

export const HeroSection = () => {
  const globeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!globeRef.current) return;
      const x = (window.innerWidth / 2 - e.clientX) / 40;
      const y = (window.innerHeight / 2 - e.clientY) / 40;
      globeRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="hero" className="min-h-screen relative flex items-center overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/40 via-background to-background"></div>
        <div className="absolute inset-0 opacity-30 animate-gradient bg-[length:400%_400%]" style={{ 
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(109, 40, 217, 0.4) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(34, 211, 238, 0.4) 0%, transparent 40%)' 
        }}></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="animate-on-scroll">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <span className="px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-primary-500/30 border border-primary-500/20 rounded-full text-primary-400">
                Transforming Global Health
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight text-white mb-6">
                <Typewriter
                  options={{
                    strings: ['One Health. One Vision. One Future.'],
                    autoStart: true,
                    loop: false,
                    deleteSpeed: 60000,
                    delay: 80,
                  }}
                />
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-neutral-300 mb-8 max-w-xl"
            >
              We're pioneering cutting-edge technologies to create a unified vision for global health, bringing together science, data, and human expertise.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4 md:gap-6"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px 5px rgba(109, 40, 217, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-full shadow-glow transition-all"
              >
                Get Started
              </motion.a>
              <motion.a
                href="#solutions"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-transparent border border-neutral-700 hover:border-primary-500 text-white font-medium rounded-full hover:bg-primary-500/10 transition-all flex items-center gap-2"
              >
                Explore Solutions
              </motion.a>
            </motion.div>
          </div>

          <div className="flex justify-center lg:justify-end relative">
            <div ref={globeRef} className="relative w-full max-w-md h-[400px]">
              <Globe className="animate-float" />
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <a href="#solutions" aria-label="Scroll down">
              <ChevronDown size={32} className="text-neutral-400" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};