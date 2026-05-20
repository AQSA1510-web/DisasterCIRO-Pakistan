# 🚨 DisasterCIRO — Pakistan Crisis Intelligence & Response Orchestrator
 
> **5-Agent AI System for Real-Time Crisis Detection & Emergency Response**
 
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat&logo=python&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=flat&logo=nextdotjs)
![Google ADK](https://img.shields.io/badge/Google-Antigravity%20ADK-4285F4?style=flat&logo=google)
![Gemini](https://img.shields.io/badge/Gemini-2.0%20Flash-8E24AA?style=flat&logo=google)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)
 
**Team Conrad** — Google AI Seekho Hackathon 2026
**Challenge 3:** Crisis Intelligence & Response Orchestrator (CIRO)
 
---
 
## 🎯 What is DisasterCIRO?
 
DisasterCIRO is a **real-time AI-powered crisis detection and emergency response coordination system** built for Pakistan. It uses **Google Antigravity ADK** to orchestrate **5 specialized AI agents** powered by the Gemini API that work together to detect crises, analyze impact, and coordinate emergency response — all in **under 30 seconds**.
 
- **Input:** A crisis report in any language (English, Urdu, Roman Urdu)
- **Output:** Complete crisis advisory with response plan, simulation, and impact metrics
---
 
## 🇵🇰 The Problem
 
| Statistic | Value | Source |
|---|---|---|
| People affected by 2022 Pakistan floods | 33 Million+ | NDMA 2022 |
| Peak heatwave in Jacobabad | 52°C | PMD Pakistan |
| Average emergency response delay | 45 minutes+ | Rescue 1122 |
| Real-time AI crisis coordination in Pakistan | 0% | Gap we fill |
 
> Critical crisis signals exist — but are never converted into real-time coordinated action. **DisasterCIRO bridges this gap.**
 
---
 
## 🏗️ System Architecture
 
Built entirely on **Google Antigravity ADK** — Multi-Agent Pipeline
 
| Step | Component | Role |
|---|---|---|
| 1 | Next.js Frontend | User submits crisis report |
| 2 | FastAPI Backend | Receives and routes request |
| 3 | Google ADK Orchestrator | Manages 5-agent pipeline |
| 4 | Agent 1: Signal Collector | Parses multilingual input |
| 5 | OpenWeatherMap API | Fetches real live weather |
| 6 | Google Maps API | Geocodes crisis location |
| 7 | Agent 2: Crisis Detector | Validates with real data |
| 8 | Agent 3: Situation Analyst | Estimates impact scope |
| 9 | Agent 4: Action Planner | Generates response plan |
| 10 | Agent 5: Exec Simulator | Simulates execution |
| 11 | Dashboard | Displays results across 6 screens |
 
---
 
## 🤖 5 AI Agents
 
### Agent 1 — Signal Collector
Parses crisis reports in any Pakistani language variant.
 
- Understands English, Urdu, Roman Urdu, and mixed language
- Extracts crisis type, location (area + city), and urgency
- Handles typos, informal language, and code-switching
**Input:** Raw citizen report text
**Output:** `crisis_type` · `location` · `urgency` · `language_detected`
 
---
 
### Agent 2 — Crisis Detector
Validates crisis signal with real-world data.
 
- Cross-references with live OpenWeatherMap weather data
- Assigns confidence percentage (0–100%)
- Determines severity: Low / Medium / High / Critical
- Citizen report is PRIMARY evidence — weather is secondary validation
**Input:** Signal JSON + Live weather data
**Output:** `confidence` · `severity` · `explanation` · `spreading_risk`
 
---
 
### Agent 3 — Situation Analyst
Estimates crisis impact and scope.
 
- Estimates affected population using real Pakistani city densities
- Identifies real neighboring areas at risk
- Predicts time until situation worsens
- Provides detailed AI reasoning specific to crisis type
**Input:** Detection JSON + Weather data
**Output:** `affected_people` · `at_risk_areas` · `time_to_worsen` · `reasoning`
 
---
 
### Agent 4 — Action Planner
Generates coordinated, crisis-specific response plan.
 
| Crisis Type | Actions Generated |
|---|---|
| Flooding | Boats, evacuation, drainage teams, road clearing |
| Heatwave | Cooling centers, water distribution, medical camps |
| Fire | Fire brigade, gas shutoff, ambulances, evacuation |
| Power Outage | WAPDA crews, hospital generators, grid restoration |
| Accident | Rescue 1122, traffic diversion, ambulances |
| Road Block | Traffic Police, alternate routes, tow trucks |
 
**Agencies:** Rescue 1122 · Edhi Foundation · NDMA · Traffic Police · WAPDA · PMD
 
**Input:** Analysis + Detection JSON
**Output:** 4 prioritized actions with responsible agencies and time estimates
 
---
 
### Agent 5 — Exec Simulator
Simulates full response execution with measurable outcomes.
 
- Models realistic before-state (uncontrolled crisis)
- Simulates all response actions from Action Planner
- Shows measurable after-state with improvement metrics
- Generates comprehensive outcome summary
**Input:** Plan JSON + Location + Weather
**Output:** `before state` · `after state` · `executed_actions` · `outcome_summary`
 
---
 
## 🛠️ Tech Stack
 
| Layer | Technology | Purpose |
|---|---|---|
| AI Orchestration | Google Antigravity ADK | Multi-agent pipeline |
| LLM | Gemini 2.0 Flash | Powers all 5 agents |
| Backend | FastAPI + Python | REST API |
| Frontend | Next.js 14 + TypeScript | Dashboard UI |
| Maps | Leaflet.js + CartoDB Dark | Crisis location map |
| Weather | OpenWeatherMap API | Real-time validation |
| Geocoding | Google Maps API | Coordinates |
| Deployment | Google Cloud Run | Hosting |
 
---
 
## 🔌 APIs & Integrations
 
| API | Type | Purpose |
|---|---|---|
| Gemini 2.0 Flash | ✅ Real | Powers all 5 AI agents |
| OpenWeatherMap | ✅ Real | Live weather for crisis validation |
| Google Maps Geocoding | ✅ Real | Location to coordinates |
| Google ADK | ✅ Real | Multi-agent orchestration |
| Leaflet + CartoDB | ✅ Real | Dark map tiles |
| Rescue 1122 Dispatch | 🔄 Simulated | Emergency response simulation |
| NDMA Resources | 🔄 Simulated | Resource allocation simulation |
| Traffic Rerouting | 🔄 Simulated | Route simulation on map |
 
> **Note:** Government emergency APIs (Rescue 1122, NDMA, Traffic Police) do not have public endpoints. DisasterCIRO simulates these as required by the challenge guidelines. With government partnership, these would connect to real dispatch systems.
 
---
 
## ✨ Features
 
- 🌐 **Multilingual Input** — English, Urdu, Roman Urdu
- 🗺️ **Real Crisis Map** — Leaflet map zoomed to exact crisis location
- 🌤️ **Live Weather** — Real OpenWeatherMap data for validation
- 🤖 **5 AI Agents** — Full Antigravity multi-agent pipeline
- 📊 **Before/After Simulation** — Measurable impact metrics
- 📋 **Agent Trace Logs** — Full JSON output from each agent
- 📱 **Mobile Responsive** — Works on all devices
- 🇵🇰 **Bilingual UI** — English ↔ اردو toggle
- ⚡ **Under 30 Seconds** — Complete end-to-end pipeline
---
 
## 📱 Dashboard Screens
 
| Screen | Description |
|---|---|
| Home | Crisis input + Pakistan overview map |
| Processing | Live agent pipeline with progress bar |
| Result | Detection results + zoomed crisis map |
| Actions | Response plan + before/after comparison |
| Simulation | Execution simulation + dynamic alert ticker |
| Logs | Full agent trace JSON viewer |
 
---
 
## 🚀 Local Setup
 
### Prerequisites
 
- Python 3.11+
- Node.js 20+
- Gemini API Key ([Google AI Studio](https://aistudio.google.com))
- OpenWeatherMap API Key
- Google Maps API Key
### 1. Clone Repository
 
```bash
git clone https://github.com/AQSA1510-web/DisasterCIRO-Pakistan.git
cd DisasterCIRO-Pakistan
```
 
### 2. Backend
 
```bash
python -m venv venv
venv\Scripts\activate
pip install fastapi uvicorn google-generativeai google-adk requests python-dotenv pydantic
```
 
### 3. Frontend
 
```bash
cd disaster-ciro
npm install
```
 
### 4. Environment Variables
 
Create `.env` in root directory:
 
```env
GOOGLE_API_KEY=your_gemini_api_key
GOOGLE_GENAI_USE_VERTEXAI=FALSE
OPENWEATHER_API_KEY=your_openweather_key
GOOGLE_MAPS_API_KEY=your_maps_key
```
 
### 5. Run
 
**Terminal 1 — Backend:**
```bash
uvicorn api:app --reload --port 8000
```
 
**Terminal 2 — Frontend:**
```bash
cd disaster-ciro && npm run dev
```
 
Open [http://localhost:3000](http://localhost:3000)
 
---
 
## 🎯 Sample Inputs
 
| Language | Example |
|---|---|
| English | `"Flash flood in Defence Karachi, roads are flooded"` |
| Urdu | `"کراچی میں سیلاب آ گیا ہے، لوگ پھنسے ہوئے ہیں"` |
| Roman Urdu | `"G-10 mein pani bhar gaya hai, gaariyan phans gayi hain"` |
| Heatwave | `"Ghotki mein shadeed garmi ki lehar, log behos ho rahe hain"` |
| Fire | `"Lahore Gulberg mein factory mein aag lag gayi"` |
 
---
 
## 🔮 Future Roadmap
 
With government partnership, DisasterCIRO can become a production system:
 
- [ ] Real Rescue 1122 API integration for live dispatch
- [ ] NADRA database for real citizen SMS alerts
- [ ] NDMA real-time resource allocation
- [ ] PMD official weather warning integration
- [ ] Mobile app for iOS and Android
- [ ] Continuous real-time monitoring
- [ ] Crisis prediction before it happens
---
 
## 👥 Team
 
**Team Conrad**
Google AI Seekho Hackathon 2026
Challenge 3: Crisis Intelligence & Response Orchestrator (CIRO)
 
---
 
<div align="center">
Built with ❤️ for Pakistan using Google Antigravity ADK
 
**DisasterCIRO — Because every second counts in a crisis**
 
🇵🇰 *Saving lives through AI*
 
</div>
