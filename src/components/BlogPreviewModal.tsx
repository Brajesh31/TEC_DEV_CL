import React, { useState, useEffect } from 'react';
import { X, Calendar, User, ExternalLink, Copy, Check, Share2, ArrowRight } from 'lucide-react';
import { useResponsive } from '../hooks/useResponsive';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  authorLinkedIn?: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  category: string;
}

interface BlogPreviewModalProps {
  blog: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

const BlogPreviewModal: React.FC<BlogPreviewModalProps> = ({ blog, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const { isMobile } = useResponsive();
  
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);
      
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  if (!isOpen || !blog) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAuthorClick = () => {
    if (blog.authorLinkedIn) {
      window.open(blog.authorLinkedIn, '_blank', 'noopener,noreferrer');
    }
  };
  
  const handleCopyLink = () => {
    const url = `${window.location.origin}/blog/${blog.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
    });
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: `${window.location.origin}/blog/${blog.id}`,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      handleCopyLink();
    }
  };
  
  // Split content into sections for progressive reading
  const paragraphs = blog.content.split('\n\n');
  const sections = [];
  let currentSectionParagraphs = [];
  
  for (let i = 0; i < paragraphs.length; i++) {
    currentSectionParagraphs.push(paragraphs[i]);
    
    // Create a new section roughly every 3-4 paragraphs
    if (currentSectionParagraphs.length >= 3 || i === paragraphs.length - 1) {
      sections.push(currentSectionParagraphs.join('\n\n'));
      currentSectionParagraphs = [];
    }
  }
  
  // If no sections were created (short content), use the whole content
  if (sections.length === 0) {
    sections.push(blog.content);
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto transform animate-slide-up shadow-2xl my-4 sm:my-8">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex justify-between items-center backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 z-10">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-2 py-1 rounded-full text-xs sm:text-sm font-medium">
              {blog.category}
            </span>
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {blog.readTime} min read
            </span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={handleShare}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200 p-1 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Share article"
            >
              <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              onClick={handleCopyLink}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200 p-1 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Copy link"
            >
              {copied ? <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" /> : <Copy className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200 p-1 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Close"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6">
          {/* Blog Title */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
            <img
              src={blog.authorAvatar}
              alt={blog.author}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4 object-cover ring-2 ring-primary-200 dark:ring-primary-800"
              loading="lazy"
            />
            <div className="flex-1">
              <button
                onClick={handleAuthorClick}
                className={`font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 text-sm sm:text-base ${
                  blog.authorLinkedIn ? 'cursor-pointer underline decoration-dotted' : 'cursor-default'
                }`}
                disabled={!blog.authorLinkedIn}
              >
                {blog.author}
                {blog.authorLinkedIn && (
                  <ExternalLink className="inline h-3 w-3 sm:h-4 sm:w-4 ml-1 opacity-60" />
                )}
              </button>
              <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>
          </div>

          {/* Blog Content */}
          <div className="prose prose-sm sm:prose lg:prose-lg prose-gray dark:prose-invert max-w-none">
            <div className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 font-medium leading-relaxed border-l-4 border-primary-500 pl-3 sm:pl-4 bg-primary-50 dark:bg-primary-900/20 py-3 sm:py-4 rounded-r-lg">
              {blog.excerpt}
            </div>
            
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-3 sm:space-y-4 text-sm sm:text-base">
              {/* Show only up to the current section */}
              {sections.slice(0, currentSection + 1).map((section, index) => (
                <div key={index} className={`transition-opacity duration-500 ${index === currentSection ? 'animate-fade-in' : ''}`}>
                  {section.split('\n\n').map((paragraph, pIndex) => (
                    <p key={`${index}-${pIndex}`} className="mb-3 sm:mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>
            
            {/* Continue Reading button if there are more sections */}
            {currentSection < sections.length - 1 && (
              <div className="flex justify-center mt-6 sm:mt-8">
                <button
                  onClick={() => setCurrentSection(prev => prev + 1)}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center shadow-md hover:shadow-lg text-sm sm:text-base"
                >
                  Continue Reading
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white mb-2 sm:mb-3">
              Tags
            </h3>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 sm:px-3 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 text-xs rounded-full hover:bg-secondary-200 dark:hover:bg-secondary-800 transition-colors duration-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Enjoyed this article?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 text-sm">
              Join our community to read more articles like this and connect with fellow developers.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <a
                href="/join"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 text-center shadow-md hover:shadow-lg text-sm"
              >
                Join Community
              </a>
              <a
                href="/blog"
                className="border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-all duration-200 text-center text-sm"
              >
                Read More Articles
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPreviewModal;