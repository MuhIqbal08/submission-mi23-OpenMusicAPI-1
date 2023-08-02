const SongsHandler = require('./songsHandler');
const songsRoutes = require('./songsRoutes');

module.exports = {
  name: 'songs',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const songsHandler = new SongsHandler(service, validator);
    server.route(songsRoutes(songsHandler));
  },
};
