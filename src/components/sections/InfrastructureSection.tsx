import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Layers, Database, Lock, Share2, Network, Server, Cloud, Shield } from 'lucide-react';
import { AnimatedSpan, Terminal, TypingAnimation } from "@/components/magicui/terminal";

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ year, title, description, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: index * 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="flex gap-4 md:gap-8"
    >
      <div className="flex flex-col items-center">
        <motion.div 
          variants={itemVariants}
          className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold z-10"
          whileHover={{ scale: 1.1, backgroundColor: "#8b5cf6" }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          {index + 1}
        </motion.div>
        {index < 3 && (
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 1, delay: (index * 0.3) + 0.5 }}
            className="w-0.5 bg-neutral-800 mt-2"
          />
        )}
      </div>
      <motion.div 
        variants={itemVariants}
        className="bg-neutral-800 border border-neutral-700 rounded-xl p-6 mb-10 flex-1 hover:border-primary-500/30 hover:shadow-glow transition-all duration-300 text-neutral-50"
        whileHover={{ y: -5, boxShadow: "0 0 20px rgba(109, 40, 217, 0.3)" }}
      >
        <motion.span 
          variants={itemVariants}
          className="px-3 py-1 text-xs font-semibold bg-primary-500/20 text-primary-400 rounded-full mb-4 inline-block"
        >
          {year}
        </motion.span>
        <motion.h3 
          variants={itemVariants}
          className="text-xl font-display font-bold text-white mb-3"
        >
          {title}
        </motion.h3>
        <motion.p 
          variants={itemVariants}
          className="text-neutral-400"
        >
          {description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

interface InfographicItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const InfographicItem: React.FC<InfographicItemProps> = ({ icon, title, description, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1,
        staggerChildren: 0.1,
        delayChildren: index * 0.1 + 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      whileHover={{ y: -5, boxShadow: "0 0 20px rgba(109, 40, 217, 0.3)" }}
      className="bg-neutral-800 border border-neutral-700 rounded-xl p-6 hover:border-primary-500/30 hover:shadow-glow transition-all duration-300 text-neutral-50"
    >
      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        className="bg-primary-500/10 p-3 rounded-xl w-fit mb-4 text-primary-400"
      >
        {icon}
      </motion.div>
      <motion.h3 
        variants={itemVariants}
        className="text-lg font-display font-bold text-white mb-3"
      >
        {title}
      </motion.h3>
      <motion.p 
        variants={itemVariants}
        className="text-neutral-400 text-sm"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

export const InfrastructureSection = () => {
  const timelineItems = [
    {
      year: "Phase 1",
      title: "Data Foundation",
      description: "Establishing secure data warehouses and integration pipelines to connect disparate health information systems."
    },
    {
      year: "Phase 2",
      title: "Analytics Deployment",
      description: "Implementing advanced analytics and machine learning models to derive actionable insights from collected data."
    },
    {
      year: "Phase 3",
      title: "Global Expansion",
      description: "Scaling infrastructure to support global operations with localized compliance and multi-regional availability."
    },
    {
      year: "Phase 4",
      title: "Innovation Acceleration",
      description: "Deploying research sandboxes and innovation platforms to foster continuous improvement and breakthrough solutions."
    },
  ];

  const infographicItems = [
    {
      icon: <Layers size={24} />,
      title: "Multi-Layered Architecture",
      description: "Fault-tolerant design with redundant systems ensuring 99.99% uptime and seamless failover."
    },
    {
      icon: <Database size={24} />,
      title: "Scalable Storage",
      description: "Petabyte-scale storage solutions capable of handling diverse healthcare data types from images to genomics."
    },
    {
      icon: <Lock size={24} />,
      title: "Zero-Trust Security",
      description: "Comprehensive security model with continuous verification and least-privilege access controls."
    },
    {
      icon: <Share2 size={24} />,
      title: "Interoperability Hub",
      description: "Standards-based interoperability supporting FHIR, HL7, DICOM and proprietary formats with automated translation."
    },
    {
      icon: <Network size={24} />,
      title: "Edge Computing",
      description: "Distributed processing capabilities bringing computation closer to data sources for reduced latency."
    },
    {
      icon: <Server size={24} />,
      title: "Hybrid Infrastructure",
      description: "Flexible deployment options spanning public cloud, private cloud, and on-premises environments."
    },
    {
      icon: <Cloud size={24} />,
      title: "Cloud-Native Design",
      description: "Containerized microservices architecture enabling rapid scaling and feature deployment."
    },
    {
      icon: <Shield size={24} />,
      title: "Compliance Framework",
      description: "Built-in controls for HIPAA, GDPR, and regional healthcare regulations with continuous compliance monitoring."
    },
  ];

  return (
    <section id="infrastructure" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(109, 40, 217, 0.3) 0%, transparent 40%)'
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
            Infrastructure
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold text-white mb-6"
          >
            Powerful Foundation for Health Innovation
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-neutral-400 text-lg"
          >
            Our enterprise-grade infrastructure is designed for security, scalability, and
            interoperability across global health systems.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-2xl font-display font-bold text-white mb-8"
            >
              Strategic Implementation Timeline
            </motion.h3>
            <div className="space-y-2">
              {timelineItems.map((item, index) => (
                <TimelineItem
                  key={index}
                  year={item.year}
                  title={item.title}
                  description={item.description}
                  index={index}
                />
              ))}
            </div>
          </div>

          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-2xl font-display font-bold text-white mb-8"
            >
              Technical Architecture
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {infographicItems.map((item, index) => (
                <InfographicItem
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-neutral-800 border border-neutral-700 rounded-2xl overflow-hidden text-neutral-50"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                Performance You Can Trust
              </h3>
              <p className="text-neutral-400 mb-6">
                Our infrastructure consistently delivers industry-leading performance metrics
                across all critical dimensions of healthcare technology.
              </p>
              <Terminal className="mb-6 terminal-glow">
                <div className="grid gap-y-2">
                  <TypingAnimation duration={30} delay={300} className="text-green-400 font-mono">$ bolt-health performance --check</TypingAnimation>
                  <TypingAnimation duration={15} delay={1500} className="text-blue-400 font-mono">✓ Initializing performance diagnostics...</TypingAnimation>
                  <TypingAnimation duration={10} delay={2000} className="text-yellow-400 font-mono">✓ Compiling system metrics...</TypingAnimation>
                  <TypingAnimation duration={10} delay={2300} className="text-neutral-400 font-mono opacity-80">[ ████████████████████ ] 100% complete</TypingAnimation>
                  
                  {[
                    { label: "Uptime", value: 99.99, color: "bg-green-500" },
                    { label: "Data Processing Speed", value: 85, color: "bg-blue-500" },
                    { label: "Security Rating", value: 97, color: "bg-purple-500" },
                    { label: "Scalability Index", value: 92, color: "bg-amber-500" },
                  ].map((metric, index) => (
                    <AnimatedSpan 
                      key={index} 
                      delay={2800 + (index * 600)}
                      className="block mt-3 font-mono"
                    >
                      <div className="flex items-center">
                        <TypingAnimation 
                          duration={15} 
                          delay={2800 + (index * 600)} 
                          className="text-white font-mono"
                        >
                          {`${metric.label}: `}
                        </TypingAnimation>
                        <motion.span 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: (2800 + (index * 600) + 300) / 1000 }}
                          className="text-primary-400 font-semibold ml-1 font-mono"
                        >
                          {metric.value}%
                        </motion.span>
                        <div className="ml-2 flex-1 bg-neutral-800 rounded-full h-3 overflow-hidden border border-neutral-700">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: `${metric.value}%` }}
                            transition={{ 
                              duration: 1.8, 
                              delay: (2800 + (index * 600)) / 1000,
                              ease: "easeInOut"
                            }}
                            className={`h-full ${metric.color} rounded-full relative`}
                          >
                            <motion.div 
                              className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-30"
                              initial={{ x: "-100%" }}
                              animate={{ x: "100%" }}
                              transition={{ 
                                duration: 1, 
                                delay: (2800 + (index * 600) + 500) / 1000,
                                repeat: Infinity,
                                repeatDelay: 2
                              }}
                            />
                          </motion.div>
                        </div>
                        <div className="ml-2 flex space-x-0.5">
                          {Array.from({ length: 10 }).map((_, i) => (
                            <motion.span 
                              key={i}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ 
                                opacity: i < Math.floor(metric.value / 10) ? 1 : 0.2,
                                height: i < Math.floor(metric.value / 10) ? 16 : 8
                              }}
                              transition={{ 
                                duration: 0.4, 
                                delay: (2800 + (index * 600)) / 1000 + (i * 0.1)
                              }}
                              className={`inline-block w-1.5 rounded-sm ${i < Math.floor(metric.value / 10) ? metric.color : 'bg-neutral-700'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </AnimatedSpan>
                  ))}
                  <AnimatedSpan delay={6000} className="block mt-5 border-t border-neutral-700 pt-3">
                    <TypingAnimation duration={20} delay={6000} className="text-green-400 font-mono font-semibold">✓ All systems operational</TypingAnimation>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: 6.5 }}
                      className="h-0.5 bg-gradient-to-r from-green-500 to-transparent mt-1"
                    />
                  </AnimatedSpan>
                </div>
              </Terminal>
            </div>
            <div className="bg-gradient-to-br from-primary-900/30 to-secondary-900/30 p-8 md:p-12 flex items-center">
              <div className="w-full">
                <h3 className="text-2xl font-display font-bold text-white mb-6">
                  Compliance & Certifications
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                  {[
                    "HIPAA Compliant",
                    "GDPR Ready",
                    "ISO 27001",
                    "SOC 2 Type II",
                    "HITRUST CSF",
                    "FDA CFR Part 11",
                    "PCI DSS Level 1",
                    "NIST Cybersecurity",
                  ].map((cert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2"
                    >
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 300, 
                          damping: 15, 
                          delay: index * 0.15 + 0.2 
                        }}
                        viewport={{ once: true }}
                        className="w-4 h-4 rounded-full bg-primary-500 flex-shrink-0" 
                      />
                      <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
                        viewport={{ once: true }}
                        className="text-white"
                      >
                        {cert}
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};