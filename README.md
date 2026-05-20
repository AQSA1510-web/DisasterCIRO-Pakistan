<div align="center">
🚨 DisasterCIRO Pakistan
Crisis Intelligence & Response Orchestrator
5-Agent AI System for Real-Time Crisis Detection & Emergency Response
Show Image
Show Image
Show Image
Show Image
Team Conrad — Google AI Seekho Hackathon 2026
Challenge 3: Crisis Intelligence & Response Orchestrator (CIRO)
</div>

🎯 What is DisasterCIRO?
DisasterCIRO is a real-time AI-powered crisis detection and emergency response coordination system built for Pakistan. It uses Google Antigravity ADK to orchestrate 5 specialized AI agents powered by Gemini API that work together to detect crises, analyze impact, and coordinate emergency response — all in under 30 seconds.

Input: A crisis report in any language (English, Urdu, Roman Urdu)
Output: Complete crisis advisory with response plan, simulation, and impact metrics


🇵🇰 The Problem
StatisticValueSourcePeople affected by 2022 Pakistan floods33 Million+NDMA 2022Peak heatwave in Jacobabad52°CPMD PakistanAverage emergency response delay45 minutes+Rescue 1122Real-time AI crisis coordination in Pakistan0%Gap we fill
Critical crisis signals exist — but are never converted into real-time coordinated action. DisasterCIRO bridges this gap.

🏗️ System Architecture
Built entirely on Google Antigravity ADK — Multi-Agent Pipeline
StepComponentRole1Next.js FrontendUser submits crisis report2FastAPI BackendReceives and routes request3Google ADK OrchestratorManages 5-agent pipeline4Agent 1: Signal CollectorParses multilingual input5OpenWeatherMap APIFetches real live weather6Google Maps APIGeocodes crisis location7Agent 2: Crisis DetectorValidates with real data8Agent 3: Situation AnalystEstimates impact scope9Agent 4: Action PlannerGenerates response plan10Agent 5: Exec SimulatorSimulates execution11DashboardDisplays results across 6 screens

🤖 5 AI Agents
Agent 1 — Signal Collector
Parses crisis reports in any Pakistani language variant.

Understands English, Urdu, Roman Urdu, and mixed language
Extracts crisis type, location (area + city), and urgency
Handles typos, informal language, and code-switching

Input: Raw citizen report text
Output: crisis_type · location · urgency · language_detected

Agent 2 — Crisis Detector
Validates crisis signal with real-world data.

Cross-references with live OpenWeatherMap weather data
Assigns confidence percentage (0–100%)
Determines severity: Low / Medium / High / Critical
Citizen report is PRIMARY evidence — weather is secondary validation

Input: Signal JSON + Live weather data
Output: confidence · severity · explanation · spreading_risk

Agent 3 — Situation Analyst
Estimates crisis impact and scope.

Estimates affected population using real Pakistani city densities
Identifies real neighboring areas at risk
Predicts time until situation worsens
Provides detailed AI reasoning specific to crisis type

Input: Detection JSON + Weather data
Output: affected_people · at_risk_areas · time_to_worsen · reasoning

Agent 4 — Action Planner
Generates coordinated, crisis-specific response plan.
Crisis TypeActions GeneratedFloodingBoats, evacuation, drainage teams, road clearingHeatwaveCooling centers, water distribution, medical campsFireFire brigade, gas shutoff, ambulances, evacuationPower OutageWAPDA crews, hospital generators, grid restorationAccidentRescue 1122, traffic diversion, ambulancesRoad BlockTraffic Police, alternate routes, tow trucks
Agencies: Rescue 1122 · Edhi Foundation · NDMA · Traffic Police · WAPDA · PMD
Input: Analysis + Detection JSON
Output: 4 prioritized actions with responsible agencies and time estimates

Agent 5 — Exec Simulator
Simulates full response execution with measurable outcomes.

Models realistic before-state (uncontrolled crisis)
Simulates all response actions from Action Planner
Shows measurable after-state with improvement metrics
Generates comprehensive outcome summary

Input: Plan JSON + Location + Weather
Output: before state · after state · executed_actions · outcome_summary

🛠️ Tech Stack
LayerTechnologyPurposeAI OrchestrationGoogle Antigravity ADKMulti-agent pipelineLLMGemini 2.0 FlashPowers all 5 agentsBackendFastAPI + PythonREST APIFrontendNext.js 14 + TypeScriptDashboard UIMapsLeaflet.js + CartoDB DarkCrisis location mapWeatherOpenWeatherMap APIReal-time validationGeocodingGoogle Maps APICoordinatesDeploymentGoogle Cloud RunHosting

🔌 APIs & Integrations
APITypePurposeGemini 2.0 Flash✅ RealPowers all 5 AI agentsOpenWeatherMap✅ RealLive weather for crisis validationGoogle Maps Geocoding✅ RealLocation to coordinatesGoogle ADK✅ RealMulti-agent orchestrationLeaflet + CartoDB✅ RealDark map tilesRescue 1122 Dispatch🔄 SimulatedEmergency response simulationNDMA Resources🔄 SimulatedResource allocation simulationTraffic Rerouting🔄 SimulatedRoute simulation on map

Government emergency APIs (Rescue 1122, NDMA, Traffic Police) do not have public endpoints. DisasterCIRO simulates these as required by the challenge guidelines. With government partnership, these would connect to real dispatch systems.


✨ Features

🌐 Multilingual Input — English, Urdu, Roman Urdu
🗺️ Real Crisis Map — Leaflet map zoomed to exact crisis location
🌤️ Live Weather — Real OpenWeatherMap data for validation
🤖 5 AI Agents — Full Antigravity multi-agent pipeline
📊 Before/After Simulation — Measurable impact metrics
📋 Agent Trace Logs — Full JSON output from each agent
📱 Mobile Responsive — Works on all devices
🇵🇰 Bilingual UI — English ↔ اردو toggle
⚡ Under 30 Seconds — Complete end-to-end pipeline


📱 Dashboard Screens
ScreenDescriptionHomeCrisis input + Pakistan overview mapProcessingLive agent pipeline with progress barResultDetection results + zoomed crisis mapActionsResponse plan + before/after comparisonSimulationExecution simulation + dynamic alert tickerLogsFull agent trace JSON viewer

🚀 Local Setup
Prerequisites

Python 3.11+
Node.js 20+
Gemini API Key (Google AI Studio)
OpenWeatherMap API Key
Google Maps API Key

1. Clone Repository
bashgit clone https://github.com/AQSA1510-web/DisasterCIRO-Pakistan.git
cd DisasterCIRO-Pakistan
2. Backend
bashpython -m venv venv
venv\Scripts\activate
pip install fastapi uvicorn google-generativeai google-adk requests python-dotenv pydantic
3. Frontend
bashcd disaster-ciro
npm install
4. Environment Variables
Create .env in root directory:
GOOGLE_API_KEY=your_gemini_api_key
GOOGLE_GENAI_USE_VERTEXAI=FALSE
OPENWEATHER_API_KEY=your_openweather_key
GOOGLE_MAPS_API_KEY=your_maps_key
5. Run
bash# Terminal 1 — Backend
uvicorn api:app --reload --port 8000

# Terminal 2 — Frontend
cd disaster-ciro && npm run dev
Open http://localhost:3000

🎯 Sample Inputs
English:    "Flash flood in Defence Karachi, roads are flooded"
Urdu:       "کراچی میں سیلاب آ گیا ہے، لوگ پھنسے ہوئے ہیں"
Roman Urdu: "G-10 mein pani bhar gaya hai, gaariyan phans gayi hain"
Heatwave:   "Ghotki mein shadeed garmi ki lehar, log behos ho rahe hain"
Fire:       "Lahore Gulberg mein factory mein aag lag gayi"

🔮 Future Roadmap
With government partnership, DisasterCIRO can become a production system:

Real Rescue 1122 API integration for live dispatch
NADRA database for real citizen SMS alerts
NDMA real-time resource allocation
PMD official weather warning integration
Mobile app for iOS and Android
Continuous real-time monitoring
Crisis prediction before it happens


👥 Team
Team Conrad
Google AI Seekho Hackathon 2026
Challenge 3: Crisis Intelligence & Response Orchestrator (CIRO)

<div align="center">
Built with ❤️ for Pakistan using Google Antigravity ADK
DisasterCIRO — Because every second counts in a crisis
🇵🇰 Saving lives through AI
</div>
