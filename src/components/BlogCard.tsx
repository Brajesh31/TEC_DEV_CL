import React from 'react';
import { Calendar, Clock, Tag } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  authorAvatar: string;
  authorLinkedIn?: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  category: string;
}

interface BlogCardProps {
  blog: BlogPost;
  onClick: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, onClick }) => {
  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (blog.authorLinkedIn) {
      window.open(blog.authorLinkedIn, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <article
      className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer h-full flex flex-col"
      onClick={onClick}
    >
      <div className="p-3 sm:p-4 md:p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4">
          <span className="bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 px-2 py-1 rounded-full text-xs font-medium">
            {blog.category}
          </span>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <Clock className="h-3 w-3 mr-1" />
            <span>{blog.readTime} min</span>
          </div>
        </div>
        
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {blog.title}
        </h3>
        
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 sm:line-clamp-3 flex-grow">
          {blog.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
          {blog.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="flex items-center px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full transition-colors duration-200 hover:bg-primary-200 dark:hover:bg-primary-800"
            >
              <Tag className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
              {tag}
            </span>
          ))}
          {blog.tags.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
              +{blog.tags.length - 2}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            <img
              src={blog.authorAvatar}
              alt={blog.author}
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full mr-2 object-cover ring-2 ring-primary-200 dark:ring-primary-800"
              loading="lazy"
            />
            <div>
              <button
                onClick={handleAuthorClick}
                className={`text-xs font-medium text-gray-900 dark:text-white ${
                  blog.authorLinkedIn ? 'hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer underline decoration-dotted' : ''
                }`}
              >
                {blog.author}
              </button>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-xs transition-all duration-200 transform hover:translate-x-1"
          >
            Read
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;