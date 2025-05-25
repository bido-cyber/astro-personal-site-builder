
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { StarryBackground } from '../components/StarryBackground';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

function BlogPostContent() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const [post, setPost] = useState<any>(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        // Load markdown content from public folder
        const response = await fetch(`/content/blog/${slug}.md`);
        const text = await response.text();
        
        // Parse frontmatter (simple implementation)
        const frontmatterMatch = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
        if (frontmatterMatch) {
          const frontmatter = frontmatterMatch[1];
          const content = frontmatterMatch[2];
          
          // Parse YAML-like frontmatter
          const postData: any = {};
          frontmatter.split('\n').forEach(line => {
            const [key, ...values] = line.split(':');
            if (key && values.length) {
              postData[key.trim()] = values.join(':').trim().replace(/"/g, '');
            }
          });
          
          setPost(postData);
          setContent(content);
        }
      } catch (error) {
        console.error('Error loading blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <StarryBackground />
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <StarryBackground />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Post Not Found</h1>
          <a href="/blog" className="text-blue-400 hover:text-blue-300">← Back to Blog</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <StarryBackground />
      <Navigation />
      
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <a
              href="/blog"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{language === 'en' ? 'Back to Blog' : 'العودة للمدونة'}</span>
            </a>
          </div>

          {/* Article Header */}
          <article className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            {/* Cover Image */}
            {post.cover && (
              <img
                src={post.cover || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop"}
                alt={post.title}
                className="w-full h-64 object-cover"
              />
            )}
            
            <div className="p-8">
              {/* Meta Information */}
              <div className="flex items-center space-x-4 mb-6 text-sm text-slate-400">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full">
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

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Content */}
              <div className="prose prose-invert prose-lg max-w-none">
                <div 
                  className="text-slate-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: content
                      .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-white mt-8 mb-4">$1</h1>')
                      .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold text-white mt-6 mb-3">$1</h2>')
                      .replace(/^### (.+)$/gm, '<h3 class="text-lg font-medium text-white mt-4 mb-2">$1</h3>')
                      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-slate-800 rounded-lg p-4 overflow-x-auto my-4"><code class="text-green-300">$2</code></pre>')
                      .replace(/`([^`]+)`/g, '<code class="bg-slate-800 px-2 py-1 rounded text-green-300">$1</code>')
                      .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
                      .replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>')
                      .replace(/^\- (.+)$/gm, '<li class="mb-1">$1</li>')
                      .replace(/(<li.*<\/li>)/s, '<ul class="list-disc list-inside my-4 space-y-1">$1</ul>')
                      .replace(/\n\n/g, '</p><p class="mb-4">')
                      .replace(/^(?!<[h|u|p|c])/gm, '<p class="mb-4">')
                      .replace(/(?<!>)$/gm, '</p>')
                  }}
                />
              </div>
            </div>
          </article>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

const BlogPost = () => {
  return (
    <LanguageProvider>
      <BlogPostContent />
    </LanguageProvider>
  );
};

export default BlogPost;
