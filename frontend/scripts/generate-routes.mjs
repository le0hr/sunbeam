import fs from 'fs';
import axios from 'axios';

const wpClient = axios.create({
  baseURL: 'https://sunbeambe.com/wp-json/sunbeam/v1',
});

const CATEGORIES = [
  'rolety',
  'plise',
  'zhalyuzi',
  'moskitna'

];

async function generateRoutes() {
  const routes = ['/', '/catalog'];

  for (const categorySlug of CATEGORIES) {
    routes.push(`/catalog/${categorySlug}`);

    let page = 1;
    let totalPages = 1;

    do {
      const res = await wpClient.get('/products', {
        params: { page, categorySlug },
        timeout: 60000,
      });

      const products = res.data || [];
      totalPages = Number(res.headers['x-total-pages'] ?? 1);

      for (const product of products) {
        routes.push(`/catalog/${page}/${categorySlug}/${product.slug}`);
      }

      page++;
    } while (page <= totalPages);
  }

  fs.writeFileSync('./prerender-routes.json', JSON.stringify(routes, null, 2));
  console.log(`Generated ${routes.length} routes for react-snap`);
}

generateRoutes();