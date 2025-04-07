import React, { useEffect, useState } from 'react';
import { WeatherCard } from './components/WeatherCard';
import { SearchBar } from './components/SearchBar';
import { fetchWeatherData, fetchWeatherByCoords } from './services/weatherApi';
import { getWeatherBackground } from './utils/temperature';
import type { WeatherData } from './types/weather';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleSearch = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeatherData(city);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load weather data. Please try again later.');
      console.error('Error loading weather data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationRequest = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const data = await fetchWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          );
          setWeatherData(data);
          setError(null);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load weather data for your location.');
          console.error('Error loading weather data:', err);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError('Failed to get your location. Please allow location access or search by city name.');
        setLoading(false);
        console.error('Geolocation error:', err);
      }
    );
  };

  useEffect(() => {
    handleLocationRequest();
  }, []);

  // Determine if it's currently daytime based on the local time
  const isDay = () => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18;
  };

  const backgroundImage = weatherData ? 
    getWeatherBackground(weatherData.data[0].weather.code, isDay()) : 
    'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=2000&q=80';

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex flex-col items-center justify-center p-4 transition-all duration-500"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <SearchBar 
        onSearch={handleSearch}
        onLocationRequest={handleLocationRequest}
        isLoading={loading}
      />
      
      {loading && (
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 w-full max-w-md text-center">
          <p className="text-gray-600">Loading weather data...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 w-full max-w-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}
      
      {!loading && !error && weatherData && <WeatherCard data={weatherData} />}
    </div>
  );
}

export default App;