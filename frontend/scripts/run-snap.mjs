import { run } from 'react-snap';
import { readFileSync } from 'fs';

const routes = JSON.parse(readFileSync('./prerender-routes.json', 'utf-8'));

run({
  source: 'dist',
  include: routes, 
  puppeteerArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
  skipThirdPartyRequests: false, 
  waitFor: () => {
    const parts = location.pathname.split("/").filter(Boolean);

    const isProductPage =
      parts[0] === "catalog" &&
      parts.length > 3;

    if (isProductPage) {
      return document.querySelector("#product") !== null;
    }

    return new Promise((resolve) => setTimeout(resolve, 1500));
  },
});