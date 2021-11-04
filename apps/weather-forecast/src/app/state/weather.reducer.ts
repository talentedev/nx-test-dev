import { createReducer, on } from '@ngrx/store';

import { retrievedWeather } from './weather.actions';
import { Weather } from '../models/weather';

export const initialState: ReadonlyArray<Weather> = [];

export const weatherReducer = createReducer(
  initialState,
  on(retrievedWeather, (state, { weather }) => weather)
);