from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from puzzle.router import router as puzzle_router

app = FastAPI(title="Focus Tax Backend", description="Backend APIs including Puzzle Microservice")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(puzzle_router, prefix="/api/puzzle", tags=["Puzzle"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Focus Tax Backend API"}
