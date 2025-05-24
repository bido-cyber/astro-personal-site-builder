
import React from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { StarryBackground } from '../components/StarryBackground';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Skills } from '../components/Skills';
import { ProjectsSlider } from '../components/ProjectsSlider';
import { Testimonials } from '../components/Testimonials';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

const Index = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen relative">
          <StarryBackground />
          <Navbar />
          <main>
            <Hero />
            <Skills />
            <ProjectsSlider />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Index;
