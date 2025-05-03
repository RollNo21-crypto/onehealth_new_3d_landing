import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const TeamMember = ({ member, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="group relative"
  >
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500/10 to-secondary-400/10">
      <div className="aspect-w-3 aspect-h-4">
        <img
          src={member.image}
          alt={member.name}
          className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-300"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-xl font-display font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
          {member.name}
        </h3>
        <p className="text-neutral-400 mb-4">{member.role}</p>
        <div className="flex gap-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
          )}
          {member.twitter && (
            <a
              href={member.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <Twitter size={20} />
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <Mail size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

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
        className="max-h-12  max-w-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
      />
    </div>
  </motion.div>
);

export const TeamSection = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg",
      linkedin: "#",
      twitter: "#",
      email: "sarah@onehealth.com"
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      linkedin: "#",
      twitter: "#",
      email: "michael@onehealth.com"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Research Director",
      image: "https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg",
      linkedin: "#",
      twitter: "#",
      email: "emily@onehealth.com"
    },
    {
      name: "James Wilson",
      role: "Global Partnerships Lead",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
      linkedin: "#",
      twitter: "#",
      email: "james@onehealth.com"
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
    <section id="team" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-neutral-950 to-background"></div>
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-primary-500/30 border border-primary-500/20 rounded-full text-primary-400 inline-block mb-4"
          >
            Our Team
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold text-white mb-6"
          >
            Leadership & Partnerships
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-neutral-400 text-lg"
          >
            Meet the minds behind our vision and the organizations helping us create
            a healthier future for all.
          </motion.p>
        </div>

        <div className="mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} member={member} index={index} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-display font-bold text-white mb-8">
            Strategic Partners
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