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
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2">Loading history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button
          onClick={fetchHistory}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  const groupedChallenges = groupChallengesBySubject(history);

  return (
    <div className="history-panel">
      <h2 className="text-2xl font-bold mb-6">Challenge History</h2>
      {history.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No challenges attempted yet</p>
          <p className="text-sm text-gray-500 mt-2">
            Generate your first challenge to see it here
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedChallenges).map(([subject, challenges]) => (
            <div key={subject} className="subject-group">
              <div className="history-list">
                {challenges.map((challenge) => (
                  <MCQChallenge
                    challenge={challenge}
                    key={challenge.id}
                    showExplanation
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
