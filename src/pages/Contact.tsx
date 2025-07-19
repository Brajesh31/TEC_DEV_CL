import React from 'react';
import { Mail, MessageCircle, MapPin, Github, Linkedin, Instagram } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import { useSEO } from '../hooks/useSEO';

const Contact: React.FC = () => {
  // Set SEO metadata
  useSEO({
    title: 'Contact Tech Dev Club - Get in Touch with Our Team',
    description: 'Have questions or want to collaborate? Get in touch with the Tech Dev Club team. We\'d love to hear from you!',
    keywords: 'contact tech dev club, tech community contact, developer community support, tech collaboration, programming community contact',
    structuredData: {
      type: 'Organization',
      data: {
        name: 'Tech Dev Club',
        url: 'https://techdevclub.com',
        logo: 'https://techdevclub.com/logo.png',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-555-TECH-DEV',
          contactType: 'customer service',
          email: 'techdevclub2025@gmail.com',
          availableLanguage: ['English']
        },
        sameAs: [
          'https://github.com/techdevclub',
          'https://www.linkedin.com/company/tech-dev-club/',
          'https://discord.gg/6MVn2N9q'
        ]
      }
    }
  });

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'techdevclub2025@gmail.com',
      description: 'Send us an email and we\'ll respond within 24 hours',
      link: 'mailto:techdevclub2025@gmail.com',
    },
    {
      icon: MessageCircle,
      title: 'Join Our Discord',
      content: 'Tech Dev Club Discord',
      description: 'Connect with our community in real-time',
      link: 'https://discord.gg/6MVn2N9q',
    },
    {
      icon: MapPin,
      title: 'Global Community',
      content: 'Worldwide',
      description: 'We\'re a global community with members in 10+ countries',
      link: null,
    },
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/company/tech-dev-club/',
      description: 'Connect with us professionally',
    },
    {
      name: 'Discord',
      icon: MessageCircle,
      url: 'https://discord.gg/6MVn2N9q',
      description: 'Join our community chat',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/techdevclub?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      description: 'Follow us on Instagram',
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-hero-light dark:bg-hero-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto animate-slide-up animation-delay-200">
            Have questions, suggestions, or want to collaborate? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.title}
                  className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className="h-12 w-12 mx-auto text-primary-600 dark:text-primary-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {info.title}
                  </h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      target={info.link.startsWith('mailto:') ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium mb-2 block transition-colors duration-200"
                    >
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-gray-900 dark:text-white font-medium mb-2">
                      {info.content}
                    </p>
                  )}
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {info.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden animate-slide-up">
            <div className="grid lg:grid-cols-2">
              {/* Form */}
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Send us a Message
                </h2>
                
                <ContactForm />
              </div>

              {/* Info Panel */}
              <div className="bg-gradient-to-br from-primary-600 to-secondary-600 p-8 text-white">
                <h3 className="text-xl font-semibold mb-6">
                  Let's Connect
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Response Time</h4>
                    <p className="text-primary-100 text-sm">
                      We typically respond to all inquiries within 24 hours during business days.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Community Guidelines</h4>
                    <p className="text-primary-100 text-sm">
                      Please be respectful and constructive in your communication. We're here to help!
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-4">Follow Us</h4>
                    <div className="flex space-x-4">
                      {socialLinks.map((social) => {
                        const Icon = social.icon;
                        return (
                          <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white bg-opacity-20 hover:bg-opacity-30 p-3 rounded-lg transition-colors transform hover:scale-110"
                            title={social.description}
                          >
                            <Icon className="h-6 w-6" />
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Office Hours</h4>
                    <p className="text-primary-100 text-sm">
                      Our team is available Monday through Friday, 9 AM - 6 PM IST.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-6 animate-slide-up animation-delay-200">
            {[
              {
                question: 'How can I join Tech Dev Club?',
                answer: 'You can join by filling out our membership application form. We review all applications and typically respond within 24-48 hours.',
              },
              {
                question: 'Are your event free to attend?',
                answer: 'Most of our event are free for community members. Some specialized workshops or conferences may have a small fee to cover costs.',
              },
              {
                question: 'Can I propose a workshop or speaking opportunity?',
                answer: 'Absolutely! We welcome proposals from community members. Please use the contact form with "Speaking Opportunity" as the subject.',
              },
              {
                question: 'How can my company sponsor or partner with Tech Dev Club?',
                answer: 'We offer various sponsorship and partnership opportunities. Please contact us with "Partnership Opportunity" or "Sponsorship" as the subject.',
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow duration-300 transform hover:scale-105"
                style={{ transitionDelay: `${index * 50}ms` }}
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
    </div>
  );
};

export default Contact;