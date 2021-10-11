import { WEATHER } from '../constants';

export function setWeather(weather) {
  if (weather === 'rainy') {
    return WEATHER.RAINY;
  }

  if (weather === 'snowy') {
    return WEATHER.SNOWY;
  }

  return WEATHER.SUNNY;
}
