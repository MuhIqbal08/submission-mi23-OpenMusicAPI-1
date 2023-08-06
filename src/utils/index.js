/* eslint-disable camelcase */
const mapDBToAlbumModel = ({ id, name, year }) => ({
  id,
  name,
  year,
});

const mapDBToSongModel = ({
  id, title, year, performer, genre, duration, album_id,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId: album_id,
});

const mapDBToPlaylistsModel = ({
  id, name, username,
}) => ({
  id,
  name,
  username,
});

const mapDBToPlaylistSongModel = ({
  id, playlist_id, song_id,
}) => ({
  id,
  playlistId: playlist_id,
  songId: song_id,
});

module.exports = {
  mapDBToAlbumModel, mapDBToSongModel, mapDBToPlaylistsModel, mapDBToPlaylistSongModel,
};
