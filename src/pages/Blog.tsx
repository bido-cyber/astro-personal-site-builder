
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { StarryBackground } from '../components/StarryBackground';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

// Mock blog data - in a real app, this would come from a CMS or API
const blogPosts = {
  en: [
    {
      slug: 'getting-started-with-react',
      title: 'Getting Started with React: A Beginner\'s Guide',
      excerpt: 'Learn the fundamentals of React and start building modern web applications.',
      date: '2024-01-15',
      readTime: '5 min read',
      category: 'Web Development',
      cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop'
    },
    {
      slug: 'typescript-best-practices',
      title: 'TypeScript Best Practices for Modern Development',
      excerpt: 'Discover essential TypeScript patterns and practices that will make your code more robust.',
      date: '2024-01-10',
      readTime: '7 min read',
      category: 'TypeScript',
      cover: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop'
    },
    {
      slug: 'responsive-design-tips',
      title: 'Responsive Design Tips for Modern Websites',
      excerpt: 'Master the art of creating websites that look great on all devices.',
      date: '2024-01-05',
      readTime: '6 min read',
      category: 'CSS',
      cover: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop'
    }
  ],
  ar: [
    {
      slug: 'getting-started-with-react',
      title: 'البدء مع React: دليل المبتدئين',
      excerpt: 'تعلم أساسيات React وابدأ في بناء تطبيقات ويب حديثة.',
      date: '2024-01-15',
      readTime: '5 دقائق قراءة',
      category: 'تطوير الويب',
      cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop'
    },
    {
      slug: 'typescript-best-practices',
      title: 'أفضل ممارسات TypeScript للتطوير الحديث',
      excerpt: 'اكتشف أنماط وممارسات TypeScript الأساسية التي ستجعل كودك أكثر قوة.',
      date: '2024-01-10',
      readTime: '7 دقائق قراءة',
      category: 'TypeScript',
      cover: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop'
    },
    {
      slug: 'responsive-design-tips',
      title: 'نصائح التصميم المتجاوب للمواقع الحديثة',
      excerpt: 'اتقن فن إنشاء مواقع ويب تبدو رائعة على جميع الأجهزة.',
      date: '2024-01-05',
      readTime: '6 دقائق قراءة',
      category: 'CSS',
      cover: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop'
    }
  ]
};

function BlogContent() {
  const { language, isRTL } = useLanguage();
  const posts = blogPosts[language];

  return (
    <div className="min-h-screen relative">
      <StarryBackground />
      <Navigation />
      
      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              {language === 'en' ? 'Blog' : 'المدونة'}
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'Thoughts, tutorials, and insights about web development and technology'
                : 'أفكار ودروس ورؤى حول تطوير المواقع والتكنولوجيا'
              }
            </p>
          </div>

          {/* Featured Post */}
          {posts.length > 0 && (
            <div className="mb-16">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="h-64 lg:h-auto">
                    <img
                      src={posts[0].cover}
                      alt={posts[0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="mb-4">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                        {posts[0].category}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                      {posts[0].title}
                    </h2>
                    <p className="text-slate-300 mb-6">
                      {posts[0].excerpt}
                    </p>
                    <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center text-slate-400 text-sm ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                        <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(posts[0].date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')}</span>
                        </div>
                        <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
                          <Clock className="w-4 h-4" />
                          <span>{posts[0].readTime}</span>
                        </div>
                      </div>
                      <Link
                        to={`/blog/${posts[0].slug}`}
                        className={`inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}
                      >
                        <span>{language === 'en' ? 'Read More' : 'اقرأ المزيد'}</span>
                        <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post, index) => (
              <article key={index} className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-200">
                <div className="h-48">
                  <img
                    src={post.cover}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-3">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-slate-300 mb-4">
                    {post.excerpt}
                  </p>
                  <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center text-slate-400 text-sm ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                      <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')}</span>
                      </div>
                      <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <Link
                      to={`/blog/${post.slug}`}
                      className={`text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'} inline-flex items-center`}
                    >
                      <span>{language === 'en' ? 'Read' : 'اقرأ'}</span>
                      <ArrowRight className={`w-3 h-3 ${isRTL ? 'rotate-180' : ''}`} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

const Blog = () => {
  return (
    <LanguageProvider>
      <BlogContent />
    </LanguageProvider>
  );
};

export default Blog;
