
import React, { useState, useMemo } from 'react';
import { Search, Calendar, Clock } from 'lucide-react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { StarryBackground } from '../components/StarryBackground';
import { SharedNavigation } from '../components/SharedNavigation';
import { Footer } from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

// Dummy blog data - in real app this would come from markdown files
const blogPosts = {
  en: [
    {
      slug: 'getting-started-with-react',
      title: 'Getting Started with React in 2024',
      excerpt: 'A comprehensive guide to building modern React applications with the latest features and best practices.',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'React',
      cover: '/blog/react-guide.jpg'
    },
    {
      slug: 'building-responsive-layouts',
      title: 'Building Responsive Layouts with CSS Grid',
      excerpt: 'Learn how to create flexible and responsive layouts using CSS Grid and Flexbox.',
      date: '2024-01-10',
      readTime: '6 min read',
      category: 'CSS',
      cover: '/blog/css-grid.jpg'
    },
    {
      slug: 'typescript-best-practices',
      title: 'TypeScript Best Practices for Large Applications',
      excerpt: 'Essential TypeScript patterns and practices for maintaining large-scale applications.',
      date: '2024-01-05',
      readTime: '10 min read',
      category: 'TypeScript',
      cover: '/blog/typescript.jpg'
    }
  ],
  ar: [
    {
      slug: 'getting-started-with-react',
      title: 'البدء مع React في 2024',
      excerpt: 'دليل شامل لبناء تطبيقات React الحديثة مع أحدث الميزات وأفضل الممارسات.',
      date: '2024-01-15',
      readTime: '8 دقائق قراءة',
      category: 'React',
      cover: '/blog/react-guide.jpg'
    },
    {
      slug: 'building-responsive-layouts',
      title: 'بناء تخطيطات متجاوبة مع CSS Grid',
      excerpt: 'تعلم كيفية إنشاء تخطيطات مرنة ومتجاوبة باستخدام CSS Grid و Flexbox.',
      date: '2024-01-10',
      readTime: '6 دقائق قراءة',
      category: 'CSS',
      cover: '/blog/css-grid.jpg'
    },
    {
      slug: 'typescript-best-practices',
      title: 'أفضل ممارسات TypeScript للتطبيقات الكبيرة',
      excerpt: 'أنماط وممارسات TypeScript الأساسية للحفاظ على التطبيقات واسعة النطاق.',
      date: '2024-01-05',
      readTime: '10 دقائق قراءة',
      category: 'TypeScript',
      cover: '/blog/typescript.jpg'
    }
  ]
};

function BlogContent() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  
  const posts = blogPosts[language];

  const filteredPosts = useMemo(() => {
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posts, searchTerm]);

  return (
    <div className="min-h-screen relative">
      <StarryBackground />
      <SharedNavigation />
      
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {language === 'en' ? 'Blog' : 'المدونة'}
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              {language === 'en' 
                ? 'Thoughts on web development, programming, and technology.'
                : 'أفكار حول تطوير الويب والبرمجة والتكنولوجيا.'
              }
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-md mx-auto mb-12">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder={language === 'en' ? 'Search articles...' : 'البحث في المقالات...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          {/* Blog Posts */}
          <div className="space-y-8">
            {filteredPosts.map(post => (
              <article key={post.slug} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Cover Image */}
                  <div className="md:w-48 md:flex-shrink-0">
                    <img
                      src={post.cover || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop"}
                      alt={post.title}
                      className="w-full h-48 md:h-32 object-cover rounded-lg"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3 text-sm text-slate-400">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded">
                        {post.category}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-bold text-white mb-3 hover:text-blue-400 transition-colors">
                      <a href={`/blog/${post.slug}`}>{post.title}</a>
                    </h2>
                    
                    <p className="text-slate-300 mb-4">
                      {post.excerpt}
                    </p>
                    
                    <a
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
                    >
                      {language === 'en' ? 'Read more' : 'اقرأ المزيد'}
                      <span className="ml-1">→</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <div className="text-slate-400 text-lg mb-4">
                {language === 'en' ? 'No articles found' : 'لم يتم العثور على مقالات'}
              </div>
              <button
                onClick={() => setSearchTerm('')}
                className="text-blue-400 hover:text-blue-300"
              >
                {language === 'en' ? 'Clear search' : 'مسح البحث'}
              </button>
            </div>
          )}
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
