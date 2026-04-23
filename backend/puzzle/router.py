from fastapi import APIRouter, HTTPException
import uuid

from .schemas import PuzzleResponse, MatchRequest, MatchResponse
from .services import fetch_word_puzzle, store_solution, check_solution

router = APIRouter()

@router.get("/get", response_model=PuzzleResponse)
async def get_puzzle():
    """
    Fetches a random word, scrambles it, and stores the solution temporarily.
    """
    try:
        scrambled_word, original_word = await fetch_word_puzzle()
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Failed to fetch puzzle from external API: {str(e)}")

    puzzle_id = str(uuid.uuid4())
    store_solution(puzzle_id, original_word)

    return PuzzleResponse(
        puzzle_id=puzzle_id,
        scrambled_word=scrambled_word,
        word_length=len(original_word)
    )

@router.post("/match", response_model=MatchResponse)
async def match_puzzle(request: MatchRequest):
    """
    Checks if the submitted solution matches the stored solution for the given puzzle ID.
    """
    is_match = check_solution(request.puzzle_id, request.solution)
    
    if is_match:
        return MatchResponse(is_match=True, message="Congratulations! The solution is correct.")
    else:
        return MatchResponse(is_match=False, message="The solution is incorrect or the puzzle ID is invalid/expired.")
