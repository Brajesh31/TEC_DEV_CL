import React, { useState } from 'react';
import { CheckCircle, Users, Calendar, Code, Award, ArrowRight, ExternalLink } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import emailjs from '@emailjs/browser';

const Join: React.FC = () => {
  // Set SEO metadata
  useSEO({
    title: 'Join Tech Dev Club - Become Part of Our Developer Community',
    description: 'Join our global community of developers. Access exclusive event, mentorship, and networking opportunities to accelerate your tech career.',
    keywords: 'join tech community, developer membership, coding community, tech networking, programming community, developer event, tech mentorship',
    structuredData: {
      type: 'Organization',
      data: {
        name: 'Tech Dev Club',
        description: 'A global community of developers focused on learning, collaboration, and career growth',
        url: 'https://techdevclub.com/join',
        memberOf: {
          '@type': 'Organization',
          name: 'Global Developer Community'
        },
        offers: {
          '@type': 'Offer',
          name: 'Community Membership',
          description: 'Join our global community of developers',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock'
        }
      }
    }
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    github: '',
    linkedin: '',
    skills: '',
    experience: '',
    interests: '',
    whyJoin: '',
    referral: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const benefits = [
    {
      icon: Users,
      title: 'Global Network',
      description: 'Connect with 1000+ developers worldwide',
    },
    {
      icon: Calendar,
      title: 'Exclusive Events',
      description: 'Access to workshops, bootcamps, and conferences',
    },
    {
      icon: Code,
      title: 'Open Source Projects',
      description: 'Collaborate on meaningful projects',
    },
    {
      icon: Award,
      title: 'Career Growth',
      description: 'Mentorship and professional development',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate form data
      if (!formData.name.trim() || !formData.email.trim() || !formData.experience || !formData.skills.trim() || !formData.whyJoin.trim()) {
        throw new Error('Please fill in all required fields');
      }

      if (!formData.email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      // Send email via EmailJS using the provided template
      const templateParams = {
        fullName: formData.name,
        email: formData.email,
        github: formData.github,
        linkedin: formData.linkedin,
        experience: formData.experience,
        skills: formData.skills,
        interests: formData.interests,
        reason: formData.whyJoin,
        referral: formData.referral,
      };

      const response = await emailjs.send(
          'service_z7qdoyn', // Your EmailJS service ID
          'template_rq9make', // Your EmailJS template ID
          templateParams,
          'Udl5iGWEv35i-ZtfU' // Your EmailJS user ID
      );

      if (response.status === 200) {
        // Simulate saving to localStorage
        const existingMembers = JSON.parse(localStorage.getItem('members') || '[]');
        const newMember = {
          id: Date.now().toString(),
          ...formData,
          joinedAt: new Date().toISOString(),
          status: 'pending',
        };

        existingMembers.push(newMember);
        localStorage.setItem('members', JSON.stringify(existingMembers));

        setSubmitted(true);

        // Reset form
        setFormData({
          name: '',
          email: '',
          github: '',
          linkedin: '',
          skills: '',
          experience: '',
          interests: '',
          whyJoin: '',
          referral: '',
        });
      } else {
        throw new Error('Failed to submit application. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleFormClick = () => {
    window.open('https://forms.gle/2mzR82W746Jd7S6G6', '_blank', 'noopener,noreferrer');
  };

  if (submitted) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center animate-scale-in">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4 animate-pulse" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome to Tech Dev Club!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Your application has been submitted successfully. We'll review it and get back to you within 24-48 hours.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                In the meantime, join our Discord community to start connecting with fellow developers!
              </p>
              <div className="space-y-3">
                <a
                    href="https://discord.gg/6MVn2N9q"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  Join Discord
                </a>
                <a
                    href="/"
                    className="block text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-200"
                >
                  Return Home
                </a>
              </div>
            </div>
          </div>
        </div>
    );
  }

  return (
      <div className="animate-fade-in">
        {/* Hero Section */}
        <section className="bg-hero-light dark:bg-hero-dark py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
              Join Tech Dev Club
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto animate-slide-up animation-delay-200">
              Become part of a thriving global community of developers, designers, and tech innovators
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-slide-up">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Why Join Us?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Unlock opportunities for growth, collaboration, and innovation
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                    <div
                        key={benefit.title}
                        className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-slide-up"
                        style={{ animationDelay: `${index * 100 + 400}ms` }}
                    >
                      <Icon className="h-12 w-12 mx-auto text-primary-600 dark:text-primary-400 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {benefit.description}
                      </p>
                    </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Application Options */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-slide-up">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Choose Your Application Method
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Select the option that works best for you
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Google Form Option */}
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 border-2 border-secondary-500 transform transition-all duration-300 hover:scale-105 animate-slide-up animation-delay-200">
                <div className="text-center mb-6">
                  <ExternalLink className="h-12 w-12 mx-auto text-secondary-600 dark:text-secondary-400 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Quick Application
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Apply via Google Form for faster processing
                  </p>
                  <div className="bg-secondary-50 dark:bg-secondary-900/20 rounded-lg p-3 mb-6">
                    <p className="text-secondary-700 dark:text-secondary-300 text-sm">
                      <strong>Response time:</strong> 3-4 hours
                    </p>
                  </div>
                </div>
                <button
                    onClick={handleGoogleFormClick}
                    className="w-full bg-secondary-600 hover:bg-secondary-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  Start Application
                  <ExternalLink className="ml-2 h-5 w-5" />
                </button>
              </div>

              {/* Direct Form Option */}
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 border-2 border-primary-500 transform transition-all duration-300 hover:scale-105 animate-slide-up animation-delay-400">
                <div className="text-center mb-6">
                  <Code className="h-12 w-12 mx-auto text-primary-600 dark:text-primary-400 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Detailed Application
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Apply directly on our website
                  </p>
                  <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-3 mb-6">
                    <p className="text-primary-700 dark:text-primary-300 text-sm">
                      <strong>Response time:</strong> 24-48 hours
                    </p>
                  </div>
                </div>
                <a
                    href="#application-form"
                    className="block w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold text-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Continue Below
                  <ArrowRight className="ml-2 h-5 w-5 inline-block" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="application-form" className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-8 animate-slide-up animation-delay-600">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Membership Application
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Tell us about yourself and why you'd like to join our community
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100 transition-all duration-200"
                        required
                        disabled={loading}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100 transition-all duration-200"
                        required
                        disabled={loading}
                    />
                  </div>
                </div>

                {/* Additional Form Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="github" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      GitHub Profile
                    </label>
                    <input
                        type="url"
                        id="github"
                        name="github"
                        value={formData.github}
                        onChange={handleInputChange}
                        placeholder="https://github.com/username"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100 transition-all duration-200"
                        disabled={loading}
                    />
                  </div>

                  <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      LinkedIn Profile
                    </label>
                    <input
                        type="url"
                        id="linkedin"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100 transition-all duration-200"
                        disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Experience Level *
                  </label>
                  <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100 transition-all duration-200"
                      required
                      disabled={loading}
                  >
                    <option value="">Select your experience level</option>
                    <option value="beginner">Beginner (0-1 years)</option>
                    <option value="intermediate">Intermediate (1-3 years)</option>
                    <option value="advanced">Advanced (3-5 years)</option>
                    <option value="expert">Expert (5+ years)</option>
                    <option value="student">Student</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Skills & Technologies *
                  </label>
                  <textarea
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="e.g., JavaScript, React, Python, Machine Learning, UI/UX Design..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100 transition-all duration-200"
                      required
                      disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="interests" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Areas of Interest
                  </label>
                  <textarea
                      id="interests"
                      name="interests"
                      value={formData.interests}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="What areas of technology are you most interested in exploring?"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100 transition-all duration-200"
                      disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="whyJoin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Why do you want to join Tech Dev Club? *
                  </label>
                  <textarea
                      id="whyJoin"
                      name="whyJoin"
                      value={formData.whyJoin}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Tell us about your goals and what you hope to achieve by joining our community..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100 transition-all duration-200"
                      required
                      disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="referral" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    How did you hear about us?
                  </label>
                  <input
                      type="text"
                      id="referral"
                      name="referral"
                      value={formData.referral}
                      onChange={handleInputChange}
                      placeholder="Social media, friend, event, website, etc."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100 transition-all duration-200"
                      disabled={loading}
                  />
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 animate-pulse">
                      <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                    </div>
                )}

                <div className="flex items-center justify-center pt-6">
                  <button
                      type="submit"
                      disabled={loading}
                      className="bg-primary-600 hover:bg-primary-700 disabled:bg-primary-300 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none flex items-center shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                    ) : (
                        <>
                          Submit Application
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
  );
};

export default Join;
