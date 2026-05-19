'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

interface Props { onBack: () => void; }
type Screen = 'home' | 'processing' | 'result' | 'actions' | 'simulation' | 'logs';
type Lang = 'en' | 'ur';

const PakistanMap = dynamic(() => import('./PakistanMap'), { ssr: false });
const CrisisMap = dynamic(() => import('./CrisisMap'), { ssr: false });

const API = '/backend';
const AGENT_DEFS = [
    { name: 'Signal Collector', nameUr: 'سگنل کلیکٹر', desc: 'Parses EN / Urdu / Roman Urdu — extracts location & crisis type', descUr: 'انگریزی / اردو / رومن اردو پارس کرتا ہے' },
    { name: 'Crisis Detector', nameUr: 'بحران ڈیٹیکٹر', desc: 'Validates with real OpenWeatherMap data — assigns confidence & severity', descUr: 'موسمی ڈیٹا سے تصدیق — شدت اور اعتماد' },
    { name: 'Situation Analyst', nameUr: 'صورتحال تجزیہ کار', desc: 'Estimates affected population, radius & time-to-worsen', descUr: 'متاثرین، دائرہ اور وقت کا تخمینہ' },
    { name: 'Action Planner', nameUr: 'ایکشن پلانر', desc: 'Generates coordinated response — Rescue 1122, NDMA, Edhi, Traffic Police', descUr: 'ریسکیو 1122، این ڈی ایم اے، ایدھی کا منصوبہ' },
    { name: 'Exec Simulator', nameUr: 'ایگزیک سمیولیٹر', desc: 'Simulates full response with before / after outcome metrics', descUr: 'مکمل ردعمل کی سمیولیشن — پہلے / بعد' },
];

const T = {
    en: {
        crisisReport: 'Crisis Report',
        analyzeBtn: 'Analyze Crisis',
        agentPipeline: 'Agent Pipeline',
        supportedInput: 'Supported Input',
        crisisDetected: 'Crisis Detected',
        confidence: 'Confidence',
        location: 'Location',
        severity: 'Severity',
        affected: 'Affected',
        weather: 'Weather',
        riskWindow: 'Risk Window',
        spreading: 'Spreading',
        aiReasoning: 'AI Reasoning',
        areasAtRisk: 'Areas At Risk',
        seeResponsePlan: 'See Response Plan',
        viewAgentLogs: 'View Agent Logs',
        newCrisis: 'New Crisis',
        responseActions: 'Response Actions',
        beforeResponse: 'Before Response',
        afterResponse: 'After Response',
        simulateResponse: 'Simulate Response',
        executedActions: 'Executed Actions',
        outcomeSummary: 'Outcome Summary',
        trafficRerouting: 'Traffic Rerouting Simulation',
        agentTraceLogs: 'Agent Trace Logs',
        newCrisisReport: 'New Crisis Report',
        online: 'Online',
        newReport: 'New Report',
        liveResults: 'Live Results',
        pipelineLog: 'Pipeline Log',
        crisisMap: 'Pakistan Crisis Map',
        crisisLocationMap: 'Crisis Location Map',
        multiSource: 'Multi-Source Inputs Active',
        uncontrolled: 'Uncontrolled',
        controlled: 'Controlled',
        placeholder: 'Describe the crisis in any language...\n\ne.g. G-10 mein pani bhar gaya\ne.g. Flash flood in Defence Karachi\ne.g. Lahore mein bijli nahi hai',
        beforeVsAfter: 'Before vs After Response',
        congestion: 'Congestion',
        rescueUnits: 'Rescue Units',
        alertsSent: 'Alerts Sent',
        situation: 'Situation',
        units: 'Units',
        alerts: 'Alerts',
        before: 'Before',
        after: 'After',
        crisisZone: 'CRISIS ZONE',
        high: 'High — Act Now',
        contained: 'Contained',
    },
    ur: {
        crisisReport: 'بحران رپورٹ',
        analyzeBtn: 'بحران تجزیہ کریں',
        agentPipeline: 'ایجنٹ پائپ لائن',
        supportedInput: 'معاون ان پٹ',
        crisisDetected: 'بحران کا پتہ چلا',
        confidence: 'اعتماد',
        location: 'مقام',
        severity: 'شدت',
        affected: 'متاثرین',
        weather: 'موسم',
        riskWindow: 'خطرے کا وقت',
        spreading: 'پھیلاؤ',
        aiReasoning: 'AI استدلال',
        areasAtRisk: 'خطرے کے علاقے',
        seeResponsePlan: 'ردعمل کا منصوبہ',
        viewAgentLogs: 'ایجنٹ لاگز',
        newCrisis: 'نیا بحران',
        responseActions: 'ردعمل اقدامات',
        beforeResponse: 'ردعمل سے پہلے',
        afterResponse: 'ردعمل کے بعد',
        simulateResponse: 'سمیولیشن چلائیں',
        executedActions: 'انجام دیے گئے اقدامات',
        outcomeSummary: 'نتیجہ خلاصہ',
        trafficRerouting: 'ٹریفک رخ موڑنے کی سمیولیشن',
        agentTraceLogs: 'ایجنٹ ٹریس لاگز',
        newCrisisReport: 'نئی بحران رپورٹ',
        online: 'آن لائن',
        newReport: 'نئی رپورٹ',
        liveResults: 'براہ راست نتائج',
        pipelineLog: 'پائپ لائن لاگ',
        crisisMap: 'پاکستان بحران نقشہ',
        crisisLocationMap: 'بحران مقام نقشہ',
        multiSource: 'ملٹی سورس ان پٹ فعال',
        uncontrolled: 'بے قابو',
        controlled: 'قابو میں',
        placeholder: 'کسی بھی زبان میں بحران بیان کریں...\n\nمثال: G-10 mein pani bhar gaya\nمثال: Flash flood in Defence Karachi',
        beforeVsAfter: 'ردعمل سے پہلے اور بعد',
        congestion: 'ٹریفک',
        rescueUnits: 'ریسکیو یونٹس',
        alertsSent: 'الرٹس بھیجے',
        situation: 'صورتحال',
        units: 'یونٹس',
        alerts: 'الرٹس',
        before: 'پہلے',
        after: 'بعد',
        crisisZone: 'بحران زون',
        high: 'زیادہ — فوری عمل',
        contained: 'قابو میں',
    }
};

export default function Dashboard({ onBack }: Props) {
    const [screen, setScreen] = useState<Screen>('home');
    const [input, setInput] = useState('');
    const [data, setData] = useState<any>(null);
    const [lang, setLang] = useState<Lang>('en');
    const [ags, setAgs] = useState(AGENT_DEFS.map((a, i) => ({ ...a, status: 'waiting', done: false, num: i + 1 })));
    const [logs, setLogs] = useState<string[]>([]);
    const [prog, setProg] = useState(0);
    const [openLog, setOpenLog] = useState<number | null>(null);

    const t = T[lang];
    const isUr = lang === 'ur';

    const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
    const addLog = (m: string) => setLogs(p => [...p, m]);
    const reset = () => { setScreen('home'); setData(null); setInput(''); };

    const submit = async () => {
        if (!input.trim()) return;
        setScreen('processing'); setLogs([]); setProg(0);
        setAgs(AGENT_DEFS.map((a, i) => ({ ...a, status: 'waiting', done: false, num: i + 1 })));
        addLog('Crisis report received — initiating pipeline');
        try {
            const res = await fetch(`${API}/api/v1/process`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: input })
            });
            if (!res.ok) throw new Error('err');
            const result = await res.json();
            if (result.no_crisis) { alert('No crisis detected.'); setScreen('home'); return; }
            const msgs = [
                `Signal parsed — ${result.signal?.crisis_type || 'crisis'} in ${result.signal?.location?.city || 'unknown'}`,
                `Confidence ${result.detection?.confidence || 0}% — severity: ${result.detection?.severity || 'unknown'}`,
                `${(result.analysis?.affected_people || 0).toLocaleString()} people affected`,
                `${result.plan?.actions?.length || 0} response actions queued`,
                `Simulation complete — outcome ready`,
            ];
            for (let i = 0; i < 5; i++) {
                await delay(400);
                setAgs(p => p.map((a, idx) => idx === i ? { ...a, status: 'Processing' } : a));
                addLog(`[Agent ${i + 1}] ${msgs[i]}`);
                setProg((i + 1) * 20);
                await delay(800);
                setAgs(p => p.map((a, idx) => idx === i ? { ...a, status: 'Complete', done: true } : a));
            }
            setProg(100); addLog('All 5 agents complete — advisory ready');
            setData(result); setTimeout(() => setScreen('result'), 500);
        } catch (e) {
            console.error('Full error:', e);
            alert('Backend error: ' + String(e));
            setScreen('home');
        }
    };

    const det = data?.detection || {};
    const ana = data?.analysis || {};
    const pln = data?.plan || {};
    const sim = data?.simulation || {};
    const wthr = data?.weather || {};
    const ur = data?.urdu || {};

    const css = `
    .db { display: grid; grid-template-columns: 260px 1fr; height: calc(100vh - 52px); overflow: hidden; }
    .sb { background: rgba(8,8,8,0.85); backdrop-filter: blur(20px); border-right: 1px solid rgba(255,26,26,0.08); overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
    .mn { overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
    .gc { background: rgba(255,255,255,0.03); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 16px; }
    .gc-r { background: rgba(255,26,26,0.04); backdrop-filter: blur(16px); border: 1px solid rgba(255,26,26,0.12); border-radius: 14px; padding: 16px; }
    .gc-g { background: rgba(57,255,128,0.03); backdrop-filter: blur(16px); border: 1px solid rgba(57,255,128,0.12); border-radius: 14px; padding: 16px; }
    .g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .g3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
    .sc { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 14px; transition: all 0.25s; }
    .sc:hover { border-color: rgba(255,26,26,0.2); background: rgba(255,26,26,0.03); }
    .ac { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 11px; display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px; }
    .lbl { font-family: monospace; font-size: 8px; color: rgba(255,255,255,0.18); letter-spacing: 0.16em; text-transform: uppercase; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.05); margin-bottom: 10px; }
    .tag { display: inline-flex; align-items: center; border-radius: 100px; padding: 3px 10px; font-family: monospace; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; }
    .ai-input { width: 100%; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,26,26,0.2); border-radius: 10px; color: #e2e8f0; font-family: Inter, sans-serif; font-size: 13px; padding: 12px; resize: none; height: 140px; outline: none; line-height: 1.6; transition: border-color 0.3s, box-shadow 0.3s; }
    .ai-input:focus { border-color: #ff1a1a; box-shadow: 0 0 0 3px rgba(255,26,26,0.08), 0 0 24px rgba(255,26,26,0.1); }
    .ag-item { border-radius: 8px; padding: 10px 12px; transition: all 0.35s; display: flex; align-items: center; gap: 10px; }
    .ag-item.running { animation: agpulse 1.3s ease-in-out infinite; }
    @keyframes agpulse { 0%,100%{box-shadow:0 0 12px rgba(255,26,26,0.08);}50%{box-shadow:0 0 22px rgba(255,26,26,0.2);} }
    .ag-line { width: 1px; height: 7px; margin: 0 16px; transition: background 0.35s; }
    .btn-r { background: #ff1a1a; border: none; border-radius: 8px; color: #fff; font-size: 13px; font-weight: 700; padding: 11px 16px; cursor: pointer; width: 100%; letter-spacing: 0.03em; transition: all 0.2s; box-shadow: 0 0 18px rgba(255,26,26,0.25); }
    .btn-r:hover { background: #ff3333; box-shadow: 0 0 28px rgba(255,26,26,0.45); transform: translateY(-1px); }
    .btn-o { background: transparent; border: 1px solid rgba(255,255,255,0.07); border-radius: 8px; color: rgba(255,255,255,0.35); font-size: 12px; padding: 9px 16px; cursor: pointer; width: 100%; transition: all 0.2s; font-family: monospace; }
    .btn-o:hover { border-color: rgba(255,26,26,0.25); color: rgba(255,255,255,0.6); }
    .lang-btn { background: rgba(255,26,26,0.08); border: 1px solid rgba(255,26,26,0.25); border-radius: 8px; color: #ff6644; font-size: 12px; font-weight: 700; padding: 5px 14px; cursor: pointer; transition: all 0.2s; font-family: monospace; white-space: nowrap; }
    .lang-btn:hover { background: rgba(255,26,26,0.15); border-color: rgba(255,26,26,0.5); }
    .log-hdr { padding: 10px 14px; font-family: monospace; font-size: 10px; color: rgba(255,26,26,0.6); cursor: pointer; display: flex; justify-content: space-between; align-items: center; background: rgba(8,8,8,0.7); }
    .log-hdr:hover { background: rgba(255,26,26,0.04); }
    @keyframes ticker { 0% { opacity: 0; transform: translateX(-6px); } 100% { opacity: 1; transform: translateX(0); } }
    @media(max-width:768px){ .db { grid-template-columns: 1fr; height: auto; overflow: visible; } .sb { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.05); } .g2 { grid-template-columns: 1fr 1fr; } .g3 { grid-template-columns: 1fr 1fr; } }
    `;

    const AgentPipeline = ({ active }: { active: boolean }) => (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontFamily: 'monospace', fontSize: 8, color: 'rgba(255,26,26,0.5)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>{t.agentPipeline}</span>
                <span style={{ fontFamily: 'monospace', fontSize: 9, color: '#39ff80', fontWeight: 700, textShadow: '0 0 8px rgba(57,255,128,0.4)' }}>{ags.filter(a => a.done).length} / 5</span>
            </div>
            {ags.map((a, i) => (
                <div key={i}>
                    {i > 0 && <div className="ag-line" style={{ background: a.done ? 'rgba(57,255,128,0.5)' : 'rgba(255,26,26,0.15)', boxShadow: a.done ? '0 0 4px rgba(57,255,128,0.3)' : 'none' }} />}
                    <div className={`ag-item ${a.done ? 'done' : active && a.status === 'Processing' ? 'running' : ''}`} style={{
                        background: a.done ? 'rgba(57,255,128,0.06)' : active && a.status === 'Processing' ? 'rgba(255,26,26,0.08)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${a.done ? 'rgba(57,255,128,0.25)' : active && a.status === 'Processing' ? 'rgba(255,26,26,0.4)' : 'rgba(255,26,26,0.12)'}`,
                        backdropFilter: 'blur(8px)',
                    }}>
                        <div style={{
                            width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                            background: a.done ? 'radial-gradient(circle, rgba(57,255,128,0.2), rgba(0,255,94,0.05))' : active && a.status === 'Processing' ? 'radial-gradient(circle, rgba(255,26,26,0.2), rgba(255,60,20,0.05))' : 'radial-gradient(circle, rgba(255,26,26,0.08), rgba(255,26,26,0.02))',
                            border: `1px solid ${a.done ? 'rgba(57,255,128,0.45)' : active && a.status === 'Processing' ? 'rgba(255,26,26,0.6)' : 'rgba(255,26,26,0.2)'}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: a.done ? '0 0 10px rgba(57,255,128,0.2)' : active && a.status === 'Processing' ? '0 0 12px rgba(255,26,26,0.3)' : '0 0 6px rgba(255,26,26,0.08)',
                        }}>
                            <span style={{ fontFamily: 'monospace', fontSize: 9, fontWeight: 700, color: a.done ? '#39ff80' : active && a.status === 'Processing' ? '#ff1a1a' : 'rgba(255,26,26,0.4)' }}>
                                {a.done ? '✓' : String(a.num).padStart(2, '0')}
                            </span>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 2, color: a.done ? '#e2e8f0' : active && a.status === 'Processing' ? '#e2e8f0' : 'rgba(255,255,255,0.55)', fontFamily: isUr ? 'serif' : 'Inter, sans-serif' }}>
                                {isUr ? a.nameUr : a.name}
                            </div>
                            <div style={{ fontFamily: 'monospace', fontSize: 8, color: a.done ? '#39ff80' : active && a.status === 'Processing' ? 'rgba(255,100,60,0.9)' : 'rgba(255,26,26,0.35)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textShadow: a.done ? '0 0 6px rgba(57,255,128,0.3)' : 'none' }}>
                                {a.done ? '● Complete' : a.status === 'Processing' ? '● Processing...' : (isUr ? a.descUr : a.desc)}
                            </div>
                        </div>
                        {a.done && <span style={{ color: '#39ff80', fontSize: 10, fontWeight: 700, flexShrink: 0, textShadow: '0 0 8px rgba(57,255,128,0.5)' }}>Done</span>}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div style={{ background: '#080808', minHeight: '100vh', color: '#e2e8f0', fontFamily: isUr ? 'serif' : 'Inter, sans-serif', direction: isUr ? 'rtl' : 'ltr' }}>
            <style>{css}</style>

            {/* NAV */}
            <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', height: 52, background: '#080808', borderBottom: '1px solid rgba(255,26,26,0.08)', position: 'sticky', top: 0, zIndex: 200, backdropFilter: 'blur(20px)', direction: 'ltr' }}>
                <div onClick={onBack} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <img src="/logo.svg" alt="logo" style={{ width: 28, height: 28 }} />
                    <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>
                        <span style={{ color: '#ff1a1a' }}>DisasterCIRO</span>
                        <span style={{ color: '#fff' }}> Dashboard</span>
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {data && <span className="tag" style={{ background: 'rgba(57,255,128,0.08)', border: '1px solid rgba(57,255,128,0.2)', color: '#39ff80' }}>{det.location?.city || 'Pakistan'}</span>}
                    <button className="lang-btn" onClick={() => setLang(l => l === 'en' ? 'ur' : 'en')}>
                        {lang === 'en' ? 'اردو' : 'English'}
                    </button>
                    {screen !== 'home' && <button onClick={reset} className="btn-o" style={{ width: 'auto', padding: '5px 12px', fontSize: 11 }}>{t.newReport}</button>}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'monospace', fontSize: 10, color: '#39ff80' }}>
                        <span style={{ width: 5, height: 5, background: '#39ff80', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 6px #39ff80' }} />
                        {t.online}
                    </div>
                </div>
            </nav>

            {/* HOME */}
            {screen === 'home' && (
                <div className="db">
                    <div className="sb">
                        <div className="lbl">{t.crisisReport}</div>
                        <textarea className="ai-input" value={input} onChange={e => setInput(e.target.value)} placeholder={t.placeholder} style={{ direction: 'ltr' }} />
                        <button className="btn-r" onClick={submit}>{t.analyzeBtn}</button>
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 12 }}>
                            <AgentPipeline active={false} />
                        </div>
                        <div className="gc" style={{ marginTop: 4 }}>
                            <div className="lbl">{t.supportedInput}</div>
                            {[
                                ['English', 'Flash flood in Defence Karachi'],
                                ['Urdu', 'کراچی میں سیلاب آ گیا'],
                                ['Roman Urdu', 'G-10 mein pani bhar gaya']
                            ].map(([lang2, ex], i) => (
                                <div key={i} style={{ marginBottom: 8 }}>
                                    <div style={{ fontFamily: 'monospace', fontSize: 8, color: 'rgba(255,26,26,0.5)', marginBottom: 3 }}>{lang2}</div>
                                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontStyle: 'italic', direction: 'ltr' }}>{ex}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mn">
                        <div className="gc">
                            <div className="lbl">{t.crisisMap}</div>
                            <PakistanMap />
                        </div>
                        <div className="g3">
                            {[
                                { label: isUr ? 'AI ایجنٹس' : 'AI Agents', val: '5', sub: 'Google Antigravity ADK', color: '#ff6644' },
                                { label: isUr ? 'ردعمل وقت' : 'Response Time', val: '<30s', sub: isUr ? 'مکمل پائپ لائن' : 'End-to-end pipeline', color: '#ff6644' },
                                { label: isUr ? 'بحران کی اقسام' : 'Crisis Types', val: '6+', sub: isUr ? 'سیلاب، آگ، حادثہ...' : 'Flood, Fire, Accident...', color: '#ff6644' },
                            ].map((c, i) => (
                                <div key={i} className="sc">
                                    <div style={{ fontFamily: 'monospace', fontSize: 8, color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', marginBottom: 6 }}>{c.label}</div>
                                    <div style={{ fontSize: 20, fontWeight: 800, color: c.color, marginBottom: 4, letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>{c.val}</div>
                                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>{c.sub}</div>
                                </div>
                            ))}
                        </div>
                        <div className="gc">
                            <div className="lbl">{t.multiSource}</div>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                {[
                                    { en: 'Text Input', ur: 'متنی ان پٹ' },
                                    { en: 'OpenWeatherMap', ur: 'موسمی ڈیٹا' },
                                    { en: 'Traffic Simulation', ur: 'ٹریفک سمیولیشن' },
                                    { en: 'Location Geocoding', ur: 'مقام کوڈنگ' },
                                ].map((s, i) => (
                                    <span key={i} className="tag" style={{ background: 'rgba(255,26,26,0.08)', border: '1px solid rgba(255,26,26,0.2)', color: '#ff6644' }}>
                                        {isUr ? s.ur : s.en}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* PROCESSING */}
            {screen === 'processing' && (
                <div className="db">
                    <div className="sb">
                        <AgentPipeline active={true} />
                        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 100, height: 3, overflow: 'hidden' }}>
                            <div style={{ background: 'linear-gradient(90deg,#ff1a1a,#ff6600)', height: '100%', width: `${prog}%`, transition: 'width 0.6s', borderRadius: 100 }} />
                        </div>
                        <div style={{ fontFamily: 'monospace', fontSize: 9, color: '#39ff80', textAlign: 'center', direction: 'ltr' }}>{prog}% complete</div>
                        <div className="gc">
                            <div className="lbl">{t.pipelineLog}</div>
                            <div style={{ fontFamily: 'monospace', fontSize: 10, lineHeight: 2, maxHeight: 200, overflowY: 'auto', direction: 'ltr' }}>
                                {logs.map((l, i) => (
                                    <div key={i} style={{ display: 'flex', gap: 6, color: l.includes('complete') ? '#39ff80' : l.includes('Crisis') ? 'rgba(255,100,60,0.8)' : 'rgba(255,255,255,0.25)' }}>
                                        <span style={{ color: '#39ff80', flexShrink: 0 }}>›</span>{l}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mn">
                        <div className="gc">
                            <div className="lbl">{t.liveResults}</div>
                            <div className="g2">
                                {[
                                    { label: isUr ? 'بحران کی قسم' : 'Crisis Type', val: det.crisis_type?.toUpperCase() || '—', color: '#ff1a1a', sub: det.location?.city || 'Analyzing...' },
                                    { label: t.confidence, val: det.confidence ? `${det.confidence}%` : '—', color: '#39ff80', sub: isUr ? 'اعتماد کی سطح' : 'Detection certainty' },
                                    { label: t.severity, val: (isUr ? ur.severity_ur : ana.severity_label) || det.severity || '—', color: '#fbbf24', sub: `${(ana.affected_people || 0).toLocaleString()} ${isUr ? 'متاثر' : 'affected'}` },
                                    { label: t.weather, val: wthr.temperature ? `${wthr.temperature}°C` : '—', color: '#60a5fa', sub: wthr.condition || 'Live data' },
                                ].map((c, i) => (
                                    <div key={i} className="sc">
                                        <div style={{ fontFamily: 'monospace', fontSize: 8, color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', marginBottom: 6 }}>{c.label}</div>
                                        <div style={{ fontSize: 18, fontWeight: 800, color: c.color, marginBottom: 3, fontFamily: 'Inter, sans-serif' }}>{c.val}</div>
                                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>{c.sub}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* RESULT */}
            {screen === 'result' && data && (
                <div className="db">
                    <div className="sb">
                        <AgentPipeline active={false} />
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <button className="btn-r" onClick={() => setScreen('actions')}>{t.seeResponsePlan}</button>
                            <button className="btn-o" onClick={() => setScreen('logs')}>{t.viewAgentLogs}</button>
                            <button className="btn-o" onClick={reset}>{t.newCrisis}</button>
                        </div>
                    </div>
                    <div className="mn">
                        <div className="gc-r">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                                <div>
                                    <div style={{ fontFamily: 'monospace', fontSize: 8, color: 'rgba(255,26,26,0.4)', textTransform: 'uppercase', marginBottom: 5 }}>{t.crisisDetected}</div>
                                    <div style={{ fontSize: 'clamp(20px,4vw,30px)', fontWeight: 900, color: '#ff1a1a', letterSpacing: '-0.03em', textShadow: '0 0 24px rgba(255,26,26,0.3)', fontFamily: 'Inter, sans-serif' }}>
                                        {isUr ? (ur.crisis_type_ur || det.crisis_type?.toUpperCase()) : det.crisis_type?.toUpperCase() || 'CRISIS'}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontFamily: 'monospace', fontSize: 8, color: 'rgba(255,255,255,0.2)', marginBottom: 3 }}>{t.confidence}</div>
                                    <div style={{ fontSize: 26, fontWeight: 900, color: '#39ff80', textShadow: '0 0 16px rgba(57,255,128,0.3)', fontFamily: 'Inter, sans-serif' }}>{det.confidence || 0}%</div>
                                </div>
                            </div>
                        </div>

                        <div className="gc">
                            <div className="lbl">{t.crisisLocationMap}</div>
                            <CrisisMap
                                lat={data?.coordinates?.lat ?? 30.3753}
                                lng={data?.coordinates?.lng ?? 69.3451}
                                label={`${det.location?.area || ''}, ${det.location?.city || ''}`}
                            />
                            <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', direction: 'ltr' }}>
                                <span style={{ fontFamily: 'monospace', fontSize: 9, color: '#ff1a1a' }}>● {t.crisisZone}</span>
                                <span style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>{det.location?.area || '—'}, {det.location?.city || '—'}</span>
                                <span style={{ marginLeft: 'auto', fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,255,255,0.18)' }}>{data?.coordinates?.lat?.toFixed(4)}, {data?.coordinates?.lng?.toFixed(4)}</span>
                            </div>
                        </div>

                        <div className="g2">
                            {[
                                { label: t.location, val: `${det.location?.area || '—'}, ${det.location?.city || '—'}`, color: '#e2e8f0' },
                                { label: t.severity, val: (isUr ? ur.severity_ur : ana.severity_label) || det.severity || '—', color: '#ff6644' },
                                { label: t.affected, val: `${(ana.affected_people || 0).toLocaleString()} ${isUr ? 'افراد' : 'people'}`, color: '#fbbf24' },
                                { label: t.weather, val: wthr.real_data ? `${wthr.temperature}°C, ${wthr.condition}` : 'Simulated', color: '#60a5fa' },
                                { label: t.riskWindow, val: ana.time_to_worsen || '—', color: '#f87171' },
                                { label: t.spreading, val: det.spreading_risk ? t.high : t.contained, color: det.spreading_risk ? '#ff1a1a' : '#39ff80' },
                            ].map((c, i) => (
                                <div key={i} className="sc">
                                    <div style={{ fontFamily: 'monospace', fontSize: 8, color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', marginBottom: 5 }}>{c.label}</div>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: c.color }}>{c.val}</div>
                                </div>
                            ))}
                        </div>

                        <div className="gc">
                            <div className="lbl">{t.aiReasoning}</div>
                            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
                                {isUr ? (ur.explanation_ur || det.explanation || ana.reasoning || '—') : (det.explanation || ana.reasoning || '—')}
                            </div>
                        </div>

                        <div className="gc">
                            <div className="lbl">{t.areasAtRisk}</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {(ana.at_risk_areas || []).map((area: string, i: number) => (
                                    <span key={i} className="tag" style={{ background: 'rgba(255,26,26,0.06)', border: '1px solid rgba(255,26,26,0.18)', color: 'rgba(255,120,100,0.8)' }}>{area}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ACTIONS */}
            {screen === 'actions' && data && (
                <div className="db">
                    <div className="sb">
                        <div className="lbl">{t.responseActions}</div>
                        {(pln.actions || []).map((a: any, i: number) => (
                            <div key={i} className="ac">
                                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,26,26,0.1)', border: '1px solid rgba(255,26,26,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 10, flexShrink: 0, color: 'rgba(255,100,60,0.8)', fontFamily: 'monospace' }}>{a.priority}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 3, color: '#e2e8f0' }}>{a.action}</div>
                                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace' }}>{a.responsible} · {a.time_estimate}</div>
                                </div>
                            </div>
                        ))}
                        <button className="btn-r" onClick={() => setScreen('simulation')}>{t.simulateResponse}</button>
                    </div>
                    <div className="mn">
                        <div className="lbl">{t.beforeVsAfter}</div>
                        <div className="g2">
                            <div className="gc-r">
                                <div style={{ fontFamily: 'monospace', fontSize: 8, color: 'rgba(255,26,26,0.4)', textTransform: 'uppercase', marginBottom: 10 }}>{t.beforeResponse}</div>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', lineHeight: 2.2 }}>
                                    <div>{t.congestion}: <strong style={{ color: '#e2e8f0' }}>{sim.before?.congestion || '—'}</strong></div>
                                    <div>{t.rescueUnits}: <strong style={{ color: '#e2e8f0' }}>{sim.before?.rescue_units || 0}</strong></div>
                                    <div>{t.alertsSent}: <strong style={{ color: '#e2e8f0' }}>{sim.before?.alerts_sent || 0}</strong></div>
                                    <div>{t.situation}: <strong style={{ color: '#e2e8f0' }}>{isUr ? (ur.situation_ur || sim.before?.situation) : sim.before?.situation || '—'}</strong></div>
                                </div>
                                <span className="tag" style={{ marginTop: 10, background: 'rgba(255,26,26,0.06)', border: '1px solid rgba(255,26,26,0.18)', color: 'rgba(255,100,100,0.7)' }}>{t.uncontrolled}</span>
                            </div>
                            <div className="gc-g">
                                <div style={{ fontFamily: 'monospace', fontSize: 8, color: 'rgba(57,255,128,0.4)', textTransform: 'uppercase', marginBottom: 10 }}>{t.afterResponse}</div>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', lineHeight: 2.2 }}>
                                    <div>{t.congestion}: <strong style={{ color: '#39ff80' }}>{sim.after?.congestion || '—'}</strong></div>
                                    <div>{t.rescueUnits}: <strong style={{ color: '#39ff80' }}>{sim.after?.rescue_units || 0}</strong></div>
                                    <div>{t.alertsSent}: <strong style={{ color: '#39ff80' }}>{(sim.after?.alerts_sent || 0).toLocaleString()}</strong></div>
                                    <div>{t.situation}: <strong style={{ color: '#39ff80' }}>{sim.after?.situation || '—'}</strong></div>
                                </div>
                                <span className="tag" style={{ marginTop: 10, background: 'rgba(57,255,128,0.06)', border: '1px solid rgba(57,255,128,0.18)', color: 'rgba(57,255,128,0.7)' }}>{t.controlled}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* SIMULATION */}
            {screen === 'simulation' && data && (
                <div className="db">
                    <div className="sb">
                        <div className="lbl">{t.executedActions}</div>
                        {(sim.executed_actions || []).map((a: any, i: number) => (
                            <div key={i} className="ac" style={{ borderColor: 'rgba(57,255,128,0.1)' }}>
                                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(57,255,128,0.08)', border: '1px solid rgba(57,255,128,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 10, flexShrink: 0, color: '#39ff80', fontFamily: 'monospace' }}>{a.priority}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 3, color: '#e2e8f0' }}>{a.action}</div>
                                    <div style={{ fontSize: 10, color: 'rgba(57,255,128,0.6)', fontFamily: 'monospace' }}>{a.result}</div>
                                </div>
                            </div>
                        ))}
                        <button className="btn-o" onClick={() => setScreen('logs')}>{t.viewAgentLogs}</button>
                    </div>
                    <div className="mn">
                        <div className="gc-g">
                            <div className="lbl">{t.outcomeSummary}</div>
                            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
                                {isUr ? (ur.outcome_ur || sim.outcome_summary) : sim.outcome_summary || 'Crisis response completed.'}
                            </div>
                        </div>

                        <div className="gc">
                            <div className="lbl">{t.trafficRerouting}</div>
                            <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden' }}>
                                <CrisisMap
                                    lat={data?.coordinates?.lat ?? 30.3753}
                                    lng={data?.coordinates?.lng ?? 69.3451}
                                    label={`${det.location?.area || ''}, ${det.location?.city || ''}`}
                                />
                                {/* Route status bar */}
                                <div style={{ marginTop: 6, padding: '8px 12px', background: 'rgba(5,5,5,0.9)', backdropFilter: 'blur(10px)', borderRadius: 8, display: 'flex', gap: 12, alignItems: 'center', direction: 'ltr' }}>
                                    <span style={{ fontFamily: 'monospace', fontSize: 9, color: '#ff1a1a' }}>● BLOCKED</span>
                                    <span style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,255,255,0.2)' }}>Main route congested</span>
                                    <span style={{ marginLeft: 'auto', fontFamily: 'monospace', fontSize: 9, color: '#39ff80' }}>● ACTIVE REROUTE</span>
                                    <span style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,255,255,0.2)' }}>Alternate via Ring Road</span>
                                </div>
                            </div>

                            {/* Alert ticker — same as before */}
                            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                                {[
                                    { icon: '🚨', msg: `${isUr ? 'ایمرجنسی الرٹ بھیجا گیا' : 'Emergency alert sent to'} ${(ana.affected_people || 45000).toLocaleString()} ${isUr ? 'صارفین کو' : `users in ${det.location?.city || 'affected zone'}`}`, color: '#ff6644', time: '00:32' },
                                    { icon: '🚑', msg: `Rescue 1122 ${isUr ? 'روانہ' : 'dispatched to'} ${det.location?.area || 'crisis zone'} — ETA 8 ${isUr ? 'منٹ' : 'minutes'}`, color: '#fbbf24', time: '01:15' },
                                    { icon: '🗺️', msg: `${isUr ? 'ٹریفک متبادل راستے پر موڑی گئی' : `Traffic rerouted via alternate routes in ${det.location?.city || 'city'}`}`, color: '#39ff80', time: '02:00' },
                                    { icon: '✅', msg: `${sim.after?.congestion || (isUr ? 'ٹریفک بہتر' : 'Congestion improved')} — ${isUr ? 'صورتحال قابو میں' : 'situation controlled'}`, color: '#39ff80', time: '04:30' },
                                ].map((tick, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 10px', background: 'rgba(255,255,255,0.02)', borderRadius: 7, border: '1px solid rgba(255,255,255,0.04)', animation: `ticker 0.3s ease both`, animationDelay: `${i * 0.1}s` }}>
                                        <span style={{ fontSize: 13 }}>{tick.icon}</span>
                                        <span style={{ flex: 1, fontSize: 11, color: tick.color, fontFamily: 'monospace' }}>{tick.msg}</span>
                                        <span style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,255,255,0.15)' }}>{tick.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="g2">
                            <div className="gc-r">
                                <div className="lbl">{t.before}</div>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', lineHeight: 2.2 }}>
                                    <div>{t.congestion}: {sim.before?.congestion || '—'}</div>
                                    <div>{t.units}: {sim.before?.rescue_units || 0}</div>
                                    <div>{t.alerts}: {sim.before?.alerts_sent || 0}</div>
                                </div>
                            </div>
                            <div className="gc-g">
                                <div className="lbl">{t.after}</div>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', lineHeight: 2.2 }}>
                                    <div style={{ color: '#39ff80' }}>{t.congestion}: {sim.after?.congestion || '—'}</div>
                                    <div style={{ color: '#39ff80' }}>{t.units}: {sim.after?.rescue_units || 0}</div>
                                    <div style={{ color: '#39ff80' }}>{t.alerts}: {(sim.after?.alerts_sent || 0).toLocaleString()}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* LOGS */}
            {screen === 'logs' && data && (
                <div style={{ padding: 16, maxWidth: 860, margin: '0 auto' }}>
                    <div className="lbl" style={{ marginBottom: 14 }}>{t.agentTraceLogs}</div>
                    {[
                        { key: 'signal', name: 'Signal Collector' },
                        { key: 'detection', name: 'Crisis Detector' },
                        { key: 'analysis', name: 'Situation Analyst' },
                        { key: 'plan', name: 'Action Planner' },
                        { key: 'simulation', name: 'Exec Simulator' },
                    ].map((a, i) => (
                        <div key={i} style={{ background: 'rgba(8,8,8,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,26,26,0.1)', borderRadius: 10, overflow: 'hidden', marginBottom: 8 }}>
                            <div className="log-hdr" onClick={() => setOpenLog(openLog === i ? null : i)}>
                                <span style={{ fontFamily: 'monospace', fontSize: 10 }}>Agent {i + 1} — {a.name}</span>
                                <span style={{ color: 'rgba(255,255,255,0.2)' }}>{openLog === i ? '▲' : '▼'}</span>
                            </div>
                            {openLog === i && (
                                <pre style={{ padding: 14, fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,200,200,0.25)', whiteSpace: 'pre-wrap', wordBreak: 'break-all', maxHeight: 220, overflowY: 'auto', lineHeight: 1.7, direction: 'ltr' }}>
                                    {JSON.stringify(data[a.key] || {}, null, 2)}
                                </pre>
                            )}
                        </div>
                    ))}
                    <button className="btn-r" onClick={reset} style={{ marginTop: 8 }}>{t.newCrisisReport}</button>
                </div>
            )}
        </div>
    );
}