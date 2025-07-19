/**
 * Central repository for all Google Form links used throughout the application
 * This allows for easy management and updating of form links in one place
 */

interface FormLink {
  id: string;
  name: string;
  description: string;
  url: string;
}

const formLinks: Record<string, FormLink> = {
  'event-techfront-2025': {
    id: 'event-1',
    name: 'Tech Dev Club - AI & Web3 Summit 2025',
    description: 'RSVP form for Tech Dev Club - AI & Web3 Summit 2025 at THOUGHTWORK, GURUGRAM',
    url: 'https://devnovate.co/event/techfront-ai-and-blockchain-summit' // <-- Replace with your actual RSVP form link!
  },
  
  // Community Forms
  'join-application': {
    id: 'community-1',
    name: 'Join Tech Dev Club',
    description: 'Apply to join Tech Dev Club community',
    url: 'https://forms.gle/2mzR82W746Jd7S6G6'
  },
  'blog-submission': {
    id: 'community-2',
    name: 'Blog Submission',
    description: 'Submit a blog post for Tech Dev Club',
    url: ' https://forms.gle/EGF9bNyuznLaS8CF6'
  },
  'volunteer-application': {
    id: 'community-3',
    name: 'Volunteer Application',
    description: 'Apply to volunteer with Tech Dev Club',
    url: 'https://forms.gle/2mzR82W746Jd7S6G6'
  },
  'speaker-application': {
    id: 'community-4',
    name: 'Speaker Application',
    description: 'Apply to speak at Tech Dev Club event',
    url: 'https://forms.gle/zEnX7rRMLTYpPpqi9'
  },
  'project-submission': {
    id: 'community-5',
    name: 'Project Submission',
    description: 'Submit your project to Tech Dev Club',
    url: 'https://forms.gle/v3MfxNWfenL5huH79'
  },
  'feedback': {
    id: 'community-6',
    name: 'Feedback Form',
    description: 'Provide feedback about Tech Dev Club',
    url: 'https://forms.gle/ab45q4wjEYTJQnGJ7'
  }
};

/**
 * Get a form link by its key
 * @param key The key of the form link to retrieve
 * @returns The form link object or undefined if not found
 */
export const getFormLink = (key: string): FormLink | undefined => {
  return formLinks[key];
};

/**
 * Get a form link by its ID
 * @param id The ID of the form link to retrieve
 * @returns The form link object or undefined if not found
 */
export const getFormLinkById = (id: string): FormLink | undefined => {
  return Object.values(formLinks).find(link => link.id === id);
};

/**
 * Get all form links
 * @returns All form links
 */
export const getAllFormLinks = (): FormLink[] => {
  return Object.values(formLinks);
};

/**
 * Get all event form links
 * @returns All event form links
 */
export const getEventFormLinks = (): FormLink[] => {
  return Object.values(formLinks).filter(link => link.id.startsWith('event-'));
};

/**
 * Get all community form links
 * @returns All community form links
 */
export const getCommunityFormLinks = (): FormLink[] => {
  return Object.values(formLinks).filter(link => link.id.startsWith('community-'));
};

export default formLinks;