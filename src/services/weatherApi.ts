import type { WeatherData } from '../types/weather';

const API_KEY = 'a52d3233eamsh7e6f1410ba5bf8ep169936jsn0f045fe7c3ff';
const API_HOST = 'weatherbit-v1-mashape.p.rapidapi.com';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': API_HOST,
  },
};

export async function fetchWeatherData(city: string): Promise<WeatherData> {
  try {
    const response = await fetch(
      `https://${API_HOST}/forecast/3hourly?city=${encodeURIComponent(city)}&units=metric&lang=en`,
      options
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 401 || response.status === 403) {
        throw new Error('Invalid API key or unauthorized access');
      } else if (response.status === 404) {
        throw new Error('City not found');
      } else {
        throw new Error(`Weather data fetch failed: ${response.status} ${errorText}`);
      }
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

export async function fetchWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  try {
    const response = await fetch(
      `https://${API_HOST}/forecast/3hourly?lat=${lat}&lon=${lon}&units=metric&lang=en`,
      options
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 401 || response.status === 403) {
        throw new Error('Invalid API key or unauthorized access');
      } else if (response.status === 404) {
        throw new Error('Location not found');
      } else {
        throw new Error(`Weather data fetch failed: ${response.status} ${errorText}`);
      }
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}