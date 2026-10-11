'use strict';

/**
 * Isi konten awal dari data/seed.json (hasil ekspor src/data/*.ts website).
 * Aman dijalankan berulang: collection yang sudah berisi tidak disentuh.
 */
module.exports = async function seed(strapi) {
  const data = require('../../data/seed.json');

  for (const [name, rows] of Object.entries(data)) {
    const uid = `api::${name}.${name}`;

    if (!Array.isArray(rows)) {
      // single type (site-setting)
      const existing = await strapi.documents(uid).findFirst();
      if (!existing) {
        await strapi.documents(uid).create({ data: rows, status: 'published' });
        strapi.log.info(`[seed] ${name}: dibuat`);
      } else {
        strapi.log.info(`[seed] ${name}: sudah ada, dilewati`);
      }
      continue;
    }

    const count = await strapi.documents(uid).count();
    if (count > 0) {
      strapi.log.info(`[seed] ${name}: sudah berisi ${count} entri, dilewati`);
      continue;
    }
    for (const row of rows) {
      await strapi.documents(uid).create({ data: row, status: 'published' });
    }
    strapi.log.info(`[seed] ${name}: ${rows.length} entri dibuat`);
  }
};
