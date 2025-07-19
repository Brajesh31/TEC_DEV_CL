import React, { useState, useEffect } from 'react';
import { ExternalLink, Award, Star, Shield, Globe } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website: string;
  tier:
      | 'Diamond'
      | 'Gold'
      | 'Silver'
      | 'Bronze'
      | 'Partner'
      | 'Title Sponsor'
      | 'Credential Partner'
      | 'Platform Partner';
  description: string;
}

const AllSponsors: React.FC = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: 'Our Sponsors - Tech Dev Club',
    description: 'Grateful for the partners who power our mission at Tech Dev Club.',
    keywords: 'tech sponsors, developer community sponsors, tech partners, programming sponsors',
  });

  useEffect(() => {
    const loadSponsors = async () => {
      try {
        const data = await import("../data/sponsors.json");
        setSponsors(data.sponsors);
        setLoading(false);
      } catch (error) {
        console.error("Error loading sponsors data:", error);
        setLoading(false);
      }
    };
    loadSponsors();
  }, []);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Diamond':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
      case 'Gold':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      case 'Silver':
        return 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';
      case 'Bronze':
        return 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300';
      case 'Partner':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'Title Sponsor':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      case 'Credential Partner':
        return 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300';
      case 'Platform Partner':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300';
      default:
        return 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'Diamond':
        return <Star className="h-5 w-5" />;
      case 'Gold':
        return <Award className="h-5 w-5" />;
      case 'Silver':
        return <Shield className="h-5 w-5" />;
      case 'Title Sponsor':
        return <Star className="h-5 w-5 text-red-500" />;
      case 'Credential Partner':
        return <Shield className="h-5 w-5 text-indigo-500" />;
      case 'Platform Partner':
        return <Globe className="h-5 w-5 text-purple-500" />;
      default:
        return <Award className="h-5 w-5" />;
    }
  };

  const tierOrder = [
    'Title Sponsor',
    'Diamond',
    'Gold',
    'Silver',
    'Bronze',
    'Partner',
    'Platform Partner',
    'Credential Partner'
  ] as const;

  return (
      <div className="animate-fade-in">
        {/* Hero */}
        <section className="bg-gradient-to-r from-blue-900 to-indigo-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-slide-up">
              Our Sponsors
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto animate-slide-up animation-delay-200">
              Grateful for the partners who power our mission
            </p>
          </div>
        </section>

        {/* Main */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                </div>
            ) : (
                <div className="space-y-16">
                  {tierOrder.map((tier) => {
                    const tierSponsors = sponsors.filter(sponsor => sponsor.tier === tier);
                    if (tierSponsors.length === 0) return null;

                    return (
                        <div key={tier} className="space-y-8">
                          <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white inline-flex items-center">
                              {getTierIcon(tier)}
                              <span className="ml-2">{tier} {tier.includes("Partner") ? "" : "Sponsors"}</span>
                            </h2>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {tierSponsors.map((sponsor) => (
                                <div
                                    key={sponsor.id}
                                    className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                >
                                  <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTierColor(sponsor.tier)}`}>
                                {sponsor.tier}
                              </span>
                                      <a
                                          href={sponsor.website}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                                      >
                                        <ExternalLink className="h-5 w-5" />
                                      </a>
                                    </div>
                                    <div className="flex justify-center mb-6">
                                      <img
                                          src={sponsor.logo}
                                          alt={`${sponsor.name} logo`}
                                          className="h-24 object-contain"
                                      />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-3">
                                      {sponsor.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-center">
                                      {sponsor.description}
                                    </p>
                                  </div>
                                </div>
                            ))}
                          </div>
                        </div>
                    );
                  })}
                </div>
            )}

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Interested in Sponsoring?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                Join these amazing organizations in supporting the Tech Dev Club community and connect with talented developers.
              </p>
              <a
                  href="/Contact"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
              >
                Become a Sponsor
              </a>
            </div>
          </div>
        </section>
      </div>
  );
};

export default AllSponsors;
