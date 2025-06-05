import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Mission', href: '#mission-vision' },
    { label: 'Benefits', href: '#benefits' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Services', href: '#services-products' },
    { label: 'Partners', href: '#partners' },
    { label: 'Infrastructure', href: '#infrastructure' },
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-neutral-100' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <nav className="container mx-auto px-6 py-4 md:py-5 md:px-12">
        <div className="flex items-center justify-between">
          <motion.a 
            href="#hero" 
            className="flex items-center gap-2 text-2xl font-display font-bold text-neutral-900"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Globe className="w-8 h-8 text-primary-500" />
            <span>OneHealth</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-black hover:text-primary-700 font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-500 after:transition-all hover:after:w-full"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ y: -2 }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              className="bg-primary-600 hover:bg-primary-700 text-white py-2.5 px-7 rounded-xl font-medium transition-all shadow-md shadow-primary-500/10 hover:shadow-primary-500/20 hover:translate-y-0.5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.a>
          </div>

          {/* Tablet/Mobile Navigation Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-black z-50 p-3 hover:bg-primary-100 rounded-xl transition-colors"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </motion.button>
        </div>

        {/* Tablet/Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 top-16 bg-white/98 backdrop-blur-md shadow-lg border-t border-neutral-100 z-40"
            >
              <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col space-y-8">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <a
                        href={link.href}
                        className="flex items-center text-xl font-medium text-black hover:text-primary-600 py-3 border-b border-neutral-100 hover:border-primary-300 transition-all"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="inline-flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-primary-50 text-primary-600 text-sm shadow-sm">
                          {index + 1}
                        </span>
                        {link.label}
                      </a>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="pt-4"
                  >
                    <a
                      href="#contact"
                      className="inline-block bg-primary-600 hover:bg-primary-700 text-white py-4 px-8 rounded-xl text-lg w-full text-center font-medium shadow-md shadow-primary-500/10 hover:shadow-primary-500/20"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get Started
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};