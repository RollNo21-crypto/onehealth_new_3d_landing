import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Users, 
  Microscope, 
  Globe, 
  Heart, 
  Lightbulb 
} from 'lucide-react';
import { AnimatedBenefitsList } from '../ui/AnimatedBenefitsList';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// CSS for network dots pattern
const networkDotsStyle = {
  backgroundImage: `
    radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.3) 1px, transparent 2px),
    radial-gradient(circle at 25% 25%, rgba(79, 70, 229, 0.2) 2px, transparent 3px),
    radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.25) 1.5px, transparent 2.5px),
    radial-gradient(circle at 25% 75%, rgba(79, 70, 229, 0.15) 1px, transparent 2px),
    radial-gradient(circle at 75% 25%, rgba(139, 92, 246, 0.2) 1.2px, transparent 1.8px)
  `,
  backgroundSize: '30px 30px, 40px 40px, 35px 35px, 45px 45px, 38px 38px',
  backgroundPosition: '0 0, 15px 15px, -5px -5px, 20px -10px, -10px 20px',
};


// Replaced with AnimatedBenefitsList component



export const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-20 md:py-32 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50 to-white opacity-80"></div>
      <div className="absolute inset-0 opacity-5" style={{ 
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%236d28d9" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
      }}></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-primary-100 border border-primary-200 rounded-full text-primary-700 inline-block mb-4"
          >
            Key Benefits
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-6"
          >
            Why Choose Our Approach
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-neutral-600 text-lg"
          >
            Our integrated approach delivers tangible benefits across the entire healthcare ecosystem,
            from patients to providers to researchers.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-24">
          <div className="order-2 md:order-1">
            <AnimatedBenefitsList />
          </div>
          <div className="order-1 md:order-2 flex items-center justify-center">
            <div className="relative w-full">
              {/* Network dots and gradient background */}
              <div className="absolute inset-0 -m-8 md:-m-16 lg:-m-24 opacity-70">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-primary-500/20 rounded-full blur-3xl"></div>
                <div className="absolute inset-0 bg-network-dots"></div>
              </div>
              
              {/* Animated network connections */}
              <div className="absolute inset-0 -m-4 md:-m-12 lg:-m-16">
                {[...Array(8)].map((_, i) => (
                  <motion.div 
                    key={i}
                    className="absolute w-1 h-1 md:w-2 md:h-2 bg-primary-400 rounded-full"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      opacity: [0.2, 0.8, 0.2],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 3,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
              
              {/* Main brain animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative z-10 w-full max-w-md md:max-w-lg lg:max-w-3xl mx-auto"
              >
                <DotLottieReact
                  src="https://lottie.host/62d9faf1-0780-49cf-adc7-9526a9cddf9e/60VjkshloO.lottie"
                  loop
                  autoplay
                />
                
                {/* Glowing orbs around the brain */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={`orb-${i}`}
                      className="absolute rounded-full bg-gradient-to-r from-primary-500/30 to-secondary-500/30 blur-md"
                      style={{
                        width: `${20 + Math.random() * 40}px`,
                        height: `${20 + Math.random() * 40}px`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        opacity: [0.3, 0.7, 0.3],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 to-secondary-600 p-1"
        >
          <div className="bg-white rounded-[1.4rem] p-8 md:p-12 text-neutral-900 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mb-6">
                  Discover Medical Events & Conferences
                </h3>
                <p className="text-neutral-600 mb-8">
                  Stay updated with the latest medical conferences, surgical workshops, and healthcare innovation events worldwide.
                </p>
                <motion.a
                  href="https://events.posspole.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px 5px rgba(109, 40, 217, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-full shadow-glow transition-all"
                >
                  Explore Events
                </motion.a>
              </div>
              <div className="relative h-full min-h-[200px] flex items-center justify-center">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    rotate: { repeat: Infinity, duration: 20, ease: "linear" },
                    scale: { repeat: Infinity, duration: 8, ease: "easeInOut" }
                  }}
                  className="absolute w-72 h-72 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-400/20 blur-xl"
                />
                <motion.div
                  animate={{ 
                    rotate: [360, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    rotate: { repeat: Infinity, duration: 15, ease: "linear" },
                    scale: { repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }
                  }}
                  className="absolute w-60 h-60 md:w-64 md:h-64 rounded-full bg-gradient-to-r from-secondary-400/20 to-primary-500/20 blur-lg"
                />
                <div className="relative z-10 bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src="/images/stats-chart.png" 
                    alt="Statistics Chart"
                    className="w-24 h-24 mx-auto mb-4 rounded-xl"
                  />
                  <span className="block text-6xl md:text-7xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-300">98%</span>
                  <span className="text-xl text-neutral-900 mt-2 block">Customer Retention</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};