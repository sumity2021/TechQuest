import { useEffect, useState } from "react";
import ClerkProviderWithRoutes from "./auth/ClerkProviderWithRoutes.jsx";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./layout/Layout.jsx";
import { ChallengeGenerator } from "./challenge/ChallengeGenerator.jsx";
import { HistoryPanel } from "./history/HistoryPanel.jsx";
import { AuthenticationPage } from "./auth/AuthenticationPage.jsx";
import "./App.css";

function App() {
  const [backendStatus, setBackendStatus] = useState("Checking backend...");

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    console.log("Environment variables:", {
      VITE_API_URL: import.meta.env.VITE_API_URL,
      NODE_ENV: import.meta.env.NODE_ENV,
      MODE: import.meta.env.MODE,
    });

    if (!apiUrl) {
      setBackendStatus(
        "❌ ERROR: VITE_API_URL is missing! Check your environment variables in Vercel."
      );
      return;
    }

    setBackendStatus(`🔄 Connecting to: ${apiUrl}/health`);

    // Test with the public health endpoint instead of the protected quota endpoint
    fetch(`${apiUrl}/health`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("Response received:", res.status, res.statusText);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Backend response:", data);
        setBackendStatus(`✅ Backend reachable: ${data.message}`);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setBackendStatus(
          `❌ Backend unreachable at ${apiUrl}. Error: ${err.message}`
        );
      });
  }, []);

  return (
    <ClerkProviderWithRoutes>
      <div
        style={{
          background: "#222",
          color: "#fff",
          padding: "8px",
          fontSize: "14px",
          fontFamily: "monospace",
        }}
      >
        {backendStatus}
      </div>
      <Routes>
        <Route path="/sign-in/*" element={<AuthenticationPage />} />
        <Route path="/sign-up" element={<AuthenticationPage />} />
        <Route element={<Layout />}>
          <Route path="/" element={<ChallengeGenerator />} />
          <Route path="/history" element={<HistoryPanel />} />
        </Route>
      </Routes>
    </ClerkProviderWithRoutes>
  );
}
