import os
import json
from google import genai
from typing import Dict, Any
from dotenv import load_dotenv

load_dotenv()

# Create a client with your API key
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

model = "gemini-2.0-flash"

def generate_challenge_with_ai(difficulty: str, subject: str) -> Dict[str, Any]:
    system_prompt = f"""You are an expert coding challenge creator.

    Your task is to create ONE multiple-choice coding question.

    Input parameters:
    - Subject: {subject}
    - Difficulty: {difficulty} (easy, medium, or hard)

    Question requirements:
    1. The question MUST strictly belong to the given subject.
    - Example: If subject is "DSA", use topics like sorting, searching, stacks, queues, etc.
    - Example: If subject is "SQL", use queries, joins, window functions, etc.
    - Example: If subject is "OS", use scheduling, deadlocks, memory management, etc.
    2. Difficulty meaning:
    - Easy: basic syntax, simple logic, common concepts
    - Medium: intermediate algorithms, data structures, or features
    - Hard: advanced algorithms, optimization, or design patterns
    3. All 4 options must be realistic and plausible — only ONE correct.
    4. The correct answer must be at the given index in "correct_answer_id" (0-based).
    5. The explanation must be detailed and formatted in valid HTML.
    6. The question title must include the title in an HTML heading tag (e.g., <h3>).

    Output format:
    Return ONLY valid JSON in the following structure:
    {{
        "title": "<h3>Title of the question</h3><p>Full question description here</p>",
        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
        "correct_answer_id": 0,
        "explanation": "<p>Detailed explanation of why the correct answer is correct and why others are wrong with paragrapgh in p tag </p>"
    }}
    Do NOT include any text outside of the JSON.
    """

    try:
        response = client.models.generate_content(
            model=model,
            contents=f"{system_prompt}\nRespond only with the JSON object."
        )

        content = response.text.strip()

        if content.startswith("```json"):
            content = content[7:-3].strip()

        challenge_data = json.loads(content)

        required_fields = ["title", "options", "correct_answer_id", "explanation"]
        for field in required_fields:
            if field not in challenge_data:
                raise ValueError(f"Missing required field: {field}")

        return challenge_data

    except Exception as e:
        print(f"Error generating challenge: {e}")
        return {
            "title": "<h3>Basic Python List Operation</h3><p>What is the correct way to add an element to a list in Python?</p>",
            "options": [
                "my_list.append(5)",
                "my_list.add(5)",
                "my_list.push(5)",
                "my_list.insert(5)",
            ],
            "correct_answer_id": 0,
            "explanation": "<p>In Python, <code>append()</code> adds an element to the end of a list. Other methods like <code>add()</code>, <code>push()</code>, and <code>insert()</code> are either incorrect or do not exist for lists.</p>"
        }
