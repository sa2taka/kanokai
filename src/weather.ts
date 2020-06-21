import fetch from 'node-fetch';
import { key } from './secrets/rapidapi';
import { WeatherResponse } from './type/weather';

export function fetchWeather() {
  const lat = 36.65;
  const lon = 138.18333;
  const hours = 24;

  return fetch(
    `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/hourly?hours=${hours}&lon=${lon}&lat=${lat}`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com',
        'x-rapidapi-key': key,
      },
    }
  )
    .then((response) => {
      return response.json() as Promise<WeatherResponse>;
    })
    .catch((err) => {
      console.log(err);
    });
}
