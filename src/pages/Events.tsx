import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, MapPin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

// Speaker interface
interface Speaker {
  name: string;
  title: string;
  company: string;
  avatar: string;
  bio?: string;
}

// Event interface
interface Event {
  _id: string;
  slug: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  shortDescription?: string;
  speakers?: Speaker[];
  currentAttendees: number;
  maxAttendees?: number;
  category: string;
  isUpcoming: boolean;
  tags: string[];
  images: Array<{
    url: string;
    alt: string;
  }>;
  rsvpUrl?: string;
}

// Mock event array
const mockEvents: Event[] = [
  {
    _id: '1',
    slug: 'techfront-ai-blockchain',
    title: 'Tech Dev Club - AI & Web3 Summit 2025',
    date: '2025-07-12T10:00:00Z',
    time: '9:00 AM – 4:00 PM IST',
    location: 'THOUGHTWORK, GURUGRAM',
    description: `A flagship technology summit bringing together pioneers in AI, blockchain, and emerging web technologies. The event features visionary keynotes, interactive workshops, live coding, and exclusive networking for students and professionals.`,
    shortDescription: `A flagship summit for AI, Blockchain, and Web3 with top industry speakers, workshops, and networking at THOUGHTWORK, GURUGRAM.`,
    speakers: [
      {
        name: "Arghya Kamal Guha",
        title: "Management Consultant | AI & Automation Strategist | LinkedIn Market Insider Certified",
        company: "Protiviti Global Consulting",
        avatar: "/speakers/arghya_kamal_guha.jpg",
        bio: "Arghya is a management consultant at Protiviti Global Consulting, specializing in digital transformation through AI, automation, and ERP modernization. With a background in Computer Science Engineering (B.Tech) and Business Administration (MBA), he bridges technical depth with strategic insight. LinkedIn Market Insider certified, he’s passionate about creative problem-solving, enterprise automation, and integrating AI in business operations and MarComm workflows."
      },
      {
        name: "Aashi Gupta",
        title: "Senior AI Engineer",
        company: "Marsh McLennan",
        avatar: "/speakers/aashi_gupta.jpg",
        bio: "Aashi Gupta is a Senior AI Engineer at Marsh McLennan, specializing in enterprise-scale AI/NLP solutions using GenAI, LangChain, LangGraph, and agent-based frameworks. She’s built systems for ticket auto-routing, KB recommendation, and text-to-SQL with MLOps. An MS in Data Science, she is recognized for building responsible, explainable AI and driving business impact through innovation."
      },
      {
        name: "Arun Kumar Yadav",
        title: "Blockchain Developer",
        company: "Independent / Blockchain Community",
        avatar: "/speakers/arun_kumar_yadav.jpg",
        bio: "Arun is a seasoned blockchain developer with expertise in crafting smart contracts across ERC20, ERC721, ERC1155 standards, and DePIN solutions. He’s delivered real-world projects on lotteries, crowdfunding, tokenization, and RWA. Proficient in Solidity and the Ethereum ecosystem, Arun is passionate about scaling decentralized infrastructure and collaborating on the next wave of blockchain innovation."
      },
      {
        name: "Mukul Goyal",
        title: "Tech Entrepreneur | AI & Blockchain Strategist | Founder – DIMRAJ",
        company: "DIMRAJ | Community Leader",
        avatar: "/speakers/mukul_goyal.jpg",
        bio: "Mukul is the founder of DIMRAJ, working at the intersection of AI, blockchain, and digital platforms. With a background in software engineering, ML, and startups, he mentors innovators and builds open-source tools. Active in Google Cloud and GenAI communities, Mukul focuses on tech sovereignty, future-ready platforms, and blending decentralization with intelligence."
      }
    ],
    currentAttendees: 160,
    maxAttendees: 250,
    category: 'Conference',
    isUpcoming: true,
    tags: ['AI', 'Blockchain', 'Web3', 'Tech', 'Startup', 'Community'],
    images: [
      {
        url: '/event/techfront-banner.jpg',
        alt: 'Tech Dev Club AI & Web3 Summit Banner',
      },
    ],
    rsvpUrl: 'https://devnovate.co/event/techfront-ai-and-blockchain-summit'
  },
  // ...more event
];

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useSEO({
    title: 'Tech Events & Workshops - Learn from Industry Experts',
    description:
        'Discover upcoming tech workshops, bootcamps, and conferences. Join our event to learn cutting-edge skills from industry experts.',
    keywords:
        'tech event, developer workshops, coding bootcamp, tech conference, programming meetup, web development workshop, AI ML training',
  });

  useEffect(() => {
    setEvents(
        mockEvents.filter((event) => {
          if (filter === 'all') return true;
          if (filter === 'upcoming') return event.isUpcoming;
          if (filter === 'past') return !event.isUpcoming;
          return true;
        })
    );
    setLoading(false);
  }, [filter]);

  const categories = Array.from(new Set(events.map((event) => event.category)));
  const filteredEvents = activeCategory
      ? events.filter((event) => event.category === activeCategory)
      : events;

  return (
      <div className="animate-fade-in">
        {/* Hero Section */}
        <section className="bg-hero-light dark:bg-hero-dark py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
              Community Events
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto animate-slide-up animation-delay-200">
              Join our workshops, bootcamps, conferences, and networking events to level up your skills
            </p>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-20 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Time Filter */}
              <div className="flex justify-center">
                <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                  {[
                    { key: 'upcoming', label: 'Upcoming' },
                    { key: 'past', label: 'Past Events' },
                    { key: 'all', label: 'All Events' },
                  ].map((tab) => (
                      <button
                          key={tab.key}
                          onClick={() => setFilter(tab.key as typeof filter)}
                          className={`px-6 py-2 rounded-md font-medium transition-colors ${
                              filter === tab.key
                                  ? 'bg-primary-600 text-white'
                                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                          }`}
                      >
                        {tab.label}
                      </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              {categories.length > 0 && (
                  <div className="flex flex-wrap justify-center md:justify-end gap-2">
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            activeCategory === null
                                ? 'bg-secondary-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                    >
                      All Categories
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                activeCategory === category
                                    ? 'bg-secondary-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                          {category}
                        </button>
                    ))}
                  </div>
              )}
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading && (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
            )}

            {!loading && events.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No events found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Check back later for new events or try a different filter.
                  </p>
                </div>
            )}

            {!loading && filteredEvents.length > 0 && (
                <div className="grid lg:grid-cols-2 gap-8">
                  {filteredEvents.map((event, index) => (
                      <div
                          key={event._id}
                          className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slide-up flex flex-col"
                          style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {/* Event Image */}
                        {event.images && event.images.length > 0 && (
                            <div className="w-full h-56 bg-gray-200 dark:bg-gray-700 overflow-hidden rounded-t-lg">
                              <img
                                  src={event.images[0].url}
                                  alt={event.images[0].alt || event.title}
                                  className="w-full h-full object-cover object-center"
                                  loading="lazy"
                              />
                            </div>
                        )}

                        <div className="p-6 flex flex-col flex-1">
                          {/* Event Header */}
                          <div className="flex justify-between items-start mb-4">
                            <div>
                        <span className="inline-block bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium mb-2">
                          {event.category}
                        </span>
                              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                {event.title}
                              </h3>
                            </div>
                            {!event.isUpcoming && (
                                <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                          Completed
                        </span>
                            )}
                          </div>

                          {/* Event Details */}
                          <div className="space-y-3 mb-4">
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                              <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                              <span className="text-sm">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                              <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                              <span className="text-sm">{event.time}</span>
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                              <span className="text-sm">{event.location}</span>
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                              <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                              <span className="text-sm">
                          {event.currentAttendees}
                                {event.maxAttendees && ` / ${event.maxAttendees}`} attendees
                        </span>
                            </div>
                          </div>

                          {/* Speakers */}
                          {event.speakers && (
                              <div className="flex flex-wrap items-center gap-4 mb-4">
                                {event.speakers.map((speaker, i) => (
                                    <div key={speaker.name} className="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                      <img
                                          src={speaker.avatar}
                                          alt={speaker.name}
                                          className="w-10 h-10 rounded-full mr-3 object-cover ring-2 ring-primary-200 dark:ring-primary-800"
                                      />
                                      <div>
                                        <p className="font-medium text-gray-900 dark:text-white">{speaker.name}</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">{speaker.title}</p>
                                      </div>
                                    </div>
                                ))}
                              </div>
                          )}

                          {/* Description */}
                          <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                            {event.shortDescription || event.description}
                          </p>

                          {/* Tags */}
                          {event.tags && event.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-6">
                                {event.tags.slice(0, 3).map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 text-xs rounded-full"
                                    >
                            {tag}
                          </span>
                                ))}
                                {event.tags.length > 3 && (
                                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                            +{event.tags.length - 3}
                          </span>
                                )}
                              </div>
                          )}

                          {/* Action Buttons */}
                          <div className="mt-auto flex flex-col sm:flex-row gap-3">
                            {/* RSVP Button - Responsive, Google Form */}
                            {event.isUpcoming && event.rsvpUrl ? (
                                <a
                                    href={event.rsvpUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex-1 px-5 py-2 rounded-lg font-semibold bg-primary-600 text-white hover:bg-primary-700 shadow transition text-center ${
                                        event.maxAttendees && event.currentAttendees >= event.maxAttendees
                                            ? 'opacity-50 pointer-event-none'
                                            : ''
                                    }`}
                                >
                                  {event.maxAttendees && event.currentAttendees >= event.maxAttendees
                                      ? 'Full'
                                      : 'RSVP'}
                                </a>
                            ) : (
                                <button
                                    disabled
                                    className="flex-1 px-5 py-2 rounded-lg font-semibold bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed transition text-center"
                                >
                                  Event Ended
                                </button>
                            )}

                            {/* View Details: TechFront goes to /techfront */}
                            <Link
                                to={event.slug === 'techfront-ai-blockchain' ? '/techfront' : `/events/${event.slug}`}
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
            )}
          </div>
        </section>
      </div>
  );
};

export default Events;
