import Joi from 'joi';

export default {
  signInBody: {
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
  signUpBody: {
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
      gCaptcha: Joi.string().required(),
      roles: Joi.string().optional(),
    }),
  },
};
