// Simple script to test API connectivity
import axios from "axios";

const API_URL = "http://13.61.0.9:5000/api";

// Test the health endpoint
console.log(`Testing connection to ${API_URL}/health...`);

axios
  .get(`${API_URL}/health`)
  .then((response) => {
    console.log("Success! Response:", response.data);
  })
  .catch((error) => {
    console.error("Error connecting to API:");
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error(
        "No response received. This could be a network, CORS, or server issue."
      );
      console.error(error.request);
    } else {
      // Something happened in setting up the request
      console.error("Error setting up request:", error.message);
    }

    if (error.message.includes("CORS")) {
      console.error(
        "\nCORS ERROR DETECTED! The API server may not allow requests from your origin."
      );
      console.error("Possible solutions:");
      console.error(
        "1. Make sure the API server has CORS enabled for your frontend origin"
      );
      console.error(
        "2. Check if the API server allows the HTTP methods you're using"
      );
      console.error(
        "3. Verify the API server allows the headers you're sending"
      );
    }
  });
