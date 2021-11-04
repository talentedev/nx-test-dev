import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Weather } from '../models/weather';
import { City } from '../models/city';

const apiKey = environment.apiKey;
const endpoint = 'https://api.openweathermap.org/';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {
  }

  getCity(city: String): Observable<City[]> {
    return this.http.get<City[]>(`${endpoint}/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
  }

  getHourlyWeather(lat: Number, lon: Number): Observable<Weather[]> {
    return this.http.get<{hourly: Weather[]}>(
      `${endpoint}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&units=metric&appid=${apiKey}`
      )
      .pipe(map((weather) => weather.hourly || []));
  }

  getDailyWeather(lat: Number, lon: Number): Observable<Weather[]> {
    return this.http.get<{daily: Weather[]}>(
      `${endpoint}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`
      )
      .pipe(map((weather) => weather.daily || []));
  }
}
