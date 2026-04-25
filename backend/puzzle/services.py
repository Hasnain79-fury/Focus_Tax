import random
from typing import Dict, Tuple

# Curated word list — no external API needed
PUZZLE_WORDS = [
    'focus', 'breathe', 'pause', 'calm', 'steady',
    'intent', 'reflect', 'clarity', 'present', 'mindful',
    'balance', 'growth', 'patience', 'stillness', 'aware',
]

# In-memory store for solutions. 
# Key: puzzle_id (str), Value: original word (str)
PUZZLE_SOLUTIONS_STORE: Dict[str, str] = {}

async def fetch_word_puzzle() -> Tuple[str, str]:
    """
    Picks a random word from the local list, scrambles it,
    and returns (scrambled_word, original_word).
    """
    original_word = random.choice(PUZZLE_WORDS)

    # Scramble the word ensuring it's not the same as the original
    word_list = list(original_word)
    scrambled_word = original_word
    while scrambled_word == original_word and len(original_word) > 1:
        random.shuffle(word_list)
        scrambled_word = "".join(word_list)

    return scrambled_word, original_word

def store_solution(puzzle_id: str, solution: str) -> None:
    """Stores the solution in memory."""
    PUZZLE_SOLUTIONS_STORE[puzzle_id] = solution.lower()

def check_solution(puzzle_id: str, user_solution: str) -> bool:
    """Checks if the provided solution matches the stored solution."""
    stored_solution = PUZZLE_SOLUTIONS_STORE.get(puzzle_id)
    if not stored_solution:
        return False
    
    return stored_solution == user_solution.lower()
