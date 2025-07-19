import React, { useState, useEffect } from 'react';
import { Mic, Filter, Search, Calendar, Award } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import SpeakerCard from '../components/SpeakerCard';
import SpeakerDetailModal from '../components/SpeakerDetailModal';
import { Link } from 'react-router-dom';

// Import speaker data
import speakersData from '../data/speakers.json';

interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  avatar: string;
  bio: string;
  expertise: string[];
  talkTitle: string;
  talkDescription: string;
  pastEvents: string[];
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  featuredAt: string;
  category: string;
  testimonial: string;
}

const Speakers: React.FC = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Set SEO metadata
  useSEO({
    title: 'Expert Speakers - Tech Dev Club',
    description: 'Meet our expert speakers who share their knowledge and insights at Tech Dev Club event. From frontend to AI/ML, blockchain to DevOps, our speakers cover a wide range of tech topics.',
    keywords: 'tech speakers, developer talks, programming presentations, tech experts, coding workshops, technology presenters, iit delhi, iit bombay, iit madras, edtech, meta, google, facebook, instagram, coursera, udemy, openai, chatgpt, ai, ml, data science, python, javascript, java, c++, nodejs, react, coding, hackathon, startup, developer, engineer, tech community, open source, college students, tech club, innovation, leadership, soft skills, full stack, backend, frontend, cloud, internships, women in tech, campus',
    structuredData: {
      type: 'ItemList',
      data: {
        itemListElement: speakersData.speakers.map((speaker, index) => ({
          '@type': 'Person',
          position: index + 1,
          name: speaker.name,
          jobTitle: speaker.title,
          worksFor: {
            '@type': 'Organization',
            name: speaker.company
          },
          description: speaker.bio,
          image: speaker.avatar
        }))
      }
    }
  });

  useEffect(() => {
    // Load speakers from the imported JSON data
    setSpeakers(speakersData.speakers);
  }, []);

  const categories = [
    { id: 'all', label: 'All Speakers' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'ai-ml', label: 'AI & Machine Learning' },
    { id: 'blockchain', label: 'Blockchain & Web3' },
    { id: 'devops', label: 'DevOps & Cloud' },
    { id: 'design', label: 'UX/UI Design' },
    { id: 'mobile', label: 'Mobile Development' },
  ];

  const filteredSpeakers = speakers.filter(speaker => {
    const matchesCategory = selectedCategory === 'all' || speaker.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
                         speaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         speaker.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         speaker.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         speaker.talkTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         speaker.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handleSpeakerClick = (speaker: Speaker) => {
    setSelectedSpeaker(speaker);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSpeaker(null);
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-hero-light dark:bg-hero-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
            Our Expert Speakers
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto animate-slide-up animation-delay-200">
            Meet the industry experts who share their knowledge and insights at our events
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search speakers, topics, expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center md:justify-end gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredSpeakers.length === 0 ? (
            <div className="text-center py-12">
              <Mic className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No speakers found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSpeakers.map((speaker) => (
                <SpeakerCard 
                  key={speaker.id} 
                  speaker={speaker} 
                  onClick={() => handleSpeakerClick(speaker)} 
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Become a Speaker CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4 animate-slide-up">
            Share Your Expertise
          </h2>
          <p className="text-xl text-primary-100 mb-8 animate-slide-up animation-delay-200">
            Interested in speaking at one of our events? We're always looking for passionate experts to share their knowledge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-400">
            <a
                href="https://forms.gle/zEnX7rRMLTYpPpqi9"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Apply to Speak
            </a>

            <Link
              to="/events"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              View Upcoming Events
            </Link>
          </div>
        </div>
      </section>

      {/* Speaker Detail Modal */}
      {selectedSpeaker && (
        <SpeakerDetailModal
          speaker={selectedSpeaker}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Speakers;