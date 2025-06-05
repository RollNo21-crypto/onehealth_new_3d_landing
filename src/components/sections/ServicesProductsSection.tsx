import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Server, 
  Database, 
  Cpu, 
  BarChart, 
  Cloud, 
  Shield, 
  Smartphone, 
  Tablet, 
  Layers
} from 'lucide-react';

interface ProductCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  category: string;
  delay: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ icon, title, description, category, delay }) => {
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
      <div className="relative overflow-hidden rounded-2xl bg-neutral-800 border border-neutral-700 group-hover:border-primary-500/50 p-6 transition-all duration-300 h-full text-neutral-50">
        <div className="absolute top-4 right-4 px-2 py-1 text-xs font-semibold bg-neutral-800 text-neutral-300 rounded-full">
          {category}
        </div>
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

export const ServicesProductsSection = () => {
  const products = [
    {
      icon: <Server size={24} />,
      title: "HealthCore Platform",
      description: "Enterprise-grade infrastructure for healthcare data management with advanced security and compliance features.",
      category: "Platform",
      delay: 0.1,
    },
    {
      icon: <Database size={24} />,
      title: "MedVault",
      description: "Secure storage solution for patient records with blockchain verification and instant retrieval capabilities.",
      category: "Service",
      delay: 0.2,
    },
    {
      icon: <Cpu size={24} />,
      title: "AI Diagnostic Suite",
      description: "Machine learning powered diagnostic tools that assist healthcare professionals in early disease detection.",
      category: "Product",
      delay: 0.3,
    },
    {
      icon: <BarChart size={24} />,
      title: "Analytics Dashboard",
      description: "Comprehensive analytics platform providing real-time insights into patient care and operational efficiency.",
      category: "Service",
      delay: 0.4,
    },
    {
      icon: <Cloud size={24} />,
      title: "CloudHealth Connect",
      description: "Cloud-based integration service that connects disparate healthcare systems and enables seamless data exchange.",
      category: "Platform",
      delay: 0.5,
    },
    {
      icon: <Shield size={24} />,
      title: "SecureHealth Gateway",
      description: "Advanced security solution protecting healthcare data with military-grade encryption and access controls.",
      category: "Product",
      delay: 0.6,
    },
    {
      icon: <Smartphone size={24} />,
      title: "MobileDoc",
      description: "Mobile application for healthcare professionals to access patient data and collaborate securely on the go.",
      category: "Product",
      delay: 0.7,
    },
    {
      icon: <Tablet size={24} />,
      title: "PatientPortal",
      description: "User-friendly interface for patients to access their health records, schedule appointments, and communicate with providers.",
      category: "Service",
      delay: 0.8,
    },
    {
      icon: <Layers size={24} />,
      title: "Integration Services",
      description: "Professional services for seamless integration of our solutions into existing healthcare infrastructure.",
      category: "Service",
      delay: 0.9,
    },
  ];

  return (
    <section id="services-products" className="py-20 md:py-32 relative overflow-hidden bg-neutral-900">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-neutral-950 to-background opacity-80"></div>
      <div className="absolute inset-0 opacity-10" style={{ 
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
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
            Our Offerings
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold text-white mb-6"
          >
            Services & Products
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-neutral-400 text-lg"
          >
            Our comprehensive suite of healthcare technology solutions designed to transform 
            patient care, streamline operations, and drive innovation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              icon={product.icon}
              title={product.title}
              description={product.description}
              category={product.category}
              delay={product.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};