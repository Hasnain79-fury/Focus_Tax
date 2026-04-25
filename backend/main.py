from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from puzzle.router import router as puzzle_router
from tax.router import router as tax_router

app = FastAPI(title="Focus Tax Backend", description="Backend APIs including Puzzle Microservice")

origins = [
    "http://localhost:5173", # Local React (Vite)
    "https://your-frontend-name.vercel.app", # Your production frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, # Or ["*"] to allow everything (less secure)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(puzzle_router, prefix="/api/puzzle", tags=["Puzzle"])
app.include_router(tax_router, prefix="/api/tax", tags=["Tax"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Focus Tax Backend API"}
