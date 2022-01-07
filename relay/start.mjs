import relay from './server.mjs';

relay.init({
  host: 'localhost',
  store: false,
  path: '../demo/dist',
});
