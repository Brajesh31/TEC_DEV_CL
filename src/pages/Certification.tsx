import React, { useState, useEffect } from 'react';
import { Award, CheckCircle, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

interface Certification {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  benefits: string[];
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;
  link?: string;
}

const Certification: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  // Set SEO metadata
  useSEO({
    title: 'Certification - Tech Dev Club',
    description: 'Get certified for your contributions and skill growth with Tech Dev Club.',
    keywords: 'tech certification, developer certification, coding certificate, programming skills, tech skills validation',
  });

  useEffect(() => {
    const loadCertifications = async () => {
      try {
        // Import certification data from JSON file
        const data = await import("../data/certification.json");
        setCertifications(data.certifications);
        setLoading(false);
      } catch (error) {
        console.error("Error loading certification data:", error);
        setLoading(false);
      }
    };

    loadCertifications();
  }, []);

  // Function to get difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'Intermediate':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      case 'Advanced':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      default:
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-slide-up">
            Certification
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto animate-slide-up animation-delay-200">
            Get certified for your contributions and skill growth with Tech Dev Club
          </p>
        </div>
      </section>

      {/* Certification Process Overview */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Certification Process
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our certification program validates your skills and contributions to the tech community
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <CheckCircle className="h-10 w-10 text-blue-500" />,
                title: "Apply",
                description: "Submit your application with relevant experience and projects"
              },
              {
                icon: <Clock className="h-10 w-10 text-blue-500" />,
                title: "Complete Requirements",
                description: "Work through the certification requirements and tasks"
              },
              {
                icon: <Award className="h-10 w-10 text-blue-500" />,
                title: "Review",
                description: "Our team reviews your submission and provides feedback"
              },
              {
                icon: <ExternalLink className="h-10 w-10 text-blue-500" />,
                title: "Receive Certificate",
                description: "Get your digital certificate and showcase your achievement"
              }
            ].map((step, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
                <div className="flex justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
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

      {/* Available Certifications */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Available Certifications
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Choose from our range of certifications to validate your skills and expertise
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certifications.map((cert) => (
                <div 
                  key={cert.id}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      className="w-full h-full object-cover mix-blend-overlay"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(cert.difficulty)}`}>
                        {cert.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {cert.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {cert.description}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Requirements:
                      </h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        {cert.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Benefits:
                      </h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        {cert.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">{cert.duration}</span>
                      </div>
                      
                      {cert.link && (
                        <a 
                          href={cert.link}
                          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                        >
                          Apply Now
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Get Certified?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Tech Dev Club certifications provide tangible benefits for your career and professional growth
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Career Advancement",
                description: "Stand out to employers and demonstrate your expertise with verified credentials"
              },
              {
                title: "Skill Validation",
                description: "Get independent verification of your technical skills and knowledge"
              },
              {
                title: "Community Recognition",
                description: "Earn recognition within the Tech Dev Club community and beyond"
              },
              {
                title: "Learning Pathway",
                description: "Follow a structured path to develop and improve your skills"
              },
              {
                title: "Networking Opportunities",
                description: "Connect with other certified professionals in your field"
              },
              {
                title: "Project Opportunities",
                description: "Access exclusive project collaboration opportunities"
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {benefit.description}
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
            Ready to Get Certified?
          </h2>
          <p className="text-xl text-blue-200 mb-8">
            Take the next step in your professional development journey
          </p>
          <a 
            href="/contact"
            className="inline-block bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
          >
            Start Your Certification Journey
          </a>
        </div>
      </section>
    </div>
  );
};

export default Certification;