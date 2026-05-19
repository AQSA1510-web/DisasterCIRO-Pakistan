"""
DisasterCIRO Next.js Setup Script
Run from: disaster-ciro folder
Command: python setup.py
"""
import os

os.makedirs("app/components", exist_ok=True)

# ============================================================
# page.tsx
# ============================================================
page = """\
'use client';
import { useState } from 'react';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';

export default function Home() {
  const [showApp, setShowApp] = useState(false);
  return showApp ? (
    <Dashboard onBack={() => setShowApp(false)} />
  ) : (
    <Landing onLaunch={() => setShowApp(true)} />
  );
}
"""

# ============================================================
# Landing.tsx
# ============================================================
landing = """\
'use client';

interface Props { onLaunch: () => void; }

const S = {
  nav: { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'18px 48px', position:'sticky' as const, top:0, zIndex:200, background:'rgba(8,8,8,0.9)', backdropFilter:'blur(16px)', borderBottom:'1px solid #1e1e1e' },
  logo: { fontFamily:'var(--font-head)', fontSize:22, fontWeight:900, color:'#ff1a1a' },
  navLink: { color:'#555', textDecoration:'none', fontSize:14, fontWeight:500 },
  btnPrimary: { background:'#ff1a1a', border:'none', borderRadius:8, color:'#fff', padding:'9px 22px', fontSize:13, fontWeight:700, cursor:'pointer', boxShadow:'0 0 20px #ff1a1a66' },
  btnPrimaryLg: { background:'#ff1a1a', border:'none', borderRadius:8, color:'#fff', padding:'14px 28px', fontSize:15, fontWeight:700, cursor:'pointer', boxShadow:'0 0 24px #ff1a1a66' },
  btnSecondary: { background:'transparent', border:'1px solid #2a2a2a', borderRadius:8, color:'#aaa', padding:'14px 28px', fontSize:15, fontWeight:600, cursor:'pointer' },
  hero: { minHeight:'100vh', display:'flex', flexDirection:'column' as const, alignItems:'center', justifyContent:'center', textAlign:'center' as const, padding:'40px 24px 60px', position:'relative' as const, overflow:'hidden' },
  oval: { position:'absolute' as const, top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:460, height:560, borderRadius:'50%', border:'1px solid #ff1a1a25', background:'radial-gradient(ellipse at center,#ff1a1a1e 0%,#ff1a1a0a 40%,transparent 70%)', pointerEvents:'none' as const, zIndex:0 },
  badge: { display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,80,0,0.1)', border:'1px solid #ff1a1a44', borderRadius:100, padding:'7px 18px', fontSize:12, fontWeight:600, color:'#ff8866', marginBottom:32 },
  tag: { display:'inline-flex', background:'#ff1a1a22', border:'1px solid #ff1a1a44', borderRadius:100, padding:'5px 14px', fontSize:11, fontWeight:600, color:'#ff8888', letterSpacing:'0.08em', textTransform:'uppercase' as const, marginBottom:18 },
  card: { background:'#0e0e0e', border:'1px solid #1e1e1e', borderRadius:14, padding:'28px 24px' },
  techCard: { background:'#0e0e0e', border:'1px solid #1e1e1e', borderRadius:14, padding:'22px 20px' },
  agentCard: { background:'#0e0e0e', border:'1px solid #1e1e1e', borderRadius:14, padding:'24px 18px', textAlign:'center' as const, width:175, position:'relative' as const },
};

export default function Landing({ onLaunch }: Props) {
  return (
    <div style={{ fontFamily:'var(--font-body)', background:'#080808', color:'#fff' }}>

      {/* NAVBAR */}
      <nav style={S.nav}>
        <div style={S.logo}>⚡ DisasterCIRO</div>
        <div style={{ display:'flex', gap:32 }}>
          {['Problem','How It Works','Agents','Tech'].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g,'-')}`} style={S.navLink}>{l}</a>
          ))}
        </div>
        <button onClick={onLaunch} style={S.btnPrimary}>🚨 Launch App</button>
      </nav>

      {/* HERO */}
      <section style={S.hero}>
        <div style={S.oval} />
        <div style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column', alignItems:'center' }}>
          <div style={S.badge}>⚡ Powered by Google Antigravity</div>
          <h1 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(58px,11vw,108px)', fontWeight:900, letterSpacing:'-0.04em', lineHeight:0.95, marginBottom:10 }}>
            Disaster<span style={{ color:'#ff1a1a' }}>CIRO</span>
          </h1>
          <p style={{ fontSize:15, color:'#ff8844', marginBottom:24, direction:'rtl' }}>
            بحران کا پتہ لگائیں · ردعمل مربوط کریں · زندگیاں بچائیں
          </p>
          <p style={{ fontSize:16, color:'#aaa', maxWidth:560, lineHeight:1.75, marginBottom:10 }}>
            AI-powered multi-agent system that detects urban crises in real-time, coordinates emergency response, and saves lives across Pakistan.
          </p>
          <p style={{ fontSize:13, color:'#ff884455', maxWidth:480, lineHeight:1.8, marginBottom:36, direction:'rtl' }}>
            ناسا سیٹلائٹ ٹیکنالوجی اور AI کی مدد سے پاکستانی شہروں میں بحران کا حقیقی وقت پتہ لگانا۔
          </p>
          <div style={{ display:'flex', gap:14, marginBottom:56, flexWrap:'wrap', justifyContent:'center' }}>
            <button onClick={onLaunch} style={S.btnPrimaryLg}>🚨 Get Crisis Advisory →</button>
            <button style={S.btnSecondary}>How It Works</button>
          </div>
          <div style={{ display:'flex', alignItems:'center', borderTop:'1px solid #ffffff0a', paddingTop:32 }}>
            {[{num:'5+',label:'AI AGENTS',ur:'AI ایجنٹس'},{num:'<30s',label:'RESPONSE TIME',ur:'ردعمل وقت'},{num:'6+',label:'CRISIS TYPES',ur:'بحران کی اقسام'}].map((s,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center' }}>
                {i>0 && <div style={{ width:1, height:48, background:'#ffffff12', margin:'0 8px' }} />}
                <div style={{ textAlign:'center', padding:'0 32px' }}>
                  <div style={{ fontFamily:'var(--font-head)', fontSize:38, fontWeight:900, color:'#fff', lineHeight:1, marginBottom:6 }}>{s.num}</div>
                  <div style={{ fontSize:10, color:'#555', textTransform:'uppercase', letterSpacing:'0.14em', marginBottom:3 }}>{s.label}</div>
                  <div style={{ fontSize:10, color:'#ff884455' }}>{s.ur}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section style={{ padding:'80px 48px', maxWidth:1200, margin:'0 auto' }} id="problem">
        <div style={S.tag}>The Problem · مسئلہ</div>
        <h2 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(32px,5vw,48px)', fontWeight:900, letterSpacing:'-0.03em', marginBottom:16 }}>Why DisasterCIRO?</h2>
        <p style={{ color:'#aaa', fontSize:16, maxWidth:560, lineHeight:1.7, marginBottom:48 }}>33 million Pakistanis faced crisis in 2022. Critical signals exist — but never converted into coordinated action in real time.</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:16 }}>
          {[
            {icon:'🌊',num:'33M+',label:'People affected by 2022 floods',src:'Source: NDMA 2022'},
            {icon:'🔥',num:'52°C',label:'Peak heatwave in Jacobabad',src:'Source: PMD Pakistan'},
            {icon:'⏱️',num:'45min+',label:'Average emergency response delay',src:'Source: Rescue 1122'},
            {icon:'📡',num:'0%',label:'Real-time AI crisis coordination in Pakistan',src:'Gap DisasterCIRO fills'},
          ].map((c,i) => (
            <div key={i} style={S.card}>
              <div style={{ fontSize:28, marginBottom:16 }}>{c.icon}</div>
              <div style={{ fontFamily:'var(--font-head)', fontSize:44, fontWeight:900, color:'#ff1a1a', marginBottom:10, lineHeight:1 }}>{c.num}</div>
              <div style={{ fontSize:14, color:'#aaa', lineHeight:1.55, marginBottom:10 }}>{c.label}</div>
              <div style={{ fontSize:11, color:'#555' }}>{c.src}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding:'80px 48px', maxWidth:1200, margin:'0 auto' }} id="how-it-works">
        <div style={S.tag}>Simple Process · آسان عمل</div>
        <h2 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(32px,5vw,48px)', fontWeight:900, letterSpacing:'-0.03em', marginBottom:16 }}>How It Works</h2>
        <p style={{ color:'#aaa', fontSize:16, maxWidth:560, lineHeight:1.7, marginBottom:48 }}>From crisis report to coordinated response in under 30 seconds.</p>
        <div style={{ maxWidth:680, display:'flex', flexDirection:'column', gap:4 }}>
          {[
            {n:'01',h:'Report a Crisis',p:'Type in English, Urdu, or Roman Urdu.',items:['✓ "G-10 mein pani bhar gaya" — flooding detected','✓ "Flash flood in Defence Karachi"','✓ "Lahore mein aag lag gayi" — fire identified']},
            {n:'02',h:'5 AI Agents Analyze',p:'Google Antigravity + ADK orchestrated pipeline.',items:['✓ Real weather from OpenWeatherMap','✓ Location geocoded via Google Maps','✓ Severity and confidence scored']},
            {n:'03',h:'Coordinated Response',p:'Actionable response plan with simulation and full agent trace.',items:['✓ Rescue 1122, Edhi, NDMA dispatched','✓ Traffic rerouted on map','✓ Citizens alerted — bilingual EN/UR']},
          ].map((step,i) => (
            <div key={i}>
              {i>0 && <div style={{ textAlign:'center', fontSize:20, color:'#ff1a1a33', padding:'6px 0' }}>↓</div>}
              <div style={{ background:'#0e0e0e', border:'1px solid #1e1e1e', borderRadius:14, padding:28, display:'flex', gap:20, alignItems:'flex-start' }}>
                <div style={{ fontFamily:'var(--font-head)', fontSize:52, fontWeight:900, color:'#ff1a1a20', lineHeight:1, flexShrink:0, minWidth:64 }}>{step.n}</div>
                <div>
                  <h3 style={{ fontFamily:'var(--font-head)', fontSize:18, fontWeight:800, marginBottom:8 }}>{step.h}</h3>
                  <p style={{ color:'#aaa', fontSize:14, lineHeight:1.65, marginBottom:14 }}>{step.p}</p>
                  <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:5 }}>
                    {step.items.map((it,j) => <li key={j} style={{ fontSize:13, color:'#aaa' }}>{it}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AGENTS */}
      <section style={{ padding:'80px 48px', maxWidth:1200, margin:'0 auto' }} id="agents">
        <div style={S.tag}>Multi-Agent Architecture · کثیر ایجنٹ نظام</div>
        <h2 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(32px,5vw,48px)', fontWeight:900, letterSpacing:'-0.03em', marginBottom:16 }}>5 AI Agents Working Together</h2>
        <p style={{ color:'#aaa', fontSize:16, maxWidth:560, lineHeight:1.7, marginBottom:48 }}>Google Antigravity ADK orchestrated pipeline for coordinated disaster response.</p>
        <div style={{ display:'flex', alignItems:'center', flexWrap:'wrap', justifyContent:'center' }}>
          {[
            {n:'01',icon:'🔍',name:'Signal Collector',desc:'Parses multi-language input',tag:'Input Processing'},
            {n:'02',icon:'🎯',name:'Crisis Detector',desc:'Validates with real weather data',tag:'Detection'},
            {n:'03',icon:'📊',name:'Situation Analyst',desc:'Estimates affected population',tag:'Analysis'},
            {n:'04',icon:'📋',name:'Action Planner',desc:'Generates response plan',tag:'Planning'},
            {n:'05',icon:'⚙️',name:'Exec Simulator',desc:'Simulates before/after response',tag:'Simulation'},
          ].map((a,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center' }}>
              {i>0 && <div style={{ fontSize:18, color:'#ff1a1a44', padding:'0 6px' }}>→</div>}
              <div style={S.agentCard}>
                <div style={{ position:'absolute', top:10, right:12, fontFamily:'var(--font-mono)', fontSize:10, color:'#555' }}>{a.n}</div>
                <div style={{ fontSize:32, marginBottom:12 }}>{a.icon}</div>
                <div style={{ fontSize:13, fontWeight:700, marginBottom:8 }}>{a.name}</div>
                <div style={{ fontSize:11, color:'#555', lineHeight:1.55, marginBottom:14 }}>{a.desc}</div>
                <div style={{ background:'#ff1a1a22', border:'1px solid #ff1a1a44', borderRadius:100, padding:'3px 10px', fontSize:9, fontWeight:700, color:'#ff8888', display:'inline-block' }}>{a.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TECH */}
      <section style={{ padding:'80px 48px', maxWidth:1200, margin:'0 auto' }} id="tech">
        <div style={S.tag}>Technology · ٹیکنالوجی</div>
        <h2 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(32px,5vw,48px)', fontWeight:900, letterSpacing:'-0.03em', marginBottom:16 }}>Built With Best-in-Class</h2>
        <p style={{ color:'#aaa', fontSize:16, maxWidth:560, lineHeight:1.7, marginBottom:48 }}>Google AI, real geospatial data, and modern infrastructure.</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(175px,1fr))', gap:14 }}>
          {[
            {icon:'🤖',cat:'AI / Orchestration',name:'Google Antigravity',desc:'Multi-agent orchestration via Google ADK'},
            {icon:'💎',cat:'AI / ML',name:'Gemini 2.5 Flash',desc:'Powers all 5 agents with multilingual understanding'},
            {icon:'🗺️',cat:'Maps',name:'Google Maps API',desc:'Live crisis location mapping and geocoding'},
            {icon:'🌤️',cat:'Data',name:'OpenWeatherMap',desc:'Real-time weather for crisis validation'},
            {icon:'⚡',cat:'Backend',name:'FastAPI + Python',desc:'High-performance async backend'},
            {icon:'📱',cat:'Frontend',name:'Next.js + React',desc:'Modern web app framework'},
          ].map((t,i) => (
            <div key={i} style={S.techCard}>
              <div style={{ fontSize:24, marginBottom:10 }}>{t.icon}</div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'#ff8888', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:7 }}>{t.cat}</div>
              <div style={{ fontSize:14, fontWeight:700, marginBottom:6 }}>{t.name}</div>
              <div style={{ fontSize:12, color:'#555', lineHeight:1.5 }}>{t.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign:'center', padding:'96px 24px', background:'linear-gradient(180deg,transparent,#ff1a1a0a 40%,transparent)' }}>
        <h2 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(28px,5vw,44px)', fontWeight:900, letterSpacing:'-0.03em', marginBottom:16 }}>Ready to See It In Action?</h2>
        <p style={{ color:'#aaa', fontSize:16, marginBottom:36 }}>Experience real-time crisis detection powered by 5 AI agents</p>
        <button onClick={onLaunch} style={{ background:'#ff1a1a', border:'none', borderRadius:8, color:'#fff', padding:'18px 40px', fontSize:17, fontWeight:700, cursor:'pointer', boxShadow:'0 0 24px #ff1a1a66' }}>
          🚨 Launch DisasterCIRO →
        </button>
      </section>

      {/* FOOTER */}
      <footer style={{ textAlign:'center', padding:'40px 24px', borderTop:'1px solid #1e1e1e', color:'#555', fontSize:13, lineHeight:2.2 }}>
        <div style={{ fontFamily:'var(--font-head)', fontSize:18, fontWeight:900, color:'#ff1a1a', marginBottom:6 }}>⚡ DisasterCIRO Pakistan</div>
        <p>Built with Google Antigravity · Gemini 2.5 Flash · Google Maps · OpenWeatherMap</p>
        <p>Google AI Seekho Hackathon 2026</p>
      </footer>
    </div>
  );
}
"""

# ============================================================
# Dashboard.tsx
# ============================================================
dashboard = """\
'use client';
import { useState } from 'react';

interface Props { onBack: () => void; }

type Screen = 'home' | 'processing' | 'result' | 'actions' | 'simulation' | 'logs';

const API = 'http://127.0.0.1:8001';

const QUICK: Record<string,string> = {
  flood: 'G-10 mein pani bhar gaya, gaariyan phans gayi hain',
  fire: 'Karachi Defence mein aag lag gayi hai, logo ko nikalo',
  accident: 'Motorway pe bara accident hua hai, rasta band hai',
  power: 'Lahore Gulberg mein 3 ghante se bijli nahi hai',
  heat: 'Jacobabad mein temperature 52 degree ho gaya hai',
};

export default function Dashboard({ onBack }: Props) {
  const [screen, setScreen] = useState<Screen>('home');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [agents, setAgents] = useState([
    {name:'Signal Collector',icon:'🔍',status:'waiting',done:false},
    {name:'Crisis Detector',icon:'🎯',status:'waiting',done:false},
    {name:'Situation Analyst',icon:'📊',status:'waiting',done:false},
    {name:'Action Planner',icon:'📋',status:'waiting',done:false},
    {name:'Exec Simulator',icon:'⚙️',status:'waiting',done:false},
  ]);
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const addLog = (msg: string) => setLogs(prev => [...prev, msg]);

  const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

  const submit = async () => {
    if (!input.trim()) return;
    setScreen('processing');
    setLogs([]);
    setProgress(0);
    setAgents(prev => prev.map(a => ({...a, status:'waiting', done:false})));
    addLog('🚨 Crisis report received — initiating pipeline…');

    try {
      const res = await fetch(`${API}/api/v1/process`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({text: input})
      });

      if (!res.ok) throw new Error('API Error');
      const result = await res.json();

      if (result.no_crisis) {
        alert('No crisis detected. Please describe an actual emergency.');
        setScreen('home');
        return;
      }

      const msgs = [
        `Signal parsed — ${result.signal?.crisis_type || 'crisis'} detected`,
        `Confidence ${result.detection?.confidence || 0}% — ${result.detection?.severity || ''} severity`,
        `${(result.analysis?.affected_people || 0).toLocaleString()} people affected`,
        `${result.plan?.actions?.length || 0} response actions queued`,
        `Simulation complete — advisory ready`,
      ];

      for (let i = 0; i < 5; i++) {
        await delay(500);
        setAgents(prev => prev.map((a,idx) => idx===i ? {...a,status:'Processing…'} : a));
        addLog(`[Agent ${i+1}] ${msgs[i]}`);
        setProgress((i+1)*20);
        await delay(600);
        setAgents(prev => prev.map((a,idx) => idx===i ? {...a,status:'Done ✓',done:true} : a));
      }

      await delay(400);
      setProgress(100);
      addLog('✅ All agents complete!');
      setData(result);
      setTimeout(() => setScreen('result'), 600);

    } catch(e) {
      alert('Error connecting to backend. Make sure server is running on port 8001!');
      setScreen('home');
    }
  };

  const det = data?.detection || {};
  const ana = data?.analysis || {};
  const pln = data?.plan || {};
  const sim = data?.simulation || {};
  const wthr = data?.weather || {};

  return (
    <div style={{background:'#080808',minHeight:'100vh',color:'#fff',fontFamily:'var(--font-body)'}}>
      {/* NAVBAR */}
      <nav style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 24px',background:'rgba(8,8,8,0.9)',borderBottom:'1px solid #1e1e1e',position:'sticky',top:0,zIndex:200,backdropFilter:'blur(16px)'}}>
        <div onClick={onBack} style={{cursor:'pointer',fontFamily:'var(--font-head)',fontSize:18,fontWeight:900,color:'#ff1a1a'}}>← DisasterCIRO</div>
        <div style={{display:'flex',alignItems:'center',gap:7,fontSize:12,color:'#00ff88',fontWeight:600}}>
          <span style={{width:7,height:7,background:'#00ff88',borderRadius:'50%',display:'inline-block',boxShadow:'0 0 8px #00ff88'}} />
          System Active
        </div>
      </nav>

      {/* HOME */}
      {screen === 'home' && (
        <div style={{display:'grid',gridTemplateColumns:'340px 1fr',gap:16,padding:16,alignItems:'start'}}>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <div style={{fontFamily:'var(--font-mono)',fontSize:10,color:'#555',letterSpacing:'0.14em',textTransform:'uppercase',paddingBottom:10,borderBottom:'1px solid #1e1e1e'}}>🚨 Report Crisis</div>
            <textarea value={input} onChange={e=>setInput(e.target.value)}
              placeholder={"Kya ho raha hai?\\n\\ne.g. G-10 mein pani bhar gaya\\ne.g. Flash flood in Defence Karachi"}
              style={{width:'100%',background:'#0d0d0d',border:'1px solid #2a2a2a',borderRadius:8,color:'#fff',fontFamily:'var(--font-body)',fontSize:14,padding:13,resize:'none',height:100,outline:'none',lineHeight:1.6}} />
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              {Object.entries(QUICK).map(([k,v]) => (
                <button key={k} onClick={()=>setInput(v)} style={{background:'#0d0d0d',border:'1px solid #2a2a2a',borderRadius:100,color:'#aaa',padding:'7px 13px',fontSize:12,cursor:'pointer'}}>
                  {k==='flood'?'🌊 Flood':k==='fire'?'🔥 Fire':k==='accident'?'🚗 Accident':k==='power'?'⚡ Power':'☀️ Heatwave'}
                </button>
              ))}
            </div>
            <button onClick={submit} style={{background:'#ff1a1a',border:'none',borderRadius:8,color:'#fff',fontSize:14,fontWeight:700,padding:15,cursor:'pointer',width:'100%',textTransform:'uppercase',letterSpacing:'0.08em',boxShadow:'0 0 24px #ff1a1a66'}}>
              🚨 Analyze Crisis
            </button>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <div style={{fontFamily:'var(--font-mono)',fontSize:10,color:'#555',letterSpacing:'0.14em',textTransform:'uppercase',paddingBottom:10,borderBottom:'1px solid #1e1e1e'}}>📍 Pakistan Crisis Map</div>
            <div style={{width:'100%',height:420,background:'#0d0d0d',borderRadius:12,border:'1px solid #1e1e1e',display:'flex',alignItems:'center',justifyContent:'center',color:'#333',fontSize:14,fontFamily:'monospace'}}>
              🗺️ Map Loading...
            </div>
          </div>
        </div>
      )}

      {/* PROCESSING */}
      {screen === 'processing' && (
        <div style={{display:'grid',gridTemplateColumns:'340px 1fr',gap:16,padding:16,alignItems:'start'}}>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <div style={{fontFamily:'var(--font-mono)',fontSize:10,color:'#555',letterSpacing:'0.14em',textTransform:'uppercase',paddingBottom:10,borderBottom:'1px solid #1e1e1e'}}>⚡ Agent Pipeline — Live</div>
            {agents.map((a,i) => (
              <div key={i}>
                {i>0 && <div style={{width:2,height:10,background:a.done?'#00ff88':'#1e1e1e',margin:'0 20px'}} />}
                <div style={{background:a.done?'#00ff8815':a.status!=='waiting'?'#ff1a1a22':'#0e0e0e',border:`1px solid ${a.done?'#00ff8844':a.status!=='waiting'?'#ff1a1a':'#1e1e1e'}`,borderRadius:10,padding:'12px 14px',transition:'all 0.4s'}}>
                  <div style={{display:'flex',alignItems:'center',gap:10}}>
                    <div style={{fontSize:18,flexShrink:0}}>{a.icon}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:700,marginBottom:2}}>{a.name}</div>
                      <div style={{fontFamily:'var(--font-mono)',fontSize:9,color:a.done?'#00ff88':'#555'}}>{a.status}</div>
                    </div>
                    <div style={{fontSize:16}}>{a.done?'✅':a.status!=='waiting'?'⏳':'⬜'}</div>
                  </div>
                </div>
              </div>
            ))}
            <div style={{background:'#1e1e1e',borderRadius:100,height:5,overflow:'hidden',marginTop:8}}>
              <div style={{background:'linear-gradient(90deg,#ff1a1a,#ff6600)',height:'100%',width:`${progress}%`,transition:'width 0.6s',borderRadius:100}} />
            </div>
            <div style={{background:'#060606',border:'1px solid #1e1e1e',borderRadius:8,padding:14,fontFamily:'var(--font-mono)',fontSize:11,color:'#555',minHeight:100,maxHeight:160,overflowY:'auto',lineHeight:1.9}}>
              <div style={{fontSize:9,letterSpacing:'0.12em',color:'#555',marginBottom:10,paddingBottom:8,borderBottom:'1px solid #1e1e1e'}}>● AGENT PIPELINE — LIVE</div>
              {logs.map((l,i) => <div key={i}>{l}</div>)}
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <div style={{fontFamily:'var(--font-mono)',fontSize:10,color:'#555',letterSpacing:'0.14em',textTransform:'uppercase',paddingBottom:10,borderBottom:'1px solid #1e1e1e'}}>📊 Live Results</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              {[
                {icon:'🌧️',label:'Crisis Type',val:det.crisis_type?.toUpperCase()||'Analyzing...',color:'#ff1a1a',sub:det.location?.city||'—'},
                {icon:'🎯',label:'Confidence',val:det.confidence?`${det.confidence}%`:'—',color:'#00ff88',sub:'Certainty level'},
                {icon:'⚠️',label:'Severity',val:ana.severity_label||det.severity||'—',color:'#ffaa00',sub:`${(ana.affected_people||0).toLocaleString()} people`},
                {icon:'🌤️',label:'Weather',val:wthr.temperature?`${wthr.temperature}°C`:'—',color:'#fff',sub:wthr.condition||'Live data'},
              ].map((c,i) => (
                <div key={i} style={{background:'#0e0e0e',border:'1px solid #1e1e1e',borderRadius:8,padding:14}}>
                  <div style={{fontSize:20,marginBottom:6}}>{c.icon}</div>
                  <div style={{fontFamily:'var(--font-mono)',fontSize:9,color:'#555',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:4}}>{c.label}</div>
                  <div style={{fontSize:18,fontWeight:800,fontFamily:'var(--font-head)',marginBottom:2,color:c.color}}>{c.val}</div>
                  <div style={{fontSize:10,color:'#555'}}>{c.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RESULT */}
      {screen === 'result' && data && (
        <div style={{display:'grid',gridTemplateColumns:'340px 1fr',gap:16,padding:16,alignItems:'start'}}>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <div style={{fontFamily:'var(--font-mono)',fontSize:10,color:'#555',letterSpacing:'0.14em',textTransform:'uppercase',paddingBottom:10,borderBottom:'1px solid #1e1e1e'}}>🔍 Agent Pipeline</div>
            {agents.map((a,i) => (
              <div key={i}>
                {i>0 && <div style={{width:2,height:10,background:'#00ff88',margin:'0 20px'}} />}
                <div style={{background:'#00ff8815',border:'1px solid #00ff8844',borderRadius:10,padding:'12px 14px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:10}}>
                    <div style={{fontSize:18}}>{a.icon}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:700,marginBottom:2}}>{a.name}</div>
                      <div style={{fontFamily:'var(--font-mono)',fontSize:9,color:'#00ff88'}}>Completed ✓</div>
                    </div>
                    <div>✅</div>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={()=>setScreen('logs')} style={{background:'transparent',border:'1px solid #2a2a2a',borderRadius:8,color:'#aaa',padding:'10px',fontSize:13,cursor:'pointer',marginTop:8}}>View Agent Logs →</button>
            <button onClick={()=>{setScreen('home');setData(null);setInput('');}} style={{background:'#ff1a1a',border:'none',borderRadius:8,color:'#fff',padding:'10px',fontSize:13,fontWeight:700,cursor:'pointer'}}>🏠 New Crisis</button>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <div style={{fontFamily:'var(--font-head)',fontSize:40,fontWeight:900,color:'#ff1a1a',letterSpacing:'-0.02em',textShadow:'0 0 40px #ff1a1a66'}}>{det.crisis_type?.toUpperCase()||'CRISIS'}</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              {[
                {label:'📍 Location',val:`${det.location?.area||''}, ${det.location?.city||''}`},
                {label:'🎯 Confidence',val:`${det.confidence||0}%`,red:true},
                {label:'⚠️ Severity',val:ana.severity_label||det.severity||'—'},
                {label:'👥 Affected',val:`${(ana.affected_people||0).toLocaleString()} people`},
                {label:'🌤️ Weather',val:wthr.real_data?`${wthr.temperature}°C, ${wthr.condition}`:'Simulated'},
                {label:'⏱️ Risk Window',val:ana.time_to_worsen||'—'},
              ].map((c,i) => (
                <div key={i} style={{background:'#0e0e0e',border:'1px solid #1e1e1e',borderRadius:8,padding:14}}>
                  <div style={{fontFamily:'var(--font-mono)',fontSize:9,color:'#555',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:7}}>{c.label}</div>
                  <div style={{fontSize:14,fontWeight:700,color:(c as any).red?'#ff1a1a':'#fff'}}>{c.val}</div>
                </div>
              ))}
            </div>
            <div style={{background:'#111',border:'1px solid #1e1e1e',borderRadius:8,padding:16}}>
              <div style={{fontFamily:'var(--font-mono)',fontSize:9,color:'#ff8888',letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:10}}>💡 AI Reasoning</div>
              <div style={{fontSize:13,color:'#aaa',lineHeight:1.7}}>{det.explanation||ana.reasoning||'—'}</div>
            </div>
            <div style={{background:'#111',border:'1px solid #1e1e1e',borderRadius:8,padding:16}}>
              <div style={{fontFamily:'var(--font-mono)',fontSize:9,color:'#ff8888',letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:10}}>⚠️ Areas At Risk</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                {(ana.at_risk_areas||[]).map((area:string,i:number) => (
                  <span key={i} style={{background:'#ff1a1a22',border:'1px solid #ff1a1a44',borderRadius:100,padding:'4px 13px',fontSize:12,color:'#ff8888'}}>📍 {area}</span>
                ))}
              </div>
            </div>
            <button onClick={()=>setScreen('actions')} style={{background:'#ff1a1a',border:'none',borderRadius:8,color:'#fff',padding:'14px',fontSize:14,fontWeight:700,cursor:'pointer',width:'100%'}}>See Response Plan →</button>
          </div>
        </div>
      )}

      {/* ACTIONS */}
      {screen === 'actions' && data && (
        <div style={{display:'grid',gridTemplateColumns:'340px 1fr',gap:16,padding:16,alignItems:'start'}}>
          <div>
            <div style={{fontFamily:'var(--font-mono)',fontSize:10,color:'#555',letterSpacing:'0.14em',textTransform:'uppercase',paddingBottom:10,borderBottom:'1px solid #1e1e1e',marginBottom:12}}>📋 Response Actions</div>
            {(pln.actions||[]).map((a:any,i:number) => (
              <div key={i} style={{background:'#0e0e0e',border:'1px solid #1e1e1e',borderRadius:8,padding:14,display:'flex',alignItems:'flex-start',gap:12,marginBottom:10}}>
                <div style={{background:'#ff1a1a',color:'#fff',width:28,height:28,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:13,flexShrink:0}}>{a.priority}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:600,marginBottom:4}}>{a.action}</div>
                  <div style={{fontSize:11,color:'#555'}}>👤 {a.responsible} · ⏱ {a.time_estimate}</div>
                </div>
                <span style={{fontFamily:'var(--font-mono)',fontSize:9,padding:'3px 9px',borderRadius:100,background:'#2a2a2a',color:'#555',textTransform:'uppercase',flexShrink:0}}>{a.status}</span>
              </div>
            ))}
            <button onClick={()=>setScreen('simulation')} style={{background:'#ff1a1a',border:'none',borderRadius:8,color:'#fff',padding:'14px',fontSize:14,fontWeight:700,cursor:'pointer',width:'100%',marginTop:8}}>▶ Simulate Response</button>
          </div>
          <div>
            <div style={{fontFamily:'var(--font-mono)',fontSize:10,color:'#555',letterSpacing:'0.14em',textTransform:'uppercase',paddingBottom:10,borderBottom:'1px solid #1e1e1e',marginBottom:12}}>📊 Before vs After</div>
            <div style={{background:'#0e0e0e',border:'1px solid #ff1a1a33',borderRadius:8,padding:16,marginBottom:12}}>
              <div style={{fontFamily:'var(--font-mono)',fontWeight:700,fontSize:9,color:'#555',letterSpacing:'0.18em',textTransform:'uppercase',marginBottom:10}}>Before Response</div>
              <div style={{fontSize:13,color:'#aaa',lineHeight:2}}>
                <div>🚗 Congestion: <strong>{sim.before?.congestion||'—'}</strong></div>
                <div>🚑 Rescue Units: <strong>{sim.before?.rescue_units||0}</strong></div>
                <div>📢 Alerts Sent: <strong>{sim.before?.alerts_sent||0}</strong></div>
              </div>
              <span style={{background:'#ff1a1a22',color:'#ff1a1a',border:'1px solid #ff1a1a44',borderRadius:100,padding:'4px 10px',fontSize:9,fontWeight:700,textTransform:'uppercase',display:'inline-block',marginTop:10}}>Uncontrolled</span>
            </div>
            <div style={{background:'#0e0e0e',border:'1px solid #00ff8833',borderRadius:8,padding:16}}>
              <div style={{fontFamily:'var(--font-mono)',fontWeight:700,fontSize:9,color:'#555',letterSpacing:'0.18em',textTransform:'uppercase',marginBottom:10}}>After Response</div>
              <div style={{fontSize:13,color:'#aaa',lineHeight:2}}>
                <div>🚗 Congestion: <strong style={{color:'#00ff88'}}>{sim.after?.congestion||'—'}</strong></div>
                <div>🚑 Rescue Units: <strong style={{color:'#00ff88'}}>{sim.after?.rescue_units||0}</strong></div>
                <div>📢 Alerts: <strong style={{color:'#00ff88'}}>{(sim.after?.alerts_sent||0).toLocaleString()}</strong></div>
              </div>
              <span style={{background:'#00ff8815',color:'#00ff88',border:'1px solid #00ff8844',borderRadius:100,padding:'4px 10px',fontSize:9,fontWeight:700,textTransform:'uppercase',display:'inline-block',marginTop:10}}>Controlled</span>
            </div>
          </div>
        </div>
      )}

      {/* SIMULATION */}
      {screen === 'simulation' && data && (
        <div style={{display:'grid',gridTemplateColumns:'340px 1fr',gap:16,padding:16,alignItems:'start'}}>
          <div>
            <div style={{fontFamily:'var(--font-mono)',fontSize:10,color:'#555',letterSpacing:'0.14em',textTransform:'uppercase',paddingBottom:10,borderBottom:'1px solid #1e1e1e',marginBottom:12}}>⚙️ Executed Actions</div>
            {(sim.executed_actions||[]).map((a:any,i:number) => (
              <div key={i} style={{background:'#0e0e0e',border:'1px solid #00ff8833',borderRadius:8,padding:14,display:'flex',alignItems:'flex-start',gap:12,marginBottom:10}}>
                <div style={{background:'#00ff88',color:'#000',width:28,height:28,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:13,flexShrink:0}}>{a.priority}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:600,marginBottom:4}}>{a.action}</div>
                  <div style={{fontSize:11,color:'#555'}}>✅ {a.result}</div>
                </div>
                <span style={{fontFamily:'var(--font-mono)',fontSize:9,padding:'3px 9px',borderRadius:100,background:'#00ff8815',color:'#00ff88',border:'1px solid #00ff8844',textTransform:'uppercase',flexShrink:0}}>{a.status}</span>
              </div>
            ))}
            <button onClick={()=>setScreen('logs')} style={{background:'transparent',border:'1px solid #2a2a2a',borderRadius:8,color:'#aaa',padding:'12px',fontSize:13,cursor:'pointer',width:'100%',marginTop:8}}>View Agent Logs →</button>
          </div>
          <div>
            <div style={{fontFamily:'var(--font-mono)',fontSize:10,color:'#555',letterSpacing:'0.14em',textTransform:'uppercase',paddingBottom:10,borderBottom:'1px solid #1e1e1e',marginBottom:12}}>📊 Outcome</div>
            <div style={{background:'#00ff8815',border:'1px solid #00ff8833',borderRadius:8,padding:16,marginBottom:16,fontSize:13,color:'#aaa',lineHeight:1.7}}>{sim.outcome_summary||'Crisis response completed.'}</div>
            <div style={{display:'flex',gap:10,alignItems:'stretch'}}>
              <div style={{flex:1,background:'#0e0e0e',border:'1px solid #ff1a1a33',borderRadius:8,padding:16,fontSize:13,color:'#aaa',lineHeight:2}}>
                <div style={{fontFamily:'var(--font-mono)',fontWeight:700,fontSize:9,color:'#555',letterSpacing:'0.18em',textTransform:'uppercase',marginBottom:10}}>Before</div>
                <div>🚗 {sim.before?.congestion||'—'}</div>
                <div>🚑 {sim.before?.rescue_units||0} units</div>
                <div>📢 {sim.before?.alerts_sent||0} alerts</div>
              </div>
              <div style={{fontSize:22,color:'#ff1a1a',flexShrink:0,display:'flex',alignItems:'center'}}>→</div>
              <div style={{flex:1,background:'#0e0e0e',border:'1px solid #00ff8833',borderRadius:8,padding:16,fontSize:13,color:'#aaa',lineHeight:2}}>
                <div style={{fontFamily:'var(--font-mono)',fontWeight:700,fontSize:9,color:'#555',letterSpacing:'0.18em',textTransform:'uppercase',marginBottom:10}}>After</div>
                <div style={{color:'#00ff88'}}>🚗 {sim.after?.congestion||'—'}</div>
                <div style={{color:'#00ff88'}}>🚑 {sim.after?.rescue_units||0} units</div>
                <div style={{color:'#00ff88'}}>📢 {(sim.after?.alerts_sent||0).toLocaleString()} alerts</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LOGS */}
      {screen === 'logs' && data && (
        <div style={{padding:16,maxWidth:900,margin:'0 auto'}}>
          <div style={{fontFamily:'var(--font-mono)',fontSize:10,color:'#555',letterSpacing:'0.14em',textTransform:'uppercase',paddingBottom:10,borderBottom:'1px solid #1e1e1e',marginBottom:16}}>🔍 Agent Trace Logs</div>
          {[
            {key:'signal',icon:'🔍',name:'Signal Collector'},
            {key:'detection',icon:'🎯',name:'Crisis Detector'},
            {key:'analysis',icon:'📊',name:'Situation Analyst'},
            {key:'plan',icon:'📋',name:'Action Planner'},
            {key:'simulation',icon:'⚙️',name:'Exec Simulator'},
          ].map((a,i) => {
            const [open, setOpen] = useState(false);
            return (
              <div key={i} style={{background:'#111',border:'1px solid #1e1e1e',borderRadius:8,overflow:'hidden',marginBottom:10}}>
                <div onClick={()=>setOpen(!open)} style={{background:'#0e0e0e',padding:'13px 16px',fontFamily:'var(--font-mono)',fontSize:11,color:'#ff1a1a',cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span>{a.icon} Agent {i+1} — {a.name}</span>
                  <span>{open?'▲':'▼'}</span>
                </div>
                {open && (
                  <pre style={{padding:14,fontFamily:'var(--font-mono)',fontSize:10,color:'#555',whiteSpace:'pre-wrap',wordBreak:'break-all',maxHeight:220,overflowY:'auto',lineHeight:1.7}}>
                    {JSON.stringify(data[a.key]||{}, null, 2)}
                  </pre>
                )}
              </div>
            );
          })}
          <button onClick={()=>{setScreen('home');setData(null);setInput('');}} style={{background:'#ff1a1a',border:'none',borderRadius:8,color:'#fff',padding:'14px',fontSize:14,fontWeight:700,cursor:'pointer',width:'100%',marginTop:8}}>🏠 New Crisis Report</button>
        </div>
      )}
    </div>
  );
}
"""

with open("app/page.tsx", "w", encoding="utf-8") as f:
    f.write(page)
print("✅ page.tsx written")

with open("app/components/Landing.tsx", "w", encoding="utf-8") as f:
    f.write(landing)
print("✅ Landing.tsx written")

with open("app/components/Dashboard.tsx", "w", encoding="utf-8") as f:
    f.write(dashboard)
print("✅ Dashboard.tsx written")

print("\n🎉 All files ready! Browser refresh karao.")