from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import challenge, webhooks

app = FastAPI()

# Correct CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://tech-quest-inky.vercel.app", "http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add a simple health check endpoint
@app.get("/")
async def root():
    return {"message": "TechQuest API is running!", "status": "healthy"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "API is working"}

app.include_router(challenge.router, prefix="/api")
app.include_router(webhooks.router, prefix="/webhooks")