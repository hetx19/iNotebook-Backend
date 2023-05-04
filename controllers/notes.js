import Notes from "../models/Note.js";
import ExpressError from "../helpers/expressError.js";

export const fetchAllNotes = async (req, res) => {
  const { id } = req.user;
  const notes = await Notes.find({ user: id });
  res.status(201).json(notes);
};

export const addNote = async (req, res) => {
  const { id } = req.user;
  const { title, description, tag } = req.body;
  const notes = new Notes({
    title,
    description,
    tag,
    user: id,
  });
  const resp = await notes.save();
  res.status(201).json(resp);
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const note = await Notes.findById(id);
  if (!note) {
    throw new ExpressError("Note not found", 404);
  }
  if (note.user.toString() !== userId) {
    throw new ExpressError("Unauthorized access", 401);
  }
  const updatedNote = await Notes.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true, runValidators: true }
  );
  res.status(201).json(updatedNote);
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const note = await Notes.findById(id);
  if (!note) {
    throw new ExpressError("Note not found", 404);
  }
  if (note.user.toString() !== userId) {
    throw new ExpressError("Unauthorized access", 401);
  }
  const deletedNote = await Notes.findByIdAndDelete(id);
  res.status(201).json({
    message: `${deletedNote.title} deleted successfully`,
    note: deletedNote,
  });
};
