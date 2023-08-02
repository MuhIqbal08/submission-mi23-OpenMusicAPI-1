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
  id, name, owner, username,
}) => ({
  id,
  name,
  owner,
  username,
});

module.exports = { mapDBToAlbumModel, mapDBToSongModel, mapDBToPlaylistsModel };
