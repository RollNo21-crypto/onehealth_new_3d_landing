import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail, Facebook, ChevronLeft, ChevronRight } from 'lucide-react';

interface TeamMemberProps {
  member: {
    name: string;
    role: string;
    image: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    email?: string;
  };
  index: number;
}

const TeamMember: React.FC<TeamMemberProps> = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-xl shadow-lg w-full max-w-[300px] mx-auto"
    >
      <div className="relative overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="object-cover w-full h-[400px] transform group-hover:scale-105 transition-transform duration-500"
          style={{ aspectRatio: '3/4' }} // More vertical aspect ratio
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent h-1/2"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-5 transition-all duration-300">
        <h3 className="text-xl font-display font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
          {member.name}
        </h3>
        <p className="text-neutral-300 mb-3">{member.role}</p>
        
        <div className="flex gap-2">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-neutral-800 hover:bg-primary-400 hover:text-white transition-colors duration-300"
              aria-label={`${member.name}'s LinkedIn profile`}
            >
              <Linkedin size={16} />
            </a>
          )}
          {member.twitter && (
            <a
              href={member.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-neutral-800 hover:bg-primary-400 hover:text-white transition-colors duration-300"
              aria-label={`${member.name}'s Twitter profile`}
            >
              <Twitter size={16} />
            </a>
          )}
          {member.facebook && (
            <a
              href={member.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-neutral-800 hover:bg-primary-400 hover:text-white transition-colors duration-300"
              aria-label={`${member.name}'s Facebook profile`}
            >
              <Facebook size={16} />
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-neutral-800 hover:bg-primary-400 hover:text-white transition-colors duration-300"
              aria-label={`Email ${member.name}`}
            >
              <Mail size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const TeamCarousel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const childrenArray = React.Children.toArray(children);
  const totalItems = childrenArray.length;
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Determine items per view based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex, totalItems, itemsPerView]);
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= totalItems - itemsPerView + 1 ? 0 : nextIndex;
    });
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex < 0 ? totalItems - itemsPerView : nextIndex;
    });
  };
  
  return (
    <div className="relative w-full">
      <div 
        ref={carouselRef}
        className="overflow-hidden w-full"
      >
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
        >
          {React.Children.map(children, (child, index) => (
            <div 
              className={`flex-shrink-0 px-3 transition-opacity duration-300`}
              style={{ width: `${100 / itemsPerView}%` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation buttons */}
      <button 
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white/80 hover:bg-white text-neutral-800 rounded-full p-2 shadow-lg z-10 transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white/80 hover:bg-white text-neutral-800 rounded-full p-2 shadow-lg z-10 transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

const PartnerLogo = ({ partner, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="group relative overflow-hidden rounded-2xl bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-8 hover:border-primary-500/50 transition-all duration-300"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="relative flex items-center justify-center h-20">
      <img
        src={partner.logo}
        alt={partner.name}
        className="max-h-12 max-w-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
      />
    </div>
  </motion.div>
);

export const TeamSection = () => {
  const teamMembers = [
    {
      name: "Mark Joseph",
      role: "Tax Expert",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      linkedin: "#",
      twitter: "#",
      facebook: "#",
      email: "mark@onehealth.com"
    },
    {
      name: "Ella Grace",
      role: "Tax Expert",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
      linkedin: "#",
      twitter: "#",
      facebook: "#",
      email: "ella@onehealth.com"
    },
    {
      name: "Kylian Herrera",
      role: "Tax Expert",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      linkedin: "#",
      twitter: "#",
      facebook: "#",
      email: "kylian@onehealth.com"
    },
    {
      name: "Sarah Johnson",
      role: "Financial Advisor",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80",
      linkedin: "#",
      twitter: "#",
      email: "sarah@onehealth.com"
    },
    {
      name: "Michael Chen",
      role: "Investment Specialist",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      linkedin: "#",
      facebook: "#",
      email: "michael@onehealth.com"
    },
    {
      name: "Jessica Williams",
      role: "Client Relations",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
      linkedin: "#",
      twitter: "#",
      email: "jessica@onehealth.com"
    },
    {
      name: "David Rodriguez",
      role: "Tax Consultant",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      linkedin: "#",
      facebook: "#",
      email: "david@onehealth.com"
    }
  ];

  const partners = [
    { name: "WHO", logo: "https://placehold.co/200x80/2c2c2c/FFFFFF?text=World+Health+Org" },
    { name: "Mayo Clinic", logo: "https://placehold.co/200x80/2c2c2c/FFFFFF?text=Mayo+Clinic" },
    { name: "Microsoft", logo: "https://placehold.co/200x80/2c2c2c/FFFFFF?text=Microsoft" },
    { name: "Johns Hopkins", logo: "https://placehold.co/200x80/2c2c2c/FFFFFF?text=Johns+Hopkins" },
    { name: "NHS", logo: "https://placehold.co/200x80/2c2c2c/FFFFFF?text=NHS" },
    { name: "Gates Foundation", logo: "https://placehold.co/200x80/2c2c2c/FFFFFF?text=Gates+Foundation" }
  ];

  return (
    <section id="team" className="py-20 md:py-32 relative overflow-hidden bg-neutral-50/5">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-neutral-950/50 to-background opacity-80"></div>
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Centered heading section - removed the flex layout and View More button */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-primary-500/30 border border-primary-500/20 rounded-full text-primary-400 inline-block mb-4"
          >
            OUR TEAM
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold text-white mb-6"
          >
            Meet Our Professional Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-neutral-400 text-lg max-w-3xl mx-auto"
          >
            Our team of experienced professionals is dedicated to providing innovative
            strategies for your success and prosperity.
          </motion.p>
        </div>

        <div className="mb-20">
          <TeamCarousel>
            {teamMembers.map((member, index) => (
              <TeamMember key={index} member={member} index={index} />
            ))}
          </TeamCarousel>
        </div>

        <div className="mt-24">
          <h3 className="text-2xl font-display font-bold text-white mb-8 text-center">
            Our Strategic Partners
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <PartnerLogo key={index} partner={partner} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};