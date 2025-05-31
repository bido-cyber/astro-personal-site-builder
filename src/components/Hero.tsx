
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import siteData from '../data/site.json';

export function Hero() {
  const { language, isRTL } = useLanguage();
  const content = siteData[language];

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
          {/* Content */}
          <div className={`space-y-8 ${isRTL ? 'lg:col-start-2 text-right' : 'text-left'}`}>
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {content.tagline}
                </span>
              </h1>
              <p className="text-xl text-slate-300 max-w-lg leading-relaxed">
                {content.bio}
              </p>
            </div>

            <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <a
                href="/cv.pdf"
                download
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
              >
                {language === 'en' ? 'Download CV' : 'تحميل السيرة الذاتية'}
              </a>
              <button
                onClick={scrollToContact}
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white/20 text-base font-medium rounded-lg text-white hover:bg-white/10 transition-all duration-200"
              >
                {language === 'en' ? 'Get In Touch' : 'تواصل معي'}
              </button>
            </div>
          </div>

          {/* Portrait */}
          <div className={`flex justify-center ${isRTL ? 'lg:col-start-1' : ''}`}>
            <div className="relative">
              <div 
                className="w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full overflow-hidden shadow-2xl"
                style={{
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                  alt="John Doe"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-xl opacity-30 -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
