import { createAction, props } from '@ngrx/store';
import { Weather } from '../models/weather';
 
export const retrievedWeather = createAction(
  '[Weather List/API] Retrieve Weather Success',
  props<{ weather: ReadonlyArray<Weather> }>()
);