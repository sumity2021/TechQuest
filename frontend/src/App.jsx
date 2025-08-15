import { useEffect, useState } from "react";
import ClerkProviderWithRoutes from "./auth/ClerkProviderWithRoutes.jsx";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./layout/Layout.jsx";
import { ChallengeGenerator } from "./challenge/ChallengeGenerator.jsx";
import { HistoryPanel } from "./history/HistoryPanel.jsx";
import { AuthenticationPage } from "./auth/AuthenticationPage.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";
import "./App.css";

function App() {
  const [backendStatus, setBackendStatus] = useState("Checking backend...");
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    // Debug environment variables
    const debug = {
      apiUrl: import.meta.env.VITE_API_URL,
      clerkKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
        ? "Present"
        : "Missing",
      mode: import.meta.env.MODE,
      dev: import.meta.env.DEV,
    };

    console.log("Environment Debug:", debug);
    setDebugInfo(debug);

    const apiUrl = import.meta.env.VITE_API_URL;

    if (!apiUrl) {
      setBackendStatus(
        "❌ ERROR: VITE_API_URL is missing! Check your environment variables."
      );
      return;
    }

    fetch(`${apiUrl}/api/quota`)
      .then((res) => {
        if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
        setBackendStatus("✅ Backend reachable");
      })
      .catch((err) => {
        console.error("Backend check failed:", err);
        setBackendStatus(
          `❌ Backend unreachable at ${apiUrl}. Error: ${err.message}`
        );
      });
  }, []);

  // Show loading state if Clerk key is missing
  if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Configuration Error</h2>
        <p>Missing VITE_CLERK_PUBLISHABLE_KEY environment variable</p>
        <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
      </div>
    );
  }

  return (
    <ErrorBoundary>
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
        {import.meta.env.DEV && (
          <div style={{ marginTop: "4px", fontSize: "12px" }}>
            Mode: {debugInfo.mode} | API: {debugInfo.apiUrl || "Not set"} |
            Clerk: {debugInfo.clerkKey}
          </div>
        )}
      </div>

      <ClerkProviderWithRoutes>
        <Routes>
          <Route path="/sign-in/*" element={<AuthenticationPage />} />
          <Route path="/sign-up" element={<AuthenticationPage />} />
          <Route element={<Layout />}>
            <Route path="/" element={<ChallengeGenerator />} />
            <Route path="/history" element={<HistoryPanel />} />
          </Route>
        </Routes>
      </ClerkProviderWithRoutes>
    </ErrorBoundary>
  );
}

export default App;
