import React from 'react';
import { ExternalLink, Github, Star, GitFork, Users } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  stars: number;
  forks?: number;
  contributors: number;
  author: string;
  authorAvatar: string;
  status: 'active' | 'completed' | 'looking-for-contributors';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'completed':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
      case 'looking-for-contributors':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';
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

  const handleGithubClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
  };

  const handleLiveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer h-full flex flex-col"
      onClick={onClick}
    >
      <div className="p-3 sm:p-4 md:p-6 flex flex-col flex-grow">
        {/* Project Header */}
        <div className="flex justify-between items-start mb-2 sm:mb-3">
          <h3 className="text-sm sm:text-base md:text-xl font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 line-clamp-2">
            {project.title}
          </h3>
          <div className="flex space-x-1 sm:space-x-2 ml-2 flex-shrink-0">
            <button
              onClick={handleGithubClick}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label="View on GitHub"
            >
              <Github className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            {project.liveUrl && (
              <button
                onClick={handleLiveClick}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                aria-label="View live demo"
              >
                <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Status and Difficulty */}
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
            {project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1)}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 flex-grow">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
              +{project.techStack.length - 3} more
            </span>
          )}
        </div>

        {/* Author */}
        <div className="flex items-center mb-3 sm:mb-4">
          <img
            src={project.authorAvatar}
            alt={project.author}
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full mr-2 object-cover"
            loading="lazy"
          />
          <div>
            <p className="text-xs font-medium text-gray-900 dark:text-white">
              {project.author}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-auto">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="flex items-center">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-yellow-400" />
              {project.stars}
            </span>
            {project.forks && (
              <span className="flex items-center">
                <GitFork className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                {project.forks}
              </span>
            )}
          </div>
          <span className="flex items-center">
            <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            {project.contributors} contributors
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;