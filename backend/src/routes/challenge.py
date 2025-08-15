from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel
from sqlalchemy.orm import Session
from ..ai_generator import generate_challenge_with_ai
from ..databases.db import(
    get_challenge_quota,
    create_challenge,
    create_challenge_quota,
    reset_quota_if_needed,
    get_user_challenges
)
import traceback
from ..utils import authenticate_and_get_user_details
from ..databases.models import get_db
import json
from datetime import datetime

router = APIRouter()

class ChallengeRequest(BaseModel):
    difficulty: str
    subject: str
    class Config:
        json_schema_extra = {"example": {"difficulty": "easy", "subject": "dsa"}}

@router.post("/generate-challenge")
async def generate_challenge(
    request_obj: ChallengeRequest,  # This is parsed JSON
    request: Request,               # This is the HTTP request object
    db: Session = Depends(get_db)
):
    try:
        user_details = authenticate_and_get_user_details(request)
        user_id = user_details.get("user_id")
        
        quota = get_challenge_quota(db, user_id)
        if not quota:
            quota = create_challenge_quota(db, user_id)
        
        quota = reset_quota_if_needed(db, quota)

        if quota.quota_remaining <= 0:
            raise HTTPException(status_code=429, detail="Quota exhausted")
        
        challenge_data = generate_challenge_with_ai(
            request_obj.difficulty,
            request_obj.subject
        )

        new_challenge = create_challenge(
            db=db,
            difficulty=request_obj.difficulty,
            created_by=user_id,
            subject=request_obj.subject,
            title=challenge_data["title"],
            options=json.dumps(challenge_data["options"]),
            correct_answer_id=challenge_data["correct_answer_id"],
            explanation=challenge_data["explanation"]
        )

        quota.quota_remaining -= 1
        db.commit()

        return {
            "id": new_challenge.id,
            "difficulty": request_obj.difficulty,
            "title": new_challenge.title,
            "options": json.loads(new_challenge.options),
            "subject": request_obj.subject,
            "correct_answer_id": new_challenge.correct_answer_id,
            "explanation": new_challenge.explanation,
            "timestamp": new_challenge.date_created.isoformat()
        }
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/my-history")
async def my_history(request: Request, db: Session = Depends(get_db)):
    try:
        user_details = authenticate_and_get_user_details(request)
        user_id = user_details.get("user_id")
        challenges = get_user_challenges(db, user_id)
        return {"challenges": challenges}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error fetching history: {str(e)}")

@router.get("/quota")
async def get_quota(request: Request, db: Session = Depends(get_db)):
    try:
        user_details = authenticate_and_get_user_details(request)
        user_id = user_details.get("user_id")

        quota = get_challenge_quota(db, user_id)
        if not quota:
            # Create quota if it doesn't exist
            quota = create_challenge_quota(db, user_id)
        
        quota = reset_quota_if_needed(db, quota)
        return {
            "user_id": user_id,
            "quota_remaining": quota.quota_remaining,
            "last_reset_date": quota.last_reset_date.isoformat()
        }
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error fetching quota: {str(e)}")

@router.get("/test")
async def test_endpoint():
    return {"message": "API routes are working!", "timestamp": datetime.now().isoformat()}