
import React from 'react';
import { GraduationCap, Briefcase, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const educationData = {
  en: [
    {
      type: 'education',
      title: 'Bachelor of Computer Science',
      institution: 'Cairo University',
      period: '2018 - 2022',
      description: 'Specialized in Software Engineering and Web Development. Graduated with honors.',
      location: 'Cairo, Egypt'
    },
    {
      type: 'education',
      title: 'Full Stack Web Development Bootcamp',
      institution: 'Tech Academy',
      period: '2022',
      description: 'Intensive 6-month program covering modern web technologies including React, Node.js, and cloud deployment.',
      location: 'Online'
    }
  ],
  ar: [
    {
      type: 'education',
      title: 'بكالوريوس علوم الحاسوب',
      institution: 'جامعة القاهرة',
      period: '2018 - 2022',
      description: 'تخصص في هندسة البرمجيات وتطوير المواقع. تخرجت بامتياز.',
      location: 'القاهرة، مصر'
    },
    {
      type: 'education',
      title: 'دورة تطوير المواقع الشاملة',
      institution: 'أكاديمية التقنية',
      period: '2022',
      description: 'برنامج مكثف لمدة 6 أشهر يغطي تقنيات الويب الحديثة بما في ذلك React و Node.js ونشر السحابة.',
      location: 'عبر الإنترنت'
    }
  ]
};

const experienceData = {
  en: [
    {
      type: 'experience',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Solutions',
      period: '2023 - Present',
      description: 'Leading frontend development for enterprise web applications. Mentoring junior developers and implementing modern React patterns.',
      location: 'Cairo, Egypt'
    },
    {
      type: 'experience',
      title: 'Full Stack Developer',
      company: 'Digital Agency',
      period: '2022 - 2023',
      description: 'Developed and maintained multiple client websites using React, Node.js, and PostgreSQL. Improved site performance by 40%.',
      location: 'Remote'
    },
    {
      type: 'experience',
      title: 'Frontend Developer Intern',
      company: 'StartupXYZ',
      period: '2021 - 2022',
      description: 'Built responsive web interfaces using HTML, CSS, JavaScript, and React. Collaborated with design team to implement pixel-perfect UIs.',
      location: 'Cairo, Egypt'
    }
  ],
  ar: [
    {
      type: 'experience',
      title: 'مطور واجهة أمامية أول',
      company: 'شركة تيك كورب',
      period: '2023 - الحاضر',
      description: 'قيادة تطوير الواجهة الأمامية لتطبيقات الويب المؤسسية. توجيه المطورين المبتدئين وتنفيذ أنماط React الحديثة.',
      location: 'القاهرة، مصر'
    },
    {
      type: 'experience',
      title: 'مطور ويب شامل',
      company: 'الوكالة الرقمية',
      period: '2022 - 2023',
      description: 'تطوير وصيانة مواقع متعددة للعملاء باستخدام React و Node.js و PostgreSQL. تحسين أداء الموقع بنسبة 40%.',
      location: 'عن بُعد'
    },
    {
      type: 'experience',
      title: 'متدرب مطور واجهة أمامية',
      company: 'ستارت أب XYZ',
      period: '2021 - 2022',
      description: 'بناء واجهات ويب متجاوبة باستخدام HTML و CSS و JavaScript و React. التعاون مع فريق التصميم لتنفيذ واجهات مثالية.',
      location: 'القاهرة، مصر'
    }
  ]
};

export function EducationExperience() {
  const { language, isRTL } = useLanguage();
  const education = educationData[language];
  const experience = experienceData[language];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {language === 'en' ? 'Education & Experience' : 'التعليم والخبرة'}
          </h2>
          <p className="text-slate-300 text-lg">
            {language === 'en' 
              ? 'My educational background and professional journey'
              : 'خلفيتي التعليمية ومسيرتي المهنية'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education Section */}
          <div>
            <div className={`flex items-center mb-8 ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
              <div className="p-3 bg-blue-600 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                {language === 'en' ? 'Education' : 'التعليم'}
              </h3>
            </div>
            
            <div className="space-y-6">
              {education.map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
                  <div className={`flex items-start justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                    <div className={`flex items-center text-slate-400 text-sm ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
                      <Calendar className="w-4 h-4" />
                      <span>{item.period}</span>
                    </div>
                  </div>
                  <p className="text-blue-400 font-medium mb-2">{item.institution}</p>
                  <p className="text-slate-300 mb-2">{item.description}</p>
                  <p className="text-slate-400 text-sm">{item.location}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div>
            <div className={`flex items-center mb-8 ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
              <div className="p-3 bg-purple-600 rounded-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                {language === 'en' ? 'Experience' : 'الخبرة'}
              </h3>
            </div>
            
            <div className="space-y-6">
              {experience.map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
                  <div className={`flex items-start justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                    <div className={`flex items-center text-slate-400 text-sm ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
                      <Calendar className="w-4 h-4" />
                      <span>{item.period}</span>
                    </div>
                  </div>
                  <p className="text-purple-400 font-medium mb-2">{item.company}</p>
                  <p className="text-slate-300 mb-2">{item.description}</p>
                  <p className="text-slate-400 text-sm">{item.location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
