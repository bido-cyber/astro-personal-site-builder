
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import skillsData from '../data/skills.json';

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

        {/* Skills in single row on large screens, columns on small */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skills.map((skillGroup, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">
                {skillGroup.group}
              </h3>
              
              {/* Skills Grid */}
              <div className="grid grid-cols-3 gap-4">
                {skillGroup.icons.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="flex flex-col items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 group"
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform duration-200"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/32/666/fff?text=${skill.name.charAt(0)}`;
                      }}
                    />
                    <span className="text-xs text-slate-300 group-hover:text-white transition-colors duration-200 text-center">
                      {skill.name}
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
