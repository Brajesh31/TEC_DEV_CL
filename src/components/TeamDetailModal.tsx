import React from 'react';
import { X, Github, Linkedin, Twitter, Mail, Globe, MapPin, Calendar, Award, Briefcase } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  location: string;
  expertise: string[];
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
    website?: string;
  };
  achievements: string[];
  category: 'core' | 'mentor' | 'volunteer';
  joinedAt: string;
}

interface TeamDetailModalProps {
  member: TeamMember;
  isOpen: boolean;
  onClose: () => void;
}

const TeamDetailModal: React.FC<TeamDetailModalProps> = ({ member, isOpen, onClose }) => {
  if (!isOpen) return null;

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'github':
        return Github;
      case 'linkedin':
        return Linkedin;
      case 'twitter':
        return Twitter;
      case 'email':
        return Mail;
      case 'website':
        return Globe;
      default:
        return Mail;
    }
  };

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'core':
        return 'Core Team';
      case 'mentor':
        return 'Senior Mentor';
      case 'volunteer':
        return 'Volunteer';
      default:
        return category;
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="relative">
          {/* Background gradient */}
          <div className="h-40 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-t-lg"></div>
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
          
          {/* Profile info */}
          <div className="absolute -bottom-16 left-0 w-full flex justify-center">
            <div className="text-center">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto border-4 border-white dark:border-gray-800 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-20 p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {member.name}
            </h2>
            <p className="text-primary-600 dark:text-primary-400 font-medium mb-1">
              {member.role}
            </p>
            <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{member.location}</span>
            </div>
            
            <div className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm rounded-full">
              {getCategoryLabel(member.category)}
            </div>
          </div>

          {/* Bio */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              About
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {member.bio}
            </p>
          </div>

          {/* Expertise */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Expertise
            </h3>
            <div className="flex flex-wrap gap-2">
              {member.expertise.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <Award className="h-5 w-5 text-yellow-500 mr-2" />
              Achievements
            </h3>
            <ul className="space-y-2">
              {member.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Team Member Since */}
          <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
              <span className="text-gray-700 dark:text-gray-300">
                Team Member Since: {new Date(member.joinedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long'
                })}
              </span>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Connect
            </h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(member.social).map(([platform, url]) => {
                if (!url) return null;
                const Icon = getSocialIcon(platform);
                const label = platform.charAt(0).toUpperCase() + platform.slice(1);
                
                return (
                  <button
                    key={platform}
                    onClick={() => handleSocialClick(url)}
                    className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetailModal;