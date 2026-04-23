import httpx
from typing import Dict, Any, Tuple

# In-memory store for solutions. 
# Key: puzzle_id (str), Value: solution grid (List[List[int]])
# Note: For production, we can easily migrate this to PostgreSQL.
PUZZLE_SOLUTIONS_STORE: Dict[str, Any] = {}

DOSUKU_API_URL = "https://sudoku-api.vercel.app/api/dosuku"
DOSUKU_QUERY = "?query={newboard(limit:1){grids{value,solution,difficulty}}}"

async def fetch_sudoku_puzzle() -> Tuple[Dict[str, Any], str]:
    """
    Fetches a new Sudoku puzzle from the Dosuku API.
    Returns a tuple of (puzzle_data, solution).
    """
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{DOSUKU_API_URL}{DOSUKU_QUERY}")
        response.raise_for_status()
        data = response.json()
        
        # Extract data from GraphQL response
        grid_data = data["newboard"]["grids"][0]
        return grid_data, grid_data["solution"]

def store_solution(puzzle_id: str, solution: Any) -> None:
    """Stores the solution in memory."""
    PUZZLE_SOLUTIONS_STORE[puzzle_id] = solution

def check_solution(puzzle_id: str, user_solution: Any) -> bool:
    """Checks if the provided solution matches the stored solution."""
    stored_solution = PUZZLE_SOLUTIONS_STORE.get(puzzle_id)
    if not stored_solution:
        return False
    
    return stored_solution == user_solution
