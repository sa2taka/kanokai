import { fetchCat } from '../src/cat';

test('cat', () => {
  return fetchCat().then((url) => {
    expect(url).toMatch(/^https:\/\/purr.objects-us-east-1.dream.io\//);
  });
});
