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
import { useSEO } from '../hooks/useSEO';

function IndexContent() {
  useSEO({
    title: 'John Doe - Full Stack Developer Portfolio',
    description:
      'Full Stack Developer specializing in modern web technologies. Building scalable applications with React, Node.js, and more.',
    image: 'https://bido-cyber.github.io/og-image.jpg',
    url: 'https://bido-cyber.github.io/',
    type: 'website',
    tags: [
      'full stack developer',
      'web development',
      'JavaScript',
      'React',
      'Node.js',
      'portfolio',
    ],
  });

  return (
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
  );
}

const Index = () => {
  return (
    <LanguageProvider>
      <IndexContent />
    </LanguageProvider>
  );
};

export default Index;
