import { Request, Response, NextFunction } from "express";
import { Note } from "../models/Note";
import { AppError } from "../middleware/errorHandler";

// Get all notes
export const getAllNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filter = {};
    // Filter by group if groupId is provided
    if (req.query.groupId) {
      Object.assign(filter, { groupId: req.query.groupId });
    }

    const notes = await Note.find(filter);

    res.status(200).json({
      status: "success",
      results: notes.length,
      data: notes,
    });
  } catch (error) {
    next(error);
  }
};

// Get a single note
export const getNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return next(new AppError("No note found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

// Create a new note
export const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const newNote = await Note.create(data);
    res.status(201).json({
      status: "success",
      data: newNote,
    });
  } catch (error) {
    next(error);
  }
};

// Update a note
export const updateNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!note) {
      return next(new AppError("No note found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a note
export const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return next(new AppError("No note found with that ID", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
