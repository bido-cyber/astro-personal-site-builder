import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock, Github, ExternalLink } from 'lucide-react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { StarryBackground } from '../components/StarryBackground';
import { SharedNavigation } from '../components/SharedNavigation';
import { Footer } from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { TechIcon } from '../components/TechIcon';
import projectsData from '../data/projects.json';

function ProjectDetailContent() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { language, isRTL } = useLanguage();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const projects = projectsData[language];
  const project = projects.find(p => p.slug === slug);

  useEffect(() => {
    const loadProjectDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to fetch from public folder
        const response = await fetch(`/content/projects/${slug}.md`);

        if (!response.ok) {
          throw new Error('Project details not found');
        }

        const markdown = await response.text();
        setContent(markdown);
      } catch (err) {
        console.error('Error loading project details:', err);
        setError('Project details not found');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadProjectDetail();
    }
  }, [slug]);

  const formatMarkdown = (markdown: string) => {
    // Basic markdown parsing - in a real app, use a proper markdown parser
    return markdown
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-white mb-6">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-white mb-4 mt-8">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-white mb-3 mt-6">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(
        /```([\s\S]*?)```/g,
        '<pre class="bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto"><code class="text-green-400">$1</code></pre>'
      )
      .replace(/`(.*?)`/g, '<code class="bg-gray-800 px-2 py-1 rounded text-green-400">$1</code>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
  };

  if (loading) {
    return (
      <div className="min-h-screen relative">
        <StarryBackground />
        <SharedNavigation />
        <main className="pt-24 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <div className="text-white text-lg">
                {language === 'en' ? 'Loading...' : 'جاري التحميل...'}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen relative">
        <StarryBackground />
        <SharedNavigation />
        <main className="pt-24 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <h1 className="text-4xl font-bold text-white mb-4">
                {language === 'en' ? 'Project Not Found' : 'المشروع غير موجود'}
              </h1>
              <p className="text-slate-300 mb-8">
                {language === 'en'
                  ? "The project you're looking for doesn't exist."
                  : 'المشروع الذي تبحث عنه غير موجود.'}
              </p>
              <button
                onClick={() => navigate('/projects')}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === 'en' ? 'Back to Projects' : 'العودة للمشاريع'}
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <StarryBackground />
      <SharedNavigation />

      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
          >
            {isRTL ? (
              <ArrowRight className="w-4 h-4 mr-2" />
            ) : (
              <ArrowLeft className="w-4 h-4 mr-2" />
            )}
            {language === 'en' ? 'Back to Projects' : 'العودة للمشاريع'}
          </button>

          {/* Project Header */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <img
                src={project.cover}
                alt={project.name}
                className="w-full md:w-48 h-32 object-cover rounded-lg"
              />
              <div className="flex-1 w-full">
                <h1 className="text-3xl font-bold text-white mb-4">{project.name}</h1>
                <p className="text-slate-300 mb-4">{project.summary}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-md border border-blue-500/30"
                    >
                      <TechIcon tech={tech} size={16} />
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      {language === 'en' ? 'View Code' : 'عرض الكود'}
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {language === 'en' ? 'Live Demo' : 'العرض المباشر'}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Project Content */}
          <article className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
            <div
              className="prose prose-invert max-w-none text-slate-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }}
            />
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const ProjectDetail = () => {
  return (
    <LanguageProvider>
      <ProjectDetailContent />
    </LanguageProvider>
  );
};

export default ProjectDetail;
