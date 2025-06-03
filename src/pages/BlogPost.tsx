import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { StarryBackground } from '../components/StarryBackground';
import { SharedNavigation } from '../components/SharedNavigation';
import { Footer } from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { useSEO } from '../hooks/useSEO';

function BlogPostContent() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { language, isRTL } = useLanguage();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [postTitle, setPostTitle] = useState<string>('');

  // Extract title from markdown content
  const extractTitleFromMarkdown = (markdown: string) => {
    const titleMatch = markdown.match(/^# (.+)$/m);
    return titleMatch ? titleMatch[1] : slug?.replace(/-/g, ' ') || 'Blog Post';
  };

  // SEO for blog post
  useSEO({
    title: postTitle,
    description: `Read "${postTitle}" on John Doe's blog. Insights about web development, programming, and technology.`,
    image: `https://picsum.photos/1200/630?random=${slug}`,
    url: `https://bido-cyber.github.io/blog/#/blog/${slug}`,
    type: 'article',
    author: 'John Doe',
    publishedTime: new Date().toISOString(),
    tags: ['web development', 'programming', 'technology', 'blog']
  });

  useEffect(() => {
    const loadBlogPost = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to fetch from public folder with proper base path
        const response = await fetch(
          `${window.location.pathname.split('#')[0]}content/blog/${slug}.md`
        );

        if (!response.ok) {
          throw new Error('Post not found');
        }

        const markdown = await response.text();
        setContent(markdown);
        setPostTitle(extractTitleFromMarkdown(markdown));
      } catch (err) {
        console.error('Error loading blog post:', err);
        setError('Post not found');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadBlogPost();
    }
  }, [slug]);

  const formatMarkdown = (markdown: string) => {
    // Basic markdown parsing - in a real app, use a proper markdown parser
    return markdown
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-white mb-6">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-white mb-4 mt-8">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-white mb-3 mt-6">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(
        /```([\s\S]*?)```/g,
        '<pre class="bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto"><code class="text-green-400">$1</code></pre>'
      )
      .replace(/`(.*?)`/g, '<code class="bg-gray-800 px-2 py-1 rounded text-green-400">$1</code>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
  };

  if (loading) {
    return (
      <div className="min-h-screen relative">
        <StarryBackground />
        <SharedNavigation />
        <main className="pt-24 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <div className="text-white text-lg">
                {language === 'en' ? 'Loading...' : 'جاري التحميل...'}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen relative">
        <StarryBackground />
        <SharedNavigation />
        <main className="pt-24 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <h1 className="text-4xl font-bold text-white mb-4">
                {language === 'en' ? 'Post Not Found' : 'المقال غير موجود'}
              </h1>
              <p className="text-slate-300 mb-8">
                {language === 'en'
                  ? "The blog post you're looking for doesn't exist."
                  : 'المقال الذي تبحث عنه غير موجود.'}
              </p>
              <button
                onClick={() => navigate('/blog')}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === 'en' ? 'Back to Blog' : 'العودة للمدونة'}
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <StarryBackground />
      <SharedNavigation />

      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
          >
            {isRTL ? (
              <ArrowRight className="w-4 h-4 mr-2" />
            ) : (
              <ArrowLeft className="w-4 h-4 mr-2" />
            )}
            {language === 'en' ? 'Back to Blog' : 'العودة للمدونة'}
          </button>

          {/* Article Content */}
          <article className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
            <div
              className="prose prose-invert max-w-none text-slate-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }}
            />
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
