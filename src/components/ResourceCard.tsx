import React from 'react';
import { BookOpen, Video, Code, Globe, Star, ExternalLink } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  type: 'article' | 'video' | 'course' | 'tool' | 'documentation' | 'book';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  rating: number;
  addedBy: string;
  addedAt: string;
  featured: boolean;
}

interface ResourceCardProps {
  resource: Resource;
  onClick?: () => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onClick }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return BookOpen;
      case 'video':
        return Video;
      case 'course':
        return BookOpen;
      case 'tool':
        return Code;
      case 'documentation':
        return BookOpen;
      case 'book':
        return BookOpen;
      default:
        return Globe;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'intermediate':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      case 'advanced':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 sm:h-4 sm:w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  const handleVisitClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(resource.url, '_blank', 'noopener,noreferrer');
  };

  const TypeIcon = getTypeIcon(resource.type);

  return (
    <div
      className={`bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-all duration-300 h-full flex flex-col ${
        resource.featured ? 'border-2 border-primary-500' : ''
      } ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <TypeIcon className="h-4 w-4 sm:h-6 sm:w-6 text-primary-600 dark:text-primary-400" />
          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 capitalize">
            {resource.type}
          </span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
          {resource.difficulty}
        </span>
      </div>

      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
        {resource.title}
      </h3>

      <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3 flex-grow">
        {resource.description}
      </p>

      <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
        {resource.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
        {resource.tags.length > 3 && (
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
            +{resource.tags.length - 3}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <div className="flex items-center">
            {renderStars(resource.rating)}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">
            by {resource.addedBy}
          </span>
        </div>
        <button
          onClick={handleVisitClick}
          className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-xs sm:text-sm"
        >
          Visit
          <ExternalLink className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
        </button>
      </div>
    </div>
  );
};

export default ResourceCard;