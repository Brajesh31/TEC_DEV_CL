import React, { useState, useEffect } from 'react';
import { Calendar, Award, ExternalLink, Heart, Star, Shield } from 'lucide-react';

// Define the interface for sponsor data
interface PastSponsor {
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
  years: string[];
  description: string;
  impact?: string;
}

const PastSponsors: React.FC = () => {
  const [sponsors, setSponsors] = useState<PastSponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterYear, setFilterYear] = useState<string>('all');

  useEffect(() => {
    // Load sponsor data from JSON file
    const loadSponsors = async () => {
      try {
        const data = await import('../data/pastSponsors.json');
        setSponsors(data.sponsors);
        setLoading(false);
      } catch (error) {
        console.error('Error loading past sponsors:', error);
        // Fallback data: ONLY PW, TruScholar, Devnovate (Platform Partner)
        setSponsors([
          {
            id: 'past-1',
            name: 'Physics Wallah',
            logo: '/sponsor/pw-logo.png',
            website: 'https://www.pw.live',
            tier: 'Title Sponsor',
            years: ['2025'],
            description:
                'Physics Wallah is India’s leading EdTech platform, supporting TechFront 2025 as the Title Sponsor with a special on-stage presence and financial sponsorship.',
          },
          {
            id: 'past-2',
            name: 'TruScholar',
            logo: '/sponsor/truscholar-logo.png',
            website: 'https://www.truscholar.io/',
            tier: 'Credential Partner',
            years: ['2025'],
            description:
                'TruScholar is a leading credential partner, providing blockchain-based digital certificates and verifications for educational and professional achievements.',
          },
          {
            id: 'past-3',
            name: 'Devnovate',
            logo: '/sponsor/devnovate-logo.jpg',
            website: 'https://devnovate.co',
            tier: 'Platform Partner',
            years: ['2025'],
            description:
                'Devnovate is a leading tech community platform, empowering developers and innovators with resources, events, and networking opportunities to drive digital transformation.',
          },
        ]);
        setLoading(false);
      }
    };

    loadSponsors();
  }, []);

  // Get unique years from all sponsors
  const allYears = Array.from(
      new Set(sponsors.flatMap((sponsor) => sponsor.years)),
  ).sort((a, b) => parseInt(b) - parseInt(a)); // Descending

  // Filter sponsors based on selected year
  const filteredSponsors =
      filterYear === 'all'
          ? sponsors
          : sponsors.filter((sponsor) => sponsor.years.includes(filterYear));

  // Group sponsors by tier for display
  const tierOrder = [
    'Title Sponsor',
    'Platform Partner',
    'Diamond',
    'Gold',
    'Silver',
    'Bronze',
    'Partner',
    'Credential Partner',
  ] as const;

  const sponsorsByTier = tierOrder.reduce((acc, tier) => {
    const tierSponsors = filteredSponsors.filter((sponsor) => sponsor.tier === tier);
    if (tierSponsors.length > 0) {
      acc[tier] = tierSponsors;
    }
    return acc;
  }, {} as Record<string, PastSponsor[]>);

  // Get tier icon
  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'Diamond':
        return <Star className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-1" />;
      case 'Gold':
        return <Award className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-1" />;
      case 'Silver':
        return <Shield className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-1" />;
      case 'Bronze':
        return <Award className="h-5 w-5 text-orange-600 dark:text-orange-400 mr-1" />;
      case 'Partner':
        return <Award className="h-5 w-5 text-green-600 dark:text-green-400 mr-1" />;
      case 'Title Sponsor':
        return <Star className="h-5 w-5 text-red-600 dark:text-red-400 mr-1" />;
      case 'Credential Partner':
        return <Shield className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-1" />;
      case 'Platform Partner':
        return <Star className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-1" />;
      default:
        return <Award className="h-5 w-5 mr-1" />;
    }
  };

  return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-800 to-indigo-900 py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Past Sponsors</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Honoring our partners who helped us grow and made a lasting impact on our community.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <>
                  {/* Year Filter */}
                  <div className="flex flex-wrap justify-center mb-12 gap-2">
                    <button
                        onClick={() => setFilterYear('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            filterYear === 'all'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                    >
                      All Years
                    </button>
                    {allYears.map((year) => (
                        <button
                            key={year}
                            onClick={() => setFilterYear(year)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                filterYear === year
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                          {year}
                        </button>
                    ))}
                  </div>

                  {/* Sponsors by Tier */}
                  {Object.entries(sponsorsByTier).length > 0 ? (
                      Object.entries(sponsorsByTier).map(([tier, tierSponsors]) => (
                          <div key={tier} className="mb-16">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center flex items-center justify-center">
                              {getTierIcon(tier)}
                              {tier} {tier === 'Partner' || tier === 'Credential Partner' || tier === 'Platform Partner' ? '' : 'Sponsors'}
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                              {tierSponsors.map((sponsor) => (
                                  <div
                                      key={sponsor.id}
                                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                                  >
                                    <div className="p-6">
                                      <div className="flex items-center justify-between mb-4">
                                        <div className="h-16 flex items-center">
                                          <img
                                              src={
                                                  sponsor.logo ||
                                                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                      sponsor.name,
                                                  )}&size=200`
                                              }
                                              alt={`${sponsor.name} logo`}
                                              className="max-h-full max-w-[120px] object-contain"
                                          />
                                        </div>
                                        <div className="flex items-center">
                                          {getTierIcon(sponsor.tier)}
                                          <span
                                              className={`text-sm font-medium ${
                                                  sponsor.tier === 'Diamond'
                                                      ? 'text-blue-600 dark:text-blue-400'
                                                      : sponsor.tier === 'Gold'
                                                          ? 'text-yellow-600 dark:text-yellow-400'
                                                          : sponsor.tier === 'Silver'
                                                              ? 'text-gray-600 dark:text-gray-400'
                                                              : sponsor.tier === 'Bronze'
                                                                  ? 'text-orange-600 dark:text-orange-400'
                                                                  : sponsor.tier === 'Partner'
                                                                      ? 'text-green-600 dark:text-green-400'
                                                                      : sponsor.tier === 'Title Sponsor'
                                                                          ? 'text-red-600 dark:text-red-400'
                                                                          : sponsor.tier === 'Credential Partner'
                                                                              ? 'text-indigo-600 dark:text-indigo-400'
                                                                              : sponsor.tier === 'Platform Partner'
                                                                                  ? 'text-purple-600 dark:text-purple-400'
                                                                                  : 'text-gray-600 dark:text-gray-400'
                                              }`}
                                          >
                                  {sponsor.tier}
                                </span>
                                        </div>
                                      </div>

                                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {sponsor.name}
                                      </h3>

                                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        <span>{sponsor.years.join(', ')}</span>
                                      </div>

                                      <p className="text-gray-700 dark:text-gray-300 mb-4">{sponsor.description}</p>

                                      {sponsor.impact && (
                                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                                            <h4 className="font-medium text-gray-900 dark:text-white mb-1">Impact:</h4>
                                            <p className="text-gray-700 dark:text-gray-300 text-sm">{sponsor.impact}</p>
                                          </div>
                                      )}

                                      <a
                                          href={sponsor.website}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                                      >
                                        Visit Website
                                        <ExternalLink className="h-4 w-4 ml-1" />
                                      </a>
                                    </div>
                                  </div>
                              ))}
                            </div>
                          </div>
                      ))
                  ) : (
                      <div className="text-center py-12">
                        <div className="bg-gray-100 dark:bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Calendar className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          No sponsors found for {filterYear}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Try selecting a different year or view all sponsors.
                        </p>
                      </div>
                  )}

                  {/* Call to Action */}
                  <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Join Our Sponsor Community</h2>
                    <p className="text-blue-100 mb-6 max-w-3xl mx-auto">
                      Become part of our story by supporting Tech Dev Club. Your sponsorship will help us continue to grow and empower developers worldwide.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a
                          href="/become-sponsor"
                          className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <Heart className="h-5 w-5 mr-2" />
                        Become a Sponsor
                      </a>
                      <a
                          href="/sponsor-benefits"
                          className="inline-flex items-center px-6 py-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors"
                      >
                        <Award className="h-5 w-5 mr-2" />
                        View Sponsor Benefits
                      </a>
                    </div>
                  </div>
                </>
            )}
          </div>
        </section>
      </div>
  );
};

export default PastSponsors;
