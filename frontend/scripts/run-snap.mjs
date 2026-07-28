import { run } from 'react-snap';
import { readFileSync } from 'fs';

const routes = JSON.parse(readFileSync('./prerender-routes.json', 'utf-8'));

run({
  source: 'dist',
  include: routes,
  puppeteerArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
  skipThirdPartyRequests: true,
  waitFor: 3000, 
  concurrency: 1,       // строго послідовно, один за одним
  minifyHtml: false,    // тимчасово вимкнути, щоб не плутати діагностику
});
