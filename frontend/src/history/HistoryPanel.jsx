import "react";
import { useState, useEffect } from "react";
import { MCQChallenge } from "../challenge/MCQChallenge.jsx";
import { useApi } from "../utils/api.js";

export function HistoryPanel() {
  const { makeRequest } = useApi();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await makeRequest("my-history");
      console.log(data);
      setHistory(data.challenges);
    } catch (err) {
      setError("Failed to load history.");
    } finally {
      setIsLoading(false);
    }
  };

  const groupChallengesBySubject = (challenges) => {
    return challenges.reduce((acc, challenge) => {
      const subject = challenge.subject || "Other";
      if (!acc[subject]) {
        acc[subject] = [];
      }
      acc[subject].push(challenge);
      return acc;
    }, {});
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={fetchHistory} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  const groupedChallenges = groupChallengesBySubject(history);

  return (
    <div className="history-panel">
      <h2>Challenge History</h2>
      {history.length === 0 ? (
        <div className="no-challenges">
          <h3>No challenges attempted yet</h3>
          <p>Generate your first challenge to see it here</p>
        </div>
      ) : (
        <div>
          {Object.entries(groupedChallenges).map(([subject, challenges]) => (
            <div key={subject} className="subject-group">
              <div className="history-list">
                {challenges.map((challenge) => (
                  <MCQChallenge
                    challenge={challenge}
                    key={challenge.id}
                    showExplanation
                    showDeleteButton={true}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
