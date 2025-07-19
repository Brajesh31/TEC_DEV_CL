import React from 'react';
import { X, Mic, MapPin, Briefcase, Calendar, Github, Linkedin, Twitter, ExternalLink, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useResponsive } from '../hooks/useResponsive';

interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  avatar: string;
  bio: string;
  expertise: string[];
  talkTitle: string;
  talkDescription: string;
  pastEvents: string[];
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  featuredAt: string;
  category: string;
  testimonial: string;
}

interface SpeakerDetailModalProps {
  speaker: Speaker;
  isOpen: boolean;
  onClose: () => void;
}

const SpeakerDetailModal: React.FC<SpeakerDetailModalProps> = ({ speaker, isOpen, onClose }) => {
  const { isMobile } = useResponsive();
  
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
      frontend: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
      'ai-ml': 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
      blockchain: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
      devops: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300',
      design: 'bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300',
      mobile: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300',
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
                src={speaker.avatar}
                alt={speaker.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-primary-200 dark:ring-primary-800"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {speaker.name}
                </h2>
                <p className="text-primary-600 dark:text-primary-400 font-medium">
                  {speaker.title} at {speaker.company}
                </p>
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{speaker.location}</span>
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
                {speaker.bio}
              </p>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Featured Talk
              </h3>
              <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-primary-900 dark:text-primary-100 mb-2">
                  {speaker.talkTitle}
                </h4>
                <p className="text-primary-700 dark:text-primary-300">
                  {speaker.talkDescription}
                </p>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Past Speaking Engagements
              </h3>
              <ul className="space-y-2 mb-6">
                {speaker.pastEvents.map((event, index) => (
                  <li key={index} className="flex items-start">
                    <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2 mt-1" />
                    <span className="text-gray-600 dark:text-gray-400">{event}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Testimonial
              </h3>
              <blockquote className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 italic text-gray-700 dark:text-gray-300">
                "{speaker.testimonial}"
              </blockquote>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Expertise
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {speaker.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Connect
              </h3>
              <div className="flex space-x-4 mb-6">
                {speaker.social.github && (
                  <button
                    onClick={() => handleSocialClick(speaker.social.github)}
                    className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
                    aria-label="GitHub profile"
                  >
                    <Github className="h-4 w-4" />
                    <span className="text-sm">GitHub</span>
                  </button>
                )}
                {speaker.social.linkedin && (
                  <button
                    onClick={() => handleSocialClick(speaker.social.linkedin)}
                    className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
                    aria-label="LinkedIn profile"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span className="text-sm">LinkedIn</span>
                  </button>
                )}
                {speaker.social.twitter && (
                  <button
                    onClick={() => handleSocialClick(speaker.social.twitter)}
                    className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
                    aria-label="Twitter profile"
                  >
                    <Twitter className="h-4 w-4" />
                    <span className="text-sm">Twitter</span>
                  </button>
                )}
                {speaker.social.website && (
                  <button
                    onClick={() => handleSocialClick(speaker.social.website)}
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
                    <Briefcase className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {speaker.company}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(speaker.category)}`}>
                    {speaker.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Award className="h-4 w-4 text-yellow-500 mr-2" />
                  Book This Speaker
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Interested in having {speaker.name} speak at your event? Contact our speaker coordination team.
                </p>
                <Link
                  to="/events"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  <Mic className="h-4 w-4 mr-2" />
                  View Upcoming Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakerDetailModal;