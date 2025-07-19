import React from 'react';
import { Users, Target, Lightbulb, Award, Code, Calendar } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

const WhoWeAre: React.FC = () => {
  // Sample data - in production, this would be loaded from JSON
  const whoWeAreData = {
    mission: "To empower developers worldwide by fostering collaboration, facilitating knowledge sharing, and creating opportunities for professional and personal growth in the ever-evolving technology landscape.",
    vision: "A global community where every developer has access to the resources, mentorship, and opportunities they need to thrive in the tech industry.",
    history: [
      {
        year: "May 2025",
        title: "Foundation",
        description: "Tech Dev Club was founded with a vision to unite technology enthusiasts, students, and professionals from around the world."
      },
      {
        year: "June 2025",
        title: "Community Growth",
        description: "Expanded to 1,000+ members across 20+ states, establishing local chapters and ambassador programs."
      },
      {
        year: "July 2025",
        title: "Program Expansion",
        description: "Launched comprehensive mentorship, certification, and project incubation programs to support member growth."
      }
    ],
    approach: {
      title: "Our Interdisciplinary Approach",
      description: "We believe that the best innovation happens at the intersection of different disciplines. Tech Dev Club brings together developers, designers, product managers, and domain experts to create holistic solutions to complex problems.",
      pillars: [
        {
          title: "Technical Excellence",
          description: "Fostering deep technical skills and best practices"
        },
        {
          title: "Design Thinking",
          description: "Applying human-centered design to technical challenges"
        },
        {
          title: "Business Acumen",
          description: "Understanding market needs and business contexts"
        },
        {
          title: "Domain Expertise",
          description: "Bringing specialized knowledge to technical solutions"
        }
      ]
    },
    values: [
      {
        icon: Users,
        title: "Community First",
        description: "We believe in the power of community and put our members' growth and well-being at the center of everything we do."
      },
      {
        icon: Target,
        title: "Continuous Learning",
        description: "We embrace a growth mindset and are committed to lifelong learning and improvement."
      },
      {
        icon: Lightbulb,
        title: "Innovation",
        description: "We encourage creative thinking and breakthrough solutions to complex problems."
      },
      {
        icon: Award,
        title: "Excellence",
        description: "We strive for quality in our code, projects, and community interactions."
      },
      {
        icon: Code,
        title: "Open Source",
        description: "We believe in the power of open collaboration and sharing knowledge freely."
      },
      {
        icon: Calendar,
        title: "Inclusivity",
        description: "We welcome people of all backgrounds, experience levels, and perspectives."
      }
    ]
  };

  // Set SEO metadata
  useSEO({
    title: 'Who We Are - Tech Dev Club',
    description: 'Learn about Tech Dev Club\'s mission, vision, values, and journey.',
    keywords: 'tech community, developer community, coding community, tech mission, developer values, tech collaboration, programming community, iit delhi, edtech, meta, google, facebook, instagram, coursera, udemy, openai, chatgpt, ai, ml, data science, python, javascript, java, c++, nodejs, react, coding, hackathon, startup',
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Who We Are</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Tech Dev Club unites students and professionals across disciplines to learn, build, and innovate together.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4">Our Mission</h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {whoWeAreData.mission}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-indigo-800 dark:text-indigo-300 mb-4">Our Vision</h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {whoWeAreData.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Our Journey</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 dark:bg-blue-900"></div>
            
            <div className="space-y-12">
              {whoWeAreData.history.map((event, index) => (
                <div key={event.year} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -mt-2 w-5 h-5 rounded-full bg-blue-600 border-4 border-white dark:border-gray-900"></div>
                  
                  <div className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="md:w-1/2 p-4 text-center md:text-right md:pr-12">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{event.year}</div>
                    </div>
                    
                    <div className="md:w-1/2 p-4 md:pl-12">
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interdisciplinary Approach */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{whoWeAreData.approach.title}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {whoWeAreData.approach.description}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whoWeAreData.approach.pillars.map((pillar) => (
              <div key={pillar.title} className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-3">{pillar.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Our Core Values</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whoWeAreData.values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg mr-4">
                      <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{value.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Be part of a global network of developers, designers, and tech enthusiasts building the future together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/join" 
              className="inline-block bg-white text-blue-700 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg"
            >
              Become a Member
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

export default WhoWeAre;