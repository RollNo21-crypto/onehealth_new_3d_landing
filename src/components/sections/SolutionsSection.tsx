import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Heart, 
  Brain, 
  Microscope, 
  BadgeCheck, 
  Leaf, 
  Globe, 
  Laptop, 
  PieChart, 
  ShieldCheck,
  CheckCircle,
  Users,
  LineChart,
  Shield,
  Zap
} from 'lucide-react';

interface CircleOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  index: number;
  isActive: boolean;
  onClick: () => void;
  angle: number;
}

const CircleOption: React.FC<CircleOptionProps> = ({ 
  icon, 
  title, 
  description, 
  color, 
  index, 
  isActive, 
  onClick, 
  angle 
}) => {
  // Define position styles for components on left and right sides
  const positionStyles = {
    'right-top': { 
      top: '25%', 
      right: '5%',
      transform: 'translateY(-50%)'
    },
    'right-middle': { 
      top: '50%',
      right: '5%', 
      transform: 'translateY(-50%)'
    },
    'right-bottom': { 
      top: '75%',
      right: '5%',
      transform: 'translateY(-50%)'
    },
    'left-top': {
      top: '25%',
      left: '5%',
      transform: 'translateY(-50%)'
    },
    'left-middle': {
      top: '50%',
      left: '5%',
      transform: 'translateY(-50%)'
    },
    'left-bottom': {
      top: '75%',
      left: '5%',
      transform: 'translateY(-50%)'
    }
  };

  // Add connecting line styles
  const lineStyles = {
    position: 'absolute',
    width: '90%',
    height: '2px',
    background: 'linear-gradient(90deg, rgba(99,102,241,0.2) 0%, rgba(99,102,241,0.5) 50%, rgba(99,102,241,0.2) 100%)',
    top: '50%',
    left: '5%',
    transform: 'translateY(-50%)',
    zIndex: -1
  };
  
  // Calculate position around the circle
  const radius = 230; // Outer circle radius
  // Apply a small offset correction to ensure perfect alignment
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius * 0.7;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`absolute cursor-pointer transition-all duration-300 ${isActive ? 'z-10' : 'z-0'}`}
      style={{ 
        left: `calc(50% + ${x}px)`, 
        top: `calc(50% + ${y}px)`,
        transform: 'translate(-50%, -50%)', // Ensure perfect centering
      }}
      onClick={onClick}
    >
      <div 
        className={`flex flex-col items-center w-36 rounded-full ${isActive ? 'scale-110' : 'scale-100'} transition-all duration-300`}
      >
        <div 
          className={`flex items-center justify-center w-20 h-20 rounded-full shadow-lg transition-all duration-300 ${isActive ? 'ring-4 ring-primary-100' : ''}`}
          style={{ backgroundColor: color }}
        >
          <div className="text-white text-opacity-90">
            {icon}
          </div>
        </div>
        <div className="mt-3 text-center bg-white shadow-lg px-3 py-2 rounded-lg border border-neutral-100 text-black">
          <h4 className="text-sm font-bold text-black">{title}</h4>
          <p className="text-xs text-black mt-1 max-w-[140px]">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

interface StepCardProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
}

const StepCard: React.FC<StepCardProps> = ({ number, icon, title, description, color, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <div 
        className="relative overflow-hidden rounded-xl border border-neutral-100 p-4 transition-all duration-300 h-full text-black bg-white shadow-lg"
      >
        <div className="flex items-center mb-3">
          <div 
            className="flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm mr-2 shadow-md"
            style={{ backgroundColor: color }}
          >
            {number}
          </div>
          <div 
            className="flex items-center justify-center w-8 h-8 rounded-full mr-2 shadow-sm"
            style={{ backgroundColor: `${color}15` }}
          >
            <div style={{ color: color }}>
              {icon}
            </div>
          </div>
          <h3 className="text-sm font-bold text-black">
            {title}
          </h3>
        </div>
        <p className="text-xs text-black">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export const SolutionsSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [deviceType, setDeviceType] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  
  // Check screen size on component mount and window resize
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 640) {
        setDeviceType('mobile');
      } else if (window.innerWidth < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Auto-scroll functionality for carousel
  useEffect(() => {
    if (deviceType !== 'desktop') {
      // Start auto-scroll
      autoScrollRef.current = setInterval(() => {
        setActiveStep(prev => (prev === solutionSteps.length - 1 ? 0 : prev + 1));
      }, 5000);
      
      // Cleanup
      return () => {
        if (autoScrollRef.current) {
          clearInterval(autoScrollRef.current);
        }
      };
    }
  }, [deviceType]);

  const solutionSteps = [
    {
      number: 1,
      icon: <CheckCircle size={deviceType === 'mobile' ? 20 : 24} />,
      title: "Quality Assurance",
      description: "Ensuring highest standards through rigorous testing and validation.",
      color: "#4f46e5", // indigo-600
    },
    {
      number: 2,
      icon: <Brain size={deviceType === 'mobile' ? 20 : 24} />,
      title: "AI Integration",
      description: "Advanced neural networks for intelligent decision support.",
      color: "#7c3aed", // violet-600
    },
    {
      number: 3,
      icon: <Microscope size={deviceType === 'mobile' ? 20 : 24} />,
      title: "Research Platform",
      description: "Collaborative environment for accelerating discoveries.",
      color: "#2563eb", // blue-600
    },
    {
      number: 4,
      icon: <Shield size={deviceType === 'mobile' ? 20 : 24} />,
      title: "Security Framework",
      description: "Military-grade protection for sensitive patient data.",
      color: "#0891b2", // cyan-600
    },
    {
      number: 5,
      icon: <Globe size={deviceType === 'mobile' ? 20 : 24} />,
      title: "Global Reach",
      description: "Solutions that work across diverse geographic regions.",
      color: "#0d9488", // teal-600
    },
    {
      number: 6,
      icon: <Zap size={deviceType === 'mobile' ? 20 : 24} />,
      title: "Performance Boost",
      description: "Optimized systems for maximum efficiency and speed.",
      color: "#16a34a", // green-600
    },
  ];

  // Desktop view component
  const DesktopView = () => (
    <>
      {/* Circular Infographic */}
      <div className="relative h-[600px] mb-20">
        {/* Center Circle */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-48 h-48 rounded-full flex items-center justify-center bg-white border border-neutral-100 shadow-2xl text-black"
          >
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-secondary-400/15 to-green-500/10"></div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-black">6 STEPS</h3>
              <p className="text-sm text-black">INFOGRAPHIC</p>
            </div>
          </motion.div>
        </div>

        {/* Connection Lines - Three Concentric Circles */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Inner Circle */}
          <circle 
            cx="50%" 
            cy="50%" 
            r="100" 
            fill="none" 
            stroke="url(#circleGradient)" 
            strokeWidth="1.5" 
            strokeDasharray="3,3" 
          />
          {/* Middle Circle */}
          <circle 
            cx="50%" 
            cy="50%" 
            r="170" 
            fill="none" 
            stroke="url(#circleGradient)" 
            strokeWidth="1.5" 
            strokeDasharray="4,4" 
          />
          {/* Outer Circle - Where components are arranged */}
          <circle 
            cx="50%" 
            cy="50%" 
            r="230" 
            fill="none" 
            stroke="url(#circleGradient)" 
            strokeWidth="1.5" 
            strokeDasharray="5,5" 
          />
          <defs>
            <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="50%" stopColor="#0891b2" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
          </defs>
        </svg>

        {/* Step Cards in Half Moon Alignment */}
        <div className="relative w-full h-[500px] flex items-center justify-center">
          <div className="absolute w-full h-full flex flex-wrap justify-center">
            {solutionSteps.map((step, index) => {
              // Calculate position in half moon formation
              const totalCards = solutionSteps.length;
              const angle = (Math.PI / (totalCards - 1)) * index;
              const radius = 550; // Radius of half moon
              
              // Calculate x and y positions
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius * 0.7; // Multiply by 0.7 to flatten into half moon
              
              return (
                <div
                  key={index}
                  className="absolute w-[30%] max-w-[280px]"
                  style={{
                    marginLeft: '-10%',
                    transform: `translate(${x}px, ${y}px)`,
                    left: '50%',
                    top: '50%',
                  }}
                >
                  <StepCard
                    number={step.number}
                    icon={step.icon}
                    title={step.title}
                    description={step.description}
                    color={step.color}
                    delay={index * 0.1}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );

  // Tablet view component with enhanced carousel
  const TabletView = () => {
    const nextStep = () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
      setActiveStep((prev) => (prev === solutionSteps.length - 1 ? 0 : prev + 1));
      
      // Restart auto-scroll after user interaction
      autoScrollRef.current = setInterval(() => {
        setActiveStep(prev => (prev === solutionSteps.length - 1 ? 0 : prev + 1));
      }, 5000);
    };

    const prevStep = () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
      setActiveStep((prev) => (prev === 0 ? solutionSteps.length - 1 : prev - 1));
      
      // Restart auto-scroll after user interaction
      autoScrollRef.current = setInterval(() => {
        setActiveStep(prev => (prev === solutionSteps.length - 1 ? 0 : prev + 1));
      }, 5000);
    };

    return (
      <div className="py-12">
        {/* Enhanced Carousel for Tablet */}
        <div className="relative overflow-hidden px-4 pb-12">
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center absolute inset-x-0 top-1/2 transform -translate-y-1/2 z-10 px-4">
            <motion.button 
              onClick={prevStep}
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-neutral-900 shadow-lg border border-neutral-100"
              whileHover={{ scale: 1.05, backgroundColor: '#f9fafb' }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </motion.button>
            <motion.button 
              onClick={nextStep}
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-neutral-900 shadow-lg border border-neutral-100"
              whileHover={{ scale: 1.05, backgroundColor: '#f9fafb' }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>

          {/* Carousel Cards */}
          <div className="overflow-hidden">
            <motion.div 
              className="flex"
              animate={{ x: `-${activeStep * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {solutionSteps.map((step, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white border border-neutral-100 rounded-xl p-8 shadow-lg text-black h-full"
                    whileHover={{ 
                      scale: 1.03, 
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      borderColor: step.color 
                    }}
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div 
                          className="p-2 bg-white/30 rounded-lg text-black"
                          style={{ backgroundColor: `${step.color}15` }}
                        >
                          {step.icon}
                        </div>
                        <h3 className="text-xl md:text-2xl font-display font-bold text-black">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-black/80 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {solutionSteps.map((_, index) => (
              <motion.button
                key={index}
                className={`h-3 rounded-full transition-all duration-300 ${index === activeStep ? 'w-8 bg-primary-600' : 'w-3 bg-neutral-300'}`}
                onClick={() => {
                  if (autoScrollRef.current) {
                    clearInterval(autoScrollRef.current);
                  }
                  setActiveStep(index);
                  
                  // Restart auto-scroll after user interaction
                  autoScrollRef.current = setInterval(() => {
                    setActiveStep(prev => (prev === solutionSteps.length - 1 ? 0 : prev + 1));
                  }, 5000);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Mobile view component with enhanced carousel
  const MobileView = () => {
    const nextStep = () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
      setActiveStep((prev) => (prev === solutionSteps.length - 1 ? 0 : prev + 1));
      
      // Restart auto-scroll after user interaction
      autoScrollRef.current = setInterval(() => {
        setActiveStep(prev => (prev === solutionSteps.length - 1 ? 0 : prev + 1));
      }, 5000);
    };

    const prevStep = () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
      setActiveStep((prev) => (prev === 0 ? solutionSteps.length - 1 : prev - 1));
      
      // Restart auto-scroll after user interaction
      autoScrollRef.current = setInterval(() => {
        setActiveStep(prev => (prev === solutionSteps.length - 1 ? 0 : prev + 1));
      }, 5000);
    };

    return (
      <div className="py-8">
        {/* Enhanced Carousel for Mobile */}
        <div className="relative overflow-hidden px-2 pb-10">
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center absolute inset-x-0 top-1/2 transform -translate-y-1/2 z-10 px-2">
            <motion.button 
              onClick={prevStep}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-neutral-900 shadow-lg border border-neutral-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </motion.button>
            <motion.button 
              onClick={nextStep}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-neutral-900 shadow-lg border border-neutral-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>

          {/* Carousel Cards with AnimatePresence for smooth transitions */}
          <div className="overflow-hidden">
            <motion.div 
              className="flex"
              animate={{ x: `-${activeStep * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {solutionSteps.map((step, index) => (
                <div key={index} className="w-full flex-shrink-0 px-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white border border-neutral-100 rounded-xl p-6 shadow-lg text-black aspect-square"
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      borderColor: step.color 
                    }}
                  >
                    {/* Number first */}
                    <div 
                      className="flex items-center justify-center w-14 h-14 rounded-full text-white font-bold text-lg mb-4 shadow-md mx-auto"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.number}
                    </div>
                    
                    {/* Logo and heading with priority */}
                    <div className="flex flex-col items-center mb-3">
                      <div 
                        className="flex items-center justify-center w-12 h-12 rounded-full mb-2 shadow-sm"
                        style={{ backgroundColor: `${step.color}15` }}
                      >
                        <div style={{ color: step.color }}>
                          {step.icon}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-black text-center">
                        {step.title}
                      </h3>
                    </div>
                    
                    {/* Description below */}
                    <p className="text-sm text-black leading-relaxed text-center">
                      {step.description}
                    </p>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {solutionSteps.map((_, index) => (
              <motion.button
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${index === activeStep ? 'w-6 bg-primary-600' : 'w-2 bg-neutral-300'}`}
                onClick={() => {
                  if (autoScrollRef.current) {
                    clearInterval(autoScrollRef.current);
                  }
                  setActiveStep(index);
                  
                  // Restart auto-scroll after user interaction
                  autoScrollRef.current = setInterval(() => {
                    setActiveStep(prev => (prev === solutionSteps.length - 1 ? 0 : prev + 1));
                  }, 5000);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="solutions" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 opacity-40" style={{ 
          backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(79, 70, 229, 0.15) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.15) 0%, transparent 40%)'
        }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-primary-100 border border-primary-200 rounded-full text-black inline-block mb-4"
          >
            Our Solutions
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-display font-bold text-black mb-4 md:mb-6"
          >
            6 Steps Infographic Solution
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-black text-base md:text-lg"
          >
            Our comprehensive ecosystem of products and services works together to create
            a unified approach to global health challenges.
          </motion.p>
        </div>

        {/* Conditional rendering based on device type */}
        {deviceType === 'desktop' ? <DesktopView /> : 
         deviceType === 'tablet' ? <TabletView /> : 
         <MobileView />}
      </div>
    </section>
  );
};