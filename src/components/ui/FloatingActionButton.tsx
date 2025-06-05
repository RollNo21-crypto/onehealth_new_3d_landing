import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Menu, X } from 'lucide-react';

export const FloatingActionButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const quickNavItems = [
    { label: 'Home', href: '#hero' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Benefits', href: '#benefits' },
    { label: 'Services & Products', href: '#services-products' },
    { label: 'Partners', href: '#partners' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed right-6 bottom-6 z-40 flex flex-col items-end">
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ duration: 0.2 }}
                className="mb-4 bg-neutral-800/90 backdrop-blur-md rounded-lg p-2 shadow-lg text-neutral-50"
              >
                <ul className="flex flex-col gap-2">
                  {quickNavItems.map((item, index) => (
                    <motion.li 
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <a 
                        href={item.href}
                        className="text-neutral-300 hover:text-white whitespace-nowrap px-4 py-2 rounded-md hover:bg-neutral-800 block transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-3">
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleScrollToTop}
              className="bg-primary-500 hover:bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-glow transition-all"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-neutral-800 hover:bg-neutral-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all"
              aria-label="Quick navigation"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};