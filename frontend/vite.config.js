import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  // Define environment variables for production build
  define: {
    // This sets the production API URL
    "import.meta.env.VITE_API_URL": JSON.stringify("http://13.49.158.62:5000"),
  },
});
