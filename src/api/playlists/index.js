const PlaylistsHandler = require('./playlistsHandler');
const playlistsRoutes = require('./playlistsRoutes');

module.exports = {
  name: 'playlists',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const playlistsHandler = new PlaylistsHandler(service, validator);
    server.route(playlistsRoutes(playlistsHandler));
  },
};
