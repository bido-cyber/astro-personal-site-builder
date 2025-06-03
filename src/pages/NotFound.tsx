import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { StarryBackground } from '../components/StarryBackground';
import { useLanguage } from '../contexts/LanguageContext';

function NotFoundContent() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <StarryBackground />

      <div className="text-center z-10 px-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 shadow-xl border border-white/20 max-w-lg mx-auto">
          {/* 404 Number */}
          <div className="text-8xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            404
          </div>

          {/* Message */}
          <h1 className="text-2xl font-bold text-white mb-4">
            {language === 'en' ? 'Page Not Found' : 'الصفحة غير موجودة'}
          </h1>

          <p className="text-slate-300 mb-8 leading-relaxed">
            {language === 'en'
              ? 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'
              : 'قد تكون الصفحة التي تبحث عنها قد تم حذفها أو تغيير اسمها أو غير متاحة مؤقتاً.'}
          </p>

          {/* Action Buttons */}
          <div className="space-y-4">
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>{language === 'en' ? 'Go Home' : 'العودة للرئيسية'}</span>
            </a>

            <div className="text-center">
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{language === 'en' ? 'Go Back' : 'العودة'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Fun Space Elements */}
        <div className="mt-12 text-slate-400 text-sm">
          <p>
            {language === 'en'
              ? "🚀 Lost in space? Don't worry, we'll guide you home!"
              : '🚀 تائه في الفضاء؟ لا تقلق، سنوجهك إلى المنزل!'}
          </p>
        </div>
      </div>
    </div>
  );
}

const NotFound = () => {
  return (
    <LanguageProvider>
      <NotFoundContent />
    </LanguageProvider>
  );
};

export default NotFound;
