import "react";
import { useState, useEffect } from "react";
import { MCQChallenge } from "./MCQChallenge.jsx";
import { useApi } from "../utils/api.js";

export function ChallengeGenerator() {
  const [challenge, setChallenge] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [difficulty, setDifficulty] = useState("easy");
  const [subject, setSubject] = useState("dsa");
  const [quota, setQuota] = useState(null);
  const { makeRequest } = useApi();

  useEffect(() => {
    fetchQuota();
  }, []);

  const fetchQuota = async () => {
    try {
      const data = await makeRequest("quota");
      setQuota(data);
    } catch (err) {
      console.log(err);
    }
  };

  const generateChallenge = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await makeRequest("generate-challenge", {
        method: "POST",
        body: JSON.stringify({ difficulty, subject }),
      });
      setChallenge(data);
      fetchQuota();
    } catch (err) {
      setError(err.message || "Failed to generate challenge.");
    } finally {
      setIsLoading(false);
    }
  };

  const getNextResetTime = () => {
    if (!quota?.last_reset_date) return null;
    const resetDate = new Date(quota.last_reset_date);
    resetDate.setHours(resetDate.getHours() + 24);
    return resetDate;
  };

  return (
    <div className="challenge-container">
      <h2>Challenge Generator</h2>

      <div className="quota-display">
        <p>Challenges remaining today: {quota?.quota_remaining || 0}</p>
        {quota?.quota_remaining === 0 && (
          <p>Next reset: {getNextResetTime()?.toLocaleString()}</p>
        )}
      </div>
      <div className="difficulty-selector">
        <label htmlFor="subject">Select Subject</label>
        <select
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={isLoading}
          className="mb-4"
        >
          <option value="dsa">Data Structures & Algorithms</option>
          <option value="cpp">C++</option>
          <option value="sql">SQL</option>
          <option value="oops">Object-Oriented Programming</option>
          <option value="java">Java</option>
          <option value="os">Operating Systems</option>
          <option value="dbms">Database Management Systems</option>
          <option value="cn">Computer Networks</option>
        </select>

        <label htmlFor="difficulty">Select Difficulty</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          disabled={isLoading}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <button
        onClick={generateChallenge}
        disabled={isLoading || quota?.quota_remaining === 0}
        className="generate-button"
      >
        {isLoading ? "Generating..." : "Generate Challenge"}
      </button>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {challenge && <MCQChallenge challenge={challenge} />}
    </div>
  );
}
