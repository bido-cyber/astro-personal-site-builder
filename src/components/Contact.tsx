
import React, { useState } from 'react';
import { Github, Linkedin, Youtube } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import contactData from '../data/contact.json';

export function Contact() {
  const { language, isRTL } = useLanguage();
  const content = contactData[language];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your form handling service
    console.log('Form submitted:', formData);
    alert(language === 'en' ? 'Message sent! I\'ll get back to you soon.' : 'تم إرسال الرسالة! سأرد عليك قريباً.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'youtube':
        return <Youtube className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {content.title}
          </h2>
          <p className="text-slate-300 text-lg">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/10 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  {content.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  placeholder={content.form.name}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  {content.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  placeholder={content.form.email}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                  {content.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all resize-none"
                  placeholder={content.form.message}
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                {content.form.submit}
              </button>
            </form>
          </div>

          {/* Social Links */}
          <div className="space-y-8">
            <div className="bg-white/10 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-6">
                {language === 'en' ? 'Connect With Me' : 'تواصل معي'}
              </h3>
              <div className="space-y-4">
                {content.social.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 group"
                  >
                    <div className="text-white group-hover:text-blue-400 transition-colors">
                      {getIcon(social.icon)}
                    </div>
                    <span className="text-white group-hover:text-blue-400 transition-colors">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-white/10 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">
                {language === 'en' ? 'Quick Info' : 'معلومات سريعة'}
              </h3>
              <div className="space-y-3 text-slate-300">
                <p>📍 {language === 'en' ? 'Based in Egypt' : 'مقيم في مصر'}</p>
                <p>💼 {language === 'en' ? 'Available for freelance' : 'متاح للعمل الحر'}</p>
                <p>🕒 {language === 'en' ? 'Usually responds within 24 hours' : 'عادة ما أرد خلال 24 ساعة'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
