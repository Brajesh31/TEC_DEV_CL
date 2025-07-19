import React from 'react';
import { Shield, Users, Heart, AlertTriangle, Mail, Flag } from 'lucide-react';

const CodeOfConduct: React.FC = () => {
  const principles = [
    {
      icon: Heart,
      title: 'Be Respectful',
      description: 'Treat all community members with respect, kindness, and empathy. We welcome people of all backgrounds and experience levels.',
    },
    {
      icon: Users,
      title: 'Be Inclusive',
      description: 'Foster an environment where everyone feels welcome and valued, regardless of their background, identity, or experience level.',
    },
    {
      icon: Shield,
      title: 'Be Professional',
      description: 'Maintain professional conduct in all interactions. Keep discussions constructive and focused on learning and growth.',
    },
  ];

  const guidelines = [
    {
      category: 'Communication',
      rules: [
        'Use welcoming and inclusive language',
        'Be respectful of differing viewpoints and experiences',
        'Give and gracefully accept constructive feedback',
        'Focus on what is best for the community',
        'Show empathy towards other community members',
      ],
    },
    {
      category: 'Behavior',
      rules: [
        'Participate in an authentic and active way',
        'Exercise consideration and respect in your speech and actions',
        'Attempt collaboration before conflict',
        'Refrain from demeaning, discriminatory, or harassing behavior',
        'Be mindful of your surroundings and fellow participants',
      ],
    },
    {
      category: 'Content',
      rules: [
        'Keep content relevant to the community and channel topic',
        'No spam, self-promotion without context, or off-topic content',
        'Share resources that add value to the community',
        'Respect intellectual property and give proper attribution',
        'No sharing of inappropriate, offensive, or illegal content',
      ],
    },
  ];

  const unacceptableBehavior = [
    'Harassment, intimidation, or discrimination of any kind',
    'Offensive comments related to gender, sexual orientation, race, religion, or disability',
    'Inappropriate sexual content or unwelcome sexual attention',
    'Personal attacks, trolling, or inflammatory comments',
    'Publishing private information without consent',
    'Spam, excessive self-promotion, or disruptive behavior',
    'Any conduct that could reasonably be considered inappropriate in a professional setting',
  ];

  const reportingSteps = [
    {
      step: '1',
      title: 'Document the Incident',
      description: 'Take screenshots or notes of the problematic behavior, including dates, times, and involved parties.',
    },
    {
      step: '2',
      title: 'Report to Moderators',
      description: 'Contact our moderation team through Discord, email, or the reporting form with details of the incident.',
    },
    {
      step: '3',
      title: 'Investigation',
      description: 'Our team will review the report promptly and investigate the matter thoroughly and fairly.',
    },
    {
      step: '4',
      title: 'Resolution',
      description: 'Appropriate action will be taken, which may include warnings, temporary suspension, or permanent removal.',
    },
  ];

  const consequences = [
    {
      level: 'Warning',
      description: 'A private warning for minor violations with clarification of expected behavior.',
    },
    {
      level: 'Temporary Suspension',
      description: 'Temporary removal from community spaces for repeated or more serious violations.',
    },
    {
      level: 'Permanent Ban',
      description: 'Permanent removal from all community spaces for severe violations or repeated offenses.',
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-hero-light dark:bg-hero-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
            Code of Conduct
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Our commitment to creating a safe, inclusive, and welcoming environment for all community members
          </p>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Commitment
            </h2>
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-8">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Tech Dev Club is committed to providing a harassment-free experience for everyone, 
                regardless of age, body size, visible or invisible disability, ethnicity, sex characteristics, 
                gender identity and expression, level of experience, education, socio-economic status, 
                nationality, personal appearance, race, religion, or sexual identity and orientation.
              </p>
            </div>
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

      {/* Community Guidelines */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Community Guidelines
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              These guidelines help us maintain a positive and productive community environment
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {guidelines.map((guideline) => (
              <div
                key={guideline.category}
                className="bg-white dark:bg-gray-900 rounded-lg p-8"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  {guideline.category}
                </h3>
                <ul className="space-y-3">
                  {guideline.rules.map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary-600 dark:text-primary-400 mr-3 mt-1">•</span>
                      <span className="text-gray-600 dark:text-gray-400">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unacceptable Behavior */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <AlertTriangle className="h-16 w-16 mx-auto text-red-500 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Unacceptable Behavior
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              The following behaviors are considered harassment and are unacceptable within our community
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8">
            <ul className="space-y-4">
              {unacceptableBehavior.map((behavior, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-3 mt-1">✗</span>
                  <span className="text-red-800 dark:text-red-200">{behavior}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Reporting Process */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Flag className="h-16 w-16 mx-auto text-primary-600 dark:text-primary-400 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Reporting Violations
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              If you experience or witness unacceptable behavior, please report it following these steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reportingSteps.map((step) => (
              <div
                key={step.step}
                className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center"
              >
                <div className="bg-primary-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white dark:bg-gray-900 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              How to Report
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Mail className="h-8 w-8 mx-auto text-primary-600 dark:text-primary-400 mb-3" />
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Email</h4>
                <a
                  href="mailto:techdevclub2025@gmail.com"
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                >
                  techdevclub2025@gmail.com
                </a>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 mx-auto text-primary-600 dark:text-primary-400 mb-3" />
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Discord</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Direct message any moderator
                </p>
              </div>
              <div className="text-center">
                <Flag className="h-8 w-8 mx-auto text-primary-600 dark:text-primary-400 mb-3" />
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Anonymous Form</h4>
                <a
                  href="#"
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                >
                  Report Form
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consequences */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Enforcement & Consequences
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Community leaders will follow these guidelines in determining consequences for violations
            </p>
          </div>

          <div className="space-y-6">
            {consequences.map((consequence, index) => (
              <div
                key={consequence.level}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 flex items-center"
              >
                <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-6 flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {consequence.level}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {consequence.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-primary-50 dark:bg-primary-900/20 rounded-lg p-8">
            <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-4">
              Our Promise
            </h3>
            <p className="text-primary-700 dark:text-primary-300">
              All reports will be handled with discretion and confidentiality. We are committed to 
              creating a safe environment where everyone can learn, grow, and contribute to the 
              tech community. Thank you for helping us maintain these standards.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Questions About Our Code of Conduct?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            We're here to help clarify any questions about our community guidelines
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
              Email Conduct Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CodeOfConduct;