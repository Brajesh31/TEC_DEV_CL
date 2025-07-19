import React from 'react';
import { Star, Calendar, Quote } from 'lucide-react';

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

interface TestimonialCardProps {
  testimonial: Testimonial;
  onClick?: () => void;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, onClick }) => {
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 sm:h-4 sm:w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <div
      className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer h-full flex flex-col"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center">
          {renderStars(testimonial.rating)}
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(testimonial.category)}`}>
          {testimonial.category}
        </span>
      </div>
      
      <blockquote className="text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 italic relative flex-grow">
        <Quote className="absolute -top-2 -left-2 h-5 w-5 sm:h-6 sm:w-6 text-gray-200 dark:text-gray-700 opacity-50" />
        <p className="relative z-10 pl-1 sm:pl-2 text-sm sm:text-base line-clamp-4">"{testimonial.content}"</p>
      </blockquote>
      
      <div className="flex items-center mt-auto">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4 object-cover ring-2 ring-primary-200 dark:ring-primary-800"
          loading="lazy"
        />
        <div>
          <div className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
            {testimonial.name}
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
            {testimonial.title}
          </div>
          <div className="text-gray-500 dark:text-gray-500 text-xs">
            {testimonial.company}
          </div>
        </div>
      </div>
      
      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{new Date(testimonial.date).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;