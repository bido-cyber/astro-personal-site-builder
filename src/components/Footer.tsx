
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4">
          <div className="text-2xl font-bold text-white">
            JD
          </div>
          <p className="text-slate-300">
            {language === 'en' 
              ? 'Building the future, one line of code at a time.'
              : 'بناء المستقبل، سطر برمجي واحد في كل مرة.'
            }
          </p>
          <p className="text-slate-400 text-sm">
            © {currentYear} John Doe. {language === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
