import React, { useState, useEffect } from 'react';
import { Award, Check, X, Download, ExternalLink, FileText } from 'lucide-react';

// Define the interface for benefit data
interface BenefitCategory {
  id: string;
  name: string;
  benefits: Benefit[];
}

interface Benefit {
  id: string;
  name: string;
  description: string;
  tiers: {
    diamond: boolean | string;
    gold: boolean | string;
    silver: boolean | string;
  };
}

const SponsorBenefits: React.FC = () => {
  const [benefitCategories, setBenefitCategories] = useState<BenefitCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load benefit data from JSON file
    // In a real application, this would be an API call
    const loadBenefits = async () => {
      try {
        // Import the JSON data
        // Note: Update the path if your JSON file is located elsewhere
        const data = await import('../data/sponsorBenefits.json');
        setBenefitCategories(data.benefitCategories);
        setLoading(false);
      } catch (error) {
        console.error('Error loading sponsor benefits:', error);
        // Fallback data in case the JSON file is not available
        setBenefitCategories([
          {
            id: "brand-visibility",
            name: "Brand Visibility",
            benefits: [
              {
                id: "logo-website",
                name: "Logo on Website",
                description: "Your company logo displayed on the Tech Dev Club website.",
                tiers: {
                  diamond: "Homepage (Large)",
                  gold: "Homepage (Medium)",
                  silver: "Sponsors Page"
                }
              },
              {
                id: "social-media",
                name: "Social Media Promotion",
                description: "Mentions and features on Tech Dev Club social media channels.",
                tiers: {
                  diamond: "5 posts/month",
                  gold: "3 posts/month",
                  silver: "1 post/month"
                }
              },
              {
                id: "newsletter",
                name: "Newsletter Feature",
                description: "Mention in our monthly newsletter sent to all community members.",
                tiers: {
                  diamond: "Featured section",
                  gold: true,
                  silver: true
                }
              },
              {
                id: "event-branding",
                name: "Event Branding",
                description: "Logo placement at Tech Dev Club events.",
                tiers: {
                  diamond: "Premium placement",
                  gold: "Standard placement",
                  silver: "Group placement"
                }
              }
            ]
          },
          {
            id: "event-benefits",
            name: "Event Benefits",
            benefits: [
              {
                id: "speaking-opportunities",
                name: "Speaking Opportunities",
                description: "Opportunities to speak at Tech Dev Club events.",
                tiers: {
                  diamond: "Dedicated session",
                  gold: "Panel participation",
                  silver: false
                }
              },
              {
                id: "booth-space",
                name: "Booth/Exhibition Space",
                description: "Space to showcase your company at major events.",
                tiers: {
                  diamond: "Premium location",
                  gold: "Standard location",
                  silver: false
                }
              },
              {
                id: "event-tickets",
                name: "Complimentary Event Tickets",
                description: "Free tickets to Tech Dev Club events.",
                tiers: {
                  diamond: "10 tickets",
                  gold: "5 tickets",
                  silver: "2 tickets"
                }
              },
              {
                id: "workshop-hosting",
                name: "Workshop Hosting",
                description: "Opportunity to host technical workshops.",
                tiers: {
                  diamond: "4 per year",
                  gold: "2 per year",
                  silver: false
                }
              }
            ]
          },
          {
            id: "recruitment",
            name: "Recruitment & Community",
            benefits: [
              {
                id: "talent-access",
                name: "Talent Pool Access",
                description: "Access to our community of skilled developers.",
                tiers: {
                  diamond: "Priority access",
                  gold: true,
                  silver: true
                }
              },
              {
                id: "job-postings",
                name: "Job Postings",
                description: "Post job openings to our job board.",
                tiers: {
                  diamond: "Unlimited",
                  gold: "10 per year",
                  silver: "5 per year"
                }
              },
              {
                id: "resume-book",
                name: "Resume Book",
                description: "Access to opt-in resume collection from members.",
                tiers: {
                  diamond: true,
                  gold: true,
                  silver: false
                }
              },
              {
                id: "networking",
                name: "Networking Opportunities",
                description: "Connect with community members and other sponsors.",
                tiers: {
                  diamond: "VIP events",
                  gold: "All events",
                  silver: "Select events"
                }
              }
            ]
          },
          {
            id: "content",
            name: "Content & Collaboration",
            benefits: [
              {
                id: "blog-post",
                name: "Guest Blog Post",
                description: "Publish technical content on our blog.",
                tiers: {
                  diamond: "4 per year",
                  gold: "2 per year",
                  silver: "1 per year"
                }
              },
              {
                id: "webinar",
                name: "Webinar Hosting",
                description: "Host webinars for our community.",
                tiers: {
                  diamond: "4 per year",
                  gold: "2 per year",
                  silver: false
                }
              },
              {
                id: "hackathon",
                name: "Hackathon Sponsorship",
                description: "Sponsor challenges at our hackathons.",
                tiers: {
                  diamond: "Premium sponsor",
                  gold: "Standard sponsor",
                  silver: "Basic sponsor"
                }
              },
              {
                id: "project-collaboration",
                name: "Open Source Collaboration",
                description: "Collaborate on community open source projects.",
                tiers: {
                  diamond: true,
                  gold: true,
                  silver: true
                }
              }
            ]
          }
        ]);
        setLoading(false);
      }
    };

    loadBenefits();
  }, []);

  // Render check or x based on benefit availability
  const renderAvailability = (value: boolean | string) => {
    if (typeof value === 'string') {
      return <span className="text-blue-600 dark:text-blue-400 font-medium">{value}</span>;
    }
    
    return value ? (
      <Check className="h-5 w-5 text-green-500" />
    ) : (
      <X className="h-5 w-5 text-red-500" />
    );
  };

  const handleDownloadProspectus = () => {
    window.open('/files/TechDevClub-Sponsorship-Prospectus-2025.pdf', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-indigo-900 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Sponsor Benefits</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Why brands choose Tech Dev Club as their partner to connect with the developer community.
          </p>
          <div className="mt-8">
            <button
              onClick={handleDownloadProspectus}
              className="inline-flex items-center bg-white text-blue-700 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg"
            >
              <FileText className="h-5 w-5 mr-2" />
              Download Sponsorship Prospectus
            </button>
          </div>
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
              {/* Tier Overview */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Sponsorship Tiers</h2>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-t-4 border-blue-600">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Diamond</h3>
                        <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">$1200 OR 1,00,000 INR</div>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Our premium tier with maximum visibility and exclusive benefits for industry leaders.
                      </p>
                      <a 
                        href="/become-sponsor" 
                        className="block w-full py-3 text-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                      >
                        Become a Diamond Sponsor
                      </a>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-t-4 border-yellow-500">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Gold</h3>
                        <Award className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
                      </div>
                      <div className="text-3xl font-bold text-yellow-500 dark:text-yellow-400 mb-4">$600 OR 50,000 INR</div>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        High visibility sponsorship with premium benefits and strong community presence.
                      </p>
                      <a 
                        href="/become-sponsor" 
                        className="block w-full py-3 text-center bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors"
                      >
                        Become a Gold Sponsor
                      </a>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-t-4 border-gray-400">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Silver</h3>
                        <Award className="h-6 w-6 text-gray-400 dark:text-gray-300" />
                      </div>
                      <div className="text-3xl font-bold text-gray-500 dark:text-gray-400 mb-4">$2,50 OR 25,000 INR</div>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Entry-level sponsorship with valuable benefits at an accessible price point.
                      </p>
                      <a 
                        href="/become-sponsor" 
                        className="block w-full py-3 text-center bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                      >
                        Become a Silver Sponsor
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Detailed Benefits Table */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Detailed Benefits</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-800">
                        <th className="py-4 px-6 text-left text-gray-900 dark:text-white font-bold">Benefit</th>
                        <th className="py-4 px-6 text-center text-blue-600 dark:text-blue-400 font-bold">Diamond</th>
                        <th className="py-4 px-6 text-center text-yellow-500 dark:text-yellow-400 font-bold">Gold</th>
                        <th className="py-4 px-6 text-center text-gray-500 dark:text-gray-400 font-bold">Silver</th>
                      </tr>
                    </thead>
                    <tbody>
                      {benefitCategories.map((category) => (
                        <React.Fragment key={category.id}>
                          <tr className="bg-blue-50 dark:bg-blue-900/20">
                            <td 
                              colSpan={4} 
                              className="py-3 px-6 text-blue-800 dark:text-blue-200 font-bold"
                            >
                              {category.name}
                            </td>
                          </tr>
                          {category.benefits.map((benefit) => (
                            <tr 
                              key={benefit.id} 
                              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                            >
                              <td className="py-4 px-6">
                                <div className="font-medium text-gray-900 dark:text-white">{benefit.name}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</div>
                              </td>
                              <td className="py-4 px-6 text-center">
                                {renderAvailability(benefit.tiers.diamond)}
                              </td>
                              <td className="py-4 px-6 text-center">
                                {renderAvailability(benefit.tiers.gold)}
                              </td>
                              <td className="py-4 px-6 text-center">
                                {renderAvailability(benefit.tiers.silver)}
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Prospectus Download */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Download Full Sponsorship Prospectus</h2>
                <p className="text-blue-100 mb-6 max-w-3xl mx-auto">
                  For a detailed overview of all sponsorship benefits, tiers, and opportunities, download our complete sponsorship prospectus.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={handleDownloadProspectus}
                    className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <FileText className="h-5 w-5 mr-2" />
                    Download Prospectus
                  </button>
                  <a 
                    href="/become-sponsor" 
                    className="inline-flex items-center px-6 py-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Become a Sponsor
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

export default SponsorBenefits;