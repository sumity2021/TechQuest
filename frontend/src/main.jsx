import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Debug logging
console.log("Starting React app...");
console.log("Environment variables:", {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_CLERK_PUBLISHABLE_KEY: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
    ? "Present"
    : "Missing",
  MODE: import.meta.env.MODE,
});

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  console.error("Missing VITE_CLERK_PUBLISHABLE_KEY environment variable");
  // Don't throw error here, let App component handle it gracefully
}

try {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log("React app rendered successfully");
} catch (error) {
  console.error("Failed to render React app:", error);

  // Fallback error display
  document.getElementById("root").innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
      <h2>Application Error</h2>
      <p>Failed to start the application: ${error.message}</p>
      <button onclick="window.location.reload()">Reload Page</button>
    </div>
  `;
}
