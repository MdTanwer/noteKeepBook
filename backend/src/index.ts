import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import { connectToDatabase } from "./utils/database";
import { errorHandler } from "./middleware/errorMiddleware";
import { notFoundHandler } from "./middleware/notFoundHandler";
import { requestLogger } from "./middleware/logger";

import noteRoutes from "./routes/noteRoutes";
import groupRoutes from "./routes/groupRoutes";

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Base route
app.get("/", (req: Request, res: Response) => {
  res.send("Notes API is running!");
});

// Use routes
app.use("/api/notes", noteRoutes);
app.use("/api/groups", groupRoutes);

// 404 handler for undefined routes
app.all("*", notFoundHandler);

// Global error handler
app.use(errorHandler);

// Start the server and connect to database
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Start Express server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup error:", error);
    process.exit(1);
  }
};

// Start the server
startServer();

export default app;
