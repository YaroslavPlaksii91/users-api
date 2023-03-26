const Joi = require("joi");

const addSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("admin", "user").required(),
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(2).max(30).required(),
  state: Joi.string().valid("male", "female").required(),
});

module.exports = {
  addSchema,
};
