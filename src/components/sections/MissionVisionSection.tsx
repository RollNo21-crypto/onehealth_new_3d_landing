import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, Eye, Lightbulb, Compass, Clock, Users, Heart } from 'lucide-react';

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
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-sm border border-neutral-100 shadow-md group-hover:border-primary-300 p-8 transition-all duration-300 h-full">
        <div className="mb-6 p-4 bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-2xl w-fit text-primary-600 group-hover:text-primary-700 group-hover:from-primary-100 group-hover:to-primary-200/50 transition-all duration-300 shadow-sm border border-primary-100">
          {icon}
        </div>
        <h3 className="text-2xl font-display font-bold text-neutral-800 mb-4 group-hover:text-primary-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-neutral-600 group-hover:text-neutral-800 transition-colors duration-300 leading-relaxed">
          {description}
        </p>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500/50 via-secondary-500/50 to-primary-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
          <div className="p-2 bg-white/30 rounded-lg text-black">
            {icon}
          </div>
          <h3 className="text-xl md:text-2xl font-display font-bold text-black">{title}</h3>
        </div>
        <p className="text-black/80 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

export const MissionVisionSection = () => {
  return (
    <section id="mission-vision" className="py-20 md:py-32 relative overflow-hidden bg-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(79, 70, 229, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)'
        }}></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-primary-100 border border-primary-200 rounded-full text-primary-700 inline-block mb-4"
          >
            About Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold text-black mb-6"
          >
            Innovative Strategies for Global Health
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-black text-lg"
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
              bgColor="bg-gradient-to-br from-primary-100 to-primary-200/70"
              delay={0.1}
            />
            
            <InfoCard 
              title="Our Mission"
              icon={<Target size={24} />}
              description="To revolutionize global healthcare by creating an integrated ecosystem that connects patients, providers, and researchers through innovative technology solutions. We strive to break down barriers in healthcare access, enhance data-driven decision making, and improve patient outcomes worldwide through our comprehensive platform."
              bgColor="bg-gradient-to-br from-primary-100 to-primary-200/70"
              delay={0.2}
            />
            
            <InfoCard 
              title="Our History"
              icon={<Clock size={24} />}
              description="Founded in 2010 with a vision to transform healthcare delivery, we've grown from a small startup to a global leader in health technology solutions. Our journey has been marked by breakthrough innovations, strategic partnerships, and a relentless focus on improving patient outcomes through technology."
              bgColor="bg-gradient-to-br from-secondary-100 to-secondary-200/70"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Healthcare professionals collaborating" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              <div className="absolute bottom-0 right-0 bg-primary-600/90 backdrop-blur-sm p-6 rounded-tl-2xl z-20 max-w-[200px] shadow-lg">
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
              className="bg-gradient-to-br from-neutral-50 to-white backdrop-blur-sm rounded-2xl p-8 border border-neutral-100 shadow-md"
            >
              <h3 className="text-2xl font-display font-bold text-neutral-900 mb-6">Our Plan Makes You Feel More Comfortable in Health Management</h3>
              <p className="text-neutral-700 mb-6 leading-relaxed">
                We combine cutting-edge technology with human-centered design to create solutions that are intuitive, effective, and accessible. Our comprehensive approach addresses the needs of all stakeholders in the healthcare ecosystem.
              </p>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-full shadow-md shadow-primary-500/10 hover:shadow-primary-500/20 transition-all"
              >
                Contact Us
              </motion.a>
            </motion.div>
          </div>
        </div>

        <div className="text-center mb-16">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold text-black mb-4"
          >
            Our Core Values
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-black text-lg max-w-2xl mx-auto"
          >
            These principles guide our mission to revolutionize healthcare through technology and innovation
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ValueCard
            icon={<Lightbulb size={28} />}
            title="Innovation"
            description="Pioneering breakthrough solutions that redefine the future of healthcare delivery and patient care."
            delay={0.1}
          />
          <ValueCard
            icon={<Compass size={28} />}
            title="Integrity"
            description="Maintaining unwavering commitment to ethical practices and trust in every aspect of our operations."
            delay={0.2}
          />
          <ValueCard
            icon={<Users size={28} />}
            title="Collaboration"
            description="Building strong partnerships to create a connected and efficient healthcare ecosystem worldwide."
            delay={0.3}
          />
          <ValueCard
            icon={<Heart size={28} />}
            title="Compassion"
            description="Embracing empathy-driven design to ensure our solutions truly serve and support human needs."
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
};