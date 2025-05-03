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



const BentoGrid = () => {
  const benefits = [
    {
      icon: <ShieldCheck size={24} />,
      title: "Enhanced Security",
      description: "Multi-layered security architecture ensuring patient data remains protected.",
      color: "from-purple-500/20 to-blue-500/20"
    },
    {
      icon: <Zap size={24} />,
      title: "Increased Efficiency",
      description: "Streamlined workflows reducing administrative burden by up to 40%.",
      color: "from-cyan-500/20 to-blue-500/20"
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Data-Driven Insights",
      description: "Advanced analytics transforming raw data into actionable intelligence.",
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      icon: <Users size={24} />,
      title: "Improved Collaboration",
      description: "Breaking down silos between departments and organizations.",
      color: "from-orange-500/20 to-red-500/20"
    },
    {
      icon: <Heart size={24} />,
      title: "Better Outcomes",
      description: "Comprehensive patient-centered approach leading to improved health outcomes.",
      color: "from-pink-500/20 to-rose-500/20"
    },
    {
      icon: <Globe size={24} />,
      title: "Global Access",
      description: "Infrastructure designed to function in diverse environments globally.",
      color: "from-indigo-500/20 to-violet-500/20"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {benefits.map((benefit, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="group relative overflow-hidden rounded-2xl bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-6 hover:border-primary-500/50 transition-all duration-300"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
          <div className="relative z-10">
            <div className="p-3 bg-primary-500/10 rounded-xl w-fit mb-4 text-primary-400 group-hover:scale-110 transition-transform duration-300">
              {benefit.icon}
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-primary-400 transition-colors duration-300">
              {benefit.title}
            </h3>
            <p className="text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300">
              {benefit.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};



export const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-20 md:py-32 relative overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-neutral-950 to-background opacity-80"></div>
      <div className="absolute inset-0 opacity-10" style={{ 
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
      }}></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-primary-500/30 border border-primary-500/20 rounded-full text-primary-400 inline-block mb-4"
          >
            Key Benefits
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold text-white mb-6"
          >
            Why Choose Our Approach
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-neutral-400 text-lg"
          >
            Our integrated approach delivers tangible benefits across the entire healthcare ecosystem,
            from patients to providers to researchers.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:gap-12 mb-24">
          <BentoGrid />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 to-secondary-600 p-1"
        >
          <div className="bg-neutral-900 rounded-[1.4rem] p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-6">
                  Ready to transform your health systems?
                </h3>
                <p className="text-neutral-300 mb-8">
                  Join the hundreds of organizations already benefiting from our integrated approach to healthcare innovation.
                </p>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px 5px rgba(109, 40, 217, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-full shadow-glow transition-all"
                >
                  Schedule a Demo
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
                <div className="relative z-10 text-center">
                  <span className="block text-6xl md:text-7xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-300">98%</span>
                  <span className="text-xl text-white">Customer Retention</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};