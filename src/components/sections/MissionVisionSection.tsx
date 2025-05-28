import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, Eye, Lightbulb, Compass, Clock, Users, Heart, Award, BookOpen } from 'lucide-react';

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description, delay }) => {
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

interface InfoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  delay: number;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, icon, description, bgColor, delay }) => {
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
      className={`${bgColor} rounded-2xl p-6 md:p-8 relative overflow-hidden`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white/10 rounded-lg text-white">
            {icon}
          </div>
          <h3 className="text-xl md:text-2xl font-display font-bold text-white">{title}</h3>
        </div>
        <p className="text-white/80 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

export const MissionVisionSection = () => {
  return (
    <section id="mission-vision" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(109, 40, 217, 0.3) 0%, transparent 40%)'
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
            About Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold text-white mb-6"
          >
            Innovative Strategies for Global Health
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-neutral-400 text-lg"
          >
            Guided by our core values, we're committed to transforming global health through
            innovation, collaboration, and a patient-centered approach.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          {/* Left column with Vision and Mission */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <InfoCard 
              title="Our Vision"
              icon={<Eye size={24} />}
              description="A world where healthcare is accessible, efficient, and personalized for everyone, regardless of geographic location or socioeconomic status. We envision a future where technology bridges gaps in healthcare delivery, empowers individuals to take control of their health, and enables medical professionals to provide the highest quality care."
              bgColor="bg-gradient-to-br from-pink-50/10 to-pink-50/5"
              delay={0.1}
            />
            
            <InfoCard 
              title="Our Mission"
              icon={<Target size={24} />}
              description="To revolutionize global healthcare by creating an integrated ecosystem that connects patients, providers, and researchers through innovative technology solutions. We strive to break down barriers in healthcare access, enhance data-driven decision making, and improve patient outcomes worldwide through our comprehensive platform."
              bgColor="bg-gradient-to-br from-pink-50/10 to-pink-50/5"
              delay={0.2}
            />
            
            <InfoCard 
              title="Our History"
              icon={<Clock size={24} />}
              description="Founded in 2010 with a vision to transform healthcare delivery, we've grown from a small startup to a global leader in health technology solutions. Our journey has been marked by breakthrough innovations, strategic partnerships, and a relentless focus on improving patient outcomes through technology."
              bgColor="bg-gradient-to-br from-red-800/80 to-red-900/80"
              delay={0.3}
            />
          </div>
          
          {/* Right column with image and experience */}
          <div className="lg:col-span-7 grid grid-cols-1 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden aspect-[16/9] group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Healthcare professionals collaborating" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              <div className="absolute bottom-0 right-0 bg-primary-900/90 backdrop-blur-sm p-6 rounded-tl-2xl z-20 max-w-[200px]">
                <div className="text-center">
                  <h3 className="text-5xl font-display font-bold text-white mb-1">25+</h3>
                  <p className="text-primary-200 text-sm">Years of Experience</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-neutral-900/90 to-neutral-800/90 backdrop-blur-sm rounded-2xl p-8"
            >
              <h3 className="text-2xl font-display font-bold text-white mb-6">Our Plan Makes You Feel More Comfortable in Health Management</h3>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                We combine cutting-edge technology with human-centered design to create solutions that are intuitive, effective, and accessible. Our comprehensive approach addresses the needs of all stakeholders in the healthcare ecosystem.
              </p>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-full shadow-glow transition-all"
              >
                Contact Us
              </motion.a>
            </motion.div>
          </div>
        </div>

        <h3 className="text-2xl font-display font-bold text-white text-center mb-10">Our Core Values</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ValueCard
            icon={<Lightbulb size={24} />}
            title="Innovation"
            description="Constantly pushing boundaries to develop cutting-edge solutions that address complex healthcare challenges."
            delay={0.1}
          />
          <ValueCard
            icon={<Compass size={24} />}
            title="Integrity"
            description="Upholding the highest ethical standards in all our operations, especially regarding patient data and privacy."
            delay={0.2}
          />
          <ValueCard
            icon={<Users size={24} />}
            title="Collaboration"
            description="Fostering partnerships across the healthcare ecosystem to create comprehensive, integrated solutions."
            delay={0.3}
          />
          <ValueCard
            icon={<Heart size={24} />}
            title="Compassion"
            description="Putting people at the center of everything we do, designing with empathy for patients and providers alike."
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
};