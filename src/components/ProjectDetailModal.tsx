import React, { useState } from 'react';
import { X, Github, ExternalLink, Star, GitFork, Users, ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
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
  createdAt: string;
  screenshots?: string[];
}

interface ProjectDetailModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen) return null;

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

  const handleGithubClick = () => {
    window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
  };

  const handleLiveClick = () => {
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const nextImage = () => {
    if (project.screenshots && project.screenshots.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % project.screenshots.length);
    }
  };

  const prevImage = () => {
    if (project.screenshots && project.screenshots.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + project.screenshots.length) % project.screenshots.length);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Project Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Project Title and Links */}
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              {project.title}
            </h3>
            <div className="flex space-x-3">
              <button
                onClick={handleGithubClick}
                className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-lg transition-colors"
                aria-label="View on GitHub"
              >
                <Github className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </button>
              {project.liveUrl && (
                <button
                  onClick={handleLiveClick}
                  className="bg-primary-100 dark:bg-primary-900/30 hover:bg-primary-200 dark:hover:bg-primary-800/30 p-2 rounded-lg transition-colors"
                  aria-label="View live demo"
                >
                  <ExternalLink className="h-5 w-5 text-primary-700 dark:text-primary-400" />
                </button>
              )}
            </div>
          </div>

          {/* Status and Difficulty */}
          <div className="flex flex-wrap gap-3 mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
              {project.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(project.difficulty)}`}>
              {project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1)} Level
            </span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
              Created: {new Date(project.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Screenshots Carousel */}
          {project.screenshots && project.screenshots.length > 0 && (
            <div className="mb-6 relative">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                <img
                  src={project.screenshots[currentImageIndex]}
                  alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {project.screenshots.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    
                    {/* Image indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {project.screenshots.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex
                              ? 'bg-white'
                              : 'bg-white bg-opacity-50'
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              About This Project
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm rounded-full transition-colors duration-200 hover:bg-primary-200 dark:hover:bg-primary-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Author */}
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Project Lead
            </h4>
            <div className="flex items-center">
              <img
                src={project.authorAvatar}
                alt={project.author}
                className="w-12 h-12 rounded-full mr-4 object-cover ring-2 ring-primary-200 dark:ring-primary-800"
              />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {project.author}
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center mb-1">
                <Star className="h-5 w-5 text-yellow-500 mr-1" />
                <span className="text-xl font-bold text-gray-900 dark:text-white">{project.stars}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Stars</p>
            </div>
            {project.forks && (
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                <div className="flex items-center justify-center mb-1">
                  <GitFork className="h-5 w-5 text-blue-500 mr-1" />
                  <span className="text-xl font-bold text-gray-900 dark:text-white">{project.forks}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Forks</p>
              </div>
            )}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center mb-1">
                <Users className="h-5 w-5 text-green-500 mr-1" />
                <span className="text-xl font-bold text-gray-900 dark:text-white">{project.contributors}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Contributors</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGithubClick}
              className="flex-1 bg-gray-800 hover:bg-black text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              <Github className="h-5 w-5 mr-2" />
              View on GitHub
            </button>
            {project.liveUrl && (
              <button
                onClick={handleLiveClick}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                View Live Demo
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;