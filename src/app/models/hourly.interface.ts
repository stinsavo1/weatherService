import { HourlyExcludeEnum } from '../enums/hourly-exclude.enum';
import { WeatherOptions } from './weather-options.interface';

export interface HourlyRequest {
  lat: number;
  lon: number;
  exclude?: HourlyExcludeEnum[];
  units?: 'standart' | 'metric' | 'imperial';
  lang?: string;
}

export interface Hourly {
  clouds: number;
  dew_point: number
  dt: number;
  feels_like : {
    day: number; night: number; eve: number; morn: number;
  }
  humidity: number;
  moon_phase: number;
  moonrise: number;
  moonset: number;
  pop: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: number;
  uvi: number;
  weather: WeatherOptions[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}
