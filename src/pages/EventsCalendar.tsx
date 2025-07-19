import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Filter, Search, ChevronLeft, ChevronRight } from 'lucide-react';

// Interface for event data
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  attendees: number;
  maxAttendees?: number;
  rsvpLink: string;
  image?: string;
  tags: string[];
  isVirtual: boolean;
}

const EventsCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  // Sample event data - in production, this would be loaded from JSON
  useEffect(() => {
    // Simulate loading data from API or JSON file
    const loadEvents = async () => {
      try {
        // Sample data - in production, this would be fetched from an API or JSON file
        const sampleEvents: Event[] = [
          {
            id: '1',
            title: 'TechFront AI x Blockchain Workshop',
            description: '',
            date: '2025-07-12',
            time: '10:00 AM - 4:00 PM',
            location: 'THOUGHTWORK, GURUGRAM',
            category: 'Workshop',
            attendees: 95,
            maxAttendees: 100,
            rsvpLink: 'https://devnovate.co/event/techfront-ai-and-blockchain-summit',
            image: '/event/techfront-banner.jpg',
            tags: ['React', 'Frontend', 'JavaScript'],
            isVirtual: false
          },
        ];
        
        setEvents(sampleEvents);
        setFilteredEvents(sampleEvents);
        setLoading(false);
      } catch (error) {
        console.error('Error loading events:', error);
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  // Filter events when category or search term changes
  useEffect(() => {
    const filtered = events.filter(event => {
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
      const matchesSearch = 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
    
    setFilteredEvents(filtered);
  }, [selectedCategory, searchTerm, events]);

  // Get unique categories for filter
  const categories = ['all', ...new Set(events.map(e => e.category))];

  // Calendar navigation
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDay.getDay();
    
    // Total days in the month
    const daysInMonth = lastDay.getDate();
    
    // Generate array of day objects
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({ day: null, date: null, events: [] });
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0];
      
      // Find events for this day
      const dayEvents = filteredEvents.filter(event => event.date === dateString);
      
      days.push({
        day,
        date,
        events: dayEvents
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Events Calendar</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Find all upcoming and past Tech Dev Club events in one place.
          </p>
        </div>
      </section>

      {/* Filters and View Toggle */}
      <section className="py-8 bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* View Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-4 py-2 rounded-md ${
                  viewMode === 'calendar'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <Calendar className="h-5 w-5 inline mr-1" />
                Calendar
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <ul className="h-5 w-5 inline mr-1">
                  <li className="h-1 w-4 bg-current mb-1"></li>
                  <li className="h-1 w-4 bg-current mb-1"></li>
                  <li className="h-1 w-4 bg-current"></li>
                </ul>
                List
              </button>
            </div>

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

            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={prevMonth}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              
              <button 
                onClick={nextMonth}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
              {/* Weekday Headers */}
              <div className="grid grid-cols-7 bg-gray-100 dark:bg-gray-700">
                {weekdays.map(day => (
                  <div key={day} className="p-2 text-center font-medium text-gray-700 dark:text-gray-300">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar Days */}
              <div className="grid grid-cols-7">
                {calendarDays.map((dayData, index) => (
                  <div 
                    key={index} 
                    className={`min-h-[120px] p-2 border border-gray-200 dark:border-gray-700 ${
                      !dayData.day ? 'bg-gray-50 dark:bg-gray-900/50' : ''
                    }`}
                  >
                    {dayData.day && (
                      <>
                        <div className="text-right text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {dayData.day}
                        </div>
                        
                        <div className="space-y-1">
                          {dayData.events.map(event => (
                            <a 
                              key={event.id}
                              href={event.rsvpLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-xs p-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 truncate hover:bg-blue-200 dark:hover:bg-blue-800/30"
                            >
                              {event.title}
                            </a>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow">
                <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">No events found</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredEvents
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map(event => (
                    <div key={event.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <div className="md:flex">
                        {event.image && (
                          <div className="md:flex-shrink-0 h-48 md:h-auto md:w-48 bg-gray-200 dark:bg-gray-700">
                            <img 
                              src={event.image} 
                              alt={event.title} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                        
                        <div className="p-6">
                          <div className="flex flex-wrap gap-2 mb-2">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                              {event.category}
                            </span>
                            {event.isVirtual && (
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                                Virtual
                              </span>
                            )}
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                          
                          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                            {event.description}
                          </p>
                          
                          <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{new Date(event.date).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric'
                              })}</span>
                            </div>
                            
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{event.time}</span>
                            </div>
                            
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{event.location}</span>
                            </div>
                            
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              <span>
                                {event.attendees}
                                {event.maxAttendees && ` / ${event.maxAttendees}`}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {event.tags.map(tag => (
                              <span key={tag} className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <a 
                            href={event.rsvpLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                          >
                            RSVP
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Submit Event CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Host Your Own Event</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Have an idea for a tech event? Submit your proposal and we'll help you bring it to life.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-white text-blue-700 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg"
          >
            Submit Event Proposal
          </a>
        </div>
      </section>
    </div>
  );
};

export default EventsCalendar;