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

    if (!apiUrl) {
      setBackendStatus(
        "❌ ERROR: VITE_API_URL is missing! Check your environment variables in Vercel."
      );
      return;
    }

    fetch(`${apiUrl}/api/quota`)
      .then((res) => {
        if (!res.ok) throw new Error("Backend responded with error");
        setBackendStatus("✅ Backend reachable");
      })
      .catch((err) => {
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

export default App;
