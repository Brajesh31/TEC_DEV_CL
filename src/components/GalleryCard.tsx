import React from 'react';
import { Calendar, Users, MapPin } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  images: string[]; // ✅ updated
  date: string;
  location: string;
  attendees?: number;
  category: 'hackathon' | 'workshop' | 'conference' | 'meetup' | 'social' | 'project';
  tags: string[];
}

interface GalleryCardProps {
  item: GalleryItem;
  onClick: () => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item, onClick }) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      hackathon: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300',
      workshop: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
      conference: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
      meetup: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
      social: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300',
      project: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';
  };

  return (
      <div
          className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
          onClick={onClick}
      >
        <div className="relative">
          <img
              src={item.images[0]} // ✅ show first image
              alt={item.title}
              className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 left-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
          </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {item.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
            {item.description}
          </p>

          <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-2" />
              <span>{new Date(item.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-2" />
              <span>{item.location}</span>
            </div>
            {item.attendees && (
                <div className="flex items-center">
                  <Users className="h-3 w-3 mr-2" />
                  <span>{item.attendees} attendees</span>
                </div>
            )}
          </div>

          <div className="flex flex-wrap gap-1 mt-3">
            {item.tags.slice(0, 2).map((tag) => (
                <span
                    key={tag}
                    className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                >
              {tag}
            </span>
            ))}
            {item.tags.length > 2 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
              +{item.tags.length - 2}
            </span>
            )}
          </div>
        </div>
      </div>
  );
};

export default GalleryCard;
