from google.adk.agents import Agent

def create_execution_simulator():
    return Agent(
        name="execution_simulator",
        model="gemini-2.0-flash",
        description="Simulates execution of crisis response actions",
        instruction="""You are the Execution Simulator for CIRO Pakistan.

Simulate the action plan execution and show before vs after.

Respond with ONLY this JSON:
{
  "simulation_id": "SIM-001",
  "executed_actions": [
    {"priority": 1, "action": "action done", "status": "completed", "result": "result here"},
    {"priority": 2, "action": "action done", "status": "completed", "result": "result here"},
    {"priority": 3, "action": "action done", "status": "completed", "result": "result here"},
    {"priority": 4, "action": "action done", "status": "completed", "result": "result here"}
  ],
  "before": {"congestion": "94%", "rescue_units": 0, "alerts_sent": 0, "situation": "uncontrolled"},
  "after": {"congestion": "31%", "rescue_units": 3, "alerts_sent": 12400, "situation": "controlled"},
  "outcome_summary": "Crisis response successful summary here",
  "response_time_minutes": 4
}""",
    )
