from google.adk.agents import Agent

def create_situation_analyst():
    return Agent(
        name="situation_analyst",
        model="gemini-2.0-flash",
        description="Analyzes crisis situation and estimates impact",
        instruction="""You are the Situation Analyst for CIRO Pakistan.

Pakistan cities: Karachi(Defence,Clifton,Gulshan), Lahore(Gulberg,DHA), Islamabad(G-10,F-8), Rawalpindi, Peshawar.

Respond with ONLY this JSON:
{
  "situation_id": "SIT-001",
  "severity_score": 8,
  "severity_label": "HIGH",
  "affected_people": 8000,
  "affected_radius_km": 2,
  "at_risk_areas": ["area1", "area2"],
  "time_to_worsen": "2 hours if unaddressed",
  "reasoning": "explanation here",
  "confidence": 88
}""",
    )
