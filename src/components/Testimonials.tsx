
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import testimonialsData from '../data/testimonials.json';

export function Testimonials() {
  const { language, isRTL } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = testimonialsData[language];

  // Auto-advance every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // For Arabic, we reverse the arrow logic
  const leftArrow = isRTL ? ArrowRight : ArrowLeft;
  const rightArrow = isRTL ? ArrowLeft : ArrowRight;
  const prevAction = isRTL ? nextTestimonial : prevTestimonial;
  const nextAction = isRTL ? prevTestimonial : nextTestimonial;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {language === 'en' ? 'What Clients Say' : 'آراء العملاء'}
          </h2>
          <p className="text-slate-300 text-lg">
            {language === 'en' 
              ? 'Testimonials from satisfied clients and colleagues.'
              : 'شهادات من العملاء والزملاء الراضين.'
            }
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
            <div className="text-center space-y-6">
              {/* Quote */}
              <blockquote className={`text-xl text-white leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                "{testimonials[currentIndex].text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <img
                  src={testimonials[currentIndex].avatar || "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face"}
                  alt={testimonials[currentIndex].name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                />
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <div className="font-semibold text-white">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-sm text-slate-300">
                    {testimonials[currentIndex].role}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-8 gap-4">
            <button
              onClick={prevAction}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-md border border-white/20 transition-all duration-300"
              disabled={testimonials.length <= 1}
            >
              {React.createElement(leftArrow, { className: "w-5 h-5 text-white" })}
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-blue-400 scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextAction}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-md border border-white/20 transition-all duration-300"
              disabled={testimonials.length <= 1}
            >
              {React.createElement(rightArrow, { className: "w-5 h-5 text-white" })}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
