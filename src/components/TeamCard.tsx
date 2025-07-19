import React from 'react';
import { Github, Linkedin, Twitter, Mail, Globe, Award } from 'lucide-react';

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
}

interface TeamCardProps {
  member: TeamMember;
  onClick: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ member, onClick }) => {
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

  const handleSocialClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer h-full flex flex-col"
      onClick={onClick}
    >
      <div className="p-4 sm:p-6 text-center">
        <img
          src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`}
          alt={member.name}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-3 sm:mb-4 object-cover ring-2 ring-primary-200 dark:ring-primary-800"
          loading="lazy"
        />
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-1">
          {member.name}
        </h3>
        <p className="text-primary-600 dark:text-primary-400 font-medium mb-1 sm:mb-2 text-sm">
          {member.role}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
          {member.location}
        </p>
      </div>

      <div className="px-4 sm:px-6 pb-3 sm:pb-4 flex-grow">
        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
          {member.bio}
        </p>
      </div>

      <div className="px-4 sm:px-6 pb-3 sm:pb-4">
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {member.expertise.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
          {member.expertise.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
              +{member.expertise.length - 3}
            </span>
          )}
        </div>
      </div>

      <div className="px-4 sm:px-6 pb-3 sm:pb-4">
        <div className="flex items-center mb-2">
          <Award className="h-4 w-4 text-yellow-500 mr-2" />
          <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
            Key Achievements
          </span>
        </div>
        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
          {member.achievements.slice(0, 2).map((achievement, index) => (
            <li key={index} className="line-clamp-1">• {achievement}</li>
          ))}
          {member.achievements.length > 2 && (
            <li>• +{member.achievements.length - 2} more</li>
          )}
        </ul>
      </div>

      <div className="px-4 sm:px-6 pb-4 sm:pb-6 mt-auto">
        <div className="flex justify-center space-x-3">
          {Object.entries(member.social).map(([platform, url]) => {
            if (!url) return null;
            const Icon = getSocialIcon(platform);
            return (
              <button
                key={platform}
                onClick={(e) => handleSocialClick(e, url)}
                className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label={`${member.name}'s ${platform}`}
              >
                <Icon className="h-5 w-5" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamCard;