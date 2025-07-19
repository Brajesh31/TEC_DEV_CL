import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

const NotFound: React.FC = () => {
  // Set SEO metadata
  useSEO({
    title: 'Page Not Found - 404 Error',
    description: 'The page you are looking for doesn\'t exist or has been moved. Return to the Tech Dev Club homepage.',
    keywords: '404, page not found, error, tech dev club',
  });

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6 animate-float">
          <AlertTriangle className="h-20 w-20 text-yellow-500 mx-auto" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-slide-up">
          404
        </h1>
        
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 animate-slide-up animation-delay-200">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 animate-slide-up animation-delay-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-600">
          <Link
            to="/"
            className="flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          
          <Link
            to="/contact"
            className="flex items-center justify-center border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
          >
            <Search className="h-5 w-5 mr-2" />
            Contact Support
          </Link>
        </div>
        
        <div className="mt-12 text-gray-500 dark:text-gray-400 text-sm animate-slide-up animation-delay-800">
          <p>Looking for something specific? Try checking our:</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link to="/events" className="text-primary-600 dark:text-primary-400 hover:underline">Events</Link>
            <Link to="/resources" className="text-primary-600 dark:text-primary-400 hover:underline">Resources</Link>
            <Link to="/blog" className="text-primary-600 dark:text-primary-400 hover:underline">Blog</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;