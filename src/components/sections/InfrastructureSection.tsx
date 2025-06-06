import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Layers, Database, Lock, Share2, Network, Server, Cloud, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedSpan, Terminal, TypingAnimation } from "@/components/magicui/terminal";

// Infrastructure Images Carousel Component
const InfrastructureCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Infrastructure images array
  const infrastructureImages = [
    {
      url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2034&q=80",
      alt: "Advanced MedTech Data Center"
    },
    {
      url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Medical Device Manufacturing"
    },
    {
      url: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      alt: "Telemedicine Infrastructure"
    },
    {
      url: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "AI-Powered Diagnostic Systems"
    }
  ];
  
  const totalImages = infrastructureImages.length;
  
  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= totalImages ? 0 : nextIndex;
    });
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex < 0 ? totalImages - 1 : nextIndex;
    });
  };
  
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg">
      <div 
        ref={carouselRef}
        className="overflow-hidden w-full h-full"
      >
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {infrastructureImages.map((image, index) => (
            <div 
              key={index}
              className="flex-shrink-0 w-full h-full"
            >
              <img 
                src={image.url} 
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-8 left-8 text-white">
                  {/* <h3 className="text-xl font-bold mb-2">{image.alt}</h3> */}
                  <p className="text-sm text-white/80">Posspole MedTech: Revolutionizing healthcare with cutting-edge technology</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation buttons */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 shadow-lg z-10 transition-all duration-300"
        aria-label="Previous image"
      >
        <ChevronLeft size={20} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 shadow-lg z-10 transition-all duration-300"
        aria-label="Next image"
      >
        <ChevronRight size={20} />
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {infrastructureImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

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
            className="w-0.5 bg-neutral-300 mt-2"
          />
        )}
      </div>
      <motion.div 
        variants={itemVariants}
        className="bg-white border border-neutral-200 rounded-xl p-6 mb-10 flex-1 hover:border-primary-300 hover:shadow-lg transition-all duration-300 text-neutral-900"
        whileHover={{ y: -5, boxShadow: "0 0 20px rgba(109, 40, 217, 0.15)" }}
      >
        <motion.span 
          variants={itemVariants}
          className="px-3 py-1 text-xs font-semibold bg-primary-100 text-primary-700 rounded-full mb-4 inline-block"
        >
          {year}
        </motion.span>
        <motion.h3 
          variants={itemVariants}
          className="text-xl font-display font-bold text-neutral-900 mb-3"
        >
          {title}
        </motion.h3>
        <motion.p 
          variants={itemVariants}
          className="text-neutral-600"
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
      whileHover={{ y: -5, boxShadow: "0 0 20px rgba(109, 40, 217, 0.15)" }}
      className="bg-white border border-neutral-200 rounded-xl p-6 hover:border-primary-300 hover:shadow-lg transition-all duration-300 text-neutral-900"
    >
      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        className="bg-primary-100 p-3 rounded-xl w-fit mb-4 text-primary-700"
      >
        {icon}
      </motion.div>
      <motion.h3 
        variants={itemVariants}
        className="text-lg font-display font-bold text-neutral-900 mb-3"
      >
        {title}
      </motion.h3>
      <motion.p 
        variants={itemVariants}
        className="text-neutral-600 text-sm"
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
      title: "Medical Data Foundation",
      description: "Establishing secure medical data warehouses and integration pipelines to connect hospital systems, clinics, and research institutions."
    },
    {
      year: "Phase 2",
      title: "Diagnostic AI Deployment",
      description: "Implementing advanced medical analytics and machine learning models to assist healthcare professionals with accurate diagnostics."
    },
    {
      year: "Phase 3",
      title: "Global Healthcare Network",
      description: "Scaling infrastructure to support global healthcare operations with localized compliance and multi-regional availability."
    },
    {
      year: "Phase 4",
      title: "Medical Innovation Lab",
      description: "Deploying research sandboxes and innovation platforms to develop breakthrough medical devices and treatment solutions."
    },
  ];

  const infographicItems = [
    {
      icon: <Layers size={24} />,
      title: "Medical-Grade Architecture",
      description: "Fault-tolerant design with redundant systems ensuring 99.99% uptime for critical healthcare applications."
    },
    {
      icon: <Database size={24} />,
      title: "Clinical Data Storage",
      description: "Petabyte-scale storage solutions for medical imaging, genomics, and electronic health records with instant retrieval."
    },
    {
      icon: <Lock size={24} />,
      title: "Patient Data Security",
      description: "Comprehensive security model with continuous verification and HIPAA-compliant access controls."
    },
    {
      icon: <Share2 size={24} />,
      title: "Medical Interoperability",
      description: "Standards-based interoperability supporting FHIR, HL7, DICOM and proprietary formats with automated translation."
    },
    {
      icon: <Network size={24} />,
      title: "Remote Care Computing",
      description: "Distributed processing capabilities bringing computation closer to remote care facilities and telemedicine applications."
    },
    {
      icon: <Server size={24} />,
      title: "Hybrid Medical Infrastructure",
      description: "Flexible deployment options spanning public cloud, private cloud, and on-premises hospital environments."
    },
    {
      icon: <Cloud size={24} />,
      title: "Cloud-Native Medical Apps",
      description: "Containerized microservices architecture enabling rapid scaling and deployment of medical applications."
    },
    {
      icon: <Shield size={24} />,
      title: "Healthcare Compliance",
      description: "Built-in controls for HIPAA, GDPR, and regional healthcare regulations with continuous compliance monitoring."
    },
  ];

  return (
    <section id="infrastructure" className="py-20 md:py-32 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50 to-white opacity-80"></div>
      <div className="absolute inset-0 opacity-5" style={{ 
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%236d28d9" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
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
            MedTech Infrastructure
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-6"
          >
            Powerful Foundation for Medical Innovation
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-neutral-600 text-lg"
          >
            Posspole MedTech's enterprise-grade infrastructure is designed for security, scalability, and
            interoperability across global healthcare systems.
          </motion.p>
        </div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
  <div className="flex flex-col space-y-8">
    {/* Infrastructure Carousel */}
    <div className="h-[400px]">
      <InfrastructureCarousel />
    </div>

    {/* Product Information */}
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
      <div className="relative bg-white rounded-xl p-8">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Posspole MedTech Innovation Hub
            </h3>
            <div className="flex space-x-2">
              {[1, 2, 3].map((dot) => (
                <div key={dot} className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" 
                     style={{ animationDelay: `${dot * 200}ms` }} />
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <Server className="w-6 h-6 text-white" />,
                title: "Medical Data Processing",
                description: "AI-powered medical data processing with real-time diagnostic analytics",
                gradient: "from-primary-500 to-primary-600"
              },
              {
                icon: <Network className="w-6 h-6 text-white" />,
                title: "Telemedicine Networks",
                description: "High-performance networks optimized for remote patient monitoring",
                gradient: "from-secondary-500 to-secondary-600"
              },
              {
                icon: <Shield className="w-6 h-6 text-white" />,
                title: "Patient Data Security",
                description: "Next-gen encryption with quantum-resistant algorithms for PHI protection",
                gradient: "from-primary-500 to-primary-600"
              },
              {
                icon: <Database className="w-6 h-6 text-white" />,
                title: "Medical Imaging Storage",
                description: "Advanced storage systems optimized for DICOM and large medical datasets",
                gradient: "from-secondary-500 to-secondary-600"
              }
            ].map((item, index) => (
              <div key={index} className="group/card relative px-6 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-xl -z-10"></div>
                <div className="flex items-center mb-4">
                  <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center transform group-hover/card:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                </div>
                <h4 className="font-semibold text-neutral-800 mb-2">{item.title}</h4>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>

          {/* Right side: Timeline */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-2xl font-display font-bold text-neutral-900 mb-8"
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
        </div>

        {/* Terminal/Performance Metrics Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white border border-neutral-200 rounded-2xl overflow-hidden text-neutral-900 shadow-lg mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-display font-bold text-neutral-900 mb-4">
                Medical-Grade Performance
              </h3>
              <p className="text-neutral-600 mb-6">
                Posspole MedTech's infrastructure consistently delivers industry-leading performance metrics
                across all critical dimensions of healthcare technology.
              </p>
              <Terminal className="mb-6 terminal-glow">
                <div className="grid gap-y-2">
                  <TypingAnimation duration={30} delay={300} className="text-green-400 font-mono">$ posspole-medtech performance --check</TypingAnimation>
                  <TypingAnimation duration={15} delay={1500} className="text-blue-400 font-mono">✓ Initializing medical systems diagnostics...</TypingAnimation>
                  <TypingAnimation duration={10} delay={2000} className="text-yellow-400 font-mono">✓ Compiling healthcare metrics...</TypingAnimation>
                  <TypingAnimation duration={10} delay={2300} className="text-neutral-400 font-mono opacity-80">[ ████████████████████ ] 100% complete</TypingAnimation>
                  
                  {[
                    { label: "Medical System Uptime", value: 99.99, color: "bg-green-500" },
                    { label: "Diagnostic Processing Speed", value: 92, color: "bg-blue-500" },
                    { label: "Patient Data Security", value: 99, color: "bg-purple-500" },
                    { label: "Telemedicine Reliability", value: 95, color: "bg-amber-500" },
                  ].map((metric, index) => (
                    <AnimatedSpan 
                      key={index} 
                      delay={2800 + (index * 600)}
                      className="block mt-3 font-mono text-black "
                    >
                      <div className="flex items-center">
                        <TypingAnimation 
                          duration={15} 
                          delay={2800 + (index * 600)} 
                          className="text-black font-mono"
                        >
                          {`${metric.label}: `}
                        </TypingAnimation>
                        <motion.span 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: (2800 + (index * 600) + 300) / 1000 }}
                          className="text-primary-100 font-semibold ml-1 font-mono "
                        >
                          {metric.value}%
                        </motion.span>
                        <div className="ml-2 flex-1 bg-neutral-800  rounded-full h-3 overflow-hidden border border-neutral-700">
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
                              className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-100 text-black  "
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
                  <AnimatedSpan delay={6000} className="block mt-5 border-t border-neutral-700 pt-3 ">
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
            <div className="bg-gradient-to-br from-primary-100 to-secondary-100 p-8 md:p-12 flex items-center">
              <div className="w-full">
                <h3 className="text-2xl font-display font-bold text-neutral-900 mb-6">
                  Medical Compliance & Certifications
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                  {[
                    "HIPAA Compliant",
                    "GDPR Ready",
                    "ISO 13485",
                    "SOC 2 Type II",
                    "FDA 510(k) Cleared",
                    "FDA CFR Part 11",
                    "CE Marked Devices",
                    "MDR Compliant",
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
                        className="text-neutral-800"
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

        {/* TechinfographicItemsnical Architecture Section */}
        {/* <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl font-display font-bold text-neutral-900 mb-8 text-center"
          >
            Technical Architecture
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
        </div> */}
      </div>
    </section>
  );
};