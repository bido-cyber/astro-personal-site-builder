
import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}

export const useSEO = ({
  title,
  description,
  image,
  url,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  tags = []
}: SEOProps) => {
  useEffect(() => {
    const baseUrl = 'https://bido-cyber.github.io/blog';
    const defaultTitle = 'John Doe - Full Stack Developer Portfolio';
    const defaultDescription = 'Full Stack Developer specializing in modern web technologies. Building scalable applications with React, Node.js, and more.';
    const defaultImage = `${baseUrl}/og-image.jpg`;

    // Update title
    document.title = title ? `${title} | John Doe` : defaultTitle;

    // Update meta tags
    const updateMetaTag = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`) ||
                   document.querySelector(`meta[name="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        if (property.startsWith('og:') || property.startsWith('twitter:')) {
          element.setAttribute('property', property);
        } else {
          element.setAttribute('name', property);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic SEO
    updateMetaTag('description', description || defaultDescription);
    updateMetaTag('keywords', tags.length > 0 ? tags.join(', ') : 'full stack developer, web development, JavaScript, React, Node.js');
    
    // Open Graph
    updateMetaTag('og:title', title || defaultTitle);
    updateMetaTag('og:description', description || defaultDescription);
    updateMetaTag('og:image', image || defaultImage);
    updateMetaTag('og:url', url || baseUrl);
    updateMetaTag('og:type', type);
    
    // Twitter
    updateMetaTag('twitter:title', title || defaultTitle);
    updateMetaTag('twitter:description', description || defaultDescription);
    updateMetaTag('twitter:image', image || defaultImage);
    
    // Article specific
    if (type === 'article') {
      if (author) updateMetaTag('article:author', author);
      if (publishedTime) updateMetaTag('article:published_time', publishedTime);
      if (modifiedTime) updateMetaTag('article:modified_time', modifiedTime);
      if (tags.length > 0) {
        // Remove existing tags
        document.querySelectorAll('meta[property="article:tag"]').forEach(el => el.remove());
        // Add new tags
        tags.forEach(tag => {
          const tagElement = document.createElement('meta');
          tagElement.setAttribute('property', 'article:tag');
          tagElement.setAttribute('content', tag);
          document.head.appendChild(tagElement);
        });
      }
    }

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url || baseUrl);

  }, [title, description, image, url, type, author, publishedTime, modifiedTime, tags]);
};
