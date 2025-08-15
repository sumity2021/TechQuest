import "react";
import { useState } from "react";

export function MCQChallenge({ challenge, showExplanation = false }) {
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
    dsa: "#007bff", // blue
    cpp: "#6f42c1", // purple
    sql: "#17a2b8", // teal
    oops: "#fd7e14", // orange
    java: "#f44336", // red
    os: "#20c997", // green-teal
    dbms: "#6610f2", // indigo
    cn: "#c626bcff", // yellow
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

  return (
    <div className="challenge-display">
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
