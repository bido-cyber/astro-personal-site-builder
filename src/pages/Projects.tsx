import React, { useState } from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { StarryBackground } from '../components/StarryBackground';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ProjectCard } from '../components/ProjectCard';
import { useLanguage } from '../contexts/LanguageContext';
import projectsData from '../data/projects.json';

function ProjectsContent() {
  const { language } = useLanguage();
  const [filter, setFilter] = useState('all');
  const projects = projectsData[language];

  const categories = {
    en: {
      all: 'All Projects',
      frontend: 'Frontend',
      fullstack: 'Full Stack',
      mobile: 'Mobile'
    },
    ar: {
      all: 'جميع المشاريع',
      frontend: 'الواجهة الأمامية',
      fullstack: 'التطوير الشامل',
      mobile: 'تطبيقات الجوال'
    }
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <div className="min-h-screen relative">
      <StarryBackground />
      <Navigation />
      
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              {language === 'en' ? 'My Projects' : 'مشاريعي'}
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'A collection of projects that showcase my skills and experience in web development'
                : 'مجموعة من المشاريع التي تعرض مهاراتي وخبرتي في تطوير المواقع'
              }
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.entries(categories[language]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  filter === key
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} language={language} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

const Projects = () => {
  return (
    <LanguageProvider>
      <ProjectsContent />
    </LanguageProvider>
  );
};

export default Projects;
