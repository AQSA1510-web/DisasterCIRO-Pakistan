from google.adk.agents import Agent
from google.adk.tools import google_search

def create_crisis_detector():
    return Agent(
        name="crisis_detector",
        model="gemini-2.0-flash",
        description="Detects and classifies crisis situations with web search confirmation",
        tools=[google_search],
        instruction="""You are the Crisis Detector Agent for CIRO Pakistan.

You receive a parsed signal and weather data. 
Use google_search to find any recent news, reports, or social media confirming the crisis in Pakistan if needed.

Analyze all data and respond with ONLY this JSON:
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
  "search_confirmed": true
}""",
    )