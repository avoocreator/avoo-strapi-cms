module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // Di balik reverse proxy (Render/Railway) cookie login admin butuh ini:
  proxy: { koa: env.bool('IS_PROXIED', true) },
  ...(env('PUBLIC_URL') ? { url: env('PUBLIC_URL') } : {}),
  app: { keys: env.array('APP_KEYS') },
});
