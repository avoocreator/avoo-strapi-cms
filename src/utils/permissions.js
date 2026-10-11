'use strict';

/** Hak akses role Public: baca konten, dan hanya "create" untuk pesanan. */
const GRANTS = {
  project: ['find', 'findOne'],
  service: ['find', 'findOne'],
  'expertise-group': ['find', 'findOne'],
  'experience-item': ['find', 'findOne'],
  'participation-category': ['find', 'findOne'],
  faq: ['find', 'findOne'],
  'site-setting': ['find'],
  pesanan: ['create'],
};

module.exports = async function setPublicPermissions(strapi) {
  const role = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });
  if (!role) return;

  const permQuery = strapi.db.query('plugin::users-permissions.permission');
  for (const [name, actions] of Object.entries(GRANTS)) {
    for (const action of actions) {
      const key = `api::${name}.${name}.${action}`;
      const exists = await permQuery.findOne({ where: { action: key, role: role.id } });
      if (!exists) {
        await permQuery.create({ data: { action: key, role: role.id } });
        strapi.log.info(`[permissions] Public → ${key}`);
      }
    }
  }
};
