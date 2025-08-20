 import React from 'react';
import { Shield, Eye, Lock, Database, Users, Settings, Calendar, AlertCircle } from 'lucide-react';

const Privacy: React.FC = () => {
  const lastUpdated = '2024-11-01';

  const principles = [
    {
      icon: Shield,
      title: 'Data Protection',
      description: 'We implement industry-standard security measures to protect your personal information.',
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'We are clear about what data we collect, how we use it, and who we share it with.',
    },
    {
      icon: Lock,
      title: 'User Control',
      description: 'You have control over your data and can request access, updates, or deletion at any time.',
    },
  ];

  const dataTypes = [
    {
      category: 'Personal Information',
      icon: Users,
      items: [
        'Name and email address',
        'Profile information (bio, skills, experience)',
        'Contact information (phone, social media links)',
        'Professional background and interests',
      ],
    },
    {
      category: 'Usage Data',
      icon: Database,
      items: [
        'Website interaction and navigation patterns',
        'Event attendance and participation',
        'Community engagement metrics',
        'Device and browser information',
      ],
    },
    {
      category: 'Communication Data',
      icon: Settings,
      items: [
        'Messages and posts in community forums',
        'Event RSVPs and feedback',
        'Support requests and correspondence',
        'Newsletter and email preferences',
      ],
    },
  ];

  const dataUse = [
    {
      purpose: 'Service Provision',
      description: 'To provide and maintain our community platform, event, and services.',
      examples: ['Account management', 'Event coordination', 'Community features'],
    },
    {
      purpose: 'Communication',
      description: 'To communicate with you about event, updates, and community activities.',
      examples: ['Event notifications', 'Newsletter updates', 'Important announcements'],
    },
    {
      purpose: 'Improvement',
      description: 'To analyze usage patterns and improve our services and user experience.',
      examples: ['Website analytics', 'Feature development', 'Performance optimization'],
    },
    {
      purpose: 'Safety & Security',
      description: 'To maintain the safety and security of our community and services.',
      examples: ['Fraud prevention', 'Content moderation', 'Security monitoring'],
    },
  ];

  const userRights = [
    {
      right: 'Access',
      description: 'Request a copy of the personal data we hold about you.',
    },
    {
      right: 'Rectification',
      description: 'Request correction of inaccurate or incomplete personal data.',
    },
    {
      right: 'Erasure',
      description: 'Request deletion of your personal data under certain circumstances.',
    },
    {
      right: 'Portability',
      description: 'Request transfer of your data to another service provider.',
    },
    {
      right: 'Objection',
      description: 'Object to processing of your personal data for certain purposes.',
    },
    {
      right: 'Restriction',
      description: 'Request restriction of processing under certain circumstances.',
    },
  ];

  const securityMeasures = [
    'Encryption of data in transit and at rest',
    'Regular security audits and vulnerability assessments',
    'Access controls and authentication mechanisms',
    'Employee training on data protection practices',
    'Incident response and breach notification procedures',
    'Regular backup and disaster recovery testing',
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-hero-light dark:bg-hero-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-4">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
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

      {/* Privacy Principles */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Privacy Principles
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              These principles guide how we handle your personal information
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {principles.map((principle) => {
              const Icon = principle.icon;
              return (
                <div
                  key={principle.title}
                  className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <Icon className="h-12 w-12 mx-auto text-primary-600 dark:text-primary-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {principle.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Data Collection */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We collect information to provide better services to our community members
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {dataTypes.map((dataType) => {
              const Icon = dataType.icon;
              return (
                <div
                  key={dataType.category}
                  className="bg-white dark:bg-gray-900 rounded-lg p-8"
                >
                  <div className="flex items-center mb-6">
                    <Icon className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {dataType.category}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {dataType.items.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-600 dark:text-primary-400 mr-3 mt-1">•</span>
                        <span className="text-gray-600 dark:text-gray-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How We Use Data */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We use your information for the following purposes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {dataUse.map((use, index) => (
              <div
                key={use.purpose}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {use.purpose}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {use.description}
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Examples:</p>
                  <ul className="space-y-1">
                    {use.examples.map((example, exIndex) => (
                      <li key={exIndex} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                        <span className="text-secondary-600 dark:text-secondary-400 mr-2">•</span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Sharing */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Data Sharing and Disclosure
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  We do not sell your personal information
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Tech Dev Club does not sell, rent, or trade your personal information to third parties for commercial purposes.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Limited sharing scenarios
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary-600 dark:text-primary-400 mr-3 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      <strong>Service providers:</strong> Trusted third parties who help us operate our services (hosting, analytics, email delivery)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 dark:text-primary-400 mr-3 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      <strong>Legal requirements:</strong> When required by law, court order, or to protect our rights and safety
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 dark:text-primary-400 mr-3 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      <strong>Business transfers:</strong> In the event of a merger, acquisition, or sale of assets
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 dark:text-primary-400 mr-3 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      <strong>With consent:</strong> When you explicitly consent to sharing your information
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Your Privacy Rights
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              You have several rights regarding your personal information
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRights.map((right) => (
              <div
                key={right.right}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Right to {right.right}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {right.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-primary-50 dark:bg-primary-900/20 rounded-lg p-8 text-center">
            <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-4">
              Exercise Your Rights
            </h3>
            <p className="text-primary-700 dark:text-primary-300 mb-6">
              To exercise any of these rights, please contact us at techdevclub2025@gmail.com or use our contact form.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:techdevclub2025@gmail.com"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Email Privacy Team
              </a>
              <a
                href="/contact"
                className="border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Contact Form
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Security Measures */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Lock className="h-16 w-16 mx-auto text-primary-600 dark:text-primary-400 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Security Measures
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              We implement comprehensive security measures to protect your information
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg p-8">
            <ul className="space-y-4">
              {securityMeasures.map((measure, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900 rounded-full p-1 mr-4 mt-1">
                    <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">{measure}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Cookies and Tracking */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Cookies and Tracking Technologies
            </h2>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                What are cookies?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Cookies are small text files stored on your device that help us provide and improve our services. 
                We use both session cookies (which expire when you close your browser) and persistent cookies 
                (which remain on your device for a set period).
              </p>

              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Types of cookies we use:
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-3 mt-1">•</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    <strong>Essential cookies:</strong> Required for basic website functionality
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-3 mt-1">•</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    <strong>Analytics cookies:</strong> Help us understand how visitors use our website
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-3 mt-1">•</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    <strong>Preference cookies:</strong> Remember your settings and preferences
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
              <div className="flex items-start">
                <Settings className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                    Cookie Control
                  </h4>
                  <p className="text-yellow-700 dark:text-yellow-300">
                    You can control cookies through your browser settings. However, disabling certain 
                    cookies may affect the functionality of our website.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Retention */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Data Retention
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg p-8">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We retain your personal information only for as long as necessary to fulfill the purposes 
              for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Account Information
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Retained while your account is active and for up to 2 years after account deletion 
                  for legal and security purposes.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Communication Data
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Retained for up to 3 years to maintain community history and resolve disputes.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Analytics Data
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Aggregated and anonymized data may be retained indefinitely for research and improvement purposes.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Legal Requirements
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Some data may be retained longer if required by law or for legitimate business interests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* International Transfers */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              International Data Transfers
            </h2>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Tech Dev Club operates globally, and your information may be transferred to and processed 
              in countries other than your own. We ensure that such transfers comply with applicable 
              data protection laws and implement appropriate safeguards.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Safeguards for International Transfers
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary-600 dark:text-primary-400 mr-3 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      Standard contractual clauses approved by relevant authorities
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 dark:text-primary-400 mr-3 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      Adequacy decisions for transfers to certain countries
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 dark:text-primary-400 mr-3 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      Certification schemes and codes of conduct
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Changes to Policy */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-8">
            <div className="flex items-start">
              <AlertCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Changes to This Privacy Policy
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We may update this Privacy Policy from time to time to reflect changes in our practices, 
                  technology, legal requirements, or other factors. We will notify you of any material 
                  changes by:
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-primary-600 dark:text-primary-400 mr-3 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      Posting the updated policy on our website
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 dark:text-primary-400 mr-3 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      Sending email notifications to registered users
                
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 dark:text-primary-400 mr-3 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      Displaying prominent notices on our platform
                    </span>
                  </li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400">
                  Your continued use of our services after the effective date of the updated policy 
                  constitutes acceptance of the changes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Questions About Your Privacy?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            We're here to help with any questions about our privacy practices
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
              Email Privacy Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;