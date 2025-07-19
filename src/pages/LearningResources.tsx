import React, { useState, useEffect } from 'react';
import { BookOpen, Video, Code, Globe, Star, ExternalLink, Search, Filter } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

// TODO: Replace with real data in /data/learningVault.json
interface LearningResource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'article' | 'video' | 'course' | 'book' | 'documentation' | 'tool' | 'repository';
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'all-levels';
  tags: string[];
  author: string;
  addedBy: string;
  addedDate: string;
  rating: number;
  isFree: boolean;
  featured: boolean;
}

// Placeholder data - replace with actual data from /data/learningVault.json
const resourcesData: LearningResource[] = [
  {
    id: '1',
    title: 'React Official Documentation',
    description: 'The official React documentation with comprehensive guides, API reference, and tutorials.',
    url: 'https://react.dev',
    type: 'documentation',
    category: 'Frontend',
    level: 'all-levels',
    tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
    author: 'React Team',
    addedBy: 'Brajesh Kumar',
    addedDate: '2024-01-15',
    rating: 5,
    isFree: true,
    featured: true
  },
  {
    id: '2',
    title: 'The Complete Node.js Developer Course',
    description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Jest, and more!',
    url: 'https://www.udemy.com/course/the-complete-nodejs-developer-course-2/',
    type: 'course',
    category: 'Backend',
    level: 'beginner',
    tags: ['Node.js', 'Express', 'MongoDB', 'JavaScript', 'Backend'],
    author: 'Andrew Mead',
    addedBy: 'Kumar Gaurav Tiwari',
    addedDate: '2024-02-10',
    rating: 4.5,
    isFree: false,
    featured: true
  },
  {
    id: '3',
    title: 'Machine Learning Crash Course',
    description: 'Google\'s fast-paced, practical introduction to machine learning with TensorFlow.',
    url: 'https://developers.google.com/machine-learning/crash-course',
    type: 'course',
    category: 'AI/ML',
    level: 'intermediate',
    tags: ['Machine Learning', 'TensorFlow', 'AI', 'Python', 'Data Science'],
    author: 'Google',
    addedBy: 'Vani Sen',
    addedDate: '2024-03-05',
    rating: 4.8,
    isFree: true,
    featured: true
  },
  {
    id: '4',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    description: 'A book on writing clean, maintainable code that follows best practices and principles.',
    url: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882',
    type: 'book',
    category: 'Software Engineering',
    level: 'intermediate',
    tags: ['Clean Code', 'Best Practices', 'Software Engineering', 'Agile'],
    author: 'Robert C. Martin',
    addedBy: 'Bhavya Shukla',
    addedDate: '2024-02-20',
    rating: 4.9,
    isFree: false,
    featured: false
  },
  {
    id: '5',
    title: 'GitHub Actions: CI/CD Pipeline Tutorial',
    description: 'Learn how to set up continuous integration and deployment pipelines using GitHub Actions.',
    url: 'https://www.youtube.com/watch?v=example',
    type: 'video',
    category: 'DevOps',
    level: 'intermediate',
    tags: ['GitHub Actions', 'CI/CD', 'DevOps', 'Automation'],
    author: 'Tech Dev Club',
    addedBy: 'Ishika Patel',
    addedDate: '2024-04-15',
    rating: 4.7,
    isFree: true,
    featured: false
  },
  {
    id: '6',
    title: 'MDN Web Docs',
    description: 'Comprehensive documentation for web technologies including HTML, CSS, JavaScript, and Web APIs.',
    url: 'https://developer.mozilla.org',
    type: 'documentation',
    category: 'Web Development',
    level: 'all-levels',
    tags: ['HTML', 'CSS', 'JavaScript', 'Web APIs', 'Documentation'],
    author: 'Mozilla',
    addedBy: 'Brajesh Kumar',
    addedDate: '2024-01-10',
    rating: 5,
    isFree: true,
    featured: false
  },
  {
    id: '7',
    title: 'Docker for Beginners',
    description: 'A comprehensive guide to getting started with Docker containers and containerization.',
    url: 'https://docker-curriculum.com/',
    type: 'article',
    category: 'DevOps',
    level: 'beginner',
    tags: ['Docker', 'Containers', 'DevOps', 'Microservices'],
    author: 'Prakhar Srivastav',
    addedBy: 'Kumar Gaurav Tiwari',
    addedDate: '2024-03-20',
    rating: 4.6,
    isFree: true,
    featured: false
  },
  {
    id: '8',
    title: 'VS Code',
    description: 'A powerful, lightweight code editor with built-in support for development operations like debugging, task running, and version control.',
    url: 'https://code.visualstudio.com/',
    type: 'tool',
    category: 'Development Tools',
    level: 'all-levels',
    tags: ['IDE', 'Code Editor', 'Development Tools'],
    author: 'Microsoft',
    addedBy: 'Vani Sen',
    addedDate: '2024-01-05',
    rating: 4.9,
    isFree: true,
    featured: false
  }
];

const LearningResources: React.FC = () => {
  const [resources, setResources] = useState<LearningResource[]>([]);
  const [filteredResources, setFilteredResources] = useState<LearningResource[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Set SEO metadata
  useSEO({
    title: 'Learning Resources Vault - Tech Dev Club',
    description: 'Access our curated collection of learning resources for developers, including tutorials, courses, documentation, and tools.',
    keywords: 'learning resources, developer education, programming tutorials, coding courses, tech documentation',
  });

  useEffect(() => {
    // Simulate loading data from API or JSON file
    setLoading(true);
    setTimeout(() => {
      setResources(resourcesData);
      setFilteredResources(resourcesData);
      setLoading(false);
    }, 500);
    
    // In a real implementation, you would fetch from your data source:
    // const fetchResources = async () => {
    //   try {
    //     const response = await fetch('/data/learningVault.json');
    //     const data = await response.json();
    //     setResources(data);
    //     setFilteredResources(data);
    //   } catch (error) {
    //     console.error('Error fetching resources:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchResources();
  }, []);

  // Filter resources based on search and filters
  useEffect(() => {
    const filtered = resources.filter(resource => {
      const matchesSearch = 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = selectedType === 'all' || resource.type === selectedType;
      const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
      const matchesLevel = selectedLevel === 'all' || resource.level === selectedLevel;
      
      return matchesSearch && matchesType && matchesCategory && matchesLevel;
    });
    
    setFilteredResources(filtered);
  }, [searchTerm, selectedType, selectedCategory, selectedLevel, resources]);

  // Get unique values for filters
  const types = ['all', ...new Set(resources.map(resource => resource.type))];
  const categories = ['all', ...new Set(resources.map(resource => resource.category))];
  const levels = ['all', 'beginner', 'intermediate', 'advanced', 'all-levels'];

  // Get icon for resource type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <BookOpen className="h-6 w-6 text-blue-500" />;
      case 'video':
        return <Video className="h-6 w-6 text-red-500" />;
      case 'course':
        return <BookOpen className="h-6 w-6 text-green-500" />;
      case 'book':
        return <BookOpen className="h-6 w-6 text-purple-500" />;
      case 'documentation':
        return <BookOpen className="h-6 w-6 text-gray-500" />;
      case 'tool':
        return <Code className="h-6 w-6 text-yellow-500" />;
      case 'repository':
        return <Code className="h-6 w-6 text-indigo-500" />;
      default:
        return <Globe className="h-6 w-6 text-gray-500" />;
    }
  };

  // Render star rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : i < rating 
              ? 'text-yellow-400 fill-current opacity-50' 
              : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  // Featured resources
  const featuredResources = resources.filter(resource => resource.featured);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Learning Resources Vault
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Curated tech resources for every member
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Description */}
          <div className="mb-12 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Curated Learning Resources
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Our community has curated a collection of high-quality learning resources to help you 
              develop your skills and knowledge. From beginner tutorials to advanced courses, 
              find resources that match your learning goals and preferences.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-10 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center">
                  <Filter className="h-5 w-5 text-gray-500 mr-2" />
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 text-sm"
                  >
                    <option value="all">All Types</option>
                    {types.slice(1).map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 text-sm"
                  >
                    <option value="all">All Categories</option>
                    {categories.slice(1).map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 text-sm"
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="all-levels">All Levels</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Resources */}
          {!loading && featuredResources.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Featured Resources
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredResources.map(resource => (
                  <a 
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          {getTypeIcon(resource.type)}
                          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 capitalize">
                            {resource.type}
                          </span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          resource.level === 'beginner'
                            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                            : resource.level === 'intermediate'
                              ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
                              : resource.level === 'advanced'
                                ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                                : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        }`}>
                          {resource.level === 'all-levels' ? 'All Levels' : resource.level}
                        </span>
                      </div>
                      
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {resource.title}
                      </h4>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">
                        {resource.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {resource.tags.slice(0, 3).map(tag => (
                          <span 
                            key={tag}
                            className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {resource.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                            +{resource.tags.length - 3}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                          <div className="flex">
                            {renderStars(resource.rating)}
                          </div>
                          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                            {resource.isFree ? 'Free' : 'Paid'}
                          </span>
                        </div>
                        <div className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium flex items-center">
                          View
                          <ExternalLink className="h-4 w-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* All Resources */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No resources found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {searchTerm || selectedType !== 'all' || selectedCategory !== 'all' || selectedLevel !== 'all'
                  ? 'Filtered Resources'
                  : 'All Resources'
                }
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map(resource => (
                  <a 
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          {getTypeIcon(resource.type)}
                          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 capitalize">
                            {resource.type}
                          </span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          resource.level === 'beginner'
                            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                            : resource.level === 'intermediate'
                              ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
                              : resource.level === 'advanced'
                                ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                                : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        }`}>
                          {resource.level === 'all-levels' ? 'All Levels' : resource.level}
                        </span>
                      </div>
                      
                      <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                        {resource.title}
                      </h4>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 flex-grow">
                        {resource.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {resource.tags.slice(0, 2).map(tag => (
                          <span 
                            key={tag}
                            className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {resource.tags.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                            +{resource.tags.length - 2}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                          <div className="flex">
                            {renderStars(resource.rating)}
                          </div>
                        </div>
                        <div className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-xs font-medium flex items-center">
                          {resource.isFree ? 'Free' : 'Paid'}
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Submit Resource CTA */}
      <section className="py-16 px-4 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Share Your Favorite Resources
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Know a great resource that's not in our vault? Share it with the community!
          </p>
          <a 
            href="/resources#submit"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300"
          >
            Submit a Resource
          </a>
        </div>
      </section>
    </div>
  );
};

export default LearningResources;