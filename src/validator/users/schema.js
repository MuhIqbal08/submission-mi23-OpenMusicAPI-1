const Joi = require('joi');

const UserPayloadSchema = Joi.object({
  username: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
  fullname: Joi.string().trim().required(),
});

module.exports = { UserPayloadSchema };
