import fetch from 'node-fetch';

export function fetchCat(): Promise<string> {
  const catUrl = new URL('https://aws.random.cat/meow');
  return fetch(catUrl)
    .then((response) => {
      return response.json();
    })
    .then((json: any) => {
      return json.file;
    })
    .catch(() => {
      return 'cat';
    });
}
