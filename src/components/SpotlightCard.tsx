import React from 'react';
import { Star, Award, Github, Linkedin, ExternalLink, Calendar, MapPin } from 'lucide-react';

interface Spotlight {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  avatar: string;
  bio: string;
  achievement: string;
  impact: string;
  skills: string[];
  projects: {
    name: string;
    description: string;
    url?: string;
  }[];
  social: {
    github?: string;
    linkedin?: string;
    website?: string;
  };
  featuredAt: string;
  category: 'contributor' | 'mentor' | 'speaker' | 'innovator' | 'leader';
  testimonial: string;
}

interface SpotlightCardProps {
  spotlight: Spotlight;
  onClick: () => void;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ spotlight, onClick }) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      leader: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
      innovator: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
      contributor: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
      speaker: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300',
      mentor: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';
  };

  const handleSocialClick = (e: React.MouseEvent, url?: string) => {
    e.stopPropagation();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer h-full flex flex-col"
      onClick={onClick}
    >
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(spotlight.category)}`}>
            {spotlight.category.charAt(0).toUpperCase() + spotlight.category.slice(1)}
          </span>
          <div className="flex items-center text-yellow-500">
            <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
            <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">Featured</span>
          </div>
        </div>

        {/* Profile */}
        <div className="text-center mb-4 sm:mb-6">
          <img
            src={spotlight.avatar}
            alt={spotlight.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-3 sm:mb-4 object-cover ring-2 ring-primary-200 dark:ring-primary-800"
            loading="lazy"
          />
          <h3 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-1">
            {spotlight.name}
          </h3>
          <p className="text-primary-600 dark:text-primary-400 font-medium mb-1 text-xs sm:text-sm">
            {spotlight.title}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-xs mb-1 sm:mb-2 line-clamp-1">
            {spotlight.company}
          </p>
          <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{spotlight.location}</span>
          </div>
        </div>

        {/* Achievement */}
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 flex-grow">
          <div className="flex items-center mb-1 sm:mb-2">
            <Award className="h-3 w-3 sm:h-4 sm:w-4 text-primary-600 dark:text-primary-400 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm font-medium text-primary-900 dark:text-primary-100">
              Key Achievement
            </span>
          </div>
          <p className="text-primary-700 dark:text-primary-300 text-xs sm:text-sm line-clamp-3">
            {spotlight.achievement}
          </p>
        </div>

        {/* Skills */}
        <div className="mb-3 sm:mb-4">
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {spotlight.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
            {spotlight.skills.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                +{spotlight.skills.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
          {spotlight.social.github && (
            <button
              onClick={(e) => handleSocialClick(e, spotlight.social.github)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label={`${spotlight.name}'s GitHub`}
            >
              <Github className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          )}
          {spotlight.social.linkedin && (
            <button
              onClick={(e) => handleSocialClick(e, spotlight.social.linkedin)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label={`${spotlight.name}'s LinkedIn`}
            >
              <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          )}
          {spotlight.social.website && (
            <button
              onClick={(e) => handleSocialClick(e, spotlight.social.website)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label={`${spotlight.name}'s Website`}
            >
              <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          )}
        </div>

        {/* Featured Date */}
        <div className="text-center mt-auto">
          <div className="flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Featured {new Date(spotlight.featuredAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotlightCard;