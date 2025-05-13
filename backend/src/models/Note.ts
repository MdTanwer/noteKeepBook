import mongoose, { Document, Schema } from "mongoose";

// Note interface
export interface INote extends Document {
  title: string;
  content: string;
  color: string;
  groupId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Note schema
const noteSchema = new Schema<INote>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters long"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    color: {
      type: String,
      default: "#4F46E5", // Default indigo color
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      default: null,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create and export the Note model
export const Note = mongoose.model<INote>("Note", noteSchema);
