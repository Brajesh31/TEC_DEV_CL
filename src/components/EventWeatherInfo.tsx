import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { weatherService } from '../services/weatherService';

interface Weather {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

interface EventWeatherInfoProps {
  eventLocation: string;
  eventDate: string;
  className?: string;
}

const EventWeatherInfo: React.FC<EventWeatherInfoProps> = ({
                                                             eventLocation,
                                                             eventDate,
                                                             className = ''
                                                           }) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUpcoming, setIsUpcoming] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    // Check if event is within the next 5 days
    const eventDateTime = new Date(eventDate);
    const now = new Date();
    const daysDifference = Math.ceil((eventDateTime.getTime() - now.getTime()) / (1000 * 3600 * 24));
    const upcoming = daysDifference >= 0 && daysDifference <= 5;
    setIsUpcoming(upcoming);

    if (upcoming) {
      fetchWeatherData();
    } else {
      setWeather(null);
    }
    // eslint-disable-next-line
  }, [eventLocation, eventDate]);

  const fetchWeatherData = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      // Use first part as city for best results
      const city = eventLocation.split(',')[0].trim();
      const weatherData = await weatherService.getCurrentWeather(city);
      setWeather(weatherData);
    } catch (error: any) {
      setFetchError('Could not fetch weather data.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherAdvice = (weather: Weather) => {
    const temp = weather.temperature;
    const description = weather.description.toLowerCase();

    if (description.includes('rain') || description.includes('drizzle')) {
      return {
        type: 'warning',
        message: 'Rain expected — bring an umbrella!',
        icon: '🌧️'
      };
    } else if (temp < 5) {
      return {
        type: 'info',
        message: 'Cold weather — dress warmly!',
        icon: '🧥'
      };
    } else if (temp > 30) {
      return {
        type: 'warning',
        message: 'Hot weather — stay hydrated!',
        icon: '☀️'
      };
    } else if (description.includes('snow')) {
      return {
        type: 'warning',
        message: 'Snow expected — plan for delays!',
        icon: '❄️'
      };
    } else {
      return {
        type: 'success',
        message: 'Great weather for the event!',
        icon: '✨'
      };
    }
  };

  if (!isUpcoming) return null;

  if (loading) {
    return (
        <div className={`bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 ${className}`}>
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-blue-200 dark:bg-blue-800 rounded-full animate-pulse" />
            <div>
              <div className="h-4 w-24 bg-blue-200 dark:bg-blue-800 rounded mb-2 animate-pulse"></div>
              <div className="h-3 w-16 bg-blue-200 dark:bg-blue-800 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
    );
  }

  if (fetchError || !weather) {
    return (
        <div className={`bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 ${className}`}>
          <div className="flex items-center text-blue-800 dark:text-blue-200">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Weather info unavailable for this event.</span>
          </div>
        </div>
    );
  }

  const advice = getWeatherAdvice(weather);
  const eventDateTime = new Date(eventDate);
  const isToday = eventDateTime.toDateString() === new Date().toDateString();

  return (
      <div className={`bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 ${className}`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
            Weather for Event
          </span>
          </div>
          <span className="text-xs text-blue-600 dark:text-blue-400">
          {isToday ? 'Today' : eventDateTime.toLocaleDateString()}
        </span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <img
                src={weatherService.getIconUrl(weather.icon)}
                alt={weather.description}
                className="w-8 h-8 mr-2"
            />
            <div>
            <span className="text-lg font-bold text-blue-900 dark:text-blue-100">
              {weather.temperature}°C
            </span>
              <p className="text-xs text-blue-700 dark:text-blue-300 capitalize">
                {weather.description}
              </p>
            </div>
          </div>
          <div className="text-right text-xs text-blue-600 dark:text-blue-400">
            <div>Humidity: {weather.humidity}%</div>
            <div>Wind: {weather.windSpeed} m/s</div>
          </div>
        </div>

        <div className={`flex items-center p-2 rounded-md ${
            advice.type === 'warning'
                ? 'bg-yellow-100 dark:bg-yellow-900/30'
                : advice.type === 'info'
                    ? 'bg-blue-100 dark:bg-blue-900/30'
                    : 'bg-green-100 dark:bg-green-900/30'
        }`}>
          <span className="mr-2">{advice.icon}</span>
          <span className={`text-sm ${
              advice.type === 'warning'
                  ? 'text-yellow-800 dark:text-yellow-200'
                  : advice.type === 'info'
                      ? 'text-blue-800 dark:text-blue-200'
                      : 'text-green-800 dark:text-green-200'
          }`}>
          {advice.message}
        </span>
        </div>
      </div>
  );
};

export default EventWeatherInfo;
