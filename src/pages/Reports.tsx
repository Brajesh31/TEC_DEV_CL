import React, { useState, useEffect } from 'react';
import { FileText, Download, Calendar, Filter, Search, ExternalLink } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

interface Report {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'annual' | 'quarterly' | 'impact' | 'survey' | 'whitepaper';
  coverImage: string;
  pdfUrl: string;
  webUrl?: string;
  tags: string[];
  featured: boolean;
}

const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Set SEO metadata
  useSEO({
    title: 'Reports & Insights - Tech Dev Club',
    description: 'Access our reports, surveys, and insights about the tech community and industry trends.',
    keywords: 'tech reports, developer surveys, industry insights, programming trends, tech community data',
  });

  useEffect(() => {
    // In a real app, this would fetch from an API or JSON file
    const fetchReports = async () => {
      try {
        // Simulating data fetch
        const sampleReports: Report[] = [
           {
            id: '1',
            title: 'Tech Dev Club Annual Report 2024',
            description: 'A comprehensive overview of our community growth, achievements, events, and impact throughout 2024.',
            date: '2024-12-15',
            type: 'annual',
            coverImage: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            pdfUrl: '/reports/annual-report-2024.pdf',
            webUrl: '/reports/annual-report-2024',
            tags: ['Annual Report', 'Community Growth', 'Impact'],
            featured: true
          },
          {
            id: '2',
            title: 'Developer Skills Survey 2024',
            description: 'Results from our annual survey of over 5,000 developers about their skills, learning preferences, and career aspirations.',
            date: '2024-11-10',
            type: 'survey',
            coverImage: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            pdfUrl: '/reports/developer-skills-survey-2024.pdf',
            webUrl: '/reports/developer-skills-survey-2024',
            tags: ['Survey', 'Skills', 'Career', 'Learning'],
            featured: true
          },
          {
            id: '3',
            title: 'Q3 2024 Community Update',
            description: 'Quarterly report highlighting our community activities, project updates, and plans for the upcoming quarter.',
            date: '2024-10-05',
            type: 'quarterly',
            coverImage: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            pdfUrl: '/reports/q3-2024-update.pdf',
            tags: ['Quarterly Report', 'Community Update', 'Projects'],
            featured: false
          },
          {
            id: '4',
            title: 'Mentorship Program Impact Report',
            description: 'Analysis of our mentorship program\'s impact on participants\' skills, confidence, and career progression.',
            date: '2024-09-20',
            type: 'impact',
            coverImage: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            pdfUrl: '/reports/mentorship-impact-2024.pdf',
            webUrl: '/reports/mentorship-impact-2024',
            tags: ['Mentorship', 'Impact', 'Career Development'],
            featured: false
          },
          {
            id: '5',
            title: 'The State of AI in Developer Tools',
            description: 'A whitepaper exploring how AI is transforming developer tools and workflows, with insights from industry experts.',
            date: '2024-08-15',
            type: 'whitepaper',
            coverImage: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            pdfUrl: '/reports/ai-developer-tools-2024.pdf',
            webUrl: '/reports/ai-developer-tools-2024',
            tags: ['AI', 'Developer Tools', 'Productivity', 'Future Trends'],
            featured: true
          },
          {
            id: '6',
            title: 'Q2 2024 Community Update',
            description: 'Quarterly report highlighting our community activities, project updates, and plans for the upcoming quarter.',
            date: '2024-07-10',
            type: 'quarterly',
            coverImage: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            pdfUrl: '/reports/q2-2024-update.pdf',
            tags: ['Quarterly Report', 'Community Update', 'Projects'],
            featured: false
          },
          {
            id: '7',
            title: 'Hackathon Impact Study',
            description: 'Analysis of how our hackathons contribute to skill development, networking, and project creation.',
            date: '2024-06-25',
            type: 'impact',
            coverImage: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            pdfUrl: '/reports/hackathon-impact-study.pdf',
            tags: ['Hackathon', 'Impact', 'Skill Development', 'Projects'],
            featured: false
          },
          {
            id: '8',
            title: 'Remote Work in Tech: Trends and Best Practices',
            description: 'A comprehensive look at remote work trends in the tech industry, challenges, and strategies for success.',
            date: '2024-05-20',
            type: 'whitepaper',
            coverImage: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            pdfUrl: '/reports/remote-work-tech-2024.pdf',
            webUrl: '/reports/remote-work-tech-2024',
            tags: ['Remote Work', 'Work Culture', 'Productivity', 'Best Practices'],
            featured: false
          }
        ];
        
        setReports(sampleReports);
        setFilteredReports(sampleReports);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reports:', error);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Filter reports based on search term and type
  useEffect(() => {
    const filtered = reports.filter(report => {
      const matchesSearch = 
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = selectedType === 'all' || report.type === selectedType;
      
      return matchesSearch && matchesType;
    });
    
    setFilteredReports(filtered);
  }, [searchTerm, selectedType, reports]);

  // Get report type display name
  const getReportTypeName = (type: string) => {
    switch (type) {
      case 'annual':
        return 'Annual Report';
      case 'quarterly':
        return 'Quarterly Update';
      case 'impact':
        return 'Impact Report';
      case 'survey':
        return 'Survey Results';
      case 'whitepaper':
        return 'Whitepaper';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  // Get report type color
  const getReportTypeColor = (type: string) => {
    switch (type) {
      case 'annual':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
      case 'quarterly':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'impact':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300';
      case 'survey':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      case 'whitepaper':
        return 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-slide-up">
            Reports & Insights
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto animate-slide-up animation-delay-200">
            Access our reports, surveys, and insights about the tech community and industry trends
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100"
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100"
              >
                <option value="all">All Types</option>
                <option value="annual">Annual Reports</option>
                <option value="quarterly">Quarterly Updates</option>
                <option value="impact">Impact Reports</option>
                <option value="survey">Survey Results</option>
                <option value="whitepaper">Whitepapers</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Reports */}
      {!loading && reports.filter(report => report.featured).length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Featured Reports
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reports.filter(report => report.featured).map((report) => (
                <div 
                  key={report.id}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <img 
                      src={report.coverImage} 
                      alt={report.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getReportTypeColor(report.type)}`}>
                        {getReportTypeName(report.type)}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(report.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {report.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {report.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {report.tags.slice(0, 3).map((tag, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {report.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                          +{report.tags.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex space-x-3">
                      <a 
                        href={report.pdfUrl}
                        download
                        className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                      >
                        Download PDF
                        <Download className="h-4 w-4 ml-1" />
                      </a>
                      {report.webUrl && (
                        <a 
                          href={report.webUrl}
                          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium"
                        >
                          Read Online
                          <ExternalLink className="h-4 w-4 ml-1" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Reports */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            {selectedType === 'all' ? 'All Reports' : `${getReportTypeName(selectedType)}s`}
          </h2>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No reports found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredReports
                .filter(report => !report.featured || selectedType !== 'all')
                .map((report) => (
                  <div 
                    key={report.id}
                    className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="h-40 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <img 
                        src={report.coverImage} 
                        alt={report.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getReportTypeColor(report.type)}`}>
                          {getReportTypeName(report.type)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(report.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {report.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                        {report.description}
                      </p>
                      
                      <div className="flex space-x-3">
                        <a 
                          href={report.pdfUrl}
                          download
                          className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm"
                        >
                          Download PDF
                          <Download className="h-4 w-4 ml-1" />
                        </a>
                        {report.webUrl && (
                          <a 
                            href={report.webUrl}
                            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium text-sm"
                          >
                            Read Online
                            <ExternalLink className="h-4 w-4 ml-1" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Stay Informed
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive new reports and insights directly in your inbox
          </p>
          <a 
            href="/newsletters"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
          >
            Subscribe to Newsletter
          </a>
        </div>
      </section>
    </div>
  );
};

export default Reports;