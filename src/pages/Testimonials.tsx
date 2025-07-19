import React, { useState, useEffect } from 'react';
import { Star, Quote, Calendar, User, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import TestimonialCard from '../components/TestimonialCard';
import TestimonialDetailModal from '../components/TestimonialDetailModal';

// Import testimonial data
import testimonialsData from '../data/testimonials.json';

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

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Set SEO metadata
  useSEO({
    title: 'Member Testimonials - Success Stories from Our Community',
    description: 'Read success stories and testimonials from Tech Dev Club members. Discover how our community has helped developers advance their careers.',
    keywords: 'developer testimonials, tech success stories, coding community reviews, developer growth, tech mentorship success, programming community feedback',
    structuredData: {
      type: 'Review',
      data: {
        itemReviewed: {
          '@type': 'Organization',
          name: 'Tech Dev Club',
          description: 'A global community of developers focused on learning, collaboration, and career growth'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        author: {
          '@type': 'Person',
          name: testimonialsData.testimonials[0]?.name || 'Community Member'
        },
        reviewBody: testimonialsData.testimonials[0]?.content || 'Tech Dev Club transformed my career.'
      }
    }
  });

  useEffect(() => {
    // Load testimonials from the imported JSON data
    setTestimonials(testimonialsData.testimonials);
  }, []);

  const categories = [
    { id: 'all', label: 'All Testimonials' },
    { id: 'mentorship', label: 'Mentorship' },
    { id: 'events', label: 'Events & Workshops' },
    { id: 'community', label: 'Community' },
    { id: 'projects', label: 'Projects' },
    { id: 'career', label: 'Career Growth' },
  ];

  const featuredTestimonials = testimonials.filter(t => t.featured);
  const filteredTestimonials = selectedCategory === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === selectedCategory);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredTestimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredTestimonials.length) % featuredTestimonials.length);
  };

  const handleTestimonialClick = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTestimonial(null);
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-hero-light dark:bg-hero-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
            Community Testimonials
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto animate-slide-up animation-delay-200">
            Hear from our amazing community members about their journey and success stories
          </p>
        </div>
      </section>

      {/* Featured Testimonials Carousel */}
      {featuredTestimonials.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-slide-up">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Stories
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Inspiring success stories from our community members
              </p>
            </div>

            <div className="relative animate-slide-up animation-delay-200">
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg p-8 md:p-12">
                <div className="flex items-center justify-between mb-8">
                  <button
                    onClick={prevSlide}
                    className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                  </button>
                  
                  <div className="flex space-x-2">
                    {featuredTestimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentSlide
                            ? 'bg-primary-600'
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextSlide}
                    className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                {featuredTestimonials.length > 0 && (
                  <div className="text-center">
                    <Quote className="h-12 w-12 text-primary-600 dark:text-primary-400 mx-auto mb-6" />
                    
                    <blockquote className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 mb-8 italic">
                      "{featuredTestimonials[currentSlide].content}"
                    </blockquote>
                    
                    <div className="flex items-center justify-center mb-4">
                      <img
                        src={featuredTestimonials[currentSlide].avatar}
                        alt={featuredTestimonials[currentSlide].name}
                        className="w-16 h-16 rounded-full mr-4 object-cover ring-2 ring-primary-200 dark:ring-primary-800"
                      />
                      <div className="text-left">
                        <div className="font-semibold text-gray-900 dark:text-white text-lg">
                          {featuredTestimonials[currentSlide].name}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          {featuredTestimonials[currentSlide].title} at {featuredTestimonials[currentSlide].company}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-20 shadow-sm">
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
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredTestimonials.length === 0 ? (
            <div className="text-center py-12">
              <Quote className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No testimonials found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try selecting a different category.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTestimonials.map((testimonial, index) => (
                <TestimonialCard 
                  key={testimonial.id} 
                  testimonial={testimonial} 
                  onClick={() => handleTestimonialClick(testimonial)} 
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4 animate-slide-up">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-primary-100 mb-8 animate-slide-up animation-delay-200">
            Join thousands of developers who have transformed their careers with Tech Dev Club
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-400">
            <a
              href="/join"
              className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Join Our Community
            </a>
            <a
              href="/event"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Explore Events
            </a>
          </div>
        </div>
      </section>

      {/* Testimonial Detail Modal */}
      {selectedTestimonial && (
        <TestimonialDetailModal
          testimonial={selectedTestimonial}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Testimonials;