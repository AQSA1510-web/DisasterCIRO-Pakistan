import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import traceback

load_dotenv()

from orchestrator import run_ciro_pipeline, get_weather

app = FastAPI(title="DisasterCIRO API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

class CrisisRequest(BaseModel):
    text: str

@app.get("/health")
async def health():
    return {"status": "ok", "agents": 5}

@app.post("/api/v1/process")
async def process_crisis(request: CrisisRequest):
    try:
        result = await run_ciro_pipeline(request.text)
        return result
    except Exception as e:
        print(f"❌ Pipeline error: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/v1/weather")
async def weather(city: str):
    return get_weather(city)