import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  CORS_ORIGIN: Joi.string().required(),
});
