import React, { useState, useEffect } from 'react';
import { Star, Award, Github, Linkedin, ExternalLink, Calendar, MapPin, Filter } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import SpotlightCard from '../components/SpotlightCard';
import SpotlightDetailModal from '../components/SpotlightDetailModal';

// Import spotlight data
import spotlightsData from '../data/spotlights.json';

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

const Spotlights: React.FC = () => {
  const [spotlights, setSpotlights] = useState<Spotlight[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSpotlight, setSelectedSpotlight] = useState<Spotlight | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Set SEO metadata
  useSEO({
    title: 'Community Spotlights - Featured Tech Dev Club Members',
    description: 'Meet our featured community members who have made exceptional contributions to the tech community through leadership, innovation, and mentorship.',
    keywords: 'developer spotlight, tech community leaders, tech innovators, developer mentors, tech speakers, community contributors',
    structuredData: {
      type: 'ItemList',
      data: {
        itemListElement: spotlightsData.spotlights.map((spotlight, index) => ({
          '@type': 'Person',
          position: index + 1,
          name: spotlight.name,
          jobTitle: spotlight.title,
          worksFor: {
            '@type': 'Organization',
            name: spotlight.company
          },
          description: spotlight.bio,
          image: spotlight.avatar
        }))
      }
    }
  });

  useEffect(() => {
    // Load spotlights from the imported JSON data
    setSpotlights(spotlightsData.spotlights);
  }, []);

  const categories = [
    { id: 'all', label: 'All Spotlights' },
    { id: 'leader', label: 'Community Leaders' },
    { id: 'innovator', label: 'Innovators' },
    { id: 'contributor', label: 'Top Contributors' },
    { id: 'speaker', label: 'Featured Speakers' },
    { id: 'mentor', label: 'Mentors' },
  ];

  const filteredSpotlights = selectedCategory === 'all' 
    ? spotlights 
    : spotlights.filter(spotlight => spotlight.category === selectedCategory);

  const handleSpotlightClick = (spotlight: Spotlight) => {
    setSelectedSpotlight(spotlight);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSpotlight(null);
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-hero-light dark:bg-hero-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
            Community Spotlights
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto animate-slide-up animation-delay-200">
            Celebrating the amazing developers who make our community thrive through their contributions, innovations, and leadership
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Spotlights Grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredSpotlights.length === 0 ? (
            <div className="text-center py-12">
              <Star className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No spotlights found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try selecting a different category.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSpotlights.map((spotlight, index) => (
                <SpotlightCard 
                  key={spotlight.id} 
                  spotlight={spotlight} 
                  onClick={() => handleSpotlightClick(spotlight)} 
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Spotlight Detail Modal */}
      {selectedSpotlight && (
        <SpotlightDetailModal
          spotlight={selectedSpotlight}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Spotlights;