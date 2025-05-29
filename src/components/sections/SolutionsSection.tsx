import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  const y = Math.sin(angle) * radius;
  
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
          className={`flex items-center justify-center w-20 h-20 rounded-full shadow-lg transition-all duration-300 ${isActive ? 'ring-4 ring-white/20' : ''}`}
          style={{ backgroundColor: color }}
        >
          <div className="text-white">
            {icon}
          </div>
        </div>
        <div className="mt-3 text-center bg-neutral-900/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-neutral-800/50">
          <h4 className="text-sm font-bold text-white">{title}</h4>
          <p className="text-xs text-neutral-400 mt-1 max-w-[140px]">{description}</p>
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
        className="relative overflow-hidden rounded-xl border border-neutral-800 p-4 transition-all duration-300 h-full"
        style={{ backgroundColor: 'rgba(18, 18, 18, 0.6)' }}
      >
        <div className="flex items-center mb-3">
          <div 
            className="flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm mr-2"
            style={{ backgroundColor: color }}
          >
            {number}
          </div>
          <div 
            className="flex items-center justify-center w-8 h-8 rounded-full mr-2"
            style={{ backgroundColor: `${color}30` }}
          >
            <div className="text-white">
              {icon}
            </div>
          </div>
          <h3 className="text-sm font-bold text-white">
            {title}
          </h3>
        </div>
        <p className="text-xs text-neutral-400">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export const SolutionsSection = () => {
  const [activeOptionIndex, setActiveOptionIndex] = useState(0);
  
  const circleOptions = [
    {
      icon: <CheckCircle size={24} />,
      title: "Quality Assurance",
      description: "Ensuring highest standards through rigorous testing and validation.",
      color: "#4338ca", // indigo-700
    },
    {
      icon: <Brain size={24} />,
      title: "AI Integration",
      description: "Advanced neural networks for intelligent decision support.",
      color: "#6366f1", // indigo-500
    },
    {
      icon: <Microscope size={24} />,
      title: "Research Platform",
      description: "Collaborative environment for accelerating discoveries.",
      color: "#8b5cf6", // violet-500
    },
    {
      icon: <Users size={24} />,
      title: "Team Collaboration",
      description: "Unified workspace for seamless cross-functional teamwork.",
      color: "#a855f7", // purple-500
    },
    {
      icon: <LineChart size={24} />,
      title: "Data Analytics",
      description: "Comprehensive insights from complex healthcare datasets.",
      color: "#06b6d4", // cyan-500
    },
    {
      icon: <Shield size={24} />,
      title: "Security Framework",
      description: "Military-grade protection for sensitive patient data.",
      color: "#10b981", // emerald-500
    },
    {
      icon: <Globe size={24} />,
      title: "Global Reach",
      description: "Solutions that work across diverse geographic regions.",
      color: "#22c55e", // green-500
    },
    {
      icon: <Zap size={24} />,
      title: "Performance Boost",
      description: "Optimized systems for maximum efficiency and speed.",
      color: "#84cc16", // lime-500
    },
  ];

  const stepCards = [
    {
      number: 1,
      icon: <CheckCircle size={16} />,
      title: "Quality Assurance",
      description: "Ensuring highest standards through rigorous testing and validation.",
      color: "#4338ca", // indigo-700
      delay: 0.1,
    },
    {
      number: 2,
      icon: <Brain size={16} />,
      title: "AI Integration",
      description: "Advanced neural networks for intelligent decision support.",
      color: "#6366f1", // indigo-500
      delay: 0.2,
    },
    {
      number: 3,
      icon: <Microscope size={16} />,
      title: "Research Platform",
      description: "Collaborative environment for accelerating discoveries.",
      color: "#8b5cf6", // violet-500
      delay: 0.3,
    },
    {
      number: 6,
      icon: <Shield size={16} />,
      title: "Security Framework",
      description: "Military-grade protection for sensitive patient data.",
      color: "#10b981", // emerald-500
      delay: 0.6,
    },
    {
      number: 7,
      icon: <Globe size={16} />,
      title: "Global Reach",
      description: "Solutions that work across diverse geographic regions.",
      color: "#22c55e", // green-500
      delay: 0.7,
    },
    {
      number: 8,
      icon: <Zap size={16} />,
      title: "Performance Boost",
      description: "Optimized systems for maximum efficiency and speed.",
      color: "#84cc16", // lime-500
      delay: 0.8,
    },
  ];

  return (
    <section id="solutions" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(34, 211, 238, 0.3) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.3) 0%, transparent 40%)'
        }}></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-primary-500/30 border border-primary-500/20 rounded-full text-primary-400 inline-block mb-4"
          >
            Our Solutions
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold text-white mb-6"
          >
            8 Steps Infographic Solution
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-neutral-400 text-lg"
          >
            Our comprehensive ecosystem of products and services works together to create
            a unified approach to global health challenges.
          </motion.p>
        </div>

        {/* Circular Infographic */}
        <div className="relative h-[600px] mb-20">
          {/* Center Circle */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-48 h-48 rounded-full flex items-center justify-center bg-neutral-900 border border-neutral-800 shadow-xl"
            >
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-400/20 animate-slow-spin"></div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-white">8 STEPS</h3>
                <p className="text-sm text-neutral-400">INFOGRAPHIC</p>
              </div>
            </motion.div>
          </div>

          {/* Connection Lines - Three Concentric Circles */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Inner Circle (already exists) */}
            <circle 
              cx="50%" 
              cy="50%" 
              r="100" 
              fill="none" 
              stroke="url(#circleGradient)" 
              strokeWidth="1" 
              strokeDasharray="3,3" 
              className="animate-reverse-slow-spin" 
            />
            {/* Middle Circle */}
            <circle 
              cx="50%" 
              cy="50%" 
              r="170" 
              fill="none" 
              stroke="url(#circleGradient)" 
              strokeWidth="1" 
              strokeDasharray="4,4" 
              className="animate-slow-spin" 
            />
            {/* Outer Circle - Where components are arranged */}
            <circle 
              cx="50%" 
              cy="50%" 
              r="230" 
              fill="none" 
              stroke="url(#circleGradient)" 
              strokeWidth="1" 
              strokeDasharray="5,5" 
              className="animate-reverse-slow-spin" 
            />
            <defs>
              <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4338ca" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
          </svg>

       

        {/* Step Cards in Half Moon Alignment */}
        <div className="relative w-full h-[500px] flex items-center justify-center">
          <div className="absolute w-full h-full flex flex-wrap justify-center">
            {stepCards.map((step, index) => {
              // Calculate position in half moon formation
              const totalCards = stepCards.length;
              const angle = (Math.PI / (totalCards - 1)) * index;
              const radius = 550; // Radius of half moon
              
              // Calculate x and y positions
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius * 0.7; // Multiply by 0.5 to flatten into half moon
              
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
                    delay={step.delay}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>

    </section>
  );
};