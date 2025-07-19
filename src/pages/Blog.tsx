import React, { useState, useEffect } from 'react';
import { Calendar, User, Tag, Clock, Plus, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import BlogPreviewModal from '../components/BlogPreviewModal';
import { useSEO } from '../hooks/useSEO';
import { getFormLink } from '../data/formLinks';
import BlogCard from '../components/BlogCard';

// Import blog data
import blogsData from '../data/blogs.json';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  authorLinkedIn?: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  category: string;
  isApproved: boolean;
  featured: boolean;
}

const Blog: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // Set SEO metadata
  useSEO({
    title: 'Developer Blog - Insights, Tutorials & Tech Trends',
    description: 'Read insightful articles, tutorials, and stories from our community of developers. Stay updated with the latest tech trends and best practices.',
    keywords: 'developer blog, tech articles, programming tutorials, coding tips, software development, web development, tech trends, developer community',
    structuredData: {
      type: 'Blog',
      data: {
        name: 'Tech Dev Club Blog',
        description: 'Insights, tutorials, and stories from our developer community',
        url: 'https://techdevclub.com/blog',
        publisher: {
          '@type': 'Organization',
          name: 'Tech Dev Club',
          logo: {
            '@type': 'ImageObject',
            url: 'https://techdevclub.com/logo.png'
          }
        }
      }
    }
  });

  useEffect(() => {
    // Load blog posts from the imported JSON data
    setPosts(blogsData.blogs);
  }, []);

  const categories = Array.from(new Set(posts.map(post => post.category)));
  const featuredPosts = posts.filter(post => post.featured && post.isApproved);
  
  const filteredPosts = posts.filter(post => {
    if (!post.isApproved) return false;
    
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleReadMore = (post: BlogPost) => {
    setSelectedBlog(post);
    setIsPreviewModalOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewModalOpen(false);
    setSelectedBlog(null);
  };
  
  const handleBlogSubmission = () => {
    const blogFormLink = getFormLink('blog-submission');
    window.open(blogFormLink?.url || 'https://forms.gle/blog-submission-form', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-hero-light dark:bg-hero-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
            Community Blog
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8 animate-slide-up animation-delay-200">
            Insights, tutorials, and stories from our developer community
          </p>
          <button
            onClick={handleBlogSubmission}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center mx-auto w-fit animate-slide-up animation-delay-400 shadow-lg hover:shadow-xl"
          >
            <Plus className="h-5 w-5 mr-2" />
            Submit Your Blog Post
          </button>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 animate-slide-up">
              Featured Posts
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <BlogCard 
                  key={post.id} 
                  blog={post} 
                  onClick={() => handleReadMore(post)} 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search and Filter */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <BlogCard 
                  key={post.id} 
                  blog={post} 
                  onClick={() => handleReadMore(post)} 
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Blog Preview Modal */}
      <BlogPreviewModal
        blog={selectedBlog}
        isOpen={isPreviewModalOpen}
        onClose={handleClosePreview}
      />
    </div>
  );
};

export default Blog;