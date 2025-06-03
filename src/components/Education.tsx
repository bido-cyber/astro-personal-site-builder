import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { GraduationCap, MapPin } from "lucide-react";

const educationData = {
  en: {
    title: "Education",
    subtitle: "My educational background and academic achievements.",
    education: [
      {
        degree: "Bachelor of Computer Science",
        institution: "Cairo University",
        location: "Cairo, Egypt",
        period: "2018 - 2022",
        description:
          "Graduated with honors, specializing in Software Engineering and Web Development",
      },
      {
        degree: "Full Stack Web Development Bootcamp",
        institution: "Tech Academy",
        location: "Online",
        period: "2022",
        description:
          "Intensive program covering modern web technologies including React, Node.js, and databases",
      },
    ],
  },
  ar: {
    title: "التعليم",
    subtitle: "خلفيتي التعليمية والإنجازات الأكاديمية.",
    education: [
      {
        degree: "بكالوريوس علوم الحاسوب",
        institution: "جامعة القاهرة",
        location: "القاهرة، مصر",
        period: "2018 - 2022",
        description: "تخرجت بامتياز، متخصص في هندسة البرمجيات وتطوير المواقع",
      },
      {
        degree: "معسكر تطوير المواقع الشامل",
        institution: "أكاديمية التقنية",
        location: "عبر الإنترنت",
        period: "2022",
        description:
          "برنامج مكثف يغطي تقنيات الويب الحديثة بما في ذلك React و Node.js وقواعد البيانات",
      },
    ],
  },
};

export function Education() {
  const { language, isRTL } = useLanguage();
  const data = educationData[language];

  const TimelineItem = ({ item }: { item: any }) => (
    <div className={`flex gap-6`}>
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <div className="w-px bg-gradient-to-b from-blue-600 to-purple-600 flex-1 mt-4"></div>
      </div>
      <div className="flex-1 pb-12">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
          <div className={`mb-3 ${isRTL ? "text-right" : "text-left"}`}>
            <h3 className="text-lg font-bold text-white mb-1">{item.degree}</h3>
            <p className="text-blue-300 font-medium">{item.institution}</p>
            <div
              className={`flex items-center gap-4 mt-2 text-sm text-slate-300`}
            >
              <div className={`flex items-center gap-1`}>
                <MapPin className="w-4 h-4" />
                <span>{item.location}</span>
              </div>
              <span className="text-slate-400">•</span>
              <span>{item.period}</span>
            </div>
          </div>
          <p
            className={`text-slate-300 leading-relaxed ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="education"
      className="py-20 px-4 sm:px-6 lg:px-8 relative -mt-20"
    >
      <div className="max-w-4xl mx-auto">
        <div
          className={`text-center mb-16 ${isRTL ? "text-right" : "text-left"}`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {data.title}
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="space-y-8">
          {data.education.map((item, index) => (
            <TimelineItem key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
