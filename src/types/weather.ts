export interface WeatherData {
  city_name: string;
  country_code: string;
  lat: number;
  lon: number;
  timezone: string;
  data: WeatherDataPoint[];
}

export interface WeatherDataPoint {
  timestamp_local: string;
  temp: number;
  app_temp: number; // feels like temperature
  rh: number; // relative humidity
  wind_spd: number;
  wind_dir: number;
  clouds: number;
  weather: {
    icon: string;
    code: number;
    description: string;
  };
  pop: number; // probability of precipitation
  precip: number;
  snow: number;
  uv: number;
  vis: number; // visibility
}