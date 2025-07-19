import React from 'react';
import { FileText, Shield, Users, AlertCircle, Calendar } from 'lucide-react';

const Terms: React.FC = () => {
  const lastUpdated = '2024-11-01';

  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: FileText,
      content: [
        'By accessing and using the Tech Dev Club website and services, you accept and agree to be bound by the terms and provision of this agreement.',
        'If you do not agree to abide by the above, please do not use this service.',
        'These terms apply to all visitors, users, and others who access or use the service.',
      ],
    },
    {
      id: 'services',
      title: 'Description of Services',
      icon: Users,
      content: [
        'Tech Dev Club provides a platform for developers to connect, learn, and collaborate through event, workshops, mentorship programs, and community resources.',
        'Our services include but are not limited to: online community access, event participation, educational content, networking opportunities, and project collaboration tools.',
        'We reserve the right to modify, suspend, or discontinue any part of our services at any time without prior notice.',
      ],
    },
    {
      id: 'accounts',
      title: 'User Accounts and Registration',
      icon: Shield,
      content: [
        'To access certain features of our services, you may be required to create an account and provide accurate, current, and complete information.',
        'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.',
        'You must notify us immediately of any unauthorized use of your account or any other breach of security.',
        'We reserve the right to suspend or terminate accounts that violate these terms or our community guidelines.',
      ],
    },
    {
      id: 'conduct',
      title: 'User Conduct and Content',
      icon: AlertCircle,
      content: [
        'You agree to use our services in accordance with our Code of Conduct and all applicable laws and regulations.',
        'You are solely responsible for any content you post, upload, or share through our services.',
        'You grant Tech Dev Club a non-exclusive, royalty-free license to use, modify, and display your content for the purpose of providing our services.',
        'We reserve the right to remove any content that violates these terms or our community guidelines.',
      ],
    },
  ];

  const additionalTerms = [
    {
      title: 'Intellectual Property',
      content: 'All content, features, and functionality of our services are owned by Tech Dev Club and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.',
    },
    {
      title: 'Privacy and Data Protection',
      content: 'Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our services. By using our services, you agree to the collection and use of information in accordance with our Privacy Policy.',
    },
    {
      title: 'Event Participation',
      content: 'Participation in Tech Dev Club event is subject to additional terms and conditions. Event-specific rules, cancellation policies, and code of conduct apply to all participants. We reserve the right to refuse participation or remove participants who violate event guidelines.',
    },
    {
      title: 'Third-Party Services',
      content: 'Our services may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of third-party sites. Your use of third-party services is at your own risk and subject to their terms and conditions.',
    },
    {
      title: 'Disclaimers and Limitation of Liability',
      content: 'Our services are provided "as is" without warranties of any kind. Tech Dev Club shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our total liability shall not exceed the amount paid by you for our services.',
    },
    {
      title: 'Indemnification',
      content: 'You agree to indemnify and hold harmless Tech Dev Club from any claims, damages, or expenses arising from your use of our services, violation of these terms, or infringement of any rights of another party.',
    },
    {
      title: 'Termination',
      content: 'We may terminate or suspend your access to our services immediately, without prior notice, for any reason, including breach of these terms. Upon termination, your right to use our services will cease immediately.',
    },
    {
      title: 'Changes to Terms',
      content: 'We reserve the right to modify these terms at any time. We will notify users of significant changes via email or through our website. Continued use of our services after changes constitutes acceptance of the new terms.',
    },
    {
      title: 'Governing Law',
      content: 'These terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in California.',
    },
    {
      title: 'Contact Information',
      content: 'If you have any questions about these Terms of Service, please contact us at techdevclub2025@gmail.com or through our contact form on the website.',
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-hero-light dark:bg-hero-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-4">
            Please read these terms carefully before using our services
          </p>
          <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
            <Calendar className="h-5 w-5 mr-2" />
            <span>Last updated: {new Date(lastUpdated).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-primary-900 dark:text-primary-100 mb-4">
              Welcome to Tech Dev Club
            </h2>
            <p className="text-primary-700 dark:text-primary-300 leading-relaxed">
              These Terms of Service ("Terms") govern your use of the Tech Dev Club website, 
              services, and community platform. By accessing or using our services, you agree 
              to be bound by these Terms. Please read them carefully.
            </p>
          </div>

          {/* Main Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div key={section.id} className="border-b border-gray-200 dark:border-gray-700 pb-12 last:border-b-0">
                  <div className="flex items-center mb-6">
                    <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-lg mr-4">
                      <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {index + 1}. {section.title}
                      </h2>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Terms */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Additional Terms and Conditions
          </h2>
          
          <div className="space-y-8">
            {additionalTerms.map((term, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {sections.length + index + 1}. {term.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {term.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-8">
            <div className="flex items-start">
              <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
                  Important Notice
                </h3>
                <div className="space-y-3 text-yellow-700 dark:text-yellow-300">
                  <p>
                    These terms constitute a legally binding agreement between you and Tech Dev Club. 
                    If you do not agree with any part of these terms, you must not use our services.
                  </p>
                  <p>
                    We recommend that you print or save a copy of these terms for your records. 
                    We may update these terms from time to time, and we will notify you of any 
                    material changes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Summary
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Key points to remember about our Terms of Service
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Your Rights
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Access to community resources and events
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Participate in discussions and collaborations
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Share your projects and ideas
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Receive support and mentorship
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Your Responsibilities
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Follow our Code of Conduct
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Respect other community members
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Provide accurate information
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Use services responsibly
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Questions About Our Terms?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            We're here to help clarify any questions about our Terms of Service
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Contact Us
            </a>
            <a
              href="mailto:techdevclub2025@gmail.com"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Email Legal Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;