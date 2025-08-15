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
    system_prompt = f"""
    You are an expert coding challenge creator.

    Your task is to generate a multiple-choice coding question in the subject: {subject}.
    The question difficulty is: {difficulty}.

    Guidelines:
    - For easy: basic syntax, simple operations, or common programming concepts.
    - For medium: intermediate concepts like data structures, algorithms, or language features.
    - For hard: advanced topics, design patterns, optimization techniques, or complex algorithms.
    - Subject must align with "{subject}" (e.g., DSA → sorting/searching, SQL → queries, OS → scheduling, etc.).
    - Generate new Questions Every Time 

    Return only the JSON in this exact structure:
    {{
        "title": "The question title",
        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
        "correct_answer_id": 0,
        "explanation": "Detailed explanation of why the correct answer is right"
    }}
    Make sure only one option is correct, and all options are plausible.
    """

    try:
        response = client.models.generate_content(
            model=model,
            contents=f"{system_prompt}\nRespond only with the JSON object."
        )

        content = response.text.strip()

        # Clean markdown code fences if present
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
            "title": "Basic Python List Operation",
            "options": [
                "my_list.append(5)",
                "my_list.add(5)",
                "my_list.push(5)",
                "my_list.insert(5)",
            ],
            "correct_answer_id": 0,
            "explanation": "In Python, append() adds an element to the end of a list."
        }
