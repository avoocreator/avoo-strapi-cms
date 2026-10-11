'use strict';
// Pakai: npm run seed   (butuh .env / DATABASE_* yang sama dengan server)
const { createStrapi, compileStrapi } = require('@strapi/strapi');
const seed = require('../src/utils/seed');

async function main() {
  const app = await createStrapi(await compileStrapi()).load();
  app.log.level = 'info';
  await seed(app);
  await app.destroy();
  process.exit(0);
}
main().catch((e) => { console.error(e); process.exit(1); });
