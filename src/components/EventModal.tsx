import React, { useState, useEffect } from 'react';
import { X, Calendar, MapPin, Users, ExternalLink, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { getFormLinkById } from '../data/formLinks';
import { useResponsive } from '../hooks/useResponsive';

interface Speaker {
  name: string;
  title: string;
  avatar: string;
  talkTitle?: string;
  talkDescription?: string;
  bio?: string;
  company?: string;
  social?: { linkedin?: string };
}

interface Event {
  _id?: string;
  id?: string;
  title: string;
  bannerImage?: string;
  intro?: string;
  highlights?: string[];
  whyAttend?: string[];
  speakerPanelQuote?: string;
  callToAction?: string;
  description: string;
  date: string;
  time: string;
  location: string;
  images?: Array<{
    url: string;
    alt: string;
  }>;
  formUrl?: string;
  category: string;
  maxAttendees?: number;
  currentAttendees: number;
  speakers?: Speaker[];
  tags?: string[];
}

interface EventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formUrl, setFormUrl] = useState<string | undefined>(undefined);
  const [isRSVPHovered, setIsRSVPHovered] = useState(false);
  const { isMobile } = useResponsive();

  useEffect(() => {
    if (event) {
      setCurrentImageIndex(0);
      const eventId = event._id || event.id;
      if (eventId) {
        const formLink = getFormLinkById
            ? getFormLinkById(`event-${eventId}`)
            : undefined;
        if (formLink && formLink.url) {
          setFormUrl(formLink.url);
        } else if (event.formUrl) {
          setFormUrl(event.formUrl);
        } else {
          setFormUrl(undefined);
        }
      }
    }
  }, [event]);

  if (!isOpen || !event) return null;

  const nextImage = () => {
    if (event.images && event.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % event.images.length);
    }
  };

  const prevImage = () => {
    if (event.images && event.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + event.images.length) % event.images.length);
    }
  };

  const handleRSVP = () => {
    if (formUrl) {
      window.open(formUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert('RSVP form link not available. Please check back later.');
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
      <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in overflow-y-auto"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label="Event Details"
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in my-4 sm:my-8 relative">
          {/* Header */}
          <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {event.title}
            </h2>
            <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors transform hover:scale-110"
                aria-label="Close modal"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            {/* Image Carousel */}
            {event.images && event.images.length > 0 && (
                <div className="relative mb-4 sm:mb-6">
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <img
                        src={event.images[currentImageIndex]?.url}
                        alt={event.images[currentImageIndex]?.alt || event.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                    {event.images.length > 1 && (
                        <>
                          <button
                              onClick={prevImage}
                              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 sm:p-2 rounded-full hover:bg-opacity-75 transition-all"
                              aria-label="Previous image"
                          >
                            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                          <button
                              onClick={nextImage}
                              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 sm:p-2 rounded-full hover:bg-opacity-75 transition-all"
                              aria-label="Next image"
                          >
                            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                          {/* Image indicators */}
                          <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
                            {event.images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                                    }`}
                                    aria-label={`Go to image ${index + 1}`}
                                />
                            ))}
                          </div>
                        </>
                    )}
                  </div>
                </div>
            )}

            {/* Event Info */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2">
              <span className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium inline-block">
                {event.category}
              </span>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Users className="h-4 w-4 mr-1" />
                  <span className="text-xs sm:text-sm">
                  {event.currentAttendees}
                    {event.maxAttendees && ` / ${event.maxAttendees}`} attendees
                </span>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                {event.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                  <span className="text-sm">{new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                  <span className="text-sm">{event.time}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                  <span className="text-sm">{event.location}</span>
                </div>
              </div>
              {event.intro && (
                  <div className="mb-4 sm:mb-6">
                    <p className="text-lg text-gray-800 dark:text-gray-100">{event.intro}</p>
                  </div>
              )}
              {event.highlights && event.highlights.length > 0 && (
                  <div className="mb-4 sm:mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Event Highlights</h4>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                      {event.highlights.map((hl, i) => (
                          <li key={i}>{hl}</li>
                      ))}
                    </ul>
                  </div>
              )}
              {event.whyAttend && event.whyAttend.length > 0 && (
                  <div className="mb-4 sm:mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Why Attend?</h4>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                      {event.whyAttend.map((why, i) => (
                          <li key={i}>{why}</li>
                      ))}
                    </ul>
                  </div>
              )}
              {event.speakerPanelQuote && (
                  <div className="mb-4 sm:mb-6 italic text-secondary-700 dark:text-secondary-300 border-l-4 border-secondary-600 pl-4">
                    “{event.speakerPanelQuote}”
                  </div>
              )}
              <div className="text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                {isMobile ? (
                    <p className="line-clamp-6">{event.description}</p>
                ) : (
                    <p>{event.description}</p>
                )}
              </div>
              {event.tags && event.tags.length > 0 && (
                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Topics
                    </h4>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {event.tags.map((tag) => (
                          <span
                              key={tag}
                              className="px-2 sm:px-3 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 text-xs rounded-full transition-colors duration-200 hover:bg-secondary-200 dark:hover:bg-secondary-800"
                          >
                      {tag}
                    </span>
                      ))}
                    </div>
                  </div>
              )}
              {event.speakers && event.speakers.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Featured Speakers</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      {event.speakers.map((sp, i) => (
                          <div key={i} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex gap-4 items-start">
                            <img
                                src={sp.avatar}
                                alt={sp.name}
                                className="w-16 h-16 rounded-full object-cover ring-2 ring-primary-400"
                                loading="lazy"
                            />
                            <div>
                              <div className="font-semibold text-lg text-gray-900 dark:text-white">{sp.name}</div>
                              <div className="text-primary-600 dark:text-primary-400 text-sm mb-1">
                                {sp.title}{sp.company && `, ${sp.company}`}
                              </div>
                              {sp.talkTitle && (
                                  <div className="font-semibold text-sm mt-1 text-secondary-700 dark:text-secondary-300">
                                    {sp.talkTitle}
                                  </div>
                              )}
                              {sp.talkDescription && (
                                  <div className="text-gray-700 dark:text-gray-300 text-xs mb-2">
                                    {sp.talkDescription}
                                  </div>
                              )}
                              {sp.bio && (
                                  <div className="text-gray-600 dark:text-gray-400 text-xs">{sp.bio}</div>
                              )}
                              {sp.social && sp.social.linkedin && (
                                  <a
                                      href={sp.social.linkedin}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-block mt-1 text-blue-600 dark:text-blue-400 text-xs underline"
                                  >
                                    LinkedIn
                                  </a>
                              )}
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>
              )}
              {event.callToAction && (
                  <div className="mt-8 p-4 rounded-lg bg-primary-50 dark:bg-primary-900 text-primary-900 dark:text-primary-100 font-semibold text-center text-lg">
                    {event.callToAction}
                  </div>
              )}
              {/* RSVP Button */}
              <div className="flex justify-center mt-8">
                <button
                    onClick={handleRSVP}
                    onMouseEnter={() => setIsRSVPHovered(true)}
                    onMouseLeave={() => setIsRSVPHovered(false)}
                    disabled={event.maxAttendees && event.currentAttendees >= event.maxAttendees}
                    className={`flex items-center space-x-2 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform ${
                        isRSVPHovered && !(event.maxAttendees && event.currentAttendees >= event.maxAttendees)
                            ? 'scale-105'
                            : ''
                    } ${
                        event.maxAttendees && event.currentAttendees >= event.maxAttendees
                            ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                            : 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'
                    }`}
                    aria-label={event.maxAttendees && event.currentAttendees >= event.maxAttendees ? 'Event Full' : 'RSVP Now'}
                >
                  <ExternalLink className={`h-4 w-4 sm:h-5 sm:w-5 ${isRSVPHovered ? 'animate-pulse' : ''}`} />
                  <span>
                  {event.maxAttendees && event.currentAttendees >= event.maxAttendees
                      ? 'Event Full'
                      : 'RSVP Now'
                  }
                </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default EventModal;
