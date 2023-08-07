const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class PlaylistSongsService {
  constructor() {
    this._pool = new Pool();
  }

  async addSongToPlaylist(playlistId, songId) {
    const id = `playlistsong-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO playlistsongs VALUES ($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new InvariantError('Lagu gagal ditambahkan ke playlist');
    }

    return result.rows[0].id;
  }

  async getSongsByPlaylistId(playlistId) {
    const querySong = {
      text: `SELECT songs.id, songs.title, songs.performer 
           FROM songs 
           JOIN playlistsongs ON songs.id = playlistsongs.song_id 
           WHERE playlistsongs.playlist_id = $1`,
      values: [playlistId],
    };

    const queryPlaylist = {
      text: `SELECT playlists.id, playlists.name, users.username
           FROM playlists
           INNER JOIN users ON playlists.owner = users.id
           WHERE playlists.id = $1`,
      values: [playlistId],
    };

    const resultSongs = await this._pool.query(querySong);
    const resultPlaylists = await this._pool.query(queryPlaylist);

    if (!resultPlaylists.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    return {
      playlist: resultPlaylists.rows,
      songs: resultSongs.rows,
    };
  }

  async deleteSongByPlaylist(playlistId, songId) {
    const query = {
      text: 'DELETE FROM playlistsongs WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
      values: [playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Lagu gagal dihapus dari playlist');
    }
  }
}

module.exports = PlaylistSongsService;
