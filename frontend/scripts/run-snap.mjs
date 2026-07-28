import { run } from 'react-snap';
import { readFileSync } from 'fs';

const routes = JSON.parse(readFileSync('./prerender-routes.json', 'utf-8'));

run({
  source: 'dist',
  include: ['/'], // тимчасово тільки головна, для дебагу
  puppeteerArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
  skipThirdPartyRequests: false, // тимчасово вимкнути фільтр, щоб побачити ВСІ запити
  waitFor: 2500,
  concurrency: 1,
});