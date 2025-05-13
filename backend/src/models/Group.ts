import mongoose, { Document, Schema } from "mongoose";

// Group interface
export interface IGroup extends Document {
  name: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

// Group schema
const groupSchema = new Schema<IGroup>(
  {
    name: {
      type: String,
      required: [true, "Group name is required"],
      trim: true,
      maxlength: [50, "Group name cannot be more than 50 characters long"],
    },
    color: {
      type: String,
      default: "#3B82F6", // Default blue color
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create and export the Group model
export const Group = mongoose.model<IGroup>("Group", groupSchema);
