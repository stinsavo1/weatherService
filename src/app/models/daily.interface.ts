import { Temperature } from './temperature.interface';
import { WeatherOptions } from './weather-options.interface';
export interface Daily {
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
  temp: Temperature
  uvi: number;
  weather: WeatherOptions[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}
