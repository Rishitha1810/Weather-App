import React from 'react';
import { Cloud, Droplets, Thermometer, Wind, Sun, Umbrella } from 'lucide-react';
import type { WeatherData } from '../types/weather';

interface WeatherCardProps {
  data: WeatherData;
}

export function WeatherCard({ data }: WeatherCardProps) {
  const currentWeather = data.data[0]; // Get current weather from first forecast period

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 w-full max-w-md">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{data.city_name}</h1>
          <p className="text-gray-500">{data.country_code}</p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-bold text-gray-900">
            {Math.round(currentWeather.temp)}°C
          </p>
          <p className="text-gray-500">
            Feels like {Math.round(currentWeather.app_temp)}°C
          </p>
        </div>
      </div>

      <div className="flex items-center mb-6">
        <img
          src={`https://www.weatherbit.io/static/img/icons/${currentWeather.weather.icon}.png`}
          alt={currentWeather.weather.description}
          className="w-16 h-16"
        />
        <div className="ml-4">
          <p className="text-xl font-semibold capitalize">
            {currentWeather.weather.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center p-3 bg-white/80 rounded-lg">
          <Thermometer className="w-5 h-5 text-blue-500" />
          <div className="ml-3">
            <p className="text-sm text-gray-500">Temperature</p>
            <p className="font-semibold">{Math.round(currentWeather.temp)}°C</p>
          </div>
        </div>

        <div className="flex items-center p-3 bg-white/80 rounded-lg">
          <Droplets className="w-5 h-5 text-blue-500" />
          <div className="ml-3">
            <p className="text-sm text-gray-500">Humidity</p>
            <p className="font-semibold">{Math.round(currentWeather.rh)}%</p>
          </div>
        </div>

        <div className="flex items-center p-3 bg-white/80 rounded-lg">
          <Wind className="w-5 h-5 text-blue-500" />
          <div className="ml-3">
            <p className="text-sm text-gray-500">Wind Speed</p>
            <p className="font-semibold">{Math.round(currentWeather.wind_spd)} m/s</p>
          </div>
        </div>

        <div className="flex items-center p-3 bg-white/80 rounded-lg">
          <Cloud className="w-5 h-5 text-blue-500" />
          <div className="ml-3">
            <p className="text-sm text-gray-500">Clouds</p>
            <p className="font-semibold">{currentWeather.clouds}%</p>
          </div>
        </div>

        <div className="flex items-center p-3 bg-white/80 rounded-lg">
          <Sun className="w-5 h-5 text-blue-500" />
          <div className="ml-3">
            <p className="text-sm text-gray-500">UV Index</p>
            <p className="font-semibold">{currentWeather.uv.toFixed(1)}</p>
          </div>
        </div>

        <div className="flex items-center p-3 bg-white/80 rounded-lg">
          <Umbrella className="w-5 h-5 text-blue-500" />
          <div className="ml-3">
            <p className="text-sm text-gray-500">Precipitation</p>
            <p className="font-semibold">{Math.round(currentWeather.pop)}%</p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100">
        <h3 className="text-lg font-semibold mb-4">3-Hour Forecast</h3>
        <div className="grid grid-cols-4 gap-2">
          {data.data.slice(1, 5).map((forecast, index) => (
            <div key={index} className="text-center p-2 bg-white/60 rounded-lg">
              <p className="text-sm text-gray-500">{formatTime(forecast.timestamp_local)}</p>
              <img
                src={`https://www.weatherbit.io/static/img/icons/${forecast.weather.icon}.png`}
                alt={forecast.weather.description}
                className="w-8 h-8 mx-auto my-1"
              />
              <p className="font-semibold">{Math.round(forecast.temp)}°C</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}