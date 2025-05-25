
import React, { useState } from 'react';
import { Send, Github, Linkedin, Youtube, MessageCircle, CheckCircle, AlertCircle, MapPin, Coffee } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Contact() {
  const { language, isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      // Google Form submission
      const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/formResponse';
      
      const formDataToSend = new FormData();
      formDataToSend.append('entry.1234567890', formData.name); // Replace with actual field IDs
      formDataToSend.append('entry.0987654321', formData.email);
      formDataToSend.append('entry.1122334455', formData.message);

      await fetch(googleFormUrl, {
        method: 'POST',
        body: formDataToSend,
        mode: 'no-cors'
      });

      setFeedback({
        type: 'success',
        message: language === 'en' ? 'Message sent successfully!' : 'تم إرسال الرسالة بنجاح!'
      });
      
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: language === 'en' ? 'Failed to send message. Please try again.' : 'فشل في إرسال الرسالة. حاول مرة أخرى.'
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFeedback(null), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {language === 'en' ? 'Get In Touch' : 'تواصل معي'}
          </h2>
          <p className="text-slate-300 text-lg">
            {language === 'en' 
              ? 'Have a project in mind? Let\'s work together!'
              : 'لديك مشروع في ذهنك؟ لنعمل معاً!'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2">
                  {language === 'en' ? 'Name' : 'الاسم'}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder={language === 'en' ? 'Your name' : 'اسمك'}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder={language === 'en' ? 'your@email.com' : 'بريدك@الإلكتروني.com'}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">
                  {language === 'en' ? 'Message' : 'الرسالة'}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                  placeholder={language === 'en' ? 'Tell me about your project...' : 'أخبرني عن مشروعك...'}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>{language === 'en' ? 'Send Message' : 'إرسال الرسالة'}</span>
                  </>
                )}
              </button>
            </form>

            {/* Feedback Message */}
            {feedback && (
              <div className={`mt-4 p-4 rounded-lg flex items-center animate-slide-in-down ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} ${
                feedback.type === 'success' 
                  ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
                  : 'bg-red-500/20 border border-red-500/30 text-red-300'
              }`}>
                {feedback.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <span>{feedback.message}</span>
              </div>
            )}
          </div>

          {/* Connect With Me */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                {language === 'en' ? 'Connect With Me' : 'تواصل معي'}
              </h3>
              
              <div className="space-y-4">
                <a
                  href="https://github.com/johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-200 group ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}
                >
                  <div className="p-2 bg-gray-600 rounded-lg group-hover:bg-gray-500 transition-colors">
                    <Github className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-slate-300 group-hover:text-white transition-colors">GitHub</span>
                </a>
                
                <a
                  href="https://linkedin.com/in/johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-200 group ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}
                >
                  <div className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-500 transition-colors">
                    <Linkedin className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-slate-300 group-hover:text-white transition-colors">LinkedIn</span>
                </a>
                
                <a
                  href="https://youtube.com/@johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-200 group ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}
                >
                  <div className="p-2 bg-red-600 rounded-lg group-hover:bg-red-500 transition-colors">
                    <Youtube className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-slate-300 group-hover:text-white transition-colors">YouTube</span>
                </a>
                
                <a
                  href="https://t.me/johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-200 group ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}
                >
                  <div className="p-2 bg-blue-500 rounded-lg group-hover:bg-blue-400 transition-colors">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-slate-300 group-hover:text-white transition-colors">Telegram</span>
                </a>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="space-y-4">
                <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-white font-medium">
                      {language === 'en' ? 'Based in Egypt' : 'مقيم في مصر'}
                    </div>
                    <div className="text-slate-300 text-sm">
                      Cairo, Egypt
                    </div>
                  </div>
                </div>
                <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                  <Coffee className="w-5 h-5 text-green-400" />
                  <div className="text-slate-300">
                    {language === 'en' ? 'Available for freelance' : 'متاح للعمل الحر'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
