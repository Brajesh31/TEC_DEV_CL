import React from 'react';
import { X, Star, Calendar, Quote, User, Briefcase, Building } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  category: 'mentorship' | 'events' | 'community' | 'projects' | 'career';
  date: string;
  featured: boolean;
}

interface TestimonialDetailModalProps {
  testimonial: Testimonial;
  isOpen: boolean;
  onClose: () => void;
}

const TestimonialDetailModal: React.FC<TestimonialDetailModalProps> = ({ testimonial, isOpen, onClose }) => {
  if (!isOpen) return null;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      mentorship: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
      events: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
      community: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
      projects: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300',
      career: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300',
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
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full animate-scale-in">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center">
              <div className="flex">
                {renderStars(testimonial.rating)}
              </div>
              <span className={`ml-3 px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(testimonial.category)}`}>
                {testimonial.category.charAt(0).toUpperCase() + testimonial.category.slice(1)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-8">
            <Quote className="h-12 w-12 text-primary-600/20 dark:text-primary-400/20 mb-4" />
            <blockquote className="text-xl text-gray-800 dark:text-gray-200 italic leading-relaxed">
              "{testimonial.content}"
            </blockquote>
          </div>

          <div className="flex items-center mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full mr-4 object-cover ring-2 ring-primary-200 dark:ring-primary-800"
            />
            <div>
              <div className="flex items-center">
                <User className="h-4 w-4 text-primary-600 dark:text-primary-400 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {testimonial.name}
                </h3>
              </div>
              <div className="flex items-center mt-1">
                <Briefcase className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                <p className="text-gray-600 dark:text-gray-400">
                  {testimonial.title}
                </p>
              </div>
              <div className="flex items-center mt-1">
                <Building className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                <p className="text-gray-600 dark:text-gray-400">
                  {testimonial.company}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Shared on {new Date(testimonial.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            {testimonial.featured && (
              <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded-full text-xs">
                Featured Testimonial
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialDetailModal;