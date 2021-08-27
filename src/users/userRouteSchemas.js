const Joi = require('joi');

const createUserPayloadSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
}).label('Create User Payload');

const getUserParamsSchema = Joi.object({
  id: Joi.string().uuid().required(),
}).label('Get User Params');

module.exports = {
  createUserPayloadSchema,
  getUserParamsSchema,
};
