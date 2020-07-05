import { fetchCat } from '../src/cat';

test('cat', () => {
  return fetchCat().then((result) => {
    expect(result.length).toBe(3);
  });
});
