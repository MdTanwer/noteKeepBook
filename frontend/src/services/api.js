import axios from "axios";

// Define API base URL for development/production
const baseURL = import.meta.env.PROD
  ? "https://notekeepbook.onrender.com/api"
  : "https://notekeepbook.onrender.com/api";

// Create axios instance
const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log("API Request:", config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error(
      "API Response Error:",
      error.message,
      error.response?.status,
      error.config?.url
    );
    return Promise.reject(error);
  }
);

export default api;
