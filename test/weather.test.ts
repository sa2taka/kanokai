import { fetchWeather } from '../src/weather';

test('weather', () => {
  return fetchWeather().then((weather) => {
    expect(weather).not.toBe(undefined);
    if (weather) {
      expect(weather.city_name).toBe('Nagano');
    }
  });
});
