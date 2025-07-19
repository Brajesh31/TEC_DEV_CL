import React from 'react';
import { Award, TrendingUp, Users, Calendar, Star, Trophy, Target, Zap } from 'lucide-react';

interface Highlight {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'milestone' | 'achievement' | 'launch' | 'recognition' | 'growth';
  impact: string;
  metrics?: {
    label: string;
    value: string;
  }[];
  image?: string;
}

const Highlights: React.FC = () => {
  const highlights: Highlight[] = [
    {
      id: '1',
      title: 'Reached 10,000 Community Members',
      description: 'Our community has grown to over 10,000 active members across 50+ countries, making us one of the largest developer communities globally.',
      date: '2024-11-01',
      category: 'milestone',
      impact: 'Expanded our global reach and created more opportunities for collaboration and knowledge sharing.',
      metrics: [
        { label: 'Members', value: '10,000+' },
        { label: 'Countries', value: '50+' },
        { label: 'Monthly Active', value: '7,500+' },
      ],
    },
    {
      id: '2',
      title: 'Tech Innovation Award 2024',
      description: 'Tech Dev Club received the "Community Excellence Award" for outstanding contribution to developer education and open source.',
      date: '2024-10-15',
      category: 'recognition',
      impact: 'Recognition of our commitment to fostering innovation and supporting developer growth worldwide.',
      metrics: [
        { label: 'Award Category', value: 'Community Excellence' },
        { label: 'Competing Organizations', value: '200+' },
      ],
    },
    {
      id: '3',
      title: 'Launched Mentorship Program',
      description: 'Introduced our structured mentorship program connecting experienced developers with newcomers for personalized guidance.',
      date: '2024-09-20',
      category: 'launch',
      impact: 'Created meaningful connections and accelerated learning for hundreds of developers.',
      metrics: [
        { label: 'Mentor-Mentee Pairs', value: '150+' },
        { label: 'Success Rate', value: '92%' },
        { label: 'Average Session Rating', value: '4.8/5' },
      ],
    },
    {
      id: '4',
      title: '500+ Open Source Contributions',
      description: 'Our community members have made over 500 contributions to open source projects, including 50+ new repositories.',
      date: '2024-08-30',
      category: 'achievement',
      impact: 'Strengthened the open source ecosystem and provided valuable learning experiences for contributors.',
      metrics: [
        { label: 'Total Contributions', value: '500+' },
        { label: 'New Repositories', value: '50+' },
        { label: 'Contributors', value: '200+' },
      ],
    },
    {
      id: '5',
      title: 'Annual Conference Success',
      description: 'Our first annual conference attracted 1,000+ attendees with 50+ speakers covering cutting-edge technologies and industry trends.',
      date: '2024-07-15',
      category: 'milestone',
      impact: 'Established Tech Dev Club as a major player in the tech conference space and created lasting professional connections.',
      metrics: [
        { label: 'Attendees', value: '1,000+' },
        { label: 'Speakers', value: '50+' },
        { label: 'Satisfaction Score', value: '4.9/5' },
      ],
    },
    {
      id: '6',
      title: 'Partnership with Major Tech Companies',
      description: 'Established partnerships with Google, Microsoft, and Amazon to provide exclusive resources and opportunities to our members.',
      date: '2024-06-10',
      category: 'achievement',
      impact: 'Unlocked premium resources, internship opportunities, and direct access to industry leaders for our community.',
      metrics: [
        { label: 'Partner Companies', value: '15+' },
        { label: 'Exclusive Resources', value: '100+' },
        { label: 'Job Placements', value: '250+' },
      ],
    },
    {
      id: '7',
      title: 'Scholarship Program Launch',
      description: 'Launched our scholarship program providing financial support for underrepresented groups in tech to attend courses and conferences.',
      date: '2024-05-20',
      category: 'launch',
      impact: 'Increased diversity in tech by removing financial barriers and supporting underrepresented communities.',
      metrics: [
        { label: 'Scholarships Awarded', value: '100+' },
        { label: 'Total Value', value: '$250,000' },
        { label: 'Success Rate', value: '95%' },
      ],
    },
    {
      id: '8',
      title: 'Global Hackathon Series',
      description: 'Organized a series of global hackathons with participants from 6 continents, resulting in 200+ innovative projects.',
      date: '2024-04-25',
      category: 'milestone',
      impact: 'Fostered global collaboration and innovation, leading to several startup ventures and patent applications.',
      metrics: [
        { label: 'Participants', value: '2,000+' },
        { label: 'Projects Submitted', value: '200+' },
        { label: 'Startups Created', value: '15' },
      ],
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'milestone':
        return Trophy;
      case 'achievement':
        return Award;
      case 'launch':
        return Zap;
      case 'recognition':
        return Star;
      case 'growth':
        return TrendingUp;
      default:
        return Target;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'milestone':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      case 'achievement':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'launch':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
      case 'recognition':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300';
      case 'growth':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';
    }
  };

  const stats = [
    { label: 'Community Members', value: '10,000+', icon: Users },
    { label: 'Events Hosted', value: '500+', icon: Calendar },
    { label: 'Projects Launched', value: '200+', icon: Zap },
    { label: 'Awards Received', value: '15+', icon: Award },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-hero-light dark:bg-hero-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
            Community Highlights
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Celebrating our achievements, milestones, and the incredible impact our community has made
          </p>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <Icon className="h-12 w-12 mx-auto text-primary-600 dark:text-primary-400 mb-4" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Highlights Timeline */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Journey
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A timeline of our most significant achievements and milestones
            </p>
          </div>

          <div className="space-y-8">
            {highlights.map((highlight, index) => {
              const Icon = getCategoryIcon(highlight.category);
              return (
                <div
                  key={highlight.id}
                  className={`flex flex-col lg:flex-row items-start gap-8 ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content */}
                  <div className="lg:w-1/2">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(highlight.category)}`}>
                            {highlight.category.charAt(0).toUpperCase() + highlight.category.slice(1)}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(highlight.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        {highlight.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {highlight.description}
                      </p>

                      <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 mb-6">
                        <h4 className="font-semibold text-primary-900 dark:text-primary-100 mb-2">
                          Impact
                        </h4>
                        <p className="text-primary-700 dark:text-primary-300 text-sm">
                          {highlight.impact}
                        </p>
                      </div>

                      {highlight.metrics && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {highlight.metrics.map((metric, metricIndex) => (
                            <div
                              key={metricIndex}
                              className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                            >
                              <div className="text-lg font-bold text-gray-900 dark:text-white">
                                {metric.value}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">
                                {metric.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Visual Element */}
                  <div className="lg:w-1/2">
                    <div className="bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-lg p-8 h-64 flex items-center justify-center">
                      <Icon className="h-24 w-24 text-primary-600/30 dark:text-primary-400/30" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Be Part of Our Next Highlight
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join our community and help us achieve even greater milestones together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/join"
              className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Join Our Community
            </a>
            <a
              href="/volunteer"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Become a Volunteer
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Highlights;