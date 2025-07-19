import React, { useState, useEffect } from 'react';
import { useSEO } from '../hooks/useSEO';
import { getVolunteers } from '../utils/dataLoader';
import VolunteerCard from '../components/VolunteerCard';
import VolunteerDetailModal from '../components/VolunteerDetailModal';
import { Filter, Search, Award, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Volunteer {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  location: string;
  expertise: string[];
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
    website?: string;
  };
  achievements: string[];
  category: 'core' | 'mentor' | 'volunteer';
  joinedAt: string;
}

const Volunteers: React.FC = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState<Volunteer[]>([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string>('all');

  // Set SEO metadata
  useSEO({
    title: 'Our Volunteers - Tech Dev Club Community Contributors',
    description: 'Meet our dedicated volunteers who contribute their time and expertise to help the Tech Dev Club community grow and thrive.',
    keywords: 'tech volunteers, developer community, tech contributors, coding mentors, tech event organizers, community volunteers, iit delhi, iit bombay, iit madras, edtech, meta, google, facebook, instagram, coursera, udemy, openai, chatgpt, ai, ml, data science, python, javascript, java, c++, nodejs, react, coding, hackathon, startup, developer, engineer, tech community, open source, college students, tech club, innovation, leadership, soft skills, full stack, backend, frontend, cloud, internships, women in tech, campus',
  });

  useEffect(() => {
    // Load volunteers from the data loader
    const allVolunteers = getVolunteers();
    setVolunteers(allVolunteers);
    setFilteredVolunteers(allVolunteers);
  }, []);

  useEffect(() => {
    // Filter volunteers based on search term and expertise
    const filtered = volunteers.filter(volunteer => {
      const matchesSearch = 
        volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        volunteer.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        volunteer.bio.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesExpertise = 
        selectedExpertise === 'all' || 
        volunteer.expertise.some(skill => 
          skill.toLowerCase().includes(selectedExpertise.toLowerCase())
        );
      
      return matchesSearch && matchesExpertise;
    });
    
    setFilteredVolunteers(filtered);
  }, [searchTerm, selectedExpertise, volunteers]);

  const handleVolunteerClick = (volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVolunteer(null);
  };

  // Extract all unique expertise areas for filtering
  const allExpertiseAreas = Array.from(
    new Set(
      volunteers.flatMap(volunteer => volunteer.expertise)
    )
  ).sort();

  // Group expertise areas by category
  const expertiseCategories = {
    'Programming Languages': ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C', 'Go', 'Ruby'],
    'Web Technologies': ['HTML', 'CSS', 'React', 'Angular', 'Vue.js', 'Node.js', 'Express', 'Tailwind'],
    'Cloud & DevOps': ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD'],
    'Data & AI': ['Machine Learning', 'Data Science', 'AI', 'Deep Learning', 'NLP', 'Computer Vision'],
    'Design': ['UI/UX', 'Figma', 'Adobe XD', 'Photoshop', 'Illustrator'],
    'Other': []
  };

  // Categorize expertise areas
  const categorizedExpertise: Record<string, string[]> = {};
  
  allExpertiseAreas.forEach(expertise => {
    let categorized = false;
    
    for (const [category, keywords] of Object.entries(expertiseCategories)) {
      if (keywords.some(keyword => expertise.includes(keyword))) {
        if (!categorizedExpertise[category]) {
          categorizedExpertise[category] = [];
        }
        categorizedExpertise[category].push(expertise);
        categorized = true;
        break;
      }
    }
    
    if (!categorized) {
      if (!categorizedExpertise['Other']) {
        categorizedExpertise['Other'] = [];
      }
      categorizedExpertise['Other'].push(expertise);
    }
  });

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-hero-light dark:bg-hero-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
            Our Volunteers
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto animate-slide-up animation-delay-200">
            Meet the dedicated individuals who contribute their time and expertise to help our community thrive
          </p>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg transform transition-all duration-300 hover:scale-105">
              <Users className="h-10 w-10 mx-auto text-primary-600 dark:text-primary-400 mb-3" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {volunteers.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Active Volunteers
              </div>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg transform transition-all duration-300 hover:scale-105">
              <Calendar className="h-10 w-10 mx-auto text-secondary-600 dark:text-secondary-400 mb-3" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                June 2025
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Joined
              </div>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg transform transition-all duration-300 hover:scale-105">
              <Award className="h-10 w-10 mx-auto text-accent-600 dark:text-accent-400 mb-3" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {volunteers.reduce((total, volunteer) => total + volunteer.achievements.length, 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Achievements
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search volunteers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
              />
            </div>

            {/* Expertise Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <select
                value={selectedExpertise}
                onChange={(e) => setSelectedExpertise(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
              >
                <option value="all">All Expertise</option>
                {Object.entries(categorizedExpertise).map(([category, skills]) => (
                  <optgroup key={category} label={category}>
                    {skills.map(skill => (
                      <option key={skill} value={skill}>{skill}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteers Grid */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredVolunteers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No volunteers found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredVolunteers.map((volunteer) => (
                <VolunteerCard 
                  key={volunteer.id} 
                  volunteer={volunteer} 
                  onClick={() => handleVolunteerClick(volunteer)} 
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Join as Volunteer CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Interested in Volunteering?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join our team of dedicated volunteers and make a difference in the tech community
          </p>
          <Link
              to="/volunteer"
              className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-block"
          >
            Apply to Volunteer
          </Link>
        </div>
      </section>

      {/* Volunteer Detail Modal */}
      {selectedVolunteer && (
        <VolunteerDetailModal
          volunteer={selectedVolunteer}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Volunteers;