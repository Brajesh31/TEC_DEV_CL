import React from 'react';
import { X, Star, Award, Github, Linkedin, ExternalLink, Calendar, MapPin } from 'lucide-react';

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

interface SpotlightDetailModalProps {
  spotlight: Spotlight;
  isOpen: boolean;
  onClose: () => void;
}

const SpotlightDetailModal: React.FC<SpotlightDetailModalProps> = ({ spotlight, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSocialClick = (url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

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

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={spotlight.avatar}
                alt={spotlight.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-primary-200 dark:ring-primary-800"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {spotlight.name}
                </h2>
                <p className="text-primary-600 dark:text-primary-400 font-medium">
                  {spotlight.title} at {spotlight.company}
                </p>
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{spotlight.location}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                About
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {spotlight.bio}
              </p>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Key Achievement
              </h3>
              <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 mb-6">
                <p className="text-primary-700 dark:text-primary-300">
                  {spotlight.achievement}
                </p>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Impact
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {spotlight.impact}
              </p>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Testimonial
              </h3>
              <blockquote className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 italic text-gray-700 dark:text-gray-300">
                "{spotlight.testimonial}"
              </blockquote>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Skills & Expertise
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {spotlight.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Notable Projects
              </h3>
              <div className="space-y-4 mb-6">
                {spotlight.projects.map((project, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {project.name}
                      </h4>
                      {project.url && (
                        <button
                          onClick={() => handleSocialClick(project.url)}
                          className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                          aria-label={`Visit ${project.name}`}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Connect
              </h3>
              <div className="flex space-x-4 mb-6">
                {spotlight.social.github && (
                  <button
                    onClick={() => handleSocialClick(spotlight.social.github)}
                    className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
                    aria-label="GitHub profile"
                  >
                    <Github className="h-4 w-4" />
                    <span className="text-sm">GitHub</span>
                  </button>
                )}
                {spotlight.social.linkedin && (
                  <button
                    onClick={() => handleSocialClick(spotlight.social.linkedin)}
                    className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
                    aria-label="LinkedIn profile"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span className="text-sm">LinkedIn</span>
                  </button>
                )}
                {spotlight.social.website && (
                  <button
                    onClick={() => handleSocialClick(spotlight.social.website)}
                    className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
                    aria-label="Personal website"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span className="text-sm">Website</span>
                  </button>
                )}
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Featured on {new Date(spotlight.featuredAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(spotlight.category)}`}>
                    {spotlight.category.charAt(0).toUpperCase() + spotlight.category.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotlightDetailModal;