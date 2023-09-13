import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_KEY } from '../environment';
import { Observable } from 'rxjs';
import { CityRequest, CityResponse } from '../models/city.interface';
import { createHttpParams } from './http-params';
import { HourlyRequest } from '../models/hourly.interface';
import { WeatherRequest, WeatherResponse } from '../models/weather.interface';

@Injectable({ providedIn: 'root' })
export class WeatherService {

  constructor(private httpClient: HttpClient) {
  }

  public getCity(params: CityRequest): Observable<CityResponse[]> {
    const httpParams = createHttpParams({
      ...params,
      appid: API_KEY
    });

    return this.httpClient.get<CityResponse[]>(`http://api.openweathermap.org/geo/1.0/direct`, { params: httpParams })
  }

  public getPreset(params: WeatherRequest): Observable<WeatherResponse> {
    const httpParams = createHttpParams({
      ...params,
      appid: API_KEY
    });
    return this.httpClient.get<WeatherResponse>('https://api.openweathermap.org/data/2.5/onecall', { params: httpParams })
  }

}
