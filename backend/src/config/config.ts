import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

interface Config {
  nodeEnv: string;
  port: number;
  mongoUri: string;
}

// Configuration object with environment variables and defaults
export const config: Config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/myapp",
};
