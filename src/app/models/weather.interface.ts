import { Daily } from './daily.interface';
import { HourlyExcludeEnum } from '../enums/hourly-exclude.enum';
import { Hourly } from './hourly.interface';

export interface WeatherResponse {
  lat: number;
  lot: number;
  timezone: string;
  timezone_offset: number;
  daily: Daily[];
  hourly: Hourly[];
}

export interface WeatherRequest {
  lat: number;
  lon: number;
  exclude?: HourlyExcludeEnum[];
  units?: 'standart' | 'metric' | 'imperial';
  lang?: string;
}
