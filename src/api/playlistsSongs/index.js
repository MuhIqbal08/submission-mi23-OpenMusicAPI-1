const PlaylistsSongHandler = require('./playlistsSongsHandler');
const playlistsSongRoutes = require('./playlistsSongsRoutes');

module.exports = {
  name: 'playlistSongs',
  version: '1.0.0',
  register: async (server, {
    playlistsSongService, playlistService, songsService, validator,
  }) => {
    // eslint-disable-next-line max-len
    const playlistsSongHandler = new PlaylistsSongHandler(playlistsSongService, playlistService, songsService, validator);
    server.route(playlistsSongRoutes(playlistsSongHandler));
  },
};
