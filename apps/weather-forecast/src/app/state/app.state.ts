import { Weather } from '../models/weather';
import { City } from '../models/city';

export interface AppState {
  weather: ReadonlyArray<Weather>;
  city: City
}