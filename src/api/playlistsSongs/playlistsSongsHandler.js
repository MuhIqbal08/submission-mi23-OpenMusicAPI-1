const autoBind = require('auto-bind');

class PlaylistsSongHandler {
  constructor(playlistsSongService, playlistService, songsService, validator) {
    this._playlistsSongService = playlistsSongService;
    this._playlistsService = playlistService;
    this._songsService = songsService;
    this._validator = validator;

    autoBind(this);
  }

  async postPlaylistSongHandler(request, h) {
    this._validator.validatePlaylistSongPayload(request.payload);
    const { id } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(id, credentialId);
    await this._songsService.verifyPlaylistSong(songId);
    await this._playlistsSongService.addSongToPlaylist(id, songId);

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan ke playlist',
    });
    response.code(201);
    return response;
  }

  async getPlaylistSongsHandler(request) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(id, credentialId);
    const playlists = await this._playlistsService.getPlaylistsByOwner(credentialId);
    const songs = await this._playlistsSongService.getSongsByPlaylistId(id);

    const response = {
      status: 'success',
      data: {
        playlist: playlists.map((playlist) => ({
          id: playlist.id,
          name: playlist.name,
          username: playlist.owner,
          songs: songs.map((song) => ({
            id: song.id,
            title: song.title,
            performer: song.performer,
          })),
        })),
      },
    };

    return response;
  }

  async deletePlaylistSongHandler(request) {
    const { id } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(id, credentialId);
    await this._playlistsSongService.deleteSongFromPlaylist(id, songId);

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus dari playlist',
    };
  }
}

module.exports = PlaylistsSongHandler;
