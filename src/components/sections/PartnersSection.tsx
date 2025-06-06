import React from 'react';
import { motion } from 'framer-motion';

// Partner logo component
const PartnerLogo: React.FC<{ name: string; logo: string }> = ({ name, logo }) => {
  return (
    <div className="flex items-center justify-center px-8 py-4">
      <div className="bg-white rounded-xl p-4 h-20 w-40 flex items-center justify-center group transition-all duration-300 hover:bg-neutral-100 hover:shadow-md border border-neutral-200 text-neutral-900">
        <div className="text-2xl font-bold text-neutral-700 group-hover:text-primary-700 transition-colors duration-300">{logo}</div>
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
    <section id="partners" className="py-16 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50 to-white opacity-80"></div>
      <div className="absolute inset-0 opacity-5" style={{ 
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%236d28d9\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
      }}></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-20 mb-8">
        <div className="text-center max-w-3xl mx-auto mb-10 animate-on-scroll">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-primary-100 border border-primary-200 rounded-full text-primary-700 inline-block mb-4 hover:bg-primary-200 transition-colors duration-300"
          >
            Trusted By
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-6"
          >
            Our Partners
          </motion.h2>
        </div>
      </div>

      <div className="relative z-20 py-4 ">
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