import React from 'react';
import { ArrowRight, ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { TechIcon } from './TechIcon';
import { useNavigate } from 'react-router-dom';

interface Project {
  slug: string;
  name: string;
  logo?: string;
  summary: string;
  tech: string[];
  repo?: string;
  demo?: string;
  cover: string;
  hasDetails?: boolean;
}

interface ProjectCardProps {
  project: Project;
  language: string;
  isRTL: boolean;
}

export function ProjectCard({ project, language, isRTL }: ProjectCardProps) {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate(`/projects/${project.slug}`);
  };

  const handleDetailsClick = () => {
    navigate(`/projects/${project.slug}`);
  };

  return (
    <div className="group bg-white/10 dark:bg-slate-800/50 backdrop-blur-md rounded-xl overflow-hidden shadow-xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:transform hover:scale-105">
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.cover || 'https://picsum.photos/600/300?random=99'}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <button
            onClick={handleTitleClick}
            className={`text-xl font-bold text-white group-hover:text-blue-400 transition-colors w-full ${
              isRTL ? 'text-right' : 'text-left'
            }`}
          >
            {project.name}
          </button>
          <p className="text-slate-300 text-sm leading-relaxed">{project.summary}</p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="flex items-center gap-2 px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-md border border-blue-500/30"
            >
              <TechIcon tech={tech} size={14} />
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex gap-3">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="View repository"
              >
                <Github className="w-4 h-4 text-white" />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors"
                aria-label="View demo"
              >
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-blue-300" />
                  <span className="text-blue-300 text-sm">
                    {language === 'en' ? 'Live Demo' : 'العرض المباشر'}
                  </span>
                </div>
              </a>
            )}
          </div>

          {project.hasDetails && (
            <button
              onClick={handleDetailsClick}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1 transition-colors"
            >
              <span>{language === 'en' ? 'Details' : 'التفاصيل'}</span>
              {isRTL ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
