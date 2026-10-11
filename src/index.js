'use strict';

const setPublicPermissions = require('./utils/permissions');
const seed = require('./utils/seed');

module.exports = {
  register() {},

  async bootstrap({ strapi }) {
    await setPublicPermissions(strapi);
    // Set SEED_ON_BOOT=true sekali saja untuk mengisi konten awal, lalu hapus variabelnya.
    if (process.env.SEED_ON_BOOT === 'true') {
      await seed(strapi);
    }
  },
};
