// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {  useEffect } from 'react';
import { Users, Target, Lightbulb, Award, Code, Globe } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

const About: React.FC = () => {
  // Set SEO metadata
  useSEO({
    title: 'About Tech Dev Club - Our Mission and Values',
    description: 'Learn about Tech Dev Club\'s mission to empower developers worldwide through collaboration, knowledge sharing, and community support.',
    keywords: 'tech community, developer community, coding community, tech mission, developer values, tech collaboration, programming community',
    structuredData: {
      type: 'Organization',
      data: {
        name: 'Tech Dev Club',
        description: 'A global community of developers focused on learning, collaboration, and career growth',
        url: 'https://techdevclub.com/about',
        foundingDate: '2023',
        founders: [
          {
            '@type': 'Person',
            name: 'Kumar Gaurav Tiwari',
            jobTitle: 'Founder'
          },
          {
            '@type': 'Person',
            name: 'Brajesh Kumar',
            jobTitle: 'Co-Founder'
          }
        ],
        numberOfEmployees: {
          '@type': 'QuantitativeValue',
          value: '4'
        },
        memberOf: {
          '@type': 'Organization',
          name: 'Global Developer Community'
        }
      }
    }
  });

  const values = [
    {
      icon: Users,
      title: 'Community First',
      description: 'We believe in the power of collaboration and mutual support to achieve extraordinary things together.',
    },
    {
      icon: Target,
      title: 'Growth Mindset',
      description: 'Continuous learning and improvement are at the heart of everything we do.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We encourage creative thinking and breakthrough solutions to complex problems.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for quality in our code, projects, and community interactions.',
    },
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Join the Community',
      description: 'Sign up and become part of our global network of developers, designers, and tech enthusiasts.',
    },
    {
      step: '2',
      title: 'Attend Events',
      description: 'Participate in workshops, bootcamps, hackathons, and networking event to learn and connect.',
    },
    {
      step: '3',
      title: 'Collaborate on Projects',
      description: 'Work on open-source projects, share your ideas, and contribute to meaningful initiatives.',
    },
    {
      step: '4',
      title: 'Get Mentored',
      description: 'Connect with experienced professionals who can guide your career and skill development.',
    },
    {
      step: '5',
      title: 'Give Back',
      description: 'Share your knowledge, mentor others, and help grow the community.',
    },
  ];

  return (
      <div className="animate-fade-in">
        {/* Hero Section */}
        <section className="bg-hero-light dark:bg-hero-dark py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
                About Tech Dev Club
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto animate-slide-up animation-delay-200">
                We're a global community of developers, designers, and tech enthusiasts
                united by our passion for technology and commitment to collective growth.
              </p>
            </div>
          </div>
        </section>

        {/* Who We Are */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-up">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Who We Are
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-400">
                  <p>
                    Tech Dev Club was founded in 2025 with a vision to unite technology enthusiasts, students, and professionals from around the world. Our mission is to create a collaborative and inclusive community where everyone can learn, grow, and innovate, regardless of background or experience level.
                  </p>
                  <p>
                    What started as a small initiative has quickly grown into a global network spanning multiple countries and cultures. We host hands-on events, mentorship programs, and real-world projects, all designed to help our members build skills, make connections, and bring their ideas to life.
                  </p>
                  <p>
                    At Tech Dev Club, we believe the best innovation happens when people support each other and share knowledge freely. Join us and be part of a movement that is shaping the future of technology—together.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 animate-slide-up animation-delay-400">
                <div className="text-center p-6 bg-primary-50 dark:bg-primary-900/20 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    1000+
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">Active Members</div>
                </div>
                <div className="text-center p-6 bg-secondary-50 dark:bg-secondary-900/20 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="text-3xl font-bold text-secondary-600 dark:text-secondary-400 mb-2">
                    10+
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">States</div>
                </div>
                <div className="text-center p-6 bg-accent-50 dark:bg-accent-900/20 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="text-3xl font-bold text-accent-600 dark:text-accent-400 mb-2">
                    1+
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">Events Hosted</div>
                </div>
                <div className="text-center p-6 bg-primary-50 dark:bg-primary-900/20 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    4+
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">Open Source Projects</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Globe className="h-16 w-16 mx-auto text-primary-600 dark:text-primary-400 mb-6 animate-float" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
              Our Mission
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 animate-slide-up animation-delay-200">
              To empower developers worldwide by fostering collaboration, facilitating
              knowledge sharing, and creating opportunities for professional and personal growth
              in the ever-evolving technology landscape.
            </p>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg transform transition-all duration-300 hover:scale-105 animate-slide-up animation-delay-400">
              <Code className="h-12 w-12 mx-auto text-secondary-600 dark:text-secondary-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 italic">
                "Technology is best when it brings people together. We're here to make
                that connection meaningful, productive, and transformative."
              </p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 animate-slide-up">
                Our Core Values
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-slide-up animation-delay-200">
                These principles guide everything we do and shape the culture of our community
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                    <div
                        key={value.title}
                        className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-slide-up"
                        style={{ animationDelay: `${index * 100 + 400}ms` }}
                    >
                      <Icon className="h-12 w-12 mx-auto text-primary-600 dark:text-primary-400 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {value.description}
                      </p>
                    </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 animate-slide-up">
                How Tech Dev Club Works
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-slide-up animation-delay-200">
                Your journey with us is designed to be engaging, educational, and empowering
              </p>
            </div>

            <div className="space-y-8">
              {howItWorks.map((item, index) => (
                  <div
                      key={item.step}
                      className={`flex flex-col lg:flex-row items-center gap-8 ${
                          index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                      } animate-slide-up`}
                      style={{ animationDelay: `${index * 200 + 400}ms` }}
                  >
                    <div className="lg:w-1/2">
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg transform transition-all duration-300 hover:scale-105">
                        <div className="flex items-center mb-4">
                          <div className="bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mr-4">
                            {item.step}
                          </div>
                          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="lg:w-1/2">
                      <div className="bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-lg p-8 h-48 flex items-center justify-center transform transition-all duration-300 hover:scale-105">
                        <div className="text-6xl font-bold text-primary-600/20 dark:text-primary-400/20">
                          {item.step}
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>
      </div>
  );
};

export default About;
