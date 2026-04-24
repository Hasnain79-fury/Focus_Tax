from fastapi import APIRouter, Query
from typing import Optional

router = APIRouter()

@router.get("/rules")
def get_tax_rules(local_hour: int = Query(..., description="The user's local hour (0-23)")):
    # Definition of "Late Night": between 11 PM (23) and 4 AM (4)
    is_late_night = local_hour >= 23 or local_hour <= 4
    
    if is_late_night:
        return {
            "is_late_night": True,
            "forced_challenge": "puzzle",
            "required_puzzle_streak": 5,
            "message": "It's late. Your brain needs to rest. Complete 5 puzzles to proceed."
        }
    else:
        return {
            "is_late_night": False,
            "forced_challenge": None,
            "required_puzzle_streak": 1,
            "message": "Before you scroll —"
        }
