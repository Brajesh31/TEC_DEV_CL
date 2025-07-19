import React from 'react';
import { Mic, MapPin, Briefcase, ExternalLink, Github, Linkedin, Twitter } from 'lucide-react';

interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  avatar: string;
  expertise: string[];
  talkTitle: string;
  category: string;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  featuredAt: string;
}

interface SpeakerCardProps {
  speaker: Speaker;
  onClick: () => void;
}

const SpeakerCard: React.FC<SpeakerCardProps> = ({ speaker, onClick }) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      frontend: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
      'ai-ml': 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
      blockchain: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
      devops: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300',
      design: 'bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300',
      mobile: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300',
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
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(speaker.category)}`}>
            {speaker.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </span>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <Mic className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="text-xs sm:text-sm">Speaker</span>
          </div>
        </div>

        {/* Profile */}
        <div className="text-center mb-4 sm:mb-6">
          <img
            src={speaker.avatar}
            alt={speaker.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-3 sm:mb-4 object-cover ring-2 ring-primary-200 dark:ring-primary-800"
            loading="lazy"
          />
          <h3 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-1">
            {speaker.name}
          </h3>
          <p className="text-primary-600 dark:text-primary-400 font-medium mb-1 text-xs sm:text-sm">
            {speaker.title}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-xs mb-1 sm:mb-2 line-clamp-1">
            {speaker.company}
          </p>
          <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{speaker.location}</span>
          </div>
        </div>

        {/* Talk Title */}
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 flex-grow">
          <div className="flex items-center mb-1 sm:mb-2">
            <Mic className="h-3 w-3 sm:h-4 sm:w-4 text-primary-600 dark:text-primary-400 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm font-medium text-primary-900 dark:text-primary-100">
              Featured Talk
            </span>
          </div>
          <p className="text-primary-700 dark:text-primary-300 text-xs sm:text-sm font-medium line-clamp-3">
            {speaker.talkTitle}
          </p>
        </div>

        {/* Expertise */}
        <div className="mb-3 sm:mb-4">
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {speaker.expertise.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
            {speaker.expertise.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                +{speaker.expertise.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
          {speaker.social.github && (
            <button
              onClick={(e) => handleSocialClick(e, speaker.social.github)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label={`${speaker.name}'s GitHub`}
            >
              <Github className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          )}
          {speaker.social.linkedin && (
            <button
              onClick={(e) => handleSocialClick(e, speaker.social.linkedin)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label={`${speaker.name}'s LinkedIn`}
            >
              <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          )}
          {speaker.social.twitter && (
            <button
              onClick={(e) => handleSocialClick(e, speaker.social.twitter)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label={`${speaker.name}'s Twitter`}
            >
              <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          )}
          {speaker.social.website && (
            <button
              onClick={(e) => handleSocialClick(e, speaker.social.website)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label={`${speaker.name}'s Website`}
            >
              <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          )}
        </div>

        {/* Company */}
        <div className="text-center mt-auto">
          <div className="flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
            <Briefcase className="h-3 w-3 mr-1" />
            <span className="truncate">{speaker.company}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakerCard;