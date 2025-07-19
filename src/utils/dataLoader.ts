import eventsData from '../data/events.json';
import blogsData from '../data/blogs.json';
import formsData from '../data/forms.json';
import galleryData from '../data/gallery.json';
import projectsData from '../data/projects.json';
import testimonialsData from '../data/testimonials.json';
import membersData from '../data/members.json';
import resourcesData from '../data/resources.json';
import spotlightsData from '../data/spotlights.json';
import speakersData from '../data/speakers.json';
import volunteersData from '../data/volunteers.json';

/**
 * Utility functions to load data from JSON files
 * All data is loaded from a single source of truth for each data type
 */

// Events - All event data comes from /data/events.json. Update this file to add/edit events.
export const getEvents = () => eventsData.events;
export const getEventById = (id: string) => eventsData.events.find(event => event.id === id);
export const getEventBySlug = (slug: string) => eventsData.events.find(event => event.slug === slug);
export const getUpcomingEvents = () => eventsData.events.filter(event => event.isUpcoming);
export const getFeaturedEvents = () => eventsData.events.filter(event => event.isFeatured);
export const getEventsByCategory = (category: string) => eventsData.events.filter(event => event.category === category);

// Blogs - All blog data comes from /data/blogs.json. Update this file to add/edit blogs.
export const getBlogs = () => blogsData.blogs;
export const getBlogById = (id: string) => blogsData.blogs.find(blog => blog.id === id);
export const getApprovedBlogs = () => blogsData.blogs.filter(blog => blog.isApproved);
export const getFeaturedBlogs = () => blogsData.blogs.filter(blog => blog.isApproved && blog.featured);
export const getBlogsByCategory = (category: string) => blogsData.blogs.filter(blog => blog.isApproved && blog.category === category);

// Forms - All form data comes from /data/forms.json. Update this file to add/edit forms.
export const getForms = () => formsData.forms;
export const getFormById = (id: string) => formsData.forms.find(form => form.id === id);
export const getEventForms = () => formsData.forms.filter(form => form.id.startsWith('event-'));
export const getCommunityForms = () => formsData.forms.filter(form => form.id.startsWith('community-'));

// Gallery - All gallery1 data comes from /data/gallery1.json. Update this file to add/edit gallery1 items.
export const getGalleryItems = () => galleryData.gallery;
export const getGalleryItemById = (id: string) => galleryData.gallery.find(item => item.id === id);
export const getGalleryItemsByCategory = (category: string) => galleryData.gallery.filter(item => item.category === category);

// Projects - All project data comes from /data/projects.json. Update this file to add/edit projects.
export const getProjects = () => projectsData.projects;
export const getProjectById = (id: string) => projectsData.projects.find(project => project.id === id);
export const getApprovedProjects = () => projectsData.projects.filter(project => project.isApproved);
export const getFeaturedProjects = () => projectsData.projects.filter(project => project.isApproved && project.featured);
export const getProjectsByStatus = (status: string) => projectsData.projects.filter(project => project.isApproved && project.status === status);

// Testimonials - All testimonial data comes from /data/testimonials.json. Update this file to add/edit testimonials.
export const getTestimonials = () => testimonialsData.testimonials;
export const getTestimonialById = (id: string) => testimonialsData.testimonials.find(testimonial => testimonial.id === id);
export const getFeaturedTestimonials = () => testimonialsData.testimonials.filter(testimonial => testimonial.featured);
export const getTestimonialsByCategory = (category: string) => testimonialsData.testimonials.filter(testimonial => testimonial.category === category);

// Members - All member data comes from /data/members.json. Update this file to add/edit members.
export const getMembers = () => membersData.members;
export const getMemberById = (id: string) => membersData.members.find(member => member.id === id);
export const getMembersByCategory = (category: string) => membersData.members.filter(member => member.category === category);
export const getCoreTeamMembers = () => membersData.members.filter(member => member.category === 'core');
export const getMentorMembers = () => membersData.members.filter(member => member.category === 'mentor');
export const getVolunteerMembers = () => membersData.members.filter(member => member.category === 'volunteer');

// Volunteers - All volunteer data comes from /data/volunteers.json. Update this file to add/edit volunteers.
export const getVolunteers = () => volunteersData.volunteers;
export const getVolunteerById = (id: string) => volunteersData.volunteers.find(volunteer => volunteer.id === id);
export const getVolunteersByExpertise = (expertise: string) => 
  volunteersData.volunteers.filter(volunteer => 
    volunteer.expertise.some(skill => skill.toLowerCase().includes(expertise.toLowerCase()))
  );
export const getRecentVolunteers = () => 
  [...volunteersData.volunteers].sort((a, b) => 
    new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime()
  );

// Resources - All resource data comes from /data/resources.json. Update this file to add/edit resources.
export const getResources = () => resourcesData.resources;
export const getResourceById = (id: string) => resourcesData.resources.find(resource => resource.id === id);
export const getFeaturedResources = () => resourcesData.resources.filter(resource => resource.featured);
export const getResourcesByCategory = (category: string) => resourcesData.resources.filter(resource => resource.category === category);
export const getResourcesByType = (type: string) => resourcesData.resources.filter(resource => resource.type === type);
export const getResourcesByDifficulty = (difficulty: string) => resourcesData.resources.filter(resource => resource.difficulty === difficulty);

// Spotlights - All spotlight data comes from /data/spotlights.json. Update this file to add/edit spotlights.
export const getSpotlights = () => spotlightsData.spotlights;
export const getSpotlightById = (id: string) => spotlightsData.spotlights.find(spotlight => spotlight.id === id);
export const getSpotlightsByCategory = (category: string) => spotlightsData.spotlights.filter(spotlight => spotlight.category === category);

// Speakers - All speaker data comes from /data/speakers.json. Update this file to add/edit speakers.
export const getSpeakers = () => speakersData.speakers;
export const getSpeakerById = (id: string) => speakersData.speakers.find(speaker => speaker.id === id);
export const getSpeakersByCategory = (category: string) => speakersData.speakers.filter(speaker => speaker.category === category);

export default {
  events: {
    getAll: getEvents,
    getById: getEventById,
    getBySlug: getEventBySlug,
    getUpcoming: getUpcomingEvents,
    getFeatured: getFeaturedEvents,
    getByCategory: getEventsByCategory
  },
  blogs: {
    getAll: getBlogs,
    getById: getBlogById,
    getApproved: getApprovedBlogs,
    getFeatured: getFeaturedBlogs,
    getByCategory: getBlogsByCategory
  },
  forms: {
    getAll: getForms,
    getById: getFormById,
    getEventForms: getEventForms,
    getCommunityForms: getCommunityForms
  },
  gallery: {
    getAll: getGalleryItems,
    getById: getGalleryItemById,
    getByCategory: getGalleryItemsByCategory
  },
  projects: {
    getAll: getProjects,
    getById: getProjectById,
    getApproved: getApprovedProjects,
    getFeatured: getFeaturedProjects,
    getByStatus: getProjectsByStatus
  },
  testimonials: {
    getAll: getTestimonials,
    getById: getTestimonialById,
    getFeatured: getFeaturedTestimonials,
    getByCategory: getTestimonialsByCategory
  },
  members: {
    getAll: getMembers,
    getById: getMemberById,
    getByCategory: getMembersByCategory,
    getCoreTeam: getCoreTeamMembers,
    getMentors: getMentorMembers,
    getVolunteers: getVolunteerMembers
  },
  volunteers: {
    getAll: getVolunteers,
    getById: getVolunteerById,
    getByExpertise: getVolunteersByExpertise,
    getRecent: getRecentVolunteers
  },
  resources: {
    getAll: getResources,
    getById: getResourceById,
    getFeatured: getFeaturedResources,
    getByCategory: getResourcesByCategory,
    getByType: getResourcesByType,
    getByDifficulty: getResourcesByDifficulty
  },
  spotlights: {
    getAll: getSpotlights,
    getById: getSpotlightById,
    getByCategory: getSpotlightsByCategory
  },
  speakers: {
    getAll: getSpeakers,
    getById: getSpeakerById,
    getByCategory: getSpeakersByCategory
  }
};