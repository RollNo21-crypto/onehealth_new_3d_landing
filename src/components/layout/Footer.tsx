import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'News', href: '#' },
        { label: 'Blog', href: '#' },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { label: 'Healthcare', href: '#' },
        { label: 'Technology', href: '#' },
        { label: 'Research', href: '#' },
        { label: 'Environment', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'Support', href: '#' },
        { label: 'FAQs', href: '#' },
        { label: 'Privacy Policy', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Linkedin size={20} />, href: '#', label: 'LinkedIn' },
    { icon: <Facebook size={20} />, href: '#', label: 'Facebook' },
  ];

  return (
    <footer className="bg-neutral-900 pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <a href="#hero" className="flex items-center gap-2 text-2xl font-display font-bold text-white mb-4">
              <Globe className="w-8 h-8 text-primary-500" />
              <span>OneHealth</span>
            </a>
            <p className="text-neutral-400 mb-6 max-w-md">
              Transforming the future of global health through innovative solutions and collaborative partnerships.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-neutral-300">
                <Mail size={16} className="text-primary-400" />
                <a href="mailto:contact@onehealth.com" className="hover:text-white transition-colors">
                  contact@onehealth.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <Phone size={16} className="text-primary-400" />
                <a href="tel:+1-234-567-8901" className="hover:text-white transition-colors">
                  +1-234-567-8901
                </a>
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <MapPin size={16} className="text-primary-400" />
                <span>1234 Health Avenue, San Francisco, CA 94107</span>
              </div>
            </div>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="font-display text-white text-lg font-medium mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-neutral-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-neutral-500 text-sm">
            © {currentYear} OneHealth. All rights reserved.
          </div>

          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                whileHover={{ y: -3 }}
                aria-label={link.label}
                className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-primary-500 transition-colors"
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};