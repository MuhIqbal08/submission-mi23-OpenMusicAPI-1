const AlbumsHandler = require('./albumsHandler');
const albumsRoutes = require('./albumsRoutes');

module.exports = {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const albumsHandler = new AlbumsHandler(service, validator);
    server.route(albumsRoutes(albumsHandler));
  },
};
