import React from 'react';
import { Calendar, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Speaker {
  name: string;
  title: string;
  company?: string;
  avatar: string;
  bio?: string;
}

interface Event {
  id: string;
  title: string;
  bannerImage: string;
  shortDescription: string;
  fullDescription: string;
  date: string;
  time: string;
  location: string;
  rsvpUrl: string;
  speakers?: Speaker[];
  tags?: string[];
}

const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'TechFront AI and Blockchain',
    bannerImage: '/event/techfront-banner.jpg',
    shortDescription:
        'Flagship AI & Blockchain Conference at THOUGHTWORK featuring visionary talks, hands-on workshops, and India’s brightest tech minds.',
    fullDescription: `Step into the epicenter of innovation at THOUGHTWORK, where trailblazers in Artificial Intelligence and Blockchain converge for a day of inspiration, learning, and connection...

Highlights:
- Visionary Talks from industry leaders
- Hands-on AI & Blockchain Workshops
- Panel Discussions & Project Demos
- Networking Lounges and more!

Why Attend?
See how AI and blockchain are transforming industries. Get strategies from experts, and meet your future collaborators, mentors, or employers.

Register now and join the movement shaping the future of technology!`,
    date: '2025-07-12',
    time: '10:00 AM - 6:00 PM IST',
    location: 'THOUGHTWORK, GURUGRAM',
    rsvpUrl: 'https://devnovate.co/event/techfront-ai-and-blockchain-summit',
    tags: [
      'AI', 'Blockchain', 'Web3', 'Smart Contracts', 'NLP', 'GenAI', 'Startup', 'Innovation'
    ],
    speakers: [
      {
        name: 'Arghya Kamal Guha',
        title: 'Management Consultant | AI & Automation Strategist',
        company: 'Protiviti Global Consulting',
        avatar: '/speakers/arghya_guha.jpg',
        bio: 'Arghya specializes in digital transformation through AI, automation, and ERP modernization. He bridges technical depth with strategic insight, and is passionate about integrating AI in business operations.'
      },
      {
        name: 'Aashi Gupta',
        title: 'Senior AI Engineer',
        company: 'Marsh McLennan',
        avatar: '/speakers/aashi_gupta.jpg',
        bio: 'Aashi is a Senior AI Engineer at Marsh McLennan, specializing in enterprise-scale AI/NLP solutions and responsible, explainable AI.'
      },
      {
        name: 'Arun Kumar Yadav',
        title: 'Blockchain Developer',
        avatar: '/speakers/arun_kumar_yadav.jpg',
        bio: 'Arun is a seasoned blockchain developer with expertise in crafting smart contracts and decentralized infrastructure.'
      },
      {
        name: 'Mukul Goyal',
        title: 'Tech Entrepreneur | AI & Blockchain Strategist | Founder – DIMRAJ',
        company: 'DIMRAJ | Community Leader',
        avatar: '/speakers/mukul_goyal.jpg',
        bio: 'Mukul is the founder of DIMRAJ, working at the intersection of AI, blockchain, and digital platforms. Active in GenAI and Google Cloud communities.'
      }
    ]
  }
  // Add more event as needed; for each, you’ll add more Link buttons below.
];

const EventsPage: React.FC = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Upcoming Events
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Join our workshops, bootcamps, and conferences to level up your skills and connect with fellow developers
            </p>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {sampleEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sampleEvents.map((event) => (
                  <div
                      key={event.id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col"
                  >
                    <img
                        src={event.bannerImage}
                        alt={event.title}
                        className="w-full h-52 object-cover object-center"
                    />
                    <div className="p-6 flex flex-col flex-1">
                <span className="inline-block bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium mb-2">
                  {event.tags?.[0] || 'Tech Event'}
                </span>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                        {event.shortDescription}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {event.tags?.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 text-xs rounded-full"
                            >
                      {tag}
                    </span>
                        ))}
                        {event.tags && event.tags.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                      +{event.tags.length - 3}
                    </span>
                        )}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        {event.date} | {event.time}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {event.location}
                      </div>
                      {/* Action Buttons: Responsive (stack on mobile, inline on desktop) */}
                      <div className="mt-auto flex flex-col sm:flex-row gap-3">
                        <a
                            href={event.rsvpUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-5 py-2 rounded-lg font-semibold bg-primary-600 text-white hover:bg-primary-700 shadow transition text-center"
                        >
                          RSVP
                        </a>
                        <Link
                            to="/techfront"
                            className="flex-1 flex items-center justify-center gap-2 px-5 py-2 rounded-lg font-semibold bg-secondary-100 dark:bg-secondary-900 text-primary-700 dark:text-primary-300 hover:bg-secondary-200 dark:hover:bg-secondary-800 shadow transition"
                        >
                          View Details
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
        ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-600 mb-4">
                <Calendar className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No events scheduled
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Check back soon for upcoming events and workshops!
              </p>
            </div>
        )}
      </div>
    </div>
);

export default EventsPage;
