import React from 'react';
import { useEffect, useState } from 'react';
import { ScrollProgressIndicator } from './components/ui/ScrollProgressIndicator';
import { Navbar } from './components/layout/Navbar';
import { FloatingActionButton } from './components/ui/FloatingActionButton';
import { HeroSection } from './components/sections/HeroSection';
import { SolutionsSection } from './components/sections/SolutionsSection';
import { BenefitsSection } from './components/sections/BenefitsSection';
import { InfrastructureSection } from './components/sections/InfrastructureSection';
import { TeamSection } from './components/sections/TeamSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/ui/CustomCursor';
import { Preloader } from './components/ui/Preloader';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function App() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Register scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      gsap.fromTo(
        section.querySelectorAll('.animate-on-scroll'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'bottom 20%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      <Preloader minLoadingTime={2500} />
      <CustomCursor />
      <ScrollProgressIndicator />
      <Navbar />
      <main>
        <HeroSection />
        <SolutionsSection />
        <BenefitsSection />
        <InfrastructureSection />
        <TeamSection />
        <ContactSection />
      </main>
      <FloatingActionButton />
      <Footer />
    </div>
  );
}

export default App;