
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Earth } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import navData from '../data/nav.json';

interface NavigationProps {
  isScrolled?: boolean;
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

export function Navigation({ isScrolled = false, isMobileMenuOpen = false, setIsMobileMenuOpen }: NavigationProps) {
  const { language, setLanguage, isRTL } = useLanguage();
  const location = useLocation();
  const navItems = navData[language];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        // Navigate to home first, then scroll
        window.location.href = `/${href}`;
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/10 backdrop-blur-md shadow-lg border-b border-white/20' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-2xl font-bold text-white hover:text-blue-400 transition-colors"
            >
              JD
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className={`flex items-baseline ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
              {navItems.map((item) => (
                item.href.startsWith('#') ? (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="text-slate-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {item.text}
                  </button>
                ) : (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="text-slate-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {item.text}
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Language Controls */}
          <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className={`flex items-center px-3 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors text-sm font-medium border border-white/20 ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}
            >
              <Earth className="w-4 h-4" />
              <span>{language === 'en' ? 'AR' : 'EN'}</span>
            </button>

            {/* Mobile menu button */}
            {setIsMobileMenuOpen && (
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-lg bg-white/10 text-white border border-white/20"
                >
                  <div className="w-6 h-6 flex flex-col justify-center items-center relative">
                    <span className={`bg-current h-0.5 w-6 transition-all duration-300 absolute ${isMobileMenuOpen ? 'rotate-45' : '-translate-y-1'}`}></span>
                    <span className={`bg-current h-0.5 w-6 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`bg-current h-0.5 w-6 transition-all duration-300 absolute ${isMobileMenuOpen ? '-rotate-45' : 'translate-y-1'}`}></span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && setIsMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/10 backdrop-blur-md rounded-lg mt-2 border border-white/20">
              {navItems.map((item) => (
                item.href.startsWith('#') ? (
                  <button
                    key={item.href}
                    onClick={() => {
                      scrollToSection(item.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-slate-300 hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors w-full text-left"
                  >
                    {item.text}
                  </button>
                ) : (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-slate-300 hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                  >
                    {item.text}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
