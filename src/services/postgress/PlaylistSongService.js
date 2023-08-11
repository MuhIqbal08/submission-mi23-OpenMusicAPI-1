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
           INNER JOIN playlistsongs ON songs.id = playlistsongs.song_id 
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
      id: resultPlaylists.rows[0].id,
      name: resultPlaylists.rows[0].name,
      username: resultPlaylists.rows[0].username,
      songs: resultSongs.rows,
    };
  }

  async getPlaylistActivities(playlistId) {
    const queryActivity = {
      text: `SELECT users.username, songs.title, playlist_song_activities.action, playlist_song_activities.time 
      FROM playlist_song_activities
      INNER JOIN users ON  playlist_song_activities.user_id = users.id
      INNER JOIN songs ON playlist_song_activities.song_id = songs.id
      LEFT JOIN collaborations ON playlist_song_activities.playlist_id = collaborations.playlist_id
      WHERE playlist_song_activities.playlist_id = $1`,
      values: [playlistId],
    };

    const resultActivity = await this._pool.query(queryActivity);

    const activities = resultActivity.rows.map((row) => ({
      username: row.username,
      title: row.title,
      action: row.action,
      time: row.time,
    }));

    return activities;
  }

  async deleteSongByPlaylist(playlistId, songId) {
    const query = {
      text: 'DELETE FROM playlistsongs WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
      values: [playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new InvariantError('Lagu gagal dihapus dari playlist');
    }
  }

  async addActivity(playlistId, songId, userId, action) {
    const id = nanoid(16);
    const time = new Date().toISOString();

    const query = {
      text: 'INSERT INTO playlist_song_activities VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, playlistId, songId, userId, action, time],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }
}

module.exports = PlaylistSongsService;
