
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { ProjectCard } from './ProjectCard';
import projectsData from '../data/projects.json';
import { Link } from 'react-router-dom';

export function ProjectsSlider() {
  const { language, isRTL } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter only featured projects
  const allProjects = projectsData[language];
  const projects = allProjects.filter(project => project.featured === true);

  // Auto-advance every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % projects.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [projects.length]);

  const nextProject = () => {
    setCurrentIndex(prev => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex(prev => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {language === 'en' ? 'Featured Projects' : 'المشاريع المميزة'}
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            {language === 'en'
              ? 'Here are some of my recent projects that showcase my skills and experience.'
              : 'إليك بعض من مشاريعي الحديثة التي تعرض مهاراتي وخبرتي.'}
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Arrows - Updated positioning for mobile */}
          <button
            onClick={prevProject}
            className={`absolute ${isRTL ? 'end-2 sm:end-0 sm:translate-x-4' : 'start-2 sm:start-0 sm:-translate-x-4'} top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md border border-white/20 transition-all duration-300 group`}
            disabled={projects.length <= 1}
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-blue-400 transition-colors" />
          </button>

          <button
            onClick={nextProject}
            className={`absolute ${isRTL ? 'start-2 sm:start-0 sm:-translate-x-4' : 'end-2 sm:end-0 sm:translate-x-4'} top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md border border-white/20 transition-all duration-300 group`}
            disabled={projects.length <= 1}
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-blue-400 transition-colors" />
          </button>

          {/* Project Cards */}
          <div className="overflow-hidden rounded-2xl mx-8 sm:mx-0">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: isRTL
                  ? `translateX(${currentIndex * 100}%)`
                  : `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div key={project.slug} className="w-full flex-shrink-0 px-4">
                  <div className="max-w-lg mx-auto">
                    <ProjectCard project={project} language={language} isRTL={isRTL} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-blue-400 scale-125' : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Show All Button */}
        <div className="text-center mt-12">
          <Link
            to="/projects"
            className="inline-flex gap-2 items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            {language === 'en' ? 'View All Projects' : 'عرض جميع المشاريع'}
            <ArrowRight className={`w-4 h-4 ${isRTL ? 'me-2 rotate-180' : 'ms-2'}`} />
          </Link>
        </div>
      </div>
    </section>
  );
}
