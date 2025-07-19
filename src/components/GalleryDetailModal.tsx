import React from 'react';
import { X, Calendar, Users, MapPin, Tag } from 'lucide-react';

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

interface GalleryDetailModalProps {
  item: GalleryItem;
  isOpen: boolean;
  onClose: () => void;
}

const GalleryDetailModal: React.FC<GalleryDetailModalProps> = ({ item, isOpen, onClose }) => {
  if (!isOpen) return null;

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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
      <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={handleBackdropClick}
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
          {/* Multi-image grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-4">
            {item.images.map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt={`${item.title} ${index + 1}`}
                    className="w-full h-FULL object-cover rounded-md"
                />
            ))}
          </div>

          <button
              onClick={onClose}
              className="absolute top-6 right-6 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-colors"
              aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>

            <div className="grid md:grid-cols-3 gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{new Date(item.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{item.location}</span>
              </div>
              {item.attendees && (
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    <span>{item.attendees} attendees</span>
                  </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                  <span
                      key={tag}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm rounded-full flex items-center"
                  >
                <Tag className="h-3 w-3 mr-1" />
                    {tag}
              </span>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default GalleryDetailModal;
