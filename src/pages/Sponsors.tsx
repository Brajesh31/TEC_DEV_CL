import React, { useState, useEffect } from 'react';
import { ExternalLink, DollarSign, FileText } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import sponsorJson from '../data/sponsor.json'; // ✅ Direct import from src/data

type SponsorLevel =
    | 'title'
    | 'credential'
    | 'platform'
    | 'platinum'
    | 'gold'
    | 'silver'
    | 'bronze'
    | 'partner';

interface Sponsor {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  tier: string;
  years: string[];
}

const levelMap: Record<string, SponsorLevel> = {
  'Title Sponsor': 'title',
  'Credential Partner': 'credential',
  'Platform Partner': 'platform',
  'Platinum Sponsor': 'platinum',
  'Gold Sponsor': 'gold',
  'Silver Sponsor': 'silver',
  'Bronze Sponsor': 'bronze',
  'Community Partner': 'partner',
};

const levelInfo: Record<SponsorLevel, { name: string; color: string }> = {
  title: {
    name: 'Title Sponsor',
    color: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
  },
  credential: {
    name: 'Credential Partner',
    color: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
  },
  platform: {
    name: 'Platform Partner',
    color: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
  },
  platinum: {
    name: 'Platinum Sponsors',
    color: 'bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200',
  },
  gold: {
    name: 'Gold Sponsors',
    color: 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200',
  },
  silver: {
    name: 'Silver Sponsors',
    color: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
  },
  bronze: {
    name: 'Bronze Sponsors',
    color: 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200',
  },
  partner: {
    name: 'Community Partners',
    color: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
  },
};

const Sponsors: React.FC = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  useSEO({
    title: 'Our Sponsors - Tech Dev Club',
    description: 'Meet the organizations that support Tech Dev Club and help us empower the global developer community.',
    keywords: 'tech sponsors, community supporters, tech partners, developer community sponsors',
  });

  useEffect(() => {
    const loadedSponsors = sponsorJson.sponsors;
    setSponsors(loadedSponsors);
  }, []);

  const levels = ['all', ...Array.from(new Set(sponsors.map(s => levelMap[s.tier] || 'other')))];

  const filteredSponsors = selectedLevel === 'all'
      ? sponsors
      : sponsors.filter(s => levelMap[s.tier] === selectedLevel);

  const sponsorsByLevel: Record<string, Sponsor[]> = {};
  (selectedLevel === 'all' ? sponsors : filteredSponsors).forEach(s => {
    const level = levelMap[s.tier] || 'other';
    if (!sponsorsByLevel[level]) sponsorsByLevel[level] = [];
    sponsorsByLevel[level].push(s);
  });

  const handleDownloadProspectus = () => {
    window.open('/files/TechDevClub-Sponsorship-Prospectus-2025.pdf', '_blank');
  };

  return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Sponsors</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Meet the organizations that support Tech Dev Club and help us empower the global developer community
            </p>
            <button
                onClick={handleDownloadProspectus}
                className="inline-flex items-center bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors duration-300 shadow-lg"
            >
              <FileText className="h-5 w-5 mr-2" />
              Download Sponsorship Prospectus
            </button>
          </div>
        </section>

        {/* Filter + Sponsors */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Filter Buttons */}
            <div className="mb-10 flex flex-wrap justify-center gap-3">
              {levels.map(level => (
                  <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                          selectedLevel === level
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                  >
                    {level === 'all' ? 'All Sponsors' : levelInfo[level as SponsorLevel]?.name || level}
                  </button>
              ))}
            </div>

            {/* Sponsors Display */}
            <div className="space-y-16">
              {Object.entries(sponsorsByLevel).map(([level, levelSponsors]) => (
                  <div key={level}>
                    <h3 className={`text-xl font-bold mb-8 text-center ${levelInfo[level as SponsorLevel]?.color || ''}`}>
                      {levelInfo[level as SponsorLevel]?.name || level}
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {levelSponsors.map(sponsor => (
                          <div
                              key={sponsor.id}
                              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                          >
                            <div className="h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-6">
                              <img
                                  src={sponsor.logo}
                                  alt={`${sponsor.name} logo`}
                                  className="max-h-full max-w-full object-contain"
                              />
                            </div>
                            <div className="p-6">
                              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{sponsor.name}</h4>
                              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                                {sponsor.description}
                              </p>
                              <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Sponsor since {sponsor.years[0]}
                          </span>
                                <a
                                    href={sponsor.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center text-sm font-medium"
                                >
                                  Visit Website <ExternalLink className="h-4 w-4 ml-1" />
                                </a>
                              </div>
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-gray-100 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Become a Sponsor</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Support our mission to empower developers worldwide and gain visibility in the tech ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                  href="/become-sponsor"
                  className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300"
              >
                Become a Sponsor
              </a>
              <button
                  onClick={handleDownloadProspectus}
                  className="inline-flex items-center bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 border border-primary-600 dark:border-primary-400 font-medium px-6 py-3 rounded-lg transition-colors duration-300 hover:bg-primary-50 dark:hover:bg-gray-600"
              >
                <FileText className="h-5 w-5 mr-2" />
                Download Prospectus
              </button>
            </div>
          </div>
        </section>
      </div>
  );
};

export default Sponsors;
