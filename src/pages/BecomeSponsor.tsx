import React, { useState, useEffect } from 'react';
import { Mail, Award, Heart, DollarSign, Users, Globe, Calendar, CheckSquare, Send, FileText } from 'lucide-react';

// Define the interface for sponsor tier data
interface SponsorTier {
  id: string;
  name: string;
  price: string;
  description: string;
  benefits: string[];
  featured: boolean;
}

const BecomeSponsor: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Sample sponsor tiers
  const sponsorTiers: SponsorTier[] = [
    {
      id: "diamond",
      name: "Diamond",
      price: "$1200 OR 1,00,000 INR",
      description: "Premium sponsorship with maximum visibility and exclusive benefits.",
      benefits: [
        "Prominent logo placement on website homepage",
        "Featured in all event promotions",
        "Dedicated sponsor spotlight",
        "VIP access to all events",
        "Recruiting booth at major events",
        "5 social media mentions per month",
        "Logo on all event materials",
        "Access to talent pool"
      ],
      featured: true
    },
    {
      id: "gold",
      name: "Gold",
      price: "$600 OR 50,000 INR",
      description: "High visibility sponsorship with premium benefits.",
      benefits: [
        "Logo on website homepage",
        "Included in event promotions",
        "3 social media mentions per month",
        "Logo on digital event materials",
        "Recruiting opportunities",
        "Access to talent pool"
      ],
      featured: false
    },
    {
      id: "silver",
      name: "Silver",
      price: "$2,50 OR 25,000 INR",
      description: "Great visibility with valuable benefits.",
      benefits: [
        "Logo on sponsors page",
        "1 social media mention per month",
        "Logo on digital event materials",
        "Access to talent pool"
      ],
      featured: false
    }
  ];

  const sponsorshipSteps = [
    {
      icon: Mail,
      title: "Reach Out",
      description: "Fill out our sponsorship inquiry form or email us directly at sponsors@techdevclub.com."
    },
    {
      icon: Calendar,
      title: "Consultation",
      description: "Schedule a call with our sponsorship team to discuss your goals and explore partnership opportunities."
    },
    {
      icon: CheckSquare,
      title: "Select Package",
      description: "Choose the sponsorship tier that best aligns with your objectives and budget."
    },
    {
      icon: Heart,
      title: "Finalize Agreement",
      description: "We'll prepare a sponsorship agreement outlining all benefits and terms."
    },
    {
      icon: Award,
      title: "Welcome Aboard",
      description: "Once finalized, we'll onboard you as an official Tech Dev Club sponsor and begin implementing benefits."
    }
  ];

  const handleOpenForm = () => {
    window.open("https://forms.gle/2mzR82W746Jd7S6G6", "_blank", "noopener,noreferrer");
  };

  const handleOpenProspectus = () => {
    window.open("/files/TechDevClub-Sponsorship-Prospectus-2025.pdf", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-indigo-900 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Become a Sponsor</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Support innovation, talent, and impact—partner with Tech Dev Club to empower the next generation of developers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={handleOpenProspectus}
              className="inline-flex items-center bg-white text-blue-700 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg"
            >
              <FileText className="h-5 w-5 mr-2" />
              View Sponsorship Prospectus
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Why Sponsor Us */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Why Sponsor Tech Dev Club?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
                <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Reach Top Talent</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Connect with a diverse community of 10,000+ developers, from students to experienced professionals.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
                <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Brand Visibility</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Showcase your brand to a global audience through our website, events, and social media channels.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
                <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Community Impact</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Support initiatives that empower developers and contribute to the growth of the tech ecosystem.
                </p>
              </div>
            </div>
          </div>
          
          {/* Sponsorship Tiers */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Sponsorship Tiers</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {sponsorTiers.map((tier) => (
                <div 
                  key={tier.id}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden ${
                    tier.featured ? 'ring-2 ring-blue-500 transform scale-105' : ''
                  }`}
                >
                  {tier.featured && (
                    <div className="bg-blue-600 text-white py-2 text-center text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{tier.name}</h3>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">{tier.price}</div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{tier.description}</p>
                    
                    <ul className="space-y-3 mb-8">
                      {tier.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <CheckSquare className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button 
                      onClick={handleOpenForm}
                      className={`block w-full py-3 text-center rounded-lg font-medium ${
                        tier.featured
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                      } transition-colors`}
                    >
                      Select {tier.name}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-600 dark:text-gray-400">
                Looking for a custom sponsorship package? <a href="mailto:sponsors@techdevclub.com" className="text-blue-600 dark:text-blue-400 hover:underline">Contact us</a> to discuss your needs.
              </p>
            </div>
          </div>
          
          {/* How to Become a Sponsor */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">How to Become a Sponsor</h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-800 transform md:translate-x-[-0.5px]"></div>
              
              <div className="space-y-12">
                {sponsorshipSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className="relative">
                      <div className={`flex flex-col md:flex-row items-center ${
                        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}>
                        {/* Timeline dot */}
                        <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center transform md:translate-x-[-16px] z-10">
                          <span className="text-white font-bold">{index + 1}</span>
                        </div>
                        
                        {/* Content */}
                        <div className={`ml-16 md:ml-0 md:w-1/2 ${
                          index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                        }`}>
                          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                            <div className="flex items-center mb-4">
                              <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Inquiry Form */}
          <div id="inquiry-form" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Sponsorship Inquiry</h2>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
              <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
                Interested in becoming a sponsor? Fill out our sponsorship inquiry form to get started.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleOpenForm}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Open Sponsorship Form
                </button>
                <button
                  onClick={handleOpenProspectus}
                  className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <FileText className="h-5 w-5 mr-2" />
                  Download Prospectus
                </button>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">What is the sponsorship period?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Standard sponsorships run for 12 months from the start date, with options for renewal. We also offer event-specific sponsorships for shorter durations.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Can we customize a sponsorship package?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Absolutely! We're happy to work with you to create a custom sponsorship package that aligns with your specific goals and budget.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">What is the reach of Tech Dev Club?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Tech Dev Club has a global community of 10,000+ members across 50+ countries, with particularly strong presence in India, the US, and Europe.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">How are sponsorship funds used?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Sponsorship funds directly support our community programs, including events, educational resources, mentorship programs, and infrastructure costs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BecomeSponsor;