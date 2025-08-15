from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import challenge ,webhooks
app = FastAPI()

# Correct CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","https://tech-quest-tjhf.vercel.app/"],       # You can restrict this to your React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(challenge.router, prefix="/api")
app.include_router(webhooks.router, prefix="/webhooks")