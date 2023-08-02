const PlaylistsSongHandler = require('./playlistsSongsHandler');
const playlistsSongRoutes = require('./playlistsSongsRoutes');

module.exports = {
  name: 'playlistSongs',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const playlistsSongHandler = new PlaylistsSongHandler(service, validator);
    server.route(playlistsSongRoutes(playlistsSongHandler));
  },
};
