
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import skillsData from '../data/skills.json';

export function Skills() {
  const { language } = useLanguage();
  const skills = skillsData[language];

  return (
    <section className="py-20 relative -mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {skillGroup.group}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.icons.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-white/20 text-white text-sm rounded-full border border-white/30 hover:bg-white/30 transition-colors"
                    >
                      {skill}
                    </span>
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
