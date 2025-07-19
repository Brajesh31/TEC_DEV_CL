import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock } from 'lucide-react';

interface Speaker {
  name: string;
  title: string;
  company?: string;
  avatar: string;
  bio?: string;
}

interface Event {
  id: string;
  slug: string;
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

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
      <Link
          to={`/events/${event.slug}`}
          className="block h-full"
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer h-full flex flex-col">
          {/* Banner Image */}
          <div className="h-32 sm:h-40 md:h-48 overflow-hidden">
            <img
                src={event.bannerImage}
                alt={event.title}
                className="w-full h-full object-cover"
                loading="lazy"
            />
          </div>

          {/* Card Content */}
          <div className="p-3 sm:p-4 md:p-6 flex flex-col flex-grow">
            {/* Title */}
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 md:mb-3 line-clamp-2">
              {event.title}
            </h3>

            {/* Short Description */}
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-4 line-clamp-2 sm:line-clamp-3 flex-grow">
              {event.shortDescription}
            </p>

            {/* Event Details */}
            <div className="space-y-1 sm:space-y-2 mt-auto mb-2 sm:mb-3">
              <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                <span className="truncate">{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                <span className="truncate">{event.time}</span>
              </div>
              <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>
            </div>

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
                  {event.tags.slice(0, 2).map((tag) => (
                      <span
                          key={tag}
                          className="px-2 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 text-xs rounded-full"
                      >
                  {tag}
                </span>
                  ))}
                  {event.tags.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                  +{event.tags.length - 2}
                </span>
                  )}
                </div>
            )}

            {/* Speakers */}
            {event.speakers && event.speakers.length > 0 && (
                <div className="flex -space-x-2 mt-2 mb-1">
                  {event.speakers.slice(0, 3).map((speaker, idx) => (
                      <img
                          key={speaker.avatar + idx}
                          src={speaker.avatar}
                          alt={speaker.name}
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white dark:border-gray-800 object-cover shadow"
                          title={speaker.name}
                      />
                  ))}
                  {event.speakers.length > 3 && (
                      <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-xs font-bold border-2 border-white dark:border-gray-800">
                  +{event.speakers.length - 3}
                </span>
                  )}
                </div>
            )}
          </div>
        </div>
      </Link>
  );
};

export default EventCard;