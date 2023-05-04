import Joi from "joi";

export const userSchema = Joi.object({
  username: Joi.string().required().alphanum().min(3).max(25),
  email: Joi.string().required(),
  password: Joi.string().required().min(5),
});

export const userSchemaLogin = Joi.object({
  username: Joi.string().required().alphanum().min(3).max(25),
  password: Joi.string().required().min(4),
});

export const newNoteSchema = Joi.object({
  title: Joi.string().required().min(3),
  description: Joi.string().required().min(3),
  tag: Joi.string().required().min(3),
});
