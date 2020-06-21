import { weatherText } from '../src/call';

describe('call', () => {
  test('weather', () => {
    return weatherText().then((text) => {
      // 見るだけ
      console.log(text);
    });
  });
});
