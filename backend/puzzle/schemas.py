from pydantic import BaseModel
from typing import List

class PuzzleResponse(BaseModel):
    puzzle_id: str
    grid: List[List[int]]
    difficulty: str

class MatchRequest(BaseModel):
    puzzle_id: str
    solution: List[List[int]]

class MatchResponse(BaseModel):
    is_match: bool
    message: str
