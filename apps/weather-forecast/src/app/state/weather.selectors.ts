import { createFeatureSelector } from '@ngrx/store';
import { Weather } from '../models/weather';
 
export const selectWeather = createFeatureSelector<ReadonlyArray<Weather>>('weather');