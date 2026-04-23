from pydantic import BaseModel

class PuzzleResponse(BaseModel):
    puzzle_id: str
    scrambled_word: str
    word_length: int

class MatchRequest(BaseModel):
    puzzle_id: str
    solution: str

class MatchResponse(BaseModel):
    is_match: bool
    message: str
