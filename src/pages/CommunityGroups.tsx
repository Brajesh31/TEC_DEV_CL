import React, { useState, useEffect } from 'react';
import { MessageCircle, Users, Globe, ExternalLink } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

// TODO: Replace with real data in /data/groups.json
interface CommunityGroup {
  id: string;
  name: string;
  platform: 'Discord' | 'WhatsApp' | 'Slack' | 'Telegram' | 'LinkedIn' | 'Facebook' | 'Other';
  description: string;
  memberCount: number;
  joinUrl: string;
  region?: string;
  language?: string;
  topics: string[];
  isOfficial: boolean;
}

// Placeholder data - replace with actual data from /data/groups.json
const groupsData: CommunityGroup[] = [
  {
    id: '1',
    name: 'Tech Dev Club - Global',
    platform: 'Discord',
    description: 'Our main community server for all members worldwide. Join discussions on all tech topics, get help, and connect with other developers.',
    memberCount: 500,
    joinUrl: 'https://discord.gg/6MVn2N9q',
    topics: ['General', 'Web Development', 'Mobile', 'AI/ML', 'DevOps', 'Career'],
    isOfficial: true
  },
  {
    id: '2',
    name: 'TDC WhatsApp Community',
    platform: 'WhatsApp',
    description: 'Quick updates and discussions for our community members. Great for mobile-first communication and quick questions.',
    memberCount: 500,
    joinUrl: 'https://chat.whatsapp.com/HtpadPkjf1S44FK7sTZMu4',
    topics: ['Announcements', 'Quick Help', 'Networking'],
    isOfficial: true
  }
];

const CommunityGroups: React.FC = () => {
  const [groups, setGroups] = useState<CommunityGroup[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Set SEO metadata
  useSEO({
    title: 'Community Groups - Tech Dev Club',
    description: 'Join our various community groups on Discord, WhatsApp, Slack, and more to connect with fellow developers.',
    keywords: 'tech community groups, developer discord, programming slack, tech whatsapp groups, coding communities',
  });

  useEffect(() => {
    // Simulate loading data from API or JSON file
    setLoading(true);
    setTimeout(() => {
      setGroups(groupsData);
      setLoading(false);
    }, 500);
    
    // In a real implementation, you would fetch from your data source:
    // const fetchGroups = async () => {
    //   try {
    //     const response = await fetch('/data/groups.json');
    //     const data = await response.json();
    //     setGroups(data);
    //   } catch (error) {
    //     console.error('Error fetching groups:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchGroups();
  }, []);

  // Get unique platforms for filtering
  const platforms = ['all', ...new Set(groups.map(group => group.platform))];

  // Filter groups by selected platform
  const filteredGroups = selectedPlatform === 'all'
    ? groups
    : groups.filter(group => group.platform === selectedPlatform);

  // Get platform icon
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Discord':
        return <MessageCircle className="h-6 w-6 text-indigo-500" />;
      case 'WhatsApp':
        return <MessageCircle className="h-6 w-6 text-green-500" />;
      case 'Slack':
        return <MessageCircle className="h-6 w-6 text-amber-500" />;
      case 'Telegram':
        return <MessageCircle className="h-6 w-6 text-blue-500" />;
      case 'LinkedIn':
        return <Users className="h-6 w-6 text-blue-700" />;
      case 'Facebook':
        return <Users className="h-6 w-6 text-blue-600" />;
      default:
        return <Globe className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Community Groups
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Join our various community platforms to connect, learn, and collaborate with fellow developers
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Description */}
          <div className="mb-12 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Connect with Our Community
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Tech Dev Club maintains several community groups across different platforms to make it 
              easy for members to connect in ways that work best for them. Each group has its own focus 
              and style, but all share our values of inclusivity, learning, and collaboration.
            </p>
          </div>

          {/* Platform Filter */}
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {platforms.map(platform => (
              <button
                key={platform}
                onClick={() => setSelectedPlatform(platform)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedPlatform === platform
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {platform === 'all' ? 'All Platforms' : platform}
              </button>
            ))}
          </div>

          {/* Groups Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : filteredGroups.length === 0 ? (
            <div className="text-center py-20">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No groups found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We don't have any groups on this platform yet.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGroups.map(group => (
                <div 
                  key={group.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    {/* Group Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start">
                        {getPlatformIcon(group.platform)}
                        <div className="ml-3">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {group.name}
                          </h3>
                          <p className="text-sm text-primary-600 dark:text-primary-400">
                            {group.platform}
                          </p>
                        </div>
                      </div>
                      {group.isOfficial && (
                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full">
                          Official
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {group.description}
                    </p>

                    {/* Topics */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Topics
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {group.topics.map(topic => (
                          <span 
                            key={topic}
                            className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{group.memberCount.toLocaleString()} members</span>
                      </div>
                      {group.region && (
                        <div>
                          <Globe className="h-4 w-4 inline mr-1" />
                          <span>{group.region}</span>
                        </div>
                      )}
                    </div>

                    {/* Join Button */}
                    <a 
                      href={group.joinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors duration-300"
                    >
                      Join Group
                      <ExternalLink className="inline-block ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="py-16 px-4 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Community Guidelines
          </h2>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              All Tech Dev Club community groups follow our Code of Conduct and these guidelines:
            </p>
            <ul className="space-y-4">
              <li className="flex">
                <span className="text-primary-600 dark:text-primary-400 mr-3">•</span>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong>Be respectful and inclusive.</strong> Treat all members with respect, regardless of background or experience level.
                </span>
              </li>
              <li className="flex">
                <span className="text-primary-600 dark:text-primary-400 mr-3">•</span>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong>Stay on topic.</strong> Keep discussions relevant to the group's focus and purpose.
                </span>
              </li>
              <li className="flex">
                <span className="text-primary-600 dark:text-primary-400 mr-3">•</span>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong>No spam or self-promotion.</strong> Share your work in appropriate channels and contexts.
                </span>
              </li>
              <li className="flex">
                <span className="text-primary-600 dark:text-primary-400 mr-3">•</span>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong>Help others learn.</strong> Share knowledge generously and support fellow members.
                </span>
              </li>
              <li className="flex">
                <span className="text-primary-600 dark:text-primary-400 mr-3">•</span>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong>Report issues.</strong> Contact moderators if you encounter any problems.
                </span>
              </li>
            </ul>
            <div className="mt-6 text-center">
              <a 
                href="/code-of-conduct"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
              >
                Read our full Code of Conduct →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommunityGroups;