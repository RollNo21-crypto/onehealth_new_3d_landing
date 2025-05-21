"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AnimatedListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: "up" | "down";
  speed?: number;
  pauseOnHover?: boolean;
}

export function AnimatedList({
  children,
  direction = "up",
  speed = 120, // Increased default speed
  pauseOnHover = true,
  className,
  ...props
}: AnimatedListProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const [animationKey, setAnimationKey] = React.useState(0);

  // Setup the animation
  React.useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;

    const scroller = scrollerRef.current;
    const container = containerRef.current;
    
    // Create a style element for our keyframes
    const styleEl = document.createElement("style");
    const id = `scroll-animation-${Math.random().toString(36).substring(2, 9)}`;
    styleEl.id = id;
    
    // Wait for content to be rendered and measured
    setTimeout(() => {
      if (!scroller || !container) return;
      
      // Get the height of the content
      const scrollerHeight = scroller.offsetHeight;
      const containerHeight = container.offsetHeight;
      
      // Only proceed if we have content that overflows
      if (scrollerHeight <= containerHeight) return;
      
      // Calculate animation duration based on content height and speed
      const animationDuration = scrollerHeight / speed;
      
      // Create keyframes
      styleEl.textContent = `
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-${scrollerHeight / 2}px); }
        }
        @keyframes scroll-down {
          0% { transform: translateY(-${scrollerHeight / 2}px); }
          100% { transform: translateY(0); }
        }
        @keyframes highlight {
          0%, 100% { background-color: transparent; }
          50% { background-color: rgba(255, 255, 255, 0.1); }
        }
      `;
      document.head.appendChild(styleEl);
      
      // Apply animation
      scroller.style.animation = `scroll-${direction} ${animationDuration}s linear infinite`;
    }, 100);
    
    return () => {
      // Clean up
      if (document.getElementById(id)) {
        document.getElementById(id)?.remove();
      }
    };
  }, [direction, speed, animationKey, children]);

  const handleMouseEnter = () => {
    if (!pauseOnHover || !scrollerRef.current) return;
    scrollerRef.current.style.animationPlayState = "paused";
  };

  const handleMouseLeave = () => {
    if (!pauseOnHover || !scrollerRef.current) return;
    scrollerRef.current.style.animationPlayState = "running";
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div ref={scrollerRef} className="flex flex-col animate-highlight">
        {children}
        {/* Duplicate children for seamless scrolling */}
        {children}
      </div>
    </div>
  );
}