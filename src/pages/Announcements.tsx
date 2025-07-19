import React, { useState, useEffect } from 'react';
import { Bell, Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'event' | 'community' | 'project' | 'general';
  link?: {
    url: string;
    text: string;
  };
  important: boolean;
}

const Announcements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  // Set SEO metadata
  useSEO({
    title: 'Announcements - Tech Dev Club',
    description: 'Stay updated with the latest announcements from Tech Dev Club.',
    keywords: 'tech announcements, developer community news, tech events, programming announcements',
  });

  useEffect(() => {
    // In a real app, this would fetch from an API or JSON file
    const fetchAnnouncements = async () => {
      try {
        // Simulating data fetch
        const sampleAnnouncements: Announcement[] = [
          {
            id: '1',
            title: 'TechFront AI and Blockchain Conference Announced',
            content: 'We\'re excited to announce our flagship AI & Blockchain Conference at IIT Delhi on July 12, 2025. Join us for a day of learning, networking, and inspiration with industry experts.',
            date: '2024-11-15',
            category: 'event',
            link: {
              url: '/techfront',
              text: 'Learn More & Register'
            },
            important: true
          },
          {
            id: '2',
            title: 'New Mentorship Program Launching',
            content: 'Our structured mentorship program is launching next month. Applications are now open for both mentors and mentees. This is a great opportunity to grow your skills or give back to the community.',
            date: '2024-11-10',
            category: 'community',
            link: {
              url: '/mentorship',
              text: 'Apply Now'
            },
            important: true
          },
          {
            id: '3',
            title: 'Community Platform 2.0 Released',
            content: 'We\'ve just released a major update to our community platform with new features including improved event management, project collaboration tools, and a redesigned user interface.',
            date: '2024-11-05',
            category: 'project',
            link: {
              url: '/projects/community-platform',
              text: 'Explore the Update'
            },
            important: false
          },
          {
            id: '4',
            title: 'Call for Speakers: Monthly Tech Talks',
            content: 'We\'re looking for speakers for our monthly tech talks. If you have expertise in any tech-related topic and would like to share your knowledge, please apply.',
            date: '2024-11-01',
            category: 'event',
            link: {
              url: '/speakers#apply',
              text: 'Apply as Speaker'
            },
            important: false
          },
          {
            id: '5',
            title: 'New Learning Resources Added',
            content: 'We\'ve added 50+ new resources to our Learning Resources Vault, covering topics from web development to AI/ML, DevOps, and more.',
            date: '2024-10-25',
            category: 'general',
            link: {
              url: '/learning-resources',
              text: 'Browse Resources'
            },
            important: false
          },
          {
            id: '6',
            title: 'Community Survey: Help Shape Our Future',
            content: 'We want to hear from you! Please take a few minutes to complete our annual community survey. Your feedback will help us improve and plan future initiatives.',
            date: '2024-10-20',
            category: 'community',
            link: {
              url: 'https://forms.gle/community-survey',
              text: 'Take the Survey'
            },
            important: true
          },
          {
            id: '7',
            title: 'New Sponsor: TechCorp Solutions',
            content: 'We\'re excited to welcome TechCorp Solutions as our newest Diamond sponsor. Their support will help us expand our programs and reach more developers.',
            date: '2024-10-15',
            category: 'general',
            link: {
              url: '/sponsors',
              text: 'View Our Sponsors'
            },
            important: false
          },
          {
            id: '8',
            title: 'Hackathon Winners Announced',
            content: 'Congratulations to Team CodeCrafters for winning our recent hackathon with their innovative project "HealthTrack AI". Check out all the winning projects on our website.',
            date: '2024-10-10',
            category: 'event',
            link: {
              url: '/events/hackathon-results',
              text: 'See Winners'
            },
            important: false
          }
        ];
        
        setAnnouncements(sampleAnnouncements);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching announcements:', error);
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  // Filter announcements based on selected category
  const filteredAnnouncements = filter === 'all' 
    ? announcements 
    : announcements.filter(announcement => announcement.category === filter);

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get category badge color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'event':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
      case 'community':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'project':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-slide-up">
            Announcements
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto animate-slide-up animation-delay-200">
            Stay updated with the latest news and updates from Tech Dev Club
          </p>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              All Announcements
            </button>
            <button
              onClick={() => setFilter('event')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'event'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Events
            </button>
            <button
              onClick={() => setFilter('community')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'community'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Community
            </button>
            <button
              onClick={() => setFilter('project')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'project'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setFilter('general')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'general'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              General
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredAnnouncements.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No announcements found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                There are no announcements in this category at the moment.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredAnnouncements.map((announcement) => (
                <div 
                  key={announcement.id}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden ${
                    announcement.important ? 'border-l-4 border-red-500' : ''
                  }`}
                >
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div className="flex items-center mb-2 sm:mb-0">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(announcement.category)}`}>
                          {announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)}
                        </span>
                        {announcement.important && (
                          <span className="ml-2 px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-xs font-medium rounded-full">
                            Important
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(announcement.date)}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {announcement.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {announcement.content}
                    </p>
                    
                    {announcement.link && (
                      <a 
                        href={announcement.link.url}
                        target={announcement.link.url.startsWith('http') ? '_blank' : undefined}
                        rel={announcement.link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                      >
                        {announcement.link.text}
                        {announcement.link.url.startsWith('http') ? (
                          <ExternalLink className="h-4 w-4 ml-1" />
                        ) : (
                          <ArrowRight className="h-4 w-4 ml-1" />
                        )}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Stay Updated
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive announcements directly in your inbox
          </p>
          <a 
            href="/newsletters"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
          >
            Subscribe to Newsletter
          </a>
        </div>
      </section>
    </div>
  );
};

export default Announcements;