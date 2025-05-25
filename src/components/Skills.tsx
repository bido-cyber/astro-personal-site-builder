
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import skillsData from '../data/skills.json';

// Tech logos mapping
const techLogos: { [key: string]: string } = {
  'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'HTML': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
  'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  'AWS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
  'Firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  'Vue.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
  'Angular': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
  'Express': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'GraphQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
  'Redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg'
};

export function Skills() {
  const { language } = useLanguage();
  const skills = skillsData[language];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {language === 'en' ? 'Technical Skills' : 'المهارات التقنية'}
          </h2>
          <p className="text-slate-300 text-lg">
            {language === 'en' 
              ? 'Technologies and tools I work with'
              : 'التقنيات والأدوات التي أعمل بها'
            }
          </p>
        </div>

        {/* Skills Groups */}
        <div className="space-y-8">
          {skills.map((skillGroup, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">
                {skillGroup.group}
              </h3>
              
              {/* Skills Grid */}
              <div className="flex flex-wrap justify-center gap-4">
                {skillGroup.icons.map((tech, techIndex) => (
                  <div
                    key={techIndex}
                    className="flex flex-col items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 group"
                  >
                    <img
                      src={techLogos[tech] || `https://via.placeholder.com/40/666/fff?text=${tech.charAt(0)}`}
                      alt={tech}
                      className="w-10 h-10 mb-2 group-hover:scale-110 transition-transform duration-200"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/40/666/fff?text=${tech.charAt(0)}`;
                      }}
                    />
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors duration-200 text-center">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
