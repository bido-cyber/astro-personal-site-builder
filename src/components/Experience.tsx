
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Briefcase, MapPin } from 'lucide-react';

const experienceData = {
  en: {
    title: "Experience",
    subtitle: "My professional journey and career milestones in the tech industry.",
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
    title: "الخبرة",
    subtitle: "رحلتي المهنية ومعالم مسيرتي في صناعة التكنولوجيا.",
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

export function Experience() {
  const { language, isRTL } = useLanguage();
  const data = experienceData[language];

  const TimelineItem = ({ item }: { item: any }) => (
    <div className={`flex gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
          <Briefcase className="w-6 h-6 text-white" />
        </div>
        <div className="w-px bg-gradient-to-b from-purple-600 to-pink-600 flex-1 mt-4"></div>
      </div>
      <div className="flex-1 pb-12">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
          <div className={`mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h3 className="text-lg font-bold text-white mb-1">
              {item.position}
            </h3>
            <p className="text-purple-300 font-medium">
              {item.company}
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
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative -mt-20">
      <div className="max-w-4xl mx-auto">
        <div className={`text-center mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {data.title}
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="space-y-8">
          {data.experience.map((item, index) => (
            <TimelineItem key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
