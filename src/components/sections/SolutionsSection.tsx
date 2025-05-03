import React from 'react';
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
  ShieldCheck 
} from 'lucide-react';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badgeText?: string;
  delay: number;
}

const SolutionCard: React.FC<CardProps> = ({ icon, title, description, badgeText, delay }) => {
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
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
      <div className="relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 group-hover:border-primary-500/50 p-6 transition-all duration-300 h-full">
        {badgeText && (
          <div className="absolute -right-12 top-6 rotate-45 bg-primary-500 px-12 py-1 text-xs font-bold">
            {badgeText}
          </div>
        )}
        <div className="mb-4 p-3 bg-primary-500/10 rounded-xl w-fit text-primary-400 group-hover:text-primary-300 group-hover:bg-primary-500/20 transition-all duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-primary-300 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300">
          {description}
        </p>
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-400"
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </div>
    </motion.div>
  );
};

export const SolutionsSection = () => {
  const solutions = [
    {
      icon: <Heart size={24} />,
      title: "Healthcare Integration",
      description: "Connecting disparate healthcare systems through seamless data integration and interoperability frameworks.",
      delay: 0.1,
    },
    {
      icon: <Brain size={24} />,
      title: "AI Diagnostics",
      description: "Advanced neural networks and machine learning algorithms for early disease detection and diagnosis.",
      badgeText: "TRENDING",
      delay: 0.2,
    },
    {
      icon: <Microscope size={24} />,
      title: "Research Platform",
      description: "Collaborative environment for researchers to share findings and accelerate discoveries across disciplines.",
      delay: 0.3,
    },
    {
      icon: <BadgeCheck size={24} />,
      title: "Verification Systems",
      description: "Blockchain-powered verification to ensure data integrity and security across all touchpoints.",
      delay: 0.4,
    },
    {
      icon: <Leaf size={24} />,
      title: "Environmental Monitoring",
      description: "Real-time tracking of environmental factors affecting health outcomes and disease spread.",
      delay: 0.5,
    },
    {
      icon: <Globe size={24} />,
      title: "Global Reach",
      description: "Infrastructure designed to function in diverse environments from urban centers to remote regions.",
      delay: 0.6,
    },
    {
      icon: <Laptop size={24} />,
      title: "Digital Transformation",
      description: "End-to-end solutions for organizations transitioning to digital-first healthcare delivery.",
      delay: 0.7,
    },
    {
      icon: <PieChart size={24} />,
      title: "Data Analytics",
      description: "Comprehensive analytics suite for deriving actionable insights from complex health datasets.",
      delay: 0.8,
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Security Framework",
      description: "Military-grade encryption and privacy controls ensuring patient data remains protected.",
      delay: 0.9,
    },
  ];

  return (
    <section id="solutions" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(34, 211, 238, 0.3) 0%, transparent 40%)'
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
            Intelligent Solutions for a Connected World
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {solutions.map((solution, index) => (
            <SolutionCard
              key={index}
              icon={solution.icon}
              title={solution.title}
              description={solution.description}
              badgeText={solution.badgeText}
              delay={solution.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};