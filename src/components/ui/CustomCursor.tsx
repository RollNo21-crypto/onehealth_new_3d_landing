import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'A' || 
          (e.target as HTMLElement).tagName === 'BUTTON' ||
          (e.target as HTMLElement).closest('a') ||
          (e.target as HTMLElement).closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Only show custom cursor on desktop
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  
  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 rounded-full bg-primary-500 z-[9999] pointer-events-none"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? '#22D3EE' : '#6D28D9',
        }}
        transition={{
          type: "spring",
          mass: 0.1,
          stiffness: 400,
          damping: 20,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 rounded-full border border-primary-500 z-[9998] opacity-30 mix-blend-difference pointer-events-none"
        animate={{
          x: mousePosition.x - 64,
          y: mousePosition.y - 64,
          scale: isHovering ? 0.5 : 1,
        }}
        transition={{
          type: "spring",
          mass: 1.5,
          stiffness: 150,
          damping: 15,
        }}
      />
    </>
  );
};