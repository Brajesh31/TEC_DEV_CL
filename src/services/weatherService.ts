interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  feelsLike: number;
  visibility: number;
}

interface ForecastData {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  description: string;
  icon: string;
  humidity: number;
}

class WeatherService {
  private apiKey = 'c9981c649e029dbe31dee51c4f6489bc';
  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  // Get current weather by city name
  async getCurrentWeather(city: string): Promise<WeatherData | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/weather?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error('Weather data not found');
      }

      const data = await response.json();

      return {
        location: `${data.name}, ${data.sys.country}`,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon,
        feelsLike: Math.round(data.main.feels_like),
        visibility: data.visibility / 1000, // Convert to km
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  }

  // Get current weather by coordinates
  async getCurrentWeatherByCoords(lat: number, lon: number): Promise<WeatherData | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error('Weather data not found');
      }

      const data = await response.json();

      return {
        location: `${data.name}, ${data.sys.country}`,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon,
        feelsLike: Math.round(data.main.feels_like),
        visibility: data.visibility / 1000,
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  }

  // Get 5-day weather forecast
  async getForecast(city: string): Promise<ForecastData[] | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/forecast?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error('Forecast data not found');
      }

      const data = await response.json();

      // Group forecast data by day (OpenWeather returns 3-hour intervals)
      const dailyForecasts: { [key: string]: any[] } = {};
      
      data.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!dailyForecasts[date]) {
          dailyForecasts[date] = [];
        }
        dailyForecasts[date].push(item);
      });

      // Convert to daily forecast format
      const forecasts: ForecastData[] = Object.entries(dailyForecasts)
        .slice(0, 5) // Get 5 days
        .map(([date, dayData]) => {
          const temps = dayData.map(item => item.main.temp);
          const minTemp = Math.round(Math.min(...temps));
          const maxTemp = Math.round(Math.max(...temps));
          
          // Use midday data for description and icon
          const middayData = dayData[Math.floor(dayData.length / 2)];
          
          return {
            date,
            temperature: {
              min: minTemp,
              max: maxTemp,
            },
            description: middayData.weather[0].description,
            icon: middayData.weather[0].icon,
            humidity: middayData.main.humidity,
          };
        });

      return forecasts;
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      return null;
    }
  }

  // Get weather icon URL
  getIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

  // Get user's location weather
  async getUserLocationWeather(): Promise<WeatherData | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const weather = await this.getCurrentWeatherByCoords(latitude, longitude);
          resolve(weather);
        },
        () => {
          resolve(null);
        }
      );
    });
  }
}

export const weatherService = new WeatherService();
export default WeatherService;