
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { GraduationCap, Briefcase, MapPin } from 'lucide-react';

const educationData = {
  en: {
    education: [
      {
        degree: "Bachelor of Computer Science",
        institution: "Cairo University",
        location: "Cairo, Egypt",
        period: "2018 - 2022",
        description: "Graduated with honors, specializing in Software Engineering and Web Development"
      },
      {
        degree: "Full Stack Web Development Bootcamp",
        institution: "Tech Academy",
        location: "Online",
        period: "2022",
        description: "Intensive program covering modern web technologies including React, Node.js, and databases"
      }
    ],
    experience: [
      {
        position: "Senior Frontend Developer",
        company: "TechCorp Solutions",
        location: "Cairo, Egypt",
        period: "2023 - Present",
        description: "Leading frontend development for enterprise applications using React and TypeScript. Mentoring junior developers and implementing best practices."
      },
      {
        position: "Full Stack Developer",
        company: "Digital Agency",
        location: "Remote",
        period: "2022 - 2023",
        description: "Developed and maintained web applications for various clients using React, Node.js, and MongoDB. Collaborated with design teams to implement pixel-perfect interfaces."
      },
      {
        position: "Junior Web Developer",
        company: "StartupXYZ",
        location: "Cairo, Egypt",
        period: "2021 - 2022",
        description: "Built responsive websites and web applications. Gained experience in modern JavaScript frameworks and version control systems."
      }
    ]
  },
  ar: {
    education: [
      {
        degree: "بكالوريوس علوم الحاسوب",
        institution: "جامعة القاهرة",
        location: "القاهرة، مصر",
        period: "2018 - 2022",
        description: "تخرجت بامتياز، متخصص في هندسة البرمجيات وتطوير المواقع"
      },
      {
        degree: "معسكر تطوير المواقع الشامل",
        institution: "أكاديمية التقنية",
        location: "عبر الإنترنت",
        period: "2022",
        description: "برنامج مكثف يغطي تقنيات الويب الحديثة بما في ذلك React و Node.js وقواعد البيانات"
      }
    ],
    experience: [
      {
        position: "مطور واجهات أمامية أول",
        company: "TechCorp Solutions",
        location: "القاهرة، مصر",
        period: "2023 - الحاضر",
        description: "قيادة تطوير الواجهات الأمامية لتطبيقات المؤسسات باستخدام React و TypeScript. توجيه المطورين المبتدئين وتطبيق أفضل الممارسات."
      },
      {
        position: "مطور تطبيقات شامل",
        company: "وكالة رقمية",
        location: "عن بُعد",
        period: "2022 - 2023",
        description: "تطوير وصيانة تطبيقات الويب لعملاء مختلفين باستخدام React و Node.js و MongoDB. التعاون مع فرق التصميم لتنفيذ واجهات مثالية."
      },
      {
        position: "مطور مواقع مبتدئ",
        company: "StartupXYZ",
        location: "القاهرة، مصر",
        period: "2021 - 2022",
        description: "بناء مواقع ويب وتطبيقات ويب متجاوبة. اكتسبت خبرة في أطر العمل الحديثة لـ JavaScript وأنظمة التحكم في الإصدار."
      }
    ]
  }
};

export function EducationExperience() {
  const { language, isRTL } = useLanguage();
  const data = educationData[language];

  const TimelineItem = ({ item, icon: Icon, type }: { item: any, icon: any, type: 'education' | 'experience' }) => (
    <div className={`flex gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="w-px bg-gradient-to-b from-blue-600 to-purple-600 flex-1 mt-4"></div>
      </div>
      <div className="flex-1 pb-12">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
          <div className={`mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h3 className="text-lg font-bold text-white mb-1">
              {type === 'education' ? item.degree : item.position}
            </h3>
            <p className="text-blue-300 font-medium">
              {type === 'education' ? item.institution : item.company}
            </p>
            <div className={`flex items-center gap-4 mt-2 text-sm text-slate-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <MapPin className="w-4 h-4" />
                <span>{item.location}</span>
              </div>
              <span className="text-slate-400">•</span>
              <span>{item.period}</span>
            </div>
          </div>
          <p className={`text-slate-300 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className={`text-center mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {language === 'en' ? 'Education & Experience' : 'التعليم والخبرة'}
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            {language === 'en' 
              ? 'My educational background and professional journey in the tech industry.'
              : 'خلفيتي التعليمية ورحلتي المهنية في صناعة التكنولوجيا.'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <h3 className={`text-2xl font-bold text-white mb-8 flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <GraduationCap className="w-8 h-8 text-blue-400" />
              {language === 'en' ? 'Education' : 'التعليم'}
            </h3>
            <div className="space-y-8">
              {data.education.map((item, index) => (
                <TimelineItem key={index} item={item} icon={GraduationCap} type="education" />
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className={`text-2xl font-bold text-white mb-8 flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Briefcase className="w-8 h-8 text-purple-400" />
              {language === 'en' ? 'Experience' : 'الخبرة'}
            </h3>
            <div className="space-y-8">
              {data.experience.map((item, index) => (
                <TimelineItem key={index} item={item} icon={Briefcase} type="experience" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
