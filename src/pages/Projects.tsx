import React, { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { StarryBackground } from '../components/StarryBackground';
import { SharedNavigation } from '../components/SharedNavigation';
import { ProjectCard } from '../components/ProjectCard';
import { Footer } from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { TechIcon } from '../components/TechIcon';
import projectsData from '../data/projects.json';

function ProjectsContent() {
  const { language, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const projects = projectsData[language];

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(project => {
      project.tech.forEach(tech => tags.add(tech));
    });
    return Array.from(tags);
  }, [projects]);

  // Filter projects based on search and tags
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 || selectedTags.some(tag => project.tech.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [projects, searchTerm, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
  };

  return (
    <div className="min-h-screen relative">
      <StarryBackground />
      <SharedNavigation />

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {language === 'en' ? 'My Projects' : 'مشاريعي'}
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              {language === 'en'
                ? 'Explore my portfolio of web applications, mobile apps, and open source contributions.'
                : 'استكشف محفظة أعمالي من تطبيقات الويب وتطبيقات الجوال والمساهمات مفتوحة المصدر.'}
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-12 space-y-6">
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute start-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder={language === 'en' ? 'Search projects...' : 'البحث في المشاريع...'}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full ps-10 pe-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            {/* Filter Tags */}
            <div className="flex flex-wrap justify-center gap-2">
              <div className="flex items-center text-white mb-2 me-4">
                <Filter className="w-4 h-4 me-2" />
                <span className="text-sm font-medium">
                  {language === 'en' ? 'Filter by tech:' : 'تصفية حسب التقنية:'}
                </span>
              </div>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                    selectedTags.includes(tag)
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  <TechIcon tech={tag} size={16} />
                  <span>{tag}</span>
                </button>
              ))}
            </div>

            {/* Active Filters */}
            {selectedTags.length > 0 && (
              <div className="text-center">
                <button
                  onClick={() => setSelectedTags([])}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  {language === 'en' ? 'Clear all filters' : 'مسح جميع المرشحات'}
                </button>
              </div>
            )}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <ProjectCard key={project.slug} project={project} language={language} isRTL={isRTL} />
            ))}
          </div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <div className="text-slate-400 text-lg mb-4">
                {language === 'en' ? 'No projects found' : 'لم يتم العثور على مشاريع'}
              </div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTags([]);
                }}
                className="text-blue-400 hover:text-blue-300"
              >
                {language === 'en' ? 'Reset filters' : 'إعادة تعيين المرشحات'}
              </button>
            </div>
          )}
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
