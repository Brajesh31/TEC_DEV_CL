import React, { useState, useEffect } from 'react';
import { ExternalLink, Search, Filter, BookOpen, Video, Code, Globe, Star, Clock } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import ResourceCard from '../components/ResourceCard';

// Import resources data
import resourcesData from '../data/resources.json';

interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  type: 'article' | 'video' | 'course' | 'tool' | 'documentation' | 'book';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  rating: number;
  addedBy: string;
  addedAt: string;
  featured: boolean;
}

const Resources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // Set SEO metadata
  useSEO({
    title: 'Developer Resources - Tools, Tutorials & Learning Materials',
    description: 'Access our curated collection of developer resources, including tools, tutorials, and learning materials to accelerate your growth.',
    keywords: 'developer resources, programming tools, coding tutorials, web development resources, software engineering tools, learning resources, tech tutorials',
    structuredData: {
      type: 'ItemList',
      data: {
        itemListElement: resourcesData.resources.slice(0, 10).map((resource, index) => ({
          '@type': 'Thing',
          position: index + 1,
          name: resource.title,
          description: resource.description,
          url: resource.url
        }))
      }
    }
  });

  useEffect(() => {
    // Load resources from the imported JSON data
    setResources(resourcesData.resources);
  }, []);

  const categories = Array.from(new Set(resources.map(resource => resource.category)));
  const types = Array.from(new Set(resources.map(resource => resource.type)));
  const difficulties = ['beginner', 'intermediate', 'advanced'];

  const featuredResources = resources.filter(resource => resource.featured);

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesDifficulty = selectedDifficulty === 'all' || resource.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesType && matchesDifficulty;
  });

  const handleResourceClick = (resource: Resource) => {
    window.open(resource.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-hero-light dark:bg-hero-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
            Developer Resources
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto animate-slide-up animation-delay-200">
            Curated collection of tools, tutorials, and resources to accelerate your development journey
          </p>
        </div>
      </section>

      {/* Featured Resources */}
      {featuredResources.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 animate-slide-up">
              Featured Resources
            </h2>
            <div className="grid md:grid-cols-3 gap-6 animate-slide-up animation-delay-200">
              {featuredResources.map((resource, index) => (
                <ResourceCard 
                  key={resource.id} 
                  resource={resource} 
                  onClick={() => handleResourceClick(resource)} 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search and Filters */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 text-sm transition-all duration-200"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 text-sm transition-all duration-200"
              >
                <option value="all">All Types</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 text-sm transition-all duration-200"
              >
                <option value="all">All Levels</option>
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No resources found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource, index) => (
                <ResourceCard 
                  key={resource.id} 
                  resource={resource} 
                  onClick={() => handleResourceClick(resource)} 
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Resources;