import React, { useState, useEffect } from 'react';
import { Users, User, Calendar, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

interface Mentor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company: string;
  expertise: string[];
  bio: string;
  availability: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

interface MentorshipProgram {
  description: string;
  benefits: string[];
  process: {
    title: string;
    description: string;
  }[];
  requirements: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

const MentorshipProgram: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [program, setProgram] = useState<MentorshipProgram | null>(null);
  const [loading, setLoading] = useState(true);

  // Set SEO metadata
  useSEO({
    title: 'Mentorship Program - Tech Dev Club',
    description: 'Grow with guidance from experienced members in our mentorship program.',
    keywords: 'tech mentorship, developer mentoring, coding mentor, programming guidance, tech career mentoring',
  });

  useEffect(() => {
    const loadMentorshipData = async () => {
      try {
        // Import mentorship data from JSON file
        const data = await import("../data/mentorship.json");
        setMentors(data.mentors);
        setProgram(data.program);
        setLoading(false);
      } catch (error) {
        console.error("Error loading mentorship data:", error);
        setLoading(false);
      }
    };

    loadMentorshipData();
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-slide-up">
            Mentorship Program
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto animate-slide-up animation-delay-200">
            Grow with guidance from experienced members
          </p>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : (
        <>
          {/* Program Overview */}
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Program Overview
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {program?.description}
                  </p>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Benefits of Joining
                  </h3>
                  <ul className="space-y-3">
                    {program?.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Program Requirements
                  </h3>
                  <ul className="space-y-3">
                    {program?.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-16 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  How It Works
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  Our mentorship program is designed to provide structured guidance and support
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {program?.process.map((step, index) => (
                  <div key={index} className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mb-4">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Mentors */}
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Featured Mentors
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  Learn from experienced professionals in various tech domains
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mentors.map((mentor) => (
                  <div 
                    key={mentor.id}
                    className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <img 
                          src={mentor.avatar} 
                          alt={mentor.name} 
                          className="w-16 h-16 rounded-full object-cover mr-4 ring-2 ring-blue-500"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {mentor.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {mentor.title} at {mentor.company}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                        {mentor.bio}
                      </p>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          Expertise:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {mentor.expertise.map((skill, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Availability: {mentor.availability}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="py-16 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Common questions about our mentorship program
                </p>
              </div>

              <div className="space-y-6">
                {program?.faqs.map((faq, index) => (
                  <div 
                    key={index}
                    className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Ready to Accelerate Your Growth?
              </h2>
              <p className="text-xl text-blue-200 mb-8">
                Apply to our mentorship program today and take your skills to the next level
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/join"
                  className="inline-block bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
                >
                  Apply as Mentee
                </a>
                <a 
                  href="/volunteer"
                  className="inline-block bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-lg transition duration-300"
                >
                  Become a Mentor
                </a>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default MentorshipProgram;