const Joi = require('joi');

const PlaylistSongPayloadSchema = Joi.object({
  songId: Joi.string().trim().required(),
});

module.exports = { PlaylistSongPayloadSchema };
