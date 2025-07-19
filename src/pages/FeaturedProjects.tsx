import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Star, GitFork, Users, Search, Filter } from 'lucide-react';

// Interface for project data
interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  demoUrl?: string;
  stars: number;
  forks: number;
  contributors: number;
  maintainers: {
    name: string;
    avatar: string;
    githubUrl: string;
  }[];
  category: string;
  tags: string[];
  status: 'active' | 'maintenance' | 'completed';
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

const FeaturedProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTech, setSelectedTech] = useState('all');

  useEffect(() => {
    // Load project data from JSON file
    // In a real implementation, this would be an API call or import
    const loadProjects = async () => {
      try {
        // For demonstration, we're creating sample data
        // In production, you would fetch this from your API or import from JSON
        const sampleProjects: Project[] = [
          {
            id: '1',
            title: 'Community Platform',
            description: 'Flagship open-source platform powering Tech Dev Club – enabling global developer communities with seamless event management, project collaboration, and resource sharing.',
            longDescription: 'This robust platform, built and maintained by the Tech Dev Club team, serves thousands of developers worldwide. Designed for maximum engagement, it offers a real-time chat suite, collaborative project boards, an interactive event calendar, and personalized member profiles. Modern integrations and a secure, scalable architecture empower both online and offline tech communities to thrive, share, and innovate together.',
            image: 'public/projects/tech_dev_club.jpg',
            techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'TypeScript', 'Tailwind CSS'],
            githubUrl: 'https://github.com/Brajesh31/TEC_DEV_CL',
            liveUrl: 'https://community.techdevclub.com',
            stars: 245,
            forks: 78,
            contributors: 32,
            maintainers: [
              {
                name: "Kumar Gaurav Tiwari",
                avatar: "/core/kumar-gaurav-tiwari-founder.jpg",
                githubUrl: "https://github.com/kumargauravtiwari"
              },
              {
                name: "Brajesh Kumar",
                avatar: "/core/brajesh-kumar.jpg",
                githubUrl: "https://github.com/Brajesh31"
              },
              {
                name: "Vani Sen",
                avatar: "/core/vani_community_manager.jpg",
                githubUrl: "https://github.com/Vani412"
              },
              {
                name: "Bhavya Shukla",
                avatar: "/core/bhavya_team_leader.jpg",
                githubUrl: "https://github.com/bhavya21A"
              }
            ],
            category: 'Web Application',
            tags: ['community', 'collaboration', 'open-source', 'techdevclub'],
            status: 'active',
            featured: true,
            createdAt: '2023-01-15',
            updatedAt: '2025-06-25'
          }
        ];
        
        setProjects(sampleProjects);
        setFilteredProjects(sampleProjects);
        setLoading(false);
      } catch (error) {
        console.error('Error loading project data:', error);
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Filter projects when category, tech, or search term changes
  useEffect(() => {
    const filtered = projects.filter(project => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesTech = selectedTech === 'all' || project.techStack.includes(selectedTech);
      const matchesSearch = 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesCategory && matchesTech && matchesSearch;
    });
    
    setFilteredProjects(filtered);
  }, [selectedCategory, selectedTech, searchTerm, projects]);

  // Get unique categories and tech stacks for filters
  const categories = ['all', ...new Set(projects.map(p => p.category))];
  const techStacks = ['all', ...new Set(projects.flatMap(p => p.techStack))];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Explore standout projects created by Tech Dev Club members.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Category Filter */}
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
              >
                <option value="all">All Categories</option>
                {categories.filter(c => c !== 'all').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Tech Stack Filter */}
            <div className="flex items-center">
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
              >
                <option value="all">All Technologies</option>
                {techStacks.filter(t => t !== 'all').map(tech => (
                  <option key={tech} value={tech}>{tech}</option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow">
              <Github className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">No projects found</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map(project => (
                <div key={project.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {project.image && (
                    <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {project.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Tech Stack:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map(tech => (
                          <span 
                            key={tech} 
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <div className="flex -space-x-2 mr-4">
                        {project.maintainers.map(maintainer => (
                          <img 
                            key={maintainer.name}
                            src={maintainer.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(maintainer.name)}&background=random`} 
                            alt={maintainer.name} 
                            className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                            title={maintainer.name}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {project.contributors} contributors
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{project.stars}</span>
                      </div>
                      <div className="flex items-center">
                        <GitFork className="h-4 w-4 mr-1" />
                        <span>{project.forks}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{project.contributors}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center bg-gray-900 hover:bg-black text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                      </a>
                      
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contribute CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Have a Project Idea?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Submit your project to be featured in our community showcase or find collaborators to help bring your idea to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/projects" 
              className="inline-block bg-white text-blue-700 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg"
            >
              Submit a Project
            </a>
            <a 
              href="/incubating-projects" 
              className="inline-block bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors duration-300"
            >
              Explore Incubating Projects
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedProjects;