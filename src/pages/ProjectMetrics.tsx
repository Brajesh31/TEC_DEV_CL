import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Github, Star, GitFork, Users, Clock, Activity, Filter } from 'lucide-react';

// Interface for project metrics data
interface ProjectMetric {
  id: string;
  name: string;
  stars: number;
  forks: number;
  contributors: number;
  commits: number;
  pullRequests: number;
  issues: {
    open: number;
    closed: number;
  };
  lastUpdated: string;
  category: string;
  languages: {
    name: string;
    percentage: number;
  }[];
  activity: {
    month: string;
    commits: number;
    pullRequests: number;
    issues: number;
  }[];
}

// Since recharts is not available, we'll create simple chart components
const SimpleBarChart: React.FC<{ data: any[], dataKey: string, nameKey: string, fill: string }> = ({ data, dataKey, nameKey, fill }) => {
  const maxValue = Math.max(...data.map(item => item[dataKey]));
  
  return (
    <div className="w-full">
      {data.map((item, index) => (
        <div key={index} className="mb-3">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item[nameKey]}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{item[dataKey]}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className="h-2.5 rounded-full" 
              style={{ 
                width: `${(item[dataKey] / maxValue) * 100}%`,
                backgroundColor: fill
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const SimplePieChart: React.FC<{ data: any[], dataKey: string, nameKey: string }> = ({ data, dataKey, nameKey }) => {
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#14b8a6'];
  
  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: colors[index % colors.length] }}
            ></div>
            <span className="text-sm text-gray-700 dark:text-gray-300">{item[nameKey]}</span>
          </div>
        ))}
      </div>
      
      <div className="relative h-40 w-40 mx-auto">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {data.reduce((acc, item, index) => {
            const startAngle = acc.angle;
            const angle = (item[dataKey] / 100) * 360;
            const endAngle = startAngle + angle;
            
            // Convert angles to radians for calculation
            const startRad = (startAngle - 90) * Math.PI / 180;
            const endRad = (endAngle - 90) * Math.PI / 180;
            
            // Calculate path
            const x1 = 50 + 40 * Math.cos(startRad);
            const y1 = 50 + 40 * Math.sin(startRad);
            const x2 = 50 + 40 * Math.cos(endRad);
            const y2 = 50 + 40 * Math.sin(endRad);
            
            // Determine if the arc should be drawn as a large arc
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
            
            const path = (
              <path 
                key={index}
                d={pathData}
                fill={colors[index % colors.length]}
              />
            );
            
            return {
              angle: endAngle,
              paths: [...acc.paths, path]
            };
          }, { angle: 0, paths: [] as React.ReactNode[] }).paths}
        </svg>
      </div>
    </div>
  );
};

const ProjectMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<ProjectMetric[]>([]);
  const [filteredMetrics, setFilteredMetrics] = useState<ProjectMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');

  useEffect(() => {
    // Load metrics data from JSON file
    // In a real implementation, this would be an API call or import
    const loadMetrics = async () => {
      try {
        // For demonstration, we're creating sample data
        // In production, you would fetch this from your API or import from JSON
        const sampleMetrics: ProjectMetric[] = [
          {
            id: '1',
            name: 'Community Platform',
            stars: 5,
            forks: 8,
            contributors: 5,
            commits: 56,
            pullRequests: 2,
            issues: {
              open: 24,
              closed: 187
            },
            lastUpdated: '2023-11-20',
            category: 'Web Application',
            languages: [
              { name: 'JavaScript', percentage: 45 },
              { name: 'TypeScript', percentage: 30 },
              { name: 'CSS', percentage: 15 },
              { name: 'HTML', percentage: 10 }
            ],
            activity: [
              { month: 'Jun', commits: 5, pullRequests: 2, issues: 8 },
              { month: 'Jul', commits: 2, pullRequests: 5, issues: 2 },
              { month: 'Aug', commits: 8, pullRequests: 0, issues: 5 },
              { month: 'Sep', commits: 6, pullRequests: 8, issues: 2 },
              { month: 'Oct', commits: 2, pullRequests: 5, issues: 0 },
              { month: 'Nov', commits: 4, pullRequests: 0, issues: 6 }
            ]
          }
        ];
        
        setMetrics(sampleMetrics);
        setFilteredMetrics(sampleMetrics);
        setLoading(false);
      } catch (error) {
        console.error('Error loading metrics data:', error);
        setLoading(false);
      }
    };

    loadMetrics();
  }, []);

  // Filter metrics when category or timeframe changes
  useEffect(() => {
    const filtered = metrics.filter(metric => {
      const matchesCategory = selectedCategory === 'all' || metric.category === selectedCategory;
      
      // For timeframe filtering, we would normally filter the activity data
      // but for simplicity, we'll just return all metrics
      
      return matchesCategory;
    });
    
    setFilteredMetrics(filtered);
  }, [selectedCategory, selectedTimeframe, metrics]);

  // Get unique categories for filter
  const categories = ['all', ...new Set(metrics.map(m => m.category))];

  // Calculate total stats
  const totalStats = {
    stars: filteredMetrics.reduce((sum, metric) => sum + metric.stars, 0),
    forks: filteredMetrics.reduce((sum, metric) => sum + metric.forks, 0),
    contributors: filteredMetrics.reduce((sum, metric) => sum + metric.contributors, 0),
    commits: filteredMetrics.reduce((sum, metric) => sum + metric.commits, 0),
    pullRequests: filteredMetrics.reduce((sum, metric) => sum + metric.pullRequests, 0),
    openIssues: filteredMetrics.reduce((sum, metric) => sum + metric.issues.open, 0),
    closedIssues: filteredMetrics.reduce((sum, metric) => sum + metric.issues.closed, 0)
  };

  // Prepare data for charts
  const starData = filteredMetrics.map(metric => ({
    name: metric.name,
    stars: metric.stars
  })).sort((a, b) => b.stars - a.stars);

  const contributorData = filteredMetrics.map(metric => ({
    name: metric.name,
    contributors: metric.contributors
  })).sort((a, b) => b.contributors - a.contributors);

  const activityData = filteredMetrics.flatMap(metric => 
    metric.activity.map(a => ({
      month: a.month,
      project: metric.name,
      commits: a.commits,
      pullRequests: a.pullRequests,
      issues: a.issues
    }))
  );

  // Aggregate activity data by month
  const aggregatedActivityByMonth = activityData.reduce((acc, curr) => {
    const existingMonth = acc.find(item => item.month === curr.month);
    if (existingMonth) {
      existingMonth.commits += curr.commits;
      existingMonth.pullRequests += curr.pullRequests;
      existingMonth.issues += curr.issues;
    } else {
      acc.push({
        month: curr.month,
        commits: curr.commits,
        pullRequests: curr.pullRequests,
        issues: curr.issues
      });
    }
    return acc;
  }, [] as { month: string, commits: number, pullRequests: number, issues: number }[]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Project Metrics</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            See stats and insights about our open-source projects.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Category Filter */}
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
              >
                <option value="all">All Categories</option>
                {categories.filter(c => c !== 'all').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Timeframe Filter */}
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400 mr-2" />
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
              >
                <option value="all">All Time</option>
                <option value="year">Past Year</option>
                <option value="6months">Past 6 Months</option>
                <option value="3months">Past 3 Months</option>
                <option value="month">Past Month</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Overview</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
              <div className="flex items-center mb-2">
                <Star className="h-6 w-6 text-yellow-500 mr-2" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Stars</h3>
              </div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalStats.stars.toLocaleString()}</div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
              <div className="flex items-center mb-2">
                <GitFork className="h-6 w-6 text-green-500 mr-2" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Forks</h3>
              </div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{totalStats.forks.toLocaleString()}</div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl">
              <div className="flex items-center mb-2">
                <Users className="h-6 w-6 text-purple-500 mr-2" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Contributors</h3>
              </div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{totalStats.contributors.toLocaleString()}</div>
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl">
              <div className="flex items-center mb-2">
                <Activity className="h-6 w-6 text-orange-500 mr-2" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Commits</h3>
              </div>
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{totalStats.commits.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Comparison */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Project Comparison</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Stars by Project</h3>
              <SimpleBarChart 
                data={starData.slice(0, 5)} 
                dataKey="stars" 
                nameKey="name" 
                fill="#3b82f6" 
              />
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Contributors by Project</h3>
              <SimpleBarChart 
                data={contributorData.slice(0, 5)} 
                dataKey="contributors" 
                nameKey="name" 
                fill="#8b5cf6" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Activity Trends */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Activity Trends</h2>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Monthly Activity</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Month
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Commits
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Pull Requests
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Issues
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                  {aggregatedActivityByMonth.map((activity, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {activity.month}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {activity.commits}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {activity.pullRequests}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {activity.issues}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Language Distribution */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Language Distribution</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {filteredMetrics.slice(0, 3).map(metric => (
              <div key={metric.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{metric.name}</h3>
                <SimplePieChart 
                  data={metric.languages} 
                  dataKey="percentage" 
                  nameKey="name" 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details Table */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Detailed Metrics</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Project
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Stars
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Forks
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Contributors
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Commits
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Pull Requests
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Open Issues
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Last Updated
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredMetrics.map(metric => (
                  <tr key={metric.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{metric.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{metric.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {metric.stars}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {metric.forks}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {metric.contributors}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {metric.commits}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {metric.pullRequests}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {metric.issues.open}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {new Date(metric.lastUpdated).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Contribute CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Contribute to Our Projects</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Help us improve these metrics by contributing to our open-source projects. Every contribution counts!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/featured-projects" 
              className="inline-block bg-white text-blue-700 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg"
            >
              Explore Projects
            </a>
            <a 
              href="/incubating-projects" 
              className="inline-block bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors duration-300"
            >
              Join Incubating Projects
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectMetrics;