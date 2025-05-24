
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import skillsData from '../data/skills.json';

export function Skills() {
  const { language } = useLanguage();
  const skills = skillsData[language];

  return (
    <section className="py-20 relative -mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {skillGroup.group}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {skillGroup.icons.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="flex items-center space-x-3 px-3 py-2 bg-white/20 text-white text-sm rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-300 group"
                    >
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
                      />
                      <span className="text-xs font-medium">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
