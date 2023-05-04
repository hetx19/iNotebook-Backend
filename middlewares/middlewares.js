import JWT from "jsonwebtoken";
import { userSchema, userSchemaLogin, newNoteSchema } from "./joiSchema.js";
import ExpressError from "../helpers/expressError.js";

export const validateUserRegister = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

export const validateUserLogin = (req, res, next) => {
  const { error } = userSchemaLogin.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

export const fetchUser = (req, res, next) => {
  // Get user from jwt token and add id to req object
  const token = req.header("auth-token");
  if (token) {
    const data = JWT.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } else {
    res.status(401).json({ message: "Please authenticate with a valid Token" }); //401 acess denied
  }
};

export const validateNewNote = (req, res, next) => {
  const { error } = newNoteSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(", ");
    console.log(msg);
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
