import React, { useState, useEffect } from 'react';
import { useSEO } from '../hooks/useSEO';
import TeamCard from '../components/TeamCard';
import TeamDetailModal from '../components/TeamDetailModal';
import { getMembers, getMembersByCategory, getVolunteers } from '../utils/dataLoader';

interface TeamMember {
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

const Team: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [volunteers, setVolunteers] = useState<TeamMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Set SEO metadata
  useSEO({
    title: 'Our Team - The People Behind Tech Dev Club',
    description: 'Meet the passionate individuals who make Tech Dev Club a thriving global community of developers.',
    keywords: 'tech team, developer community team, tech leadership, community organizers, tech mentors, developer advocates',
    structuredData: {
      type: 'Organization',
      data: {
        name: 'Tech Dev Club',
        url: 'https://techdevclub.com/team',
        logo: 'https://techdevclub.com/logo.png',
        employee: getMembers().slice(0, 5).map(member => ({
          '@type': 'Person',
          name: member.name,
          jobTitle: member.role,
          image: member.avatar,
          sameAs: [
            member.social.github,
            member.social.linkedin,
            member.social.website
          ].filter(Boolean)
        }))
      }
    }
  });

  useEffect(() => {
    // Load team members from the data loader
    setTeamMembers(getMembers());
    // Load volunteers
    setVolunteers(getVolunteers());
  }, []);

  const categories = [
    { id: 'core', title: 'Core Team', description: 'Our dedicated leadership team' },
    { id: 'volunteer', title: 'Volunteers', description: 'Our amazing community contributors (Joined June 2025)' }
  ];

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  // Custom order for core team members
  const getOrderedCoreTeam = () => {
    const coreTeam = getMembersByCategory('core');
    
    // Define the order: Founder, Co-Founder, Community Manager, Team Leader
    const roleOrder = ['Founder', 'Co-Founder', 'Community Manager', 'Team Leader'];
    
    return coreTeam.sort((a, b) => {
      const aIndex = roleOrder.indexOf(a.role);
      const bIndex = roleOrder.indexOf(b.role);
      return aIndex - bIndex;
    });
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-hero-light dark:bg-hero-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
            Meet Our Team
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto animate-slide-up animation-delay-200">
            The passionate individuals who make Tech Dev Club a thriving global community
          </p>
        </div>
      </section>

      {/* Core Team Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Core Team
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our dedicated leadership team
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {getOrderedCoreTeam().map((member, index) => (
              <TeamCard 
                key={member.id} 
                member={member} 
                onClick={() => handleMemberClick(member)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Volunteers Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Volunteers
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our amazing community contributors (Joined June 2025)
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {volunteers.map((volunteer, index) => (
              <TeamCard 
                key={volunteer.id} 
                member={volunteer} 
                onClick={() => handleMemberClick(volunteer)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4 animate-slide-up">
            Want to Join Our Team?
          </h2>
          <p className="text-xl text-primary-100 mb-8 animate-slide-up animation-delay-200">
            We're always looking for passionate individuals to help grow our community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-400">
            <a
              href="/volunteer"
              className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Become a Volunteer
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* Team Member Detail Modal */}
      {selectedMember && (
        <TeamDetailModal
          member={selectedMember}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Team;