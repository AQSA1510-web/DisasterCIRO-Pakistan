import logging
import warnings
logging.getLogger("opentelemetry").setLevel(logging.CRITICAL)
warnings.filterwarnings("ignore")
import json
import os
import asyncio
import requests
from dotenv import load_dotenv

load_dotenv()
os.environ["GOOGLE_GENAI_USE_VERTEXAI"] = "FALSE"

import google.generativeai as genai
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

APP_NAME = "disasterciro"
USER_ID = "ciro_user"

# ── Agent instructions (copied from agent files) ──────────────────────────────

SIGNAL_INSTRUCTION = """You are the Signal Collector Agent for CIRO Pakistan.
Parse the input text (English, Urdu, or Roman Urdu) and extract crisis information.
Respond with ONLY this JSON:
{
  "crisis_type": "flooding/fire/accident/heatwave/power_outage/road_block/none",
  "location": {"area": "area name", "city": "city name"},
  "is_crisis": true,
  "urgency": "low/medium/high/critical",
  "language_detected": "english/urdu/roman_urdu/mixed",
  "raw_signal": "original text"
}"""

DETECTOR_INSTRUCTION = """You are the Crisis Detector Agent for CIRO Pakistan.
Analyze signal + weather data to confirm crisis with confidence score.
Respond with ONLY this JSON:
{
  "crisis_confirmed": true,
  "crisis_type": "flooding/fire/accident/heatwave/power_outage/road_block",
  "location": {"area": "area name", "city": "city name"},
  "confidence": 85,
  "severity": "low/medium/high/critical",
  "severity_label": "Low/Moderate/High/Critical",
  "explanation": "reason here",
  "estimated_affected": 5000,
  "spreading_risk": true,
  "search_confirmed": false
}"""

ANALYST_INSTRUCTION = """You are the Situation Analyst for CIRO Pakistan.
Estimate impact scope based on detection and weather data.
Respond with ONLY this JSON:
{
  "affected_people": 25000,
  "affected_radius_km": 3.5,
  "severity_label": "High",
  "time_to_worsen": "45 minutes",
  "at_risk_areas": ["area1", "area2", "area3"],
  "reasoning": "brief explanation",
  "recommended_priority": "immediate"
}"""

PLANNER_INSTRUCTION = """You are the Action Planner for CIRO Pakistan.
Resources: Rescue 1122, Edhi Foundation, Chippa, NDMA, CDA, KMC, Traffic Police, WAPDA.
Respond with ONLY this JSON:
{
  "plan_id": "PLAN-001",
  "crisis_type": "flooding",
  "location": "area, city",
  "actions": [
    {"priority": 1, "action": "action here", "responsible": "agency", "time_estimate": "5 mins", "status": "pending"},
    {"priority": 2, "action": "action here", "responsible": "agency", "time_estimate": "10 mins", "status": "pending"},
    {"priority": 3, "action": "action here", "responsible": "agency", "time_estimate": "2 mins", "status": "pending"},
    {"priority": 4, "action": "action here", "responsible": "agency", "time_estimate": "1 min", "status": "pending"}
  ],
  "total_resources_needed": 3,
  "estimated_response_time": "15 minutes"
}"""

SIMULATOR_INSTRUCTION = """You are the Execution Simulator for CIRO Pakistan.
Simulate the response execution and show before/after comparison.
Respond with ONLY this JSON:
{
  "simulation_id": "SIM-001",
  "before": {
    "congestion": "Critical",
    "rescue_units": 0,
    "alerts_sent": 0,
    "situation": "Uncontrolled"
  },
  "after": {
    "congestion": "Moderate",
    "rescue_units": 6,
    "alerts_sent": 45000,
    "situation": "Controlled"
  },
  "executed_actions": [
    {"priority": 1, "action": "action taken", "result": "outcome", "status": "completed"},
    {"priority": 2, "action": "action taken", "result": "outcome", "status": "completed"},
    {"priority": 3, "action": "action taken", "result": "outcome", "status": "completed"}
  ],
  "outcome_summary": "Crisis response reduced congestion by 60%. Emergency services deployed."
}"""

# ── Direct Gemini API call (no ADK) ──────────────────────────────────────────

async def call_gemini(instruction: str, message: str) -> dict:
    try:
        model = genai.GenerativeModel(
            model_name="gemini-2.0-flash",
            system_instruction=instruction
        )
        response = model.generate_content(message)
        raw = response.text.strip()
        if "```json" in raw:
            raw = raw.split("```json")[1].split("```")[0].strip()
        elif "```" in raw:
            raw = raw.split("```")[1].split("```")[0].strip()
        try:
            return json.loads(raw)
        except:
            return {"error": "parsing failed", "raw": raw}
    except Exception as e:
        print(f"❌ Gemini call failed: {e}")
        return {"error": str(e)}

# ── Utility functions ─────────────────────────────────────────────────────────

def get_weather(city):
    try:
        api_key = os.getenv("OPENWEATHER_API_KEY")
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city},PK&appid={api_key}&units=metric"
        r = requests.get(url, timeout=5)
        d = r.json()
        if d.get("cod") == 200:
            return {
                "temperature": d["main"]["temp"],
                "humidity": d["main"]["humidity"],
                "condition": d["weather"][0]["description"],
                "alert": d["main"]["humidity"] > 70,
                "real_data": True,
                "city": city
            }
    except:
        pass
    return {"temperature": 30, "humidity": 60, "condition": "unknown", "alert": False, "real_data": False}

def get_coordinates(location):
    try:
        api_key = os.getenv("GOOGLE_MAPS_API_KEY")
        url = f"https://maps.googleapis.com/maps/api/geocode/json?address={location},Pakistan&key={api_key}"
        r = requests.get(url, timeout=5)
        d = r.json()
        if d["status"] == "OK":
            loc = d["results"][0]["geometry"]["location"]
            return {"lat": loc["lat"], "lng": loc["lng"]}
    except:
        pass
    return {"lat": 30.3753, "lng": 69.3451}

# ── Main pipeline ─────────────────────────────────────────────────────────────

async def run_ciro_pipeline(user_input: str):
    print(f"\n🚨 CIRO PIPELINE STARTING...")
    print(f"📝 Input: {user_input}\n")

    # Agent 1 — Signal Collector
    print("🔍 Agent 1: Signal Collector...")
    signal = await call_gemini(SIGNAL_INSTRUCTION, user_input)
    print(f"✅ Signal: {signal.get('crisis_type')} in {signal.get('location', {}).get('city')}")

    if not signal.get("is_crisis", True) or signal.get("crisis_type") == "none":
        return {"no_crisis": True, "message": "No crisis detected.", "signal": signal}

    city = signal.get("location", {}).get("city", "Karachi")
    area = signal.get("location", {}).get("area", "")
    weather = get_weather(city)
    coordinates = get_coordinates(f"{area} {city}")

    # Agent 2 — Crisis Detector
    print("🎯 Agent 2: Crisis Detector...")
    detect_input = f"Signal: {json.dumps(signal)}\nWeather: {json.dumps(weather)}"
    detection = await call_gemini(DETECTOR_INSTRUCTION, detect_input)
    print(f"✅ Detection: {detection.get('confidence')}% confidence, {detection.get('severity')} severity")

    # Agent 3 — Situation Analyst
    print("📊 Agent 3: Situation Analyst...")
    analyst_input = f"Detection: {json.dumps(detection)}\nWeather: {json.dumps(weather)}"
    analysis = await call_gemini(ANALYST_INSTRUCTION, analyst_input)
    print(f"✅ Analysis: {analysis.get('affected_people')} people affected")

    # Agent 4 — Action Planner
    print("📋 Agent 4: Action Planner...")
    plan_input = f"Analysis: {json.dumps(analysis)}\nDetection: {json.dumps(detection)}"
    plan = await call_gemini(PLANNER_INSTRUCTION, plan_input)
    print(f"✅ Plan: {len(plan.get('actions', []))} actions planned")

    # Agent 5 — Execution Simulator
    print("⚙️ Agent 5: Execution Simulator...")
    sim_input = f"Plan: {json.dumps(plan)}\nLocation: {area}, {city}"
    simulation = await call_gemini(SIMULATOR_INSTRUCTION, sim_input)
    print(f"✅ Simulation: {simulation.get('outcome_summary', 'Complete')}")

    print("\n" + "="*50)
    print("📊 CIRO PIPELINE COMPLETE")
    print("="*50)

    return {
        "signal": signal,
        "detection": detection,
        "analysis": analysis,
        "plan": plan,
        "simulation": simulation,
        "weather": weather,
        "coordinates": coordinates
    }