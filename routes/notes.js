import express from "express";
import {
  fetchAllNotes,
  addNote,
  updateNote,
  deleteNote,
} from "../controllers/notes.js";
import { fetchUser, validateNewNote } from "../middlewares/middlewares.js";
import catchAsync from "../helpers/catchAsync.js";

const router = express.Router();

// Get all the notes using : GET /api/notes/
router.get("/", fetchUser, catchAsync(fetchAllNotes));

// Get all the notes using : POST /api/notes/
router.post("/", fetchUser, validateNewNote, catchAsync(addNote));

// Update the notes using: PUT /api/notes
router.put("/:id", fetchUser, validateNewNote, catchAsync(updateNote));

// Delete the notes using: PUT /api/notes
router.delete("/:id", fetchUser, catchAsync(deleteNote));

export default router;
