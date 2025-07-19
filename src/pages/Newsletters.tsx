import React, { useState, useEffect } from 'react';
import { Mail, Calendar, Download, ExternalLink, Search } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

interface Newsletter {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  pdfUrl: string;
  webUrl: string;
}

const Newsletters: React.FC = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Set SEO metadata
  useSEO({
    title: 'Newsletters - Tech Dev Club',
    description: 'Subscribe to our newsletter and browse past issues to stay updated with Tech Dev Club.',
    keywords: 'tech newsletter, developer newsletter, coding updates, programming news, tech community newsletter',
  });

  useEffect(() => {
    // In a real app, this would fetch from an API or JSON file
    const fetchNewsletters = async () => {
      try {
        // Simulating data fetch
        const sampleNewsletters: Newsletter[] = [
          {
            id: '1',
            title: 'November 2024: AI & Blockchain Conference Special',
            description: 'Special edition featuring our upcoming TechFront AI & Blockchain Conference, speaker spotlights, and community highlights.',
            date: '2024-11-01',
            imageUrl: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            pdfUrl: '/newsletters/nov-2024.pdf',
            webUrl: '/newsletters/nov-2024'
          },
          {
            id: '2',
            title: 'October 2024: Hacktoberfest Roundup',
            description: 'Celebrating Hacktoberfest achievements, open source project highlights, and upcoming workshop announcements.',
            date: '2024-10-01',
            imageUrl: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            pdfUrl: '/newsletters/oct-2024.pdf',
            webUrl: '/newsletters/oct-2024'
          },
          {
            id: '3',
            title: 'September 2024: Back to Code',
            description: 'Fall coding challenges, new learning resources, and community project updates to kickstart your autumn.',
            date: '2024-09-01',
            imageUrl: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            pdfUrl: '/newsletters/sep-2024.pdf',
            webUrl: '/newsletters/sep-2024'
          },
          {
            id: '4',
            title: 'August 2024: Summer of Code Recap',
            description: 'Highlights from our Summer of Code program, project showcases, and member spotlights.',
            date: '2024-08-01',
            imageUrl: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            pdfUrl: '/newsletters/aug-2024.pdf',
            webUrl: '/newsletters/aug-2024'
          },
          {
            id: '5',
            title: 'July 2024: Mid-Year Tech Trends',
            description: 'Analysis of mid-year tech trends, community growth updates, and upcoming event announcements.',
            date: '2024-07-01',
            imageUrl: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            pdfUrl: '/newsletters/jul-2024.pdf',
            webUrl: '/newsletters/jul-2024'
          },
          {
            id: '6',
            title: 'June 2024: Summer Learning Special',
            description: 'Summer learning resources, coding challenges, and community project opportunities to boost your skills.',
            date: '2024-06-01',
            imageUrl: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            pdfUrl: '/newsletters/jun-2024.pdf',
            webUrl: '/newsletters/jun-2024'
          }
        ];
        
        setNewsletters(sampleNewsletters);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching newsletters:', error);
        setLoading(false);
      }
    };

    fetchNewsletters();
  }, []);

  // Filter newsletters based on search term
  const filteredNewsletters = newsletters.filter(newsletter => 
    newsletter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    newsletter.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle newsletter subscription
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, this would call an API to subscribe the user
      console.log(`Subscribing email: ${email}`);
      setSubscribed(true);
      setEmail('');
      
      // Reset the subscribed state after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-slide-up">
            Newsletters
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto animate-slide-up animation-delay-200">
            Stay updated with the latest news, events, and resources from Tech Dev Club
          </p>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Subscribe to Our Newsletter
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Get the latest updates, event announcements, and tech insights delivered directly to your inbox.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-600 dark:text-gray-400">Monthly delivery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-600 dark:text-gray-400">Exclusive content</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-600 dark:text-gray-400">Community highlights</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-600 dark:text-gray-400">No spam, unsubscribe anytime</span>
                  </li>
                </ul>
              </div>
              
              <div className="md:w-1/2">
                {subscribed ? (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
                    <p className="text-green-700 dark:text-green-300 font-medium">
                      Thanks for subscribing! Please check your email to confirm your subscription.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your.email@example.com"
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100"
                          required
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      Subscribe
                    </button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      By subscribing, you agree to receive our newsletter and accept our <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Archive */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Newsletter Archive
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Browse our past newsletters to catch up on community news and updates
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search newsletters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredNewsletters.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No newsletters found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We couldn't find any newsletters matching your search.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNewsletters.map((newsletter) => (
                <div 
                  key={newsletter.id}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <img 
                      src={newsletter.imageUrl} 
                      alt={newsletter.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(newsletter.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {newsletter.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {newsletter.description}
                    </p>
                    
                    <div className="flex space-x-3">
                      <a 
                        href={newsletter.webUrl}
                        className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                      >
                        Read Online
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                      <a 
                        href={newsletter.pdfUrl}
                        download
                        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium"
                      >
                        Download PDF
                        <Download className="h-4 w-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Newsletters;