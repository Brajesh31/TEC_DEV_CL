import React, { useState, useEffect } from 'react';
import { Calendar, Users, MapPin, Camera, Filter } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import GalleryCard from '../components/GalleryCard';
import GalleryDetailModal from '../components/GalleryDetailModal';

// Import gallery1 data
import galleryData from '../data/gallery.json';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string[];
  date: string;
  location: string;
  attendees?: number;
  category: 'hackathon' | 'workshop' | 'conference' | 'meetup' | 'social' | 'project';
  tags: string[];
}

const Gallery: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Set SEO metadata
  useSEO({
    title: 'Event Gallery - Tech Dev Club Community Events',
    description: 'Browse photos and highlights from our past event, workshops, hackathons, and community gatherings.',
    keywords: 'tech event, developer meetups, coding workshops, hackathon photos, tech conference, community event',
    structuredData: {
      type: 'ImageGallery',
      data: {
        name: 'Tech Dev Club Event Gallery',
        description: 'Photos and highlights from our community event',
        url: 'https://techdevclub.com/gallery',
        image: galleryData.gallery.slice(0, 5).map(item => item.image)
      }
    }
  });

  useEffect(() => {
    // Load gallery1 items from the imported JSON data
    setGalleryItems(galleryData.gallery);
  }, []);

  const categories = [
    { id: 'all', label: 'All Events', icon: Camera },
    { id: 'hackathon', label: 'Hackathons', icon: Calendar },
    { id: 'workshop', label: 'Workshops', icon: Users },
    { id: 'conference', label: 'Conferences', icon: MapPin },
    { id: 'meetup', label: 'Meetups', icon: Users },
    { id: 'social', label: 'Social Events', icon: Users },
    { id: 'project', label: 'Project Showcases', icon: Camera },
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-hero-light dark:bg-hero-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
            Event Gallery
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto animate-slide-up animation-delay-200">
            Relive the moments from our workshops, hackathons, conferences, and community gatherings
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <Camera className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No events found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try selecting a different category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => (
                <GalleryCard 
                  key={item.id} 
                  item={item} 
                  onClick={() => handleItemClick(item)} 
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Gallery Detail Modal */}
      {selectedItem && (
        <GalleryDetailModal
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Gallery;