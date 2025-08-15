from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import challenge ,webhooks
app = FastAPI()

# Correct CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://tech-quest-inky.vercel.app","http://localhost:3000","http://localhost:5173"],       # You can restrict this to your React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(challenge.router, prefix="/api")
app.include_router(webhooks.router, prefix="/webhooks")