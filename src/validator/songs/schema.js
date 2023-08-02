const Joi = require('joi');

const SongPayloadSchema = Joi.object({
  title: Joi.string().trim().required(),
  year: Joi.number().integer().required(),
  genre: Joi.string().trim().required(),
  performer: Joi.string().trim().required(),
  duration: Joi.number().integer().allow(null),
  albumId: Joi.string().trim().allow(null),
});

module.exports = { SongPayloadSchema };
