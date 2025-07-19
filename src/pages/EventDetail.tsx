import React from 'react';
import { useParams, Link } from 'react-router-dom';
// Make sure the import path below matches your actual event data location:
import { getEventBySlug } from '../utils/dataLoader';

const EventDetail: React.FC = () => {
    // Grabs the slug from the URL
    const { slug } = useParams<{ slug: string }>();

    // Find event by slug
    const event = slug ? getEventBySlug(slug) : null;

    if (!event) {
        return (
            <div className="max-w-2xl mx-auto py-24 text-center">
                <h2 className="text-3xl font-bold mb-2">Event Not Found</h2>
                <p className="mb-8 text-gray-500">The event you're looking for doesn't exist or has been removed.</p>
                <Link to="/events" className="text-primary-600 underline font-medium">
                    ← Back to All Events
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto py-16 px-4">
            <img
                src={event.bannerImage || (event.images?.[0]?.url ?? '')}
                alt={event.title}
                className="w-full h-60 object-cover object-center rounded-xl mb-6 shadow"
            />
            <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
            <div className="flex flex-wrap gap-3 mb-4">
                <span className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium">
                    {event.tags?.[0] || 'Event'}
                </span>
                <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                    {event.date} | {event.time}
                </span>
                <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                    {event.location}
                </span>
            </div>
            <p className="mb-6 text-lg text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {event.fullDescription || event.description}
            </p>
            {event.speakers && (
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-3">Speakers</h3>
                    <div className="flex flex-wrap gap-5">
                        {event.speakers.map((speaker) => (
                            <div
                                key={speaker.name}
                                className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg p-3 shadow"
                            >
                                <img
                                    src={speaker.avatar}
                                    alt={speaker.name}
                                    className="w-12 h-12 rounded-full object-cover mr-3"
                                />
                                <div>
                                    <div className="font-semibold text-gray-900 dark:text-white">
                                        {speaker.name}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {speaker.title}
                                    </div>
                                    {speaker.company && (
                                        <div className="text-xs text-gray-500">{speaker.company}</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                    href="https://devnovate.co/event/techfront-ai-and-blockchain-summit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition text-center w-full sm:w-auto"
                >
                    Register / RSVP
                </a>
                <Link
                    to="/events"
                    className="inline-block px-6 py-3 rounded-lg border border-primary-600 text-primary-600 font-semibold hover:bg-primary-100 hover:text-primary-700 transition text-center w-full sm:w-auto"
                >
                    ← Back to All Events
                </Link>
            </div>
        </div>
    );
};

export default EventDetail;