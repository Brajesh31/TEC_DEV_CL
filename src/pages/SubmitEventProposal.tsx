import React from 'react';
import { Calendar, Users, MapPin, Clock, Send } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

const SubmitEventProposal: React.FC = () => {
  // Set SEO metadata
  useSEO({
    title: 'Submit Event Proposal - Tech Dev Club',
    description: 'Propose an event for the Tech Dev Club community. Share your knowledge and expertise with fellow developers.',
    keywords: 'event proposal, tech event, developer meetup, coding workshop, tech talk, submit event',
  });

  const handleOpenForm = () => {
    window.open("https://unstop.com/workshops-webinars/techfront-ai-x-blockchain-2025-iit-delhi-1503253", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-slide-up">
            Submit Event Proposal
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto animate-slide-up animation-delay-200">
            Share your knowledge and expertise with the Tech Dev Club community
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Propose Your Event
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Tech Dev Club welcomes event proposals from community members and industry experts. Whether you want to host a workshop, give a talk, or organize a panel discussion, we'd love to hear your ideas.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Our community is interested in a wide range of topics including but not limited to:
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-600 dark:text-gray-400">Web Development (Frontend, Backend, Full Stack)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-600 dark:text-gray-400">Mobile App Development</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-600 dark:text-gray-400">AI, Machine Learning, and Data Science</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-600 dark:text-gray-400">DevOps, Cloud Computing, and Infrastructure</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-600 dark:text-gray-400">Blockchain and Web3</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-600 dark:text-gray-400">UI/UX Design and Product Development</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-600 dark:text-gray-400">Career Development and Soft Skills</span>
                </li>
              </ul>
              <button
                onClick={handleOpenForm}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center shadow-lg hover:shadow-xl"
              >
                <Send className="h-5 w-5 mr-2" />
                Submit Your Proposal
              </button>
            </div>
            
            <div className="space-y-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Calendar className="h-6 w-6 text-blue-500 mr-2" />
                  Event Types
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Workshops</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Hands-on sessions where attendees learn by doing</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Tech Talks</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Presentations on specific technologies or concepts</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Panel Discussions</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Multiple experts discussing a topic or answering questions</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Hackathons</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Collaborative coding events focused on building projects</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Networking Events</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Casual meetups for community members to connect</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Users className="h-6 w-6 text-blue-500 mr-2" />
                  What We Provide
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-600 dark:text-gray-400">Platform and technical support for your event</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-600 dark:text-gray-400">Marketing and promotion to our community</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-600 dark:text-gray-400">Registration and attendee management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-600 dark:text-gray-400">Feedback collection and post-event analytics</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-600 dark:text-gray-400">Recording and content distribution (optional)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Event Proposal Process
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Here's what to expect when you submit an event proposal
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Send className="h-10 w-10 text-blue-500" />,
                title: "Submit Proposal",
                description: "Fill out our event proposal form with details about your event idea"
              },
              {
                icon: <Clock className="h-10 w-10 text-blue-500" />,
                title: "Review Process",
                description: "Our team reviews your proposal (typically within 5-7 days)"
              },
              {
                icon: <Calendar className="h-10 w-10 text-blue-500" />,
                title: "Planning",
                description: "If approved, we'll work with you to plan and schedule the event"
              },
              {
                icon: <Users className="h-10 w-10 text-blue-500" />,
                title: "Host Event",
                description: "Deliver your event with our support and engage with the community"
              }
            ].map((step, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center shadow-lg">
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

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Do I need to be an expert to propose an event?",
                answer: "Not at all! We welcome speakers of all experience levels. What matters most is your passion for the topic and willingness to share knowledge."
              },
              {
                question: "How long should my event be?",
                answer: "Most of our events range from 1-2 hours, including Q&A. Workshops may be longer (2-4 hours) depending on the content."
              },
              {
                question: "Can I propose a virtual event?",
                answer: "Yes! We host both in-person and virtual events. Virtual events are a great way to reach our global community."
              },
              {
                question: "Is there compensation for speakers?",
                answer: "While we don't typically provide monetary compensation, we offer promotion, professional recordings, and networking opportunities. For certain specialized workshops, we may discuss compensation."
              },
              {
                question: "How far in advance should I submit my proposal?",
                answer: "We recommend submitting at least 4-6 weeks before your preferred event date to allow time for review, planning, and promotion."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md"
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Share Your Knowledge?
          </h2>
          <p className="text-xl text-blue-200 mb-8">
            Submit your event proposal today and help our community learn and grow
          </p>
          <button
            onClick={handleOpenForm}
            className="inline-block bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
          >
            Submit Event Proposal
          </button>
        </div>
      </section>
    </div>
  );
};

export default SubmitEventProposal;