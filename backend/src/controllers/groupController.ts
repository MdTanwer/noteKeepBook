import { Request, Response, NextFunction } from "express";
import { Group } from "../models/Group";
import { AppError } from "../middleware/errorHandler";

// Get all groups
export const getAllGroups = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const groups = await Group.find();
    res.status(200).json({
      status: "success",
      results: groups.length,
      data: groups,
    });
  } catch (error) {
    next(error);
  }
};

// Get a single group
export const getGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return next(new AppError("No group found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: group,
    });
  } catch (error) {
    next(error);
  }
};

// Create a new group
export const createGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const newGroup = await Group.create(data);
    res.status(201).json({
      status: "success",
      data: newGroup,
    });
  } catch (error) {
    next(error);
  }
};

// Update a group
export const updateGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const group = await Group.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!group) {
      return next(new AppError("No group found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: group,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a group
export const deleteGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);
    if (!group) {
      return next(new AppError("No group found with that ID", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
