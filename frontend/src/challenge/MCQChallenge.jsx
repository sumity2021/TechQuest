import "react";
import { useState } from "react";
import { useApi } from "../utils/api.js";

export function MCQChallenge({
  challenge,
  showExplanation = false,
  showDeleteButton = false,
}) {
  const { makeRequest } = useApi();
  const [selectedOption, setSelectedOption] = useState(null);
  const [shouldShowExplanation, setShouldShowExplanation] =
    useState(showExplanation);
  const subjectMap = {
    dsa: "Data Structures & Algorithms",
    cpp: "C++",
    sql: "SQL",
    oops: "Object-Oriented Programming",
    java: "Java",
    os: "Operating Systems",
    dbms: "Database Management Systems",
    cn: "Computer Networks",
  };

  const difficultyMap = {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
  };

  const subjectColor = {
    dsa: "#007bff",
    cpp: "#6f42c1",
    sql: "#17a2b8",
    oops: "#fd7e14",
    java: "#f44336",
    os: "#20c997",
    dbms: "#6610f2",
    cn: "#c626bcff",
  };

  const difficultyColor = {
    easy: "#21c61fff",
    medium: "#ffc107",
    hard: "#dd1125ff",
  };

  const options =
    typeof challenge.options === "string"
      ? JSON.parse(challenge.options)
      : challenge.options;

  const handleOptionSelect = (index) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    setShouldShowExplanation(true);
  };

  const getOptionClass = (index) => {
    if (selectedOption === null) return "option";

    if (index === challenge.correct_answer_id) {
      return "option correct";
    }
    if (selectedOption === index && index !== challenge.correct_answer_id) {
      return "option incorrect";
    }

    return "option";
  };

  const handleDelete = async () => {
    try {
      await makeRequest(`delete-challenge/${challenge.id}`, {
        method: "DELETE",
      });
      window.location.reload();
    } catch (error) {
      alert(`Failed to delete challenge: ${error.message}`);
    }
  };

  return (
    <div className="challenge-display">
      <div className="challenge-control">
        <div>
          <p>
            <strong>Difficulty</strong>: {""}
            <span style={{ color: difficultyColor[challenge.difficulty] }}>
              {difficultyMap[challenge.difficulty] || challenge.difficulty}
            </span>
          </p>
          <p>
            <strong>Subject</strong>: {""}
            <span style={{ color: subjectColor[challenge.subject] }}>
              {subjectMap[challenge.subject] || challenge.subject}
            </span>
          </p>
        </div>
        {showDeleteButton && (
          <button className="delbtn" onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
      <p className="challenge-title">{challenge.title}</p>
      <div className="options">
        {options.map((option, index) => (
          <div
            className={getOptionClass(index)}
            key={index}
            onClick={() => handleOptionSelect(index)}
          >
            {option}
          </div>
        ))}
      </div>
      {shouldShowExplanation && selectedOption !== null && (
        <div className="explanation">
          <h4>Explanation</h4>
          <p>{challenge.explanation}</p>
        </div>
      )}
    </div>
  );
}
