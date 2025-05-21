import React from 'react';
import { motion } from 'framer-motion';

// Partner logo component
const PartnerLogo: React.FC<{ name: string; logo: string }> = ({ name, logo }) => {
  return (
    <div className="flex items-center justify-center px-8 py-4">
      <div className="bg-neutral-900/80 rounded-xl p-4 h-20 w-40 flex items-center justify-center group transition-all duration-300 hover:bg-neutral-800 hover:shadow-glow-sm">
        <div className="text-2xl font-bold text-neutral-300 group-hover:text-white transition-colors duration-300">{logo}</div>
        <span className="sr-only">{name}</span>
      </div>
    </div>
  );
};

// Continuous scrolling marquee component
const InfiniteMarquee: React.FC<{ direction?: 'left' | 'right'; speed?: number; children: React.ReactNode }> = ({ 
  direction = 'left', 
  speed = 40, 
  children 
}) => {
  const marqueeVariants = {
    animate: {
      x: direction === 'left' ? [0, -1920] : [-1920, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 1920 / speed,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="overflow-hidden relative w-full">
      <motion.div
        className="flex whitespace-nowrap"
        variants={marqueeVariants}
        animate="animate"
      >
        {children}
        {children} {/* Duplicate to ensure continuous scrolling */}
      </motion.div>
    </div>
  );
};

export const PartnersSection = () => {
  // In a real application, these would be actual logo images
  // For this example, we're using text placeholders
  const partners = [
    { name: "MedTech Inc", logo: "MedTech" },
    { name: "HealthCorp", logo: "HealthCorp" },
    { name: "BioSystems", logo: "BioSys" },
    { name: "Global Health", logo: "GHealth" },
    { name: "TechMed Solutions", logo: "TechMed" },
    { name: "Innovate Health", logo: "InHealth" },
    { name: "Care Connect", logo: "CConnect" },
    { name: "MediSoft", logo: "MediSoft" },
  ];

  return (
    <section id="partners" className="py-16 relative overflow-hidden bg-neutral-900">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background opacity-70 z-10"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-20 mb-8">
        <div className="text-center max-w-3xl mx-auto mb-10 animate-on-scroll">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-primary-500/30 border border-primary-500/20 rounded-full text-primary-400 inline-block mb-4"
          >
            Trusted By
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold text-white mb-6"
          >
            Our Partners
          </motion.h2>
        </div>
      </div>

      <div className="relative z-20 py-4">
        <InfiniteMarquee speed={30}>
          {partners.map((partner, index) => (
            <PartnerLogo key={index} name={partner.name} logo={partner.logo} />
          ))}
        </InfiniteMarquee>
      </div>

      <div className="relative z-20 py-4 mt-4">
        <InfiniteMarquee direction="right" speed={20}>
          {[...partners].reverse().map((partner, index) => (
            <PartnerLogo key={index} name={partner.name} logo={partner.logo} />
          ))}
        </InfiniteMarquee>
      </div>
    </section>
  );
};