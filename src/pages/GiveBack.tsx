import React from 'react';
import { Heart, Users, Briefcase, Gift, BookOpen, Calendar, ArrowRight } from 'lucide-react';

// This would normally be imported from a JSON file
// import givebackData from '../data/giveback.json';

const GiveBack: React.FC = () => {
  // Sample data - in production, this would be loaded from JSON
  const givebackData = {
    ways: [
      {
        id: '1',
        title: 'Volunteer Your Time',
        description: 'Share your expertise by volunteering for community events, workshops, or mentorship programs.',
        icon: Users,
        color: 'blue',
        options: [
          {
            title: 'Event Organization',
            description: 'Help plan and execute community events, workshops, and meetups.',
            commitment: '5-10 hours per event'
          },
          {
            title: 'Content Creation',
            description: 'Create tutorials, blog posts, or documentation for the community.',
            commitment: 'Flexible'
          },
          {
            title: 'Community Moderation',
            description: 'Help maintain a positive environment in our online communities.',
            commitment: '2-3 hours per week'
          }
        ],
        cta: {
          text: 'Become a Volunteer',
          link: '/volunteer'
        }
      },
      {
        id: '2',
        title: 'Become a Mentor',
        description: 'Guide and support fellow developers in their learning journey and career growth.',
        icon: Briefcase,
        color: 'green',
        options: [
          {
            title: '1:1 Mentorship',
            description: 'Provide personalized guidance to mentees in your area of expertise.',
            commitment: '2-4 hours per month'
          },
          {
            title: 'Group Mentoring',
            description: 'Lead small group sessions focused on specific topics or skills.',
            commitment: '2 hours per session'
          },
          {
            title: 'Career Coaching',
            description: 'Help members navigate their career path and professional development.',
            commitment: 'Flexible'
          }
        ],
        cta: {
          text: 'Join Mentorship Program',
          link: '/mentorship'
        }
      },
      {
        id: '3',
        title: 'Sponsor the Community',
        description: 'Support our mission financially to help us create more opportunities for developers worldwide.',
        icon: Gift,
        color: 'purple',
        options: [
          {
            title: 'Event Sponsorship',
            description: 'Sponsor community events, workshops, or conferences.',
            commitment: 'Varies by event'
          },
          {
            title: 'Scholarship Program',
            description: 'Fund learning opportunities for underrepresented groups in tech.',
            commitment: 'Flexible donation'
          },
          {
            title: 'Infrastructure Support',
            description: 'Help cover costs of hosting, tools, and platforms used by the community.',
            commitment: 'Monthly or annual contribution'
          }
        ],
        cta: {
          text: 'Become a Sponsor',
          link: '/become-sponsor'
        }
      },
      {
        id: '4',
        title: 'Share Knowledge',
        description: 'Contribute your expertise through speaking, writing, or teaching to help others learn and grow.',
        icon: BookOpen,
        color: 'orange',
        options: [
          {
            title: 'Speak at Events',
            description: 'Present talks or workshops at Tech Dev Club events.',
            commitment: 'Preparation + event time'
          },
          {
            title: 'Write Blog Posts',
            description: 'Share your knowledge through articles on our community blog.',
            commitment: 'Flexible'
          },
          {
            title: 'Create Learning Resources',
            description: 'Develop tutorials, guides, or courses for the community.',
            commitment: 'Varies by project'
          }
        ],
        cta: {
          text: 'Submit a Proposal',
          link: '/contact'
        }
      },
      {
        id: '5',
        title: 'Contribute to Projects',
        description: 'Help build and maintain open-source projects that benefit the developer community.',
        icon: Calendar,
        color: 'red',
        options: [
          {
            title: 'Code Contributions',
            description: 'Contribute code to community-maintained open source projects.',
            commitment: 'Flexible'
          },
          {
            title: 'Documentation',
            description: 'Improve project documentation to make it more accessible.',
            commitment: 'Flexible'
          },
          {
            title: 'Issue Triage',
            description: 'Help manage issues and pull requests for community projects.',
            commitment: '2-3 hours per week'
          }
        ],
        cta: {
          text: 'Explore Projects',
          link: '/projects'
        }
      }
    ],
    testimonials: [
      {
        id: '1',
        quote: "Volunteering with Tech Dev Club has been incredibly rewarding. I've grown my network, improved my skills, and made a real impact on the community.",
        author: "Priya Sharma",
        role: "Volunteer Mentor",
        avatar: "/testimonials/priya-sharma.jpg"
      },
      {
        id: '2',
        quote: "Sponsoring Tech Dev Club events has helped us connect with talented developers and contribute to the growth of the tech ecosystem.",
        author: "Michael Chen",
        role: "CTO, TechInnovate",
        avatar: "/testimonials/michael-chen.jpg"
      },
      {
        id: '3',
        quote: "Sharing my knowledge through blog posts and workshops has not only helped others but also deepened my own understanding of the technologies I work with.",
        author: "Aisha Patel",
        role: "Content Creator",
        avatar: "/testimonials/aisha-patel.jpg"
      }
    ],
    impact: {
      title: "Your Impact",
      description: "When you give back to the Tech Dev Club community, you help create a more inclusive, supportive, and innovative tech ecosystem. Here's the impact of our community contributions so far:",
      stats: [
        { label: "Volunteer Hours", value: "5,000+" },
        { label: "Mentorship Sessions", value: "1,200+" },
        { label: "Scholarship Recipients", value: "150+" },
        { label: "Knowledge Resources", value: "500+" }
      ]
    }
  };

  // Helper function to get color classes based on color name
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string, text: string, hover: string, dark: string, darkText: string }> = {
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        hover: 'hover:bg-blue-200',
        dark: 'dark:bg-blue-900/30',
        darkText: 'dark:text-blue-300'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        hover: 'hover:bg-green-200',
        dark: 'dark:bg-green-900/30',
        darkText: 'dark:text-green-300'
      },
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-800',
        hover: 'hover:bg-purple-200',
        dark: 'dark:bg-purple-900/30',
        darkText: 'dark:text-purple-300'
      },
      orange: {
        bg: 'bg-orange-100',
        text: 'text-orange-800',
        hover: 'hover:bg-orange-200',
        dark: 'dark:bg-orange-900/30',
        darkText: 'dark:text-orange-300'
      },
      red: {
        bg: 'bg-red-100',
        text: 'text-red-800',
        hover: 'hover:bg-red-200',
        dark: 'dark:bg-red-900/30',
        darkText: 'dark:text-red-300'
      }
    };
    
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-16 w-16 text-red-400 mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Give Back</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Ways you can support and uplift the Tech Dev Club community.
          </p>
        </div>
      </section>

      {/* Ways to Give Back */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How You Can Contribute</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              There are many ways to give back to the community, regardless of your experience level or available time.
            </p>
          </div>
          
          <div className="space-y-12">
            {givebackData.ways.map((way, index) => {
              const Icon = way.icon;
              const colorClasses = getColorClasses(way.color);
              
              return (
                <div key={way.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                  <div className="md:flex">
                    <div className={`md:flex-shrink-0 md:w-64 ${colorClasses.bg} ${colorClasses.dark} p-8 flex items-center justify-center`}>
                      <Icon className={`h-16 w-16 ${colorClasses.text} ${colorClasses.darkText}`} />
                    </div>
                    
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{way.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">{way.description}</p>
                      
                      <div className="grid md:grid-cols-3 gap-4 mb-6">
                        {way.options.map(option => (
                          <div key={option.title} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">{option.title}</h4>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{option.description}</p>
                            <p className="text-gray-500 dark:text-gray-400 text-xs">
                              <span className="font-medium">Time Commitment:</span> {option.commitment}
                            </p>
                          </div>
                        ))}
                      </div>
                      
                      <a 
                        href={way.cta.link} 
                        className={`inline-flex items-center ${colorClasses.bg} ${colorClasses.text} ${colorClasses.hover} ${colorClasses.dark} ${colorClasses.darkText} px-4 py-2 rounded-lg font-medium transition-colors duration-300`}
                      >
                        {way.cta.text}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{givebackData.impact.title}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {givebackData.impact.description}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {givebackData.impact.stats.map(stat => (
              <div key={stat.label} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Community Voices</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Hear from those who have given back to our community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {givebackData.testimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.author)}&background=random`} 
                    alt={testimonial.author} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.author}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join us in building a stronger, more inclusive tech community. Every contribution matters!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/volunteer" 
              className="inline-block bg-white text-blue-700 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg"
            >
              Volunteer Today
            </a>
            <a 
              href="/contact" 
              className="inline-block bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GiveBack;