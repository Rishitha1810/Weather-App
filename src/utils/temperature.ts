export function getWeatherBackground(code: number, isDay: boolean): string {
  // Weatherbit weather codes: https://www.weatherbit.io/api/codes
  if (code >= 200 && code < 300) { // Thunderstorm
    return 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=2000&q=80';
  } else if (code >= 300 && code < 400) { // Drizzle
    return 'https://images.unsplash.com/photo-1541919329513-35f7af297129?auto=format&fit=crop&w=2000&q=80';
  } else if (code >= 500 && code < 600) { // Rain
    return 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=2000&q=80';
  } else if (code >= 600 && code < 700) { // Snow
    return 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&w=2000&q=80';
  } else if (code >= 700 && code < 800) { // Atmosphere (fog, mist, etc.)
    return 'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?auto=format&fit=crop&w=2000&q=80';
  } else if (code === 800) { // Clear
    return isDay 
      ? 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&w=2000&q=80'
      : 'https://images.unsplash.com/photo-1532978379173-523e16f371f9?auto=format&fit=crop&w=2000&q=80';
  } else { // Clouds
    return 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=2000&q=80';
  }
}