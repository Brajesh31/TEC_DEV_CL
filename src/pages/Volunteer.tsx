import React, { useState } from 'react';
import {
  CheckCircle, Users, Calendar, Mic, Heart, ArrowRight, Award, MessageCircle,
  ExternalLink, ChevronRight,
} from 'lucide-react';
import { EmailVolunteerService } from '../services/emailVolunteerService';

const GOOGLE_FORM_URL = "https://forms.gle/2mzR82W746Jd7S6G6"; // <-- Put your real link here

const Volunteer: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    experience: '',
    skills: '',
    availability: '',
    motivation: '',
    previousVolunteering: '',
    linkedin: '',
    portfolio: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const volunteerRoles = [
    {
      id: 'speaker',
      title: 'Speaker',
      icon: Mic,
      description: 'Share your expertise by speaking at our event, workshops, and webinars.',
      responsibilities: [
        'Deliver technical talks and presentations',
        'Lead workshops and hands-on sessions',
        'Participate in panel discussions',
        'Create educational content',
      ],
      requirements: [
        'Expertise in relevant technology',
        'Public speaking experience preferred',
        'Ability to explain complex concepts clearly',
        'Passion for teaching and sharing knowledge',
      ],
      timeCommitment: '2-4 hours per event',
    },
    {
      id: 'mentor',
      title: 'Mentor',
      icon: Users,
      description: 'Guide and support fellow developers in their learning journey and career growth.',
      responsibilities: [
        'Provide one-on-one mentoring sessions',
        'Review code and provide feedback',
        'Offer career guidance and advice',
        'Support mentees in achieving their goals',
      ],
      requirements: [
        '3+ years of professional experience',
        'Strong communication skills',
        'Patience and empathy',
        'Commitment to helping others grow',
      ],
      timeCommitment: '2-3 hours per week',
    },
    {
      id: 'organizer',
      title: 'Event Organizer',
      icon: Calendar,
      description: 'Help plan and execute amazing event that bring our community together.',
      responsibilities: [
        'Plan and coordinate event',
        'Manage event logistics',
        'Coordinate with speakers and sponsors',
        'Ensure smooth event execution',
      ],
      requirements: [
        'Event planning experience preferred',
        'Strong organizational skills',
        'Attention to detail',
        'Ability to work under pressure',
      ],
      timeCommitment: '5-10 hours per event',
    },
    {
      id: 'community',
      title: 'Community Manager',
      icon: Heart,
      description: 'Foster engagement and build connections within our growing community.',
      responsibilities: [
        'Moderate community discussions',
        'Welcome new members',
        'Organize social activities',
        'Maintain community guidelines',
      ],
      requirements: [
        'Excellent communication skills',
        'Experience with community platforms',
        'Empathy and conflict resolution skills',
        'Active community participation',
      ],
      timeCommitment: '3-5 hours per week',
    },
  ];

  const benefits = [
    {
      icon: Award,
      title: 'Recognition',
      description: 'Get recognized for your contributions with certificates and community spotlights',
    },
    {
      icon: Users,
      title: 'Networking',
      description: 'Connect with industry professionals and expand your professional network',
    },
    {
      icon: Calendar,
      title: 'Skill Development',
      description: 'Develop leadership, communication, and organizational skills',
    },
    {
      icon: Heart,
      title: 'Impact',
      description: 'Make a meaningful difference in the developer community',
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
      if (!EmailVolunteerService.validateVolunteerData(formData)) {
        setError('Please fill in all required fields with valid information.');
        return;
      }

      // Send email via dedicated EmailJS service
      const emailSuccess = await EmailVolunteerService.sendVolunteerEmail(formData);

      if (emailSuccess) {
        // Also save to localStorage for demo purposes
        const existingVolunteers = JSON.parse(localStorage.getItem('volunteers') || '[]');
        const newVolunteer = {
          id: Date.now().toString(),
          ...formData,
          submittedAt: new Date().toISOString(),
          status: 'pending',
        };

        existingVolunteers.push(newVolunteer);
        localStorage.setItem('volunteers', JSON.stringify(existingVolunteers));

        // Reset form and show success
        setFormData({
          name: '',
          email: '',
          phone: '',
          role: '',
          experience: '',
          skills: '',
          availability: '',
          motivation: '',
          previousVolunteering: '',
          linkedin: '',
          portfolio: '',
        });

        setSubmitted(true);
      } else {
        setError('Failed to submit your volunteer application. Please check your internet connection and try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred while submitting your application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleScrollToForm = () => {
    document
        .getElementById("volunteer-detailed-form")
        ?.scrollIntoView({ behavior: "smooth" });
  };

  if (submitted) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Thank You for Volunteering!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Your volunteer application has been submitted successfully. We'll review it and get back to you within 48 hours.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                In the meantime, join our Discord community to start connecting with fellow volunteers!
              </p>
              <div className="space-y-3">
                <a
                    href="https://discord.gg/6MVn2N9q"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
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
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
              Volunteer With Us
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Share your expertise, give back to the community, and help shape the future of tech education
            </p>
          </div>
        </section>

        {/* Volunteer Roles */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Volunteer Opportunities
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Choose the role that best matches your skills and interests
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {volunteerRoles.map((role) => {
                const Icon = role.icon;
                return (
                    <div
                        key={role.id}
                        className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="flex items-center mb-6">
                        <Icon className="h-10 w-10 text-primary-600 dark:text-primary-400 mr-4" />
                        <div>
                          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            {role.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {role.timeCommitment}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 mb-6">
                        {role.description}
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                            Responsibilities
                          </h4>
                          <ul className="space-y-2">
                            {role.responsibilities.map((responsibility, index) => (
                                <li key={index} className="text-gray-600 dark:text-gray-400 text-sm flex items-start">
                                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                                  {responsibility}
                                </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                            Requirements
                          </h4>
                          <ul className="space-y-2">
                            {role.requirements.map((requirement, index) => (
                                <li key={index} className="text-gray-600 dark:text-gray-400 text-sm flex items-start">
                                  <span className="text-secondary-600 dark:text-secondary-400 mr-2">•</span>
                                  {requirement}
                                </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Why Volunteer With Us?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Volunteering with Tech Dev Club comes with amazing benefits and opportunities
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                    <div
                        key={benefit.title}
                        className="text-center p-6 bg-white dark:bg-gray-900 rounded-lg hover:shadow-lg transition-shadow duration-300"
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

        {/* ---- APPLICATION METHOD BOXES ---- */}
        <section className="w-full flex justify-center items-center bg-transparent mb-12">
          <div className="flex flex-col md:flex-row gap-8 w-full max-w-3xl">
            {/* Quick Application */}
            <div className="flex-1 border-2 border-teal-400 rounded-2xl p-8 bg-[#141b2f] shadow-lg flex flex-col items-center">
              <ExternalLink className="w-10 h-10 text-teal-400 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2 text-center">
                Quick Application
              </h3>
              <p className="text-gray-300 mb-6 text-center">
                Apply via Google Form for faster processing
              </p>
              <div className="w-full bg-[#1b2338] rounded-lg px-4 py-2 mb-4">
              <span className="text-teal-400 font-semibold">
                Response time: 3-4 hours
              </span>
              </div>
              <button
                  className="w-full mt-auto inline-flex items-center justify-center px-6 py-3 bg-teal-400 text-[#181f36] font-semibold rounded-lg shadow hover:bg-teal-300 transition text-lg"
                  onClick={() => window.open(GOOGLE_FORM_URL, "_blank")}
              >
                Start Application <ExternalLink className="ml-2 w-5 h-5" />
              </button>
            </div>

            {/* Detailed Application */}
            <div className="flex-1 border-2 border-blue-400 rounded-2xl p-8 bg-[#141b2f] shadow-lg flex flex-col items-center">
              <ChevronRight className="w-10 h-10 text-blue-400 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2 text-center">
                Detailed Application
              </h3>
              <p className="text-gray-300 mb-6 text-center">
                Apply directly on our website
              </p>
              <div className="w-full bg-[#1b2338] rounded-lg px-4 py-2 mb-4">
              <span className="text-blue-400 font-semibold">
                Response time: 24-48 hours
              </span>
              </div>
              <button
                  className="w-full mt-auto inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-400 transition text-lg"
                  onClick={handleScrollToForm}
              >
                Continue Below <ChevronRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </section>
        {/* ---- END APPLICATION METHOD BOXES ---- */}

        {/* Volunteer Application Form */}
        <section id="volunteer-detailed-form" className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Volunteer Application
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Tell us about yourself and how you'd like to contribute to our community
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
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
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
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                        required
                        disabled={loading}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                        disabled={loading}
                    />
                  </div>

                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Preferred Volunteer Role *
                    </label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                        required
                        disabled={loading}
                    >
                      <option value="">Select a role</option>
                      <option value="speaker">Speaker</option>
                      <option value="mentor">Mentor</option>
                      <option value="organizer">Event Organizer</option>
                      <option value="community">Community Manager</option>
                      <option value="multiple">Multiple Roles</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Professional Experience *
                  </label>
                  <textarea
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Tell us about your professional background and experience..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                      required
                      disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Skills & Expertise *
                  </label>
                  <textarea
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="List your technical skills, programming languages, frameworks, etc..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                      required
                      disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="availability" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Availability *
                  </label>
                  <textarea
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      rows={2}
                      placeholder="When are you available to volunteer? (days, times, frequency)"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                      required
                      disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Why do you want to volunteer with Tech Dev Club? *
                  </label>
                  <textarea
                      id="motivation"
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Tell us about your motivation and what you hope to achieve..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                      required
                      disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="previousVolunteering" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Previous Volunteering Experience
                  </label>
                  <textarea
                      id="previousVolunteering"
                      name="previousVolunteering"
                      value={formData.previousVolunteering}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Describe any previous volunteering or community involvement experience..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                      disabled={loading}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
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
                        placeholder="https://linkedin.com/in/yourprofile"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                        disabled={loading}
                    />
                  </div>

                  <div>
                    <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Portfolio/Website
                    </label>
                    <input
                        type="url"
                        id="portfolio"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleInputChange}
                        placeholder="https://yourportfolio.com"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                        disabled={loading}
                    />
                  </div>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                      <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
                    </div>
                )}

                <div className="flex items-center justify-center pt-6">
                  <button
                      type="submit"
                      disabled={loading}
                      className="bg-primary-600 hover:bg-primary-700 disabled:bg-primary-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none flex items-center shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Submitting Application...
                        </>
                    ) : (
                        <>
                          Submit Application
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                    )}
                  </button>
                </div>

                <div className="text-center pt-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    By submitting this form, you agree to our volunteer terms and conditions.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
  );
};

export default Volunteer;
