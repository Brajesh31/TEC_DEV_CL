import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  FileText, 
  FolderOpen, 
  CheckCircle, 
  XCircle, 
  Eye,
  BarChart3,
  TrendingUp,
  Clock,
  Shield
} from 'lucide-react';

const Admin: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'members' | 'events' | 'projects' | 'blogs'>('dashboard');
  const [members, setMembers] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/');
      return;
    }

    // Load data from localStorage
    setMembers(JSON.parse(localStorage.getItem('members') || '[]'));
    setEvents(JSON.parse(localStorage.getItem('events') || '[]'));
    setProjects(JSON.parse(localStorage.getItem('projects') || '[]'));
    setBlogs(JSON.parse(localStorage.getItem('blogs') || '[]'));
  }, [user, isAdmin, navigate]);

  const approveMember = (memberId: string) => {
    const updatedMembers = members.map(member =>
      member.id === memberId ? { ...member, status: 'approved' } : member
    );
    setMembers(updatedMembers);
    localStorage.setItem('members', JSON.stringify(updatedMembers));
  };

  const approveProject = (projectId: string) => {
    const updatedProjects = projects.map(project =>
      project.id === projectId ? { ...project, isApproved: true } : project
    );
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const approveBlog = (blogId: string) => {
    const updatedBlogs = blogs.map(blog =>
      blog.id === blogId ? { ...blog, isApproved: true } : blog
    );
    setBlogs(updatedBlogs);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
  };

  const rejectItem = (type: string, itemId: string) => {
    if (type === 'member') {
      const updatedMembers = members.map(member =>
        member.id === itemId ? { ...member, status: 'rejected' } : member
      );
      setMembers(updatedMembers);
      localStorage.setItem('members', JSON.stringify(updatedMembers));
    } else if (type === 'project') {
      const updatedProjects = projects.map(project =>
        project.id === itemId ? { ...project, isApproved: false } : project
      );
      setProjects(updatedProjects);
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
    } else if (type === 'blog') {
      const updatedBlogs = blogs.map(blog =>
        blog.id === itemId ? { ...blog, isApproved: false } : blog
      );
      setBlogs(updatedBlogs);
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    }
  };

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Shield className="h-16 w-16 mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  const stats = {
    totalMembers: members.length,
    pendingMembers: members.filter(m => m.status === 'pending').length,
    totalEvents: events.length,
    upcomingEvents: events.filter(e => e.isUpcoming).length,
    totalProjects: projects.length,
    pendingProjects: projects.filter(p => !p.isApproved).length,
    totalBlogs: blogs.length,
    pendingBlogs: blogs.filter(b => !b.isApproved).length,
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'blogs', label: 'Blogs', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage community content and member approvals
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                    <div className="flex items-center">
                      <Users className="h-8 w-8 mb-4" />
                      <div className="ml-4">
                        <p className="text-blue-100">Total Members</p>
                        <p className="text-2xl font-bold">{stats.totalMembers}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                    <div className="flex items-center">
                      <Calendar className="h-8 w-8 mb-4" />
                      <div className="ml-4">
                        <p className="text-green-100">Upcoming Events</p>
                        <p className="text-2xl font-bold">{stats.upcomingEvents}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                    <div className="flex items-center">
                      <FolderOpen className="h-8 w-8 mb-4" />
                      <div className="ml-4">
                        <p className="text-purple-100">Active Projects</p>
                        <p className="text-2xl font-bold">{stats.totalProjects}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 mb-4" />
                      <div className="ml-4">
                        <p className="text-orange-100">Published Blogs</p>
                        <p className="text-2xl font-bold">{stats.totalBlogs}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pending Items */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Pending Members
                      </h3>
                      <Clock className="h-5 w-5 text-yellow-500" />
                    </div>
                    <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-500">
                      {stats.pendingMembers}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Awaiting approval
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Pending Projects
                      </h3>
                      <Clock className="h-5 w-5 text-yellow-500" />
                    </div>
                    <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-500">
                      {stats.pendingProjects}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Awaiting review
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Pending Blogs
                      </h3>
                      <Clock className="h-5 w-5 text-yellow-500" />
                    </div>
                    <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-500">
                      {stats.pendingBlogs}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Awaiting publication
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'members' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Member Management
                </h2>
                {members.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-400">No member applications yet.</p>
                ) : (
                  <div className="space-y-4">
                    {members.map((member) => (
                      <div
                        key={member.id}
                        className="border border-gray-200 dark:border-gray-600 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4">
                              <div>
                
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                  {member.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {member.email}
                                </p>
                              </div>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  member.status === 'approved'
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                    : member.status === 'rejected'
                                    ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                                }`}
                              >
                                {member.status}
                              </span>
                            </div>
                            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                              <p><strong>Experience:</strong> {member.experience}</p>
                              <p><strong>Skills:</strong> {member.skills}</p>
                              <p><strong>Why join:</strong> {member.whyJoin}</p>
                            </div>
                          </div>
                          {member.status === 'pending' && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => approveMember(member.id)}
                                className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                              >
                                <CheckCircle className="h-4 w-4" />
                                <span>Approve</span>
                              </button>
                              <button
                                onClick={() => rejectItem('member', member.id)}
                                className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                              >
                                <XCircle className="h-4 w-4" />
                                <span>Reject</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'events' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Event Management
                </h2>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="border border-gray-200 dark:border-gray-600 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {event.date} at {event.time} - {event.location}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {event.attendees} / {event.maxAttendees} attendees
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            event.isUpcoming
                              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'
                          }`}
                        >
                          {event.isUpcoming ? 'Upcoming' : 'Completed'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Project Management
                </h2>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="border border-gray-200 dark:border-gray-600 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {project.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                by {project.author}
                              </p>
                            </div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                project.isApproved
                                  ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                  : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                              }`}
                            >
                              {project.isApproved ? 'Approved' : 'Pending'}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {project.description}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {project.techStack.map((tech: string) => (
                              <span
                                key={tech}
                                className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        {!project.isApproved && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => approveProject(project.id)}
                              className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                            >
                              <CheckCircle className="h-4 w-4" />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => rejectItem('project', project.id)}
                              className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                            >
                              <XCircle className="h-4 w-4" />
                              <span>Reject</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'blogs' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Blog Management
                </h2>
                {blogs.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-400">No blog submissions yet.</p>
                ) : (
                  <div className="space-y-4">
                    {blogs.map((blog) => (
                      <div
                        key={blog.id}
                        className="border border-gray-200 dark:border-gray-600 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4">
                              <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                  {blog.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  by {blog.author}
                                </p>
                              </div>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  blog.isApproved
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                                }`}
                              >
                                {blog.isApproved ? 'Published' : 'Pending'}
                              </span>
                            </div>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                              {blog.excerpt}
                            </p>
                          </div>
                          {!blog.isApproved && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => approveBlog(blog.id)}
                                className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                              >
                                <CheckCircle className="h-4 w-4" />
                                <span>Publish</span>
                              </button>
                              <button
                                onClick={() => rejectItem('blog', blog.id)}
                                className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                              >
                                <XCircle className="h-4 w-4" />
                                <span>Reject</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;