import logging, warnings, json, os, asyncio, requests
logging.getLogger("opentelemetry").setLevel(logging.CRITICAL)
warnings.filterwarnings("ignore")
from dotenv import load_dotenv
load_dotenv()

from groq import Groq

def get_weather(city):
    try:
        r = requests.get(f"http://api.openweathermap.org/data/2.5/weather?q={city},PK&appid={os.getenv('OPENWEATHER_API_KEY')}&units=metric", timeout=5)
        d = r.json()
        if d.get("cod") == 200:
            return {"temperature": d["main"]["temp"], "humidity": d["main"]["humidity"], "condition": d["weather"][0]["description"], "alert": d["main"]["humidity"] > 70, "real_data": True, "city": city}
    except: pass
    return {"temperature": 30, "humidity": 60, "condition": "unknown", "alert": False, "real_data": False}

def get_coordinates(location):
    try:
        r = requests.get(f"https://maps.googleapis.com/maps/api/geocode/json?address={location},Pakistan&key={os.getenv('GOOGLE_MAPS_API_KEY')}", timeout=5)
        d = r.json()
        if d["status"] == "OK":
            loc = d["results"][0]["geometry"]["location"]
            return {"lat": loc["lat"], "lng": loc["lng"]}
    except: pass
    return {"lat": 30.3753, "lng": 69.3451}

async def call_gemini(instruction, message):
    try:
        client = Groq(api_key=os.getenv("GROQ_API_KEY"))
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": instruction},
                {"role": "user", "content": message}
            ]
        )
        raw = response.choices[0].message.content.strip()
        if "```json" in raw: raw = raw.split("```json")[1].split("```")[0].strip()
        elif "```" in raw: raw = raw.split("```")[1].split("```")[0].strip()
        try: return json.loads(raw)
        except: return {"error": "parsing failed", "raw": raw}
    except Exception as e:
        print(f"❌ Groq call failed: {e}")
        return {"error": str(e)}

async def run_ciro_pipeline(user_input: str):
    print(f"\n🚨 CIRO PIPELINE STARTING...\n📝 Input: {user_input}\n")

    # Agent 1 — Signal Collector
    print("🔍 Agent 1: Signal Collector...")
    signal = await call_gemini("""You are Signal Collector for CIRO Pakistan.
Parse the input and return ONLY this JSON with no extra text:
{"crisis_type":"flooding/fire/accident/heatwave/power_outage/road_block/none","location":{"area":"specific neighborhood name","city":"city name"},"is_crisis":true,"urgency":"high","language_detected":"english/urdu/roman_urdu"}

STRICT RULES:
- area must be a real specific neighborhood (e.g. Defence, G-10, Gulshan-e-Iqbal, Saddar, F-7)
- NEVER use "unknown" or "area" as area value
- If area not mentioned in input, pick the most crisis-prone neighborhood of that city
- city must be real Pakistani city name
- crisis_type must exactly match one of the given options""", user_input)
    print(f"✅ Signal: {signal.get('crisis_type')} in {signal.get('location',{}).get('city')}")

    if not signal.get("is_crisis", True) or signal.get("crisis_type") == "none":
        return {"no_crisis": True, "message": "No crisis detected.", "signal": signal}

    city = signal.get("location", {}).get("city", "Karachi")
    area = signal.get("location", {}).get("area", "")
    crisis_type = signal.get("crisis_type", "flooding")
    weather = get_weather(city)
    coordinates = get_coordinates(f"{area} {city}")

    # Agent 2 — Crisis Detector
    print("🎯 Agent 2: Crisis Detector...")
    detection = await call_gemini(f"""You are Crisis Detector for CIRO Pakistan.
Analyze the {crisis_type} crisis signal and real weather data to confirm severity.
Use the actual weather temperature and humidity to justify confidence level.
Even if weather data seems contradictory, still confirm the crisis based on the user report — citizens reporting a crisis is primary evidence.
Return ONLY JSON:
{{"crisis_confirmed":true,"crisis_type":"{crisis_type}","location":{{"area":"{area}","city":"{city}"}},"confidence":85,"severity":"high","severity_label":"High","explanation":"reason based on signal and weather data","estimated_affected":5000,"spreading_risk":true,"search_confirmed":false}}""",
        f"Signal: {json.dumps(signal)}\nWeather: {json.dumps(weather)}")
    print(f"✅ Detection: {detection.get('confidence')}% confidence")

    # Agent 3 — Situation Analyst
    print("📊 Agent 3: Situation Analyst...")
    analysis = await call_gemini(f"""You are Situation Analyst for CIRO Pakistan.
Analyze this {crisis_type} crisis in {area}, {city}.
Estimate realistic affected people based on {city} population density.
at_risk_areas must be REAL neighborhoods near {area} in {city}, Pakistan — never use placeholders.
Return ONLY JSON:
{{"affected_people":25000,"affected_radius_km":3.5,"severity_label":"High","time_to_worsen":"45 minutes","at_risk_areas":["real neighborhood 1","real neighborhood 2","real neighborhood 3"],"reasoning":"detailed reasoning specific to {crisis_type} in {area} {city}","recommended_priority":"immediate"}}""",
        f"Detection: {json.dumps(detection)}\nWeather: {json.dumps(weather)}")
    print(f"✅ Analysis: {analysis.get('affected_people')} people affected")

    # Agent 4 — Action Planner
    print("📋 Agent 4: Action Planner...")
    plan = await call_gemini(f"""You are Action Planner for CIRO Pakistan.
Generate response actions SPECIFIC to {crisis_type} crisis in {area}, {city}.
Rules:
- heatwave: cooling centers, water distribution, medical camps, PMD alerts
- flooding: boats, road clearing, evacuation, drainage teams
- fire: fire brigade, evacuation, gas shutoff, ambulances
- power_outage: WAPDA crews, generator deployment, hospital priority
- accident: Rescue 1122, traffic diversion, ambulances, police
- road_block: Traffic Police, alternate routes, tow trucks
Resources: Rescue 1122, Edhi Foundation, NDMA, Traffic Police, WAPDA, Punjab/Sindh Govt, PMD.
Return ONLY JSON:
{{"plan_id":"PLAN-001","crisis_type":"{crisis_type}","location":"{area}, {city}","actions":[{{"priority":1,"action":"specific action","responsible":"agency","time_estimate":"5 mins","status":"pending"}},{{"priority":2,"action":"specific action","responsible":"agency","time_estimate":"10 mins","status":"pending"}},{{"priority":3,"action":"specific action","responsible":"agency","time_estimate":"15 mins","status":"pending"}},{{"priority":4,"action":"specific action","responsible":"agency","time_estimate":"20 mins","status":"pending"}}],"total_resources_needed":4,"estimated_response_time":"20 minutes"}}""",
        f"Crisis: {crisis_type}\nLocation: {area}, {city}\nAnalysis: {json.dumps(analysis)}\nDetection: {json.dumps(detection)}")
    print(f"✅ Plan: {len(plan.get('actions', []))} actions planned")

    # Agent 5 — Execution Simulator
    print("⚙️ Agent 5: Execution Simulator...")
    simulation = await call_gemini(f"""You are Execution Simulator for CIRO Pakistan.
Simulate execution of {crisis_type} response in {area}, {city}.
Before/after must reflect realistic {crisis_type} scenario.
executed_actions results must be SPECIFIC to {crisis_type}.
alerts_sent must be realistic for {city} population.
Return ONLY JSON:
{{"simulation_id":"SIM-001","before":{{"congestion":"Critical/Severe/Moderate based on crisis","rescue_units":0,"alerts_sent":0,"situation":"Uncontrolled {crisis_type} in {area}, {city}"}},"after":{{"congestion":"Moderate/Low/Improved","rescue_units":6,"alerts_sent":50000,"situation":"Controlled — emergency response active"}},"executed_actions":[{{"priority":1,"action":"{crisis_type} specific action taken","result":"specific realistic outcome","status":"completed"}},{{"priority":2,"action":"{crisis_type} specific action taken","result":"specific realistic outcome","status":"completed"}},{{"priority":3,"action":"{crisis_type} specific action taken","result":"specific realistic outcome","status":"completed"}}],"outcome_summary":"Realistic outcome summary for {crisis_type} response in {area}, {city}."}}""",
        f"Plan: {json.dumps(plan)}\nCrisis: {crisis_type}\nLocation: {area}, {city}\nWeather: {json.dumps(weather)}")
    print(f"✅ Simulation: {simulation.get('outcome_summary', 'Complete')}")

    # Urdu Translation
    print("🌐 Translating to Urdu...")
    urdu = await call_gemini("""Translate the given crisis details to Urdu. Return ONLY this JSON with no extra text:
{"crisis_type_ur":"اردو میں بحران کی قسم","explanation_ur":"اردو میں وضاحت","severity_ur":"اردو میں شدت","situation_ur":"اردو میں صورتحال","outcome_ur":"اردو میں نتیجہ"}""",
        f"crisis_type: {detection.get('crisis_type')}\nexplanation: {detection.get('explanation')}\nseverity: {detection.get('severity_label')}\nsituation: {simulation.get('before', {}).get('situation')}\noutcome: {simulation.get('outcome_summary')}")
    print(f"✅ Urdu translation complete")

    print("\n" + "="*50 + "\n📊 CIRO PIPELINE COMPLETE\n" + "="*50)

    return {
        "signal": signal,
        "detection": detection,
        "analysis": analysis,
        "plan": plan,
        "simulation": simulation,
        "weather": weather,
        "coordinates": coordinates,
        "urdu": urdu
    }