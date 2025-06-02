
import React from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { StarryBackground } from '../components/StarryBackground';
import { SharedNavigation } from '../components/SharedNavigation';
import { Hero } from '../components/Hero';
import { Skills } from '../components/Skills';
import { Education } from '../components/Education';
import { Experience } from '../components/Experience';
import { ProjectsSlider } from '../components/ProjectsSlider';
import { Testimonials } from '../components/Testimonials';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen relative">
        <StarryBackground />
        <SharedNavigation />
        <main>
          <Hero />
          <Skills />
          <Education />
          <Experience />
          <ProjectsSlider />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
