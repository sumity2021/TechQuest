from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from .routes import challenge, webhooks

app = FastAPI()

# Enhanced CORS setup - allow all origins temporarily for debugging
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Explicit OPTIONS handler for preflight requests
@app.options("/{full_path:path}")
async def options_handler():
    return JSONResponse(
        content={"message": "OK"},
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "*",
        }
    )

from fastapi.responses import JSONResponse

# Add a simple health check endpoint with explicit CORS headers
@app.get("/")
async def root():
    return JSONResponse(
        content={"message": "TechQuest API is running!", "status": "healthy"},
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "*",
        }
    )

@app.get("/health")
async def health_check():
    return JSONResponse(
        content={"status": "healthy", "message": "API is working"},
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", 
            "Access-Control-Allow-Headers": "*",
        }
    )

app.include_router(challenge.router, prefix="/api")
app.include_router(webhooks.router, prefix="/webhooks")