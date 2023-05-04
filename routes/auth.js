import express from "express";
import catchAsync from "../helpers/catchAsync.js";
import { createUser, loginUser, getUser } from "../controllers/auth.js";
import {
  validateUserRegister,
  validateUserLogin,
  fetchUser,
} from "../middlewares/middlewares.js";

const router = express.Router();

// Create a new user using: POST /api/auth/createuser "no login required"
router.post("/createuser", validateUserRegister, catchAsync(createUser));

// Authenticate a user using: POST /api/auth/login "no login required"
router.post("/login", validateUserLogin, catchAsync(loginUser));

// Get logged in user details using: POST /api/auth/getuser "login required"
router.post("/getuser", fetchUser, catchAsync(getUser));

export default router;
