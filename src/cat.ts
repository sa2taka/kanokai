import fetch from 'node-fetch';
import qs from 'querystring';
import { API_KEY } from './secrets/cat';

export function fetchCat(): Promise<string> {
  return loadImage()
    .then((response) => {
      return response.json();
    })
    .then((json: any) => {
      return json.map((e: any) => e.url);
    })
    .catch(() => {
      return 'cat';
    });
}

async function loadImage() {
  const url = 'https://api.thecatapi.com/v1/images/search';
  const headers = {
    'X-API-KEY': API_KEY,
  };
  const queryParams = qs.stringify({
    size: 'med',
    limit: 3,
  });
  return fetch(`${url}?${queryParams}`, {
    headers,
  });
}
