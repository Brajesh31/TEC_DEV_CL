import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Star, GitFork, Plus, Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSEO } from '../hooks/useSEO';
import { getFormLink } from '../data/formLinks';
import ProjectCard from '../components/ProjectCard';
import ProjectDetailModal from '../components/ProjectDetailModal';

// Import project data
import projectsData from '../data/projects.json';

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
  isApproved: boolean;
  featured: boolean;
  screenshots?: string[];
}

const Projects: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'contributors'>('all');
  const [techFilter, setTechFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Set SEO metadata
  useSEO({
    title: 'Open Source Project - Collaborate with Developers',
    description: 'Explore and contribute to exciting open-source project. Find opportunities to collaborate with developers worldwide.',
    keywords: 'open source project, developer collaboration, coding project, github project, tech collaboration, programming project, iit delhi, iit bombay, iit madras, edtech, meta, google, facebook, instagram, coursera, udemy, openai, chatgpt, ai, ml, data science, python, javascript, java, c++, nodejs, react, coding, hackathon, startup, developer, engineer, tech community, open source, college students, tech club, innovation, leadership, soft skills, full stack, backend, frontend, cloud, internships, women in tech, campus',
    structuredData: {
      type: 'ItemList',
      data: {
        itemListElement: projectsData.projects.slice(0, 10).map((project, index) => ({
          '@type': 'SoftwareSourceCode',
          position: index + 1,
          name: project.title,
          description: project.description,
          codeRepository: project.githubUrl,
          programmingLanguage: project.techStack.join(', ')
        }))
      }
    }
  });

  useEffect(() => {
    // Load project from the imported JSON data
    setProjects(projectsData.projects);
  }, []);

  const filteredProjects = projects.filter(project => {
    if (!project.isApproved) return false;
    
    const statusMatch = filter === 'all' || 
                       (filter === 'contributors' && project.status === 'looking-for-contributors') ||
                       project.status === filter;
    
    const techMatch = techFilter === 'all' || 
                     project.techStack.some(tech => 
                       tech.toLowerCase().includes(techFilter.toLowerCase())
                     );
    
    return statusMatch && techMatch;
  });

  // Extract unique technologies from all project
  const allTechnologies = Array.from(
    new Set(projects.flatMap(project => project.techStack))
  ).sort();

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsDetailModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedProject(null);
  };

  const handleSubmitProject = () => {
    const projectFormLink = getFormLink('project-submission');
    window.open(projectFormLink?.url || 'https://forms.gle/project-submission', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-hero-light dark:bg-hero-dark py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 animate-slide-up">
            Community Project
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8 animate-slide-up animation-delay-200">
            Discover and contribute to amazing open-source project built by our community
          </p>
          <a
            href="https://forms.gle/v3MfxNWfenL5huH79"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 flex items-center mx-auto w-fit animate-slide-up animation-delay-400 shadow-lg hover:shadow-xl"
          >
            <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Submit Your Project
          </a>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 sm:py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Status Filter */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" />
              <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                {[
                  { key: 'all', label: 'All Project' },
                  { key: 'active', label: 'Active' },
                  { key: 'completed', label: 'Completed' },
                  { key: 'contributors', label: 'Need Contributors' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key as typeof filter)}
                    className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md font-medium transition-colors text-xs sm:text-sm ${
                      filter === tab.key
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Technology Filter */}
            <div className="flex items-center space-x-2">
              <select
                value={techFilter}
                onChange={(e) => setTechFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100 transition-all duration-200 text-sm"
              >
                <option value="all">All Technologies</option>
                {allTechnologies.map((tech) => (
                  <option key={tech} value={tech}>
                    {tech}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <Github className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No project found
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Try adjusting your filters or check back later for new project.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onClick={() => handleProjectClick(project)} 
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          isOpen={isDetailModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Projects;