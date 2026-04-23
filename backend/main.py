from fastapi import FastAPI
from puzzle.router import router as puzzle_router

app = FastAPI(title="Focus Tax Backend", description="Backend APIs including Puzzle Microservice")

app.include_router(puzzle_router, prefix="/api/puzzle", tags=["Puzzle"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Focus Tax Backend API"}
