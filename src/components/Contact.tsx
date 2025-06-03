import React, { useState } from 'react';
import { CheckCircle, XCircle, MapPin, Clock, Briefcase } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const contactData = {
  en: {
    title: "Let's Work Together",
    subtitle: 'Based in Egypt • Available for freelance',
    form: {
      name: 'Your Name',
      email: 'Your Email',
      message: 'Your Message',
      submit: 'Send Message',
    },
    social: [
      {
        name: 'GitHub',
        url: 'https://github.com/johndoe',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
        color: 'hover:bg-gray-800/30',
      },
      {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/johndoe',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg',
        color: 'hover:bg-blue-600/30',
      },
      {
        name: 'Telegram',
        url: 'https://t.me/johndoe',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg',
        color: 'hover:bg-blue-500/30',
      },
      {
        name: 'YouTube',
        url: 'https://youtube.com/@johndoe',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png',
        color: 'hover:bg-red-600/30',
      },
      {
        name: 'Dev.to',
        url: 'https://dev.to/johndoe',
        icon: 'https://d2fltix0v2e0sb.cloudfront.net/dev-badge.svg',
        color: 'hover:bg-gray-900/30',
      },
    ],
  },
  ar: {
    title: 'دعونا نعمل معاً',
    subtitle: 'مقيم في مصر • متاح للعمل الحر',
    form: {
      name: 'اسمك',
      email: 'بريدك الإلكتروني',
      message: 'رسالتك',
      submit: 'إرسال الرسالة',
    },
    social: [
      {
        name: 'GitHub',
        url: 'https://github.com/johndoe',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
        color: 'hover:bg-gray-800/30',
      },
      {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/johndoe',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg',
        color: 'hover:bg-blue-600/30',
      },
      {
        name: 'Telegram',
        url: 'https://t.me/johndoe',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg',
        color: 'hover:bg-blue-500/30',
      },
      {
        name: 'YouTube',
        url: 'https://youtube.com/@johndoe',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png',
        color: 'hover:bg-red-600/30',
      },
      {
        name: 'Dev.to',
        url: 'https://dev.to/johndoe',
        icon: 'https://d2fltix0v2e0sb.cloudfront.net/dev-badge.svg',
        color: 'hover:bg-gray-900/30',
      },
    ],
  },
};

export function Contact() {
  const { language, isRTL } = useLanguage();
  const content = contactData[language];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'success' | 'error'>('success');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Google Form submission URL - replace with your actual form URL
      const googleFormUrl = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';

      const formDataToSend = new FormData();
      formDataToSend.append('entry.NAME_FIELD_ID', formData.name);
      formDataToSend.append('entry.EMAIL_FIELD_ID', formData.email);
      formDataToSend.append('entry.MESSAGE_FIELD_ID', formData.message);

      await fetch(googleFormUrl, {
        method: 'POST',
        body: formDataToSend,
        mode: 'no-cors',
      });

      // Show success feedback
      setFeedbackType('success');
      setShowFeedback(true);
      setFormData({ name: '', email: '', message: '' });

      // Hide feedback after 5 seconds
      setTimeout(() => setShowFeedback(false), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      // Show error feedback
      setFeedbackType('error');
      setShowFeedback(true);

      // Hide feedback after 5 seconds
      setTimeout(() => setShowFeedback(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{content.title}</h2>
          <p className="text-slate-300 text-lg">{content.subtitle}</p>
        </div>

        {/* Feedback Messages */}
        {showFeedback && (
          <div
            className={`mb-6 p-4 rounded-lg animate-slide-in-down ${
              feedbackType === 'success'
                ? 'bg-green-500/20 border border-green-500/50 text-green-100'
                : 'bg-red-500/20 border border-red-500/50 text-red-100'
            }`}
          >
            <div className="flex items-center gap-3">
              {feedbackType === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <XCircle className="w-5 h-5 text-red-400" />
              )}
              <span>
                {feedbackType === 'success'
                  ? language === 'en'
                    ? "Message sent successfully! I'll get back to you soon."
                    : 'تم إرسال الرسالة بنجاح! سأرد عليك قريباً.'
                  : language === 'en'
                    ? 'Failed to send message. Please try again.'
                    : 'فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى.'}
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
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
                disabled={isSubmitting}
                className="w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                {isSubmitting
                  ? language === 'en'
                    ? 'Sending...'
                    : 'جاري الإرسال...'
                  : content.form.submit}
              </button>
            </form>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <div className="bg-white/10 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-6">
                {language === 'en' ? 'Connect With Me' : 'تواصل معي'}
              </h3>
              <div className="space-y-2">
                {content.social.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 ${social.color} rounded-lg transition-all duration-200 group border border-white/10 hover:border-white/20 gap-3`}
                  >
                    <div className="bg-white p-1 rounded-lg">
                      <img src={social.icon} alt={social.name} className="w-5 h-5 object-contain" />
                    </div>
                    <span className="text-white group-hover:text-blue-400 transition-colors font-medium">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-white/10 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-6">
                {language === 'en' ? 'Quick Info' : 'معلومات سريعة'}
              </h3>
              <div className="space-y-4 text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <span>{language === 'en' ? 'Based in Egypt' : 'مقيم في مصر'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 p-2 rounded-lg">
                    <Briefcase className="w-5 h-5 text-purple-400" />
                  </div>
                  <span>{language === 'en' ? 'Available for freelance' : 'متاح للعمل الحر'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 p-2 rounded-lg">
                    <Clock className="w-5 h-5 text-green-400" />
                  </div>
                  <span>
                    {language === 'en'
                      ? 'Usually responds within 24 hours'
                      : 'عادة ما أرد خلال 24 ساعة'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
