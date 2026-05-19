'use client';
import { useEffect, useRef, useState } from 'react';

interface Props { onLaunch: () => void; }
type Lang = 'en' | 'ur';

function StatCard({ end, suffix, label, src }: { end: number, suffix: string, label: string, src: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const started = useRef(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started.current) {
                started.current = true;
                if (end === 0) { setCount(0); return; }
                let cur = 0;
                const steps = 40;
                const inc = Math.ceil(end / steps);
                const timer = setInterval(() => {
                    cur += inc;
                    if (cur >= end) { setCount(end); clearInterval(timer); }
                    else setCount(cur);
                }, 35);
            }
        }, { threshold: 0.4 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [end]);
    return (
        <div ref={ref} className="reveal chov" style={{ background: '#0e0e0e', border: '1px solid #1e1e1e', borderRadius: 14, padding: '18px 16px' }}>
            <div style={{ fontSize: 'clamp(24px,5vw,36px)', fontWeight: 900, color: '#ff1a1a', marginBottom: 6, lineHeight: 1, fontVariantNumeric: 'tabular-nums', fontFamily: 'Inter, sans-serif' }}>
                {count}{suffix}
            </div>
            <div style={{ fontSize: 12, color: '#aaa', lineHeight: 1.55, marginBottom: 6 }}>{label}</div>
            <div style={{ fontSize: 10, color: '#555' }}>{src}</div>
        </div>
    );
}

const T = {
    en: {
        problem: 'The Problem',
        whyCIRO: 'Why DisasterCIRO?',
        whySub: 'Pakistan faces devastating crises every year. Critical signals exist — but are never converted into real-time coordinated action.',
        howWorks: 'How It Works',
        howSub: 'From crisis report to coordinated response in under 30 seconds.',
        liveDemo: 'Live Dashboard',
        seeAction: 'See It In Action',
        seeSub: 'Watch 5 AI agents detect and respond to a crisis in real-time',
        agents: 'Multi-Agent Architecture',
        agentTitle: '5 AI Agents Working Together',
        agentSub: 'Google Antigravity ADK orchestrated pipeline for coordinated disaster response.',
        tech: 'Technology',
        techTitle: 'Built With Best-in-Class',
        techSub: 'Google AI, real geospatial data, and modern infrastructure.',
        ctaTag: 'Crisis Intelligence Ready',
        ctaTitle: 'Ready to See It',
        ctaRed: 'In Action?',
        ctaSub: 'Experience real-time crisis detection powered by 5 AI agents — from signal to coordinated response in under 30 seconds.',
        launch: 'Launch DisasterCIRO →',
        viewArch: 'View Architecture',
        getAdvisory: 'Get Crisis Advisory →',
        howItWorks: 'How It Works',
        launchApp: 'Launch App',
        footerBuilt: 'Built with Google Antigravity · Gemini 2.0 Flash · Google Maps · OpenWeatherMap',
        footerHack: 'Google AI Seekho Hackathon 2026',
        badge: 'Powered by Google Antigravity ADK',
        subtitle: 'AI-powered multi-agent system that detects urban crises in real-time, coordinates emergency response, and saves lives across Pakistan.',
        steps: [
            { h: 'Report a Crisis', p: 'Type in English, Urdu, or Roman Urdu. Our AI understands all Pakistani language variants.', items: ['✓ "G-10 mein pani bhar gaya" — flooding detected', '✓ "Flash flood in Defence Karachi" — geocoded', '✓ "Lahore mein aag lag gayi" — fire identified'] },
            { h: '5 AI Agents Analyze', p: 'Google Antigravity ADK orchestrated pipeline processes real weather, location, and signals.', items: ['✓ Real weather from OpenWeatherMap', '✓ Location geocoded via Google Maps', '✓ Severity and confidence scored'] },
            { h: 'Coordinated Response', p: 'Actionable response plan with simulation, before/after analysis, and full agent trace.', items: ['✓ Rescue 1122, Edhi, NDMA dispatched', '✓ Traffic rerouted on map', '✓ Citizens alerted — bilingual EN/Urdu'] },
        ],
        navLinks: ['Problem', 'How It Works', 'Agents', 'Tech'],
    },
    ur: {
        problem: 'مسئلہ',
        whyCIRO: 'ڈیزاسٹر سیرو کیوں؟',
        whySub: 'پاکستان ہر سال تباہ کن بحرانوں کا سامنا کرتا ہے۔ اشارے موجود ہیں — لیکن کبھی حقیقی وقت میں مربوط عمل میں تبدیل نہیں ہوتے۔',
        howWorks: 'یہ کیسے کام کرتا ہے',
        howSub: 'بحران رپورٹ سے مربوط ردعمل تک 30 سیکنڈ سے کم میں۔',
        liveDemo: 'براہ راست ڈیش بورڈ',
        seeAction: 'اسے عمل میں دیکھیں',
        seeSub: '5 AI ایجنٹس کو بحران کا پتہ لگاتے اور جواب دیتے دیکھیں',
        agents: 'ملٹی ایجنٹ فن تعمیر',
        agentTitle: '5 AI ایجنٹس مل کر کام کرتے ہیں',
        agentSub: 'مربوط آفات کے ردعمل کے لیے گوگل اینٹی گریویٹی ADK پائپ لائن۔',
        tech: 'ٹیکنالوجی',
        techTitle: 'بہترین ٹیکنالوجی سے بنایا گیا',
        techSub: 'گوگل AI، حقیقی جغرافیائی ڈیٹا، اور جدید انفراسٹرکچر۔',
        ctaTag: 'بحران انٹیلیجنس تیار',
        ctaTitle: 'دیکھنے کے لیے تیار ہیں',
        ctaRed: 'عمل میں؟',
        ctaSub: '5 AI ایجنٹس سے چلنے والا حقیقی وقت بحران کا پتہ لگانے کا تجربہ کریں۔',
        launch: 'ڈیزاسٹر سیرو لانچ کریں ←',
        viewArch: 'فن تعمیر دیکھیں',
        getAdvisory: 'بحران مشاورت حاصل کریں ←',
        howItWorks: 'یہ کیسے کام کرتا ہے',
        launchApp: 'ایپ لانچ کریں',
        footerBuilt: 'گوگل اینٹی گریویٹی · جیمنی 2.0 فلیش · گوگل میپس · اوپن ویدر میپ کے ساتھ بنایا گیا',
        footerHack: 'گوگل AI سیکھو ہیکاتھون 2026',
        badge: 'گوگل اینٹی گریویٹی ADK سے چلتا ہے',
        subtitle: 'AI سے چلنے والا ملٹی ایجنٹ سسٹم جو حقیقی وقت میں شہری بحرانوں کا پتہ لگاتا ہے، ہنگامی ردعمل کو مربوط کرتا ہے، اور پاکستان بھر میں زندگیاں بچاتا ہے۔',
        steps: [
            { h: 'بحران کی اطلاع دیں', p: 'انگریزی، اردو، یا رومن اردو میں ٹائپ کریں۔ ہمارا AI تمام پاکستانی زبان کی اقسام کو سمجھتا ہے۔', items: ['✓ "G-10 mein pani bhar gaya" — سیلاب کا پتہ چلا', '✓ "Flash flood in Defence Karachi" — جیو کوڈڈ', '✓ "Lahore mein aag lag gayi" — آگ کی شناخت'] },
            { h: '5 AI ایجنٹس تجزیہ کرتے ہیں', p: 'گوگل اینٹی گریویٹی ADK مربوط پائپ لائن حقیقی موسم، مقام اور سگنلز پر کارروائی کرتی ہے۔', items: ['✓ اوپن ویدر میپ سے حقیقی موسم', '✓ گوگل میپس کے ذریعے مقام جیو کوڈڈ', '✓ شدت اور اعتماد اسکور کیا گیا'] },
            { h: 'مربوط ردعمل', p: 'سمیولیشن، پہلے/بعد تجزیہ، اور مکمل ایجنٹ ٹریس کے ساتھ قابل عمل ردعمل کا منصوبہ۔', items: ['✓ ریسکیو 1122، ایدھی، این ڈی ایم اے روانہ', '✓ نقشے پر ٹریفک کا رخ موڑا', '✓ شہریوں کو الرٹ — دو لسانی EN/Urdu'] },
        ],
        navLinks: ['مسئلہ', 'کیسے کام کرتا ہے', 'ایجنٹس', 'ٹیک'],
    }
};

export default function Landing({ onLaunch }: Props) {
    const [lang, setLang] = useState<Lang>('en');
    const t = T[lang];
    const isUr = lang === 'ur';

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
            { threshold: 0.1 }
        );
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div style={{ background: '#080808', color: '#fff', fontFamily: isUr ? 'serif' : 'Inter, sans-serif', overflowX: 'hidden', direction: isUr ? 'rtl' : 'ltr' }}>

            {/* NAVBAR */}
            <nav style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 16px', position: 'sticky', top: 0, zIndex: 200,
                background: 'rgba(8,8,8,0.95)', backdropFilter: 'blur(16px)',
                borderBottom: '1px solid #1e1e1e', gap: 12, direction: 'ltr',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <img src="/logo.svg" alt="logo" style={{ width: 28, height: 28 }} />
                    <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.02em', whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif' }}>
                        <span style={{ color: '#fff' }}>Disaster</span><span style={{ color: '#ff1a1a' }}>CIRO</span>
                    </span>
                </div>
                <div style={{ display: 'flex', gap: 16, flexShrink: 1, overflow: 'hidden' }} className="hm">
                    {['Problem', 'How It Works', 'Agents', 'Tech'].map((l, i) => (
                        <a key={l} href={`#${l.toLowerCase().replace(/ /g, '-')}`}
                            style={{ color: '#555', textDecoration: 'none', fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap' }}>
                            {isUr ? t.navLinks[i] : l}
                        </a>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                    <button onClick={() => setLang(l => l === 'en' ? 'ur' : 'en')} style={{
                        background: 'rgba(255,26,26,0.08)', border: '1px solid rgba(255,26,26,0.25)',
                        borderRadius: 8, color: '#ff6644', fontSize: 12, fontWeight: 700,
                        padding: '7px 12px', cursor: 'pointer', fontFamily: 'monospace',
                        whiteSpace: 'nowrap', transition: 'all 0.2s',
                    }}>
                        {lang === 'en' ? 'اردو' : 'English'}
                    </button>
                    <button onClick={onLaunch} style={{
                        background: '#ff1a1a', border: 'none', borderRadius: 8, color: '#fff',
                        padding: '8px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                        boxShadow: '0 0 20px rgba(255,26,26,0.3)', letterSpacing: '0.04em',
                        transition: 'all 0.2s', whiteSpace: 'nowrap',
                    }}>
                        {t.launchApp}
                    </button>
                </div>
            </nav>
            {/* HERO */}
            <section style={{
                minHeight: '100dvh', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', textAlign: 'center',
                padding: '60px 16px 40px', position: 'relative', overflow: 'hidden',
            }}>
                {/* Grid background */}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,26,26,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,26,26,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px', zIndex: 0 }} />

                {/* Center radial glow */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 'min(700px,100vw)', height: 'min(700px,80vh)', borderRadius: '50%', background: 'radial-gradient(ellipse at center, rgba(255,26,26,0.14) 0%, rgba(255,26,26,0.05) 40%, transparent 70%)', pointerEvents: 'none', zIndex: 0, animation: 'heroGlow 4s ease-in-out infinite' }} />

                {/* Floating orbs */}
                <div style={{ position: 'absolute', top: '15%', left: '8%', width: 'min(280px,35vw)', height: 'min(280px,35vw)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,26,26,0.07) 0%, transparent 70%)', animation: 'floatOrb 7s ease-in-out infinite', pointerEvents: 'none', zIndex: 0 }} />
                <div style={{ position: 'absolute', bottom: '15%', right: '8%', width: 'min(200px,25vw)', height: 'min(200px,25vw)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,26,26,0.05) 0%, transparent 70%)', animation: 'floatOrb 9s ease-in-out infinite reverse', pointerEvents: 'none', zIndex: 0 }} />

                {/* Scanning line effect */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,26,26,0.4), transparent)', animation: 'scanLine 6s linear infinite', pointerEvents: 'none', zIndex: 1 }} />

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 680 }}>

                    {/* Badge */}
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        background: 'rgba(255,26,26,0.06)', border: '1px solid rgba(255,26,26,0.2)',
                        borderRadius: 100, padding: '6px 16px', fontSize: 10, fontWeight: 600,
                        color: 'rgba(255,136,80,0.9)', marginBottom: 28, backdropFilter: 'blur(8px)',
                        letterSpacing: '0.06em', maxWidth: '90vw', direction: 'ltr',
                        boxShadow: '0 0 20px rgba(255,26,26,0.08)',
                    }}>
                        <span style={{ width: 5, height: 5, background: '#ff6644', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px #ff6644', animation: 'blink 1.4s ease-in-out infinite', flexShrink: 0 }} />
                        {t.badge}
                    </div>

                    {/* Title */}
                    <h1 style={{
                        fontSize: 'clamp(32px,8vw,110px)', fontWeight: 900,
                        letterSpacing: '-0.03em', lineHeight: 0.88, marginBottom: 24,
                        width: '100%', whiteSpace: 'nowrap',
                        fontFamily: 'Inter, sans-serif', direction: 'ltr',
                    }}>
                        <span style={{ color: '#fff', textShadow: '0 0 40px rgba(255,255,255,0.08)' }}>Disaster</span>
                        <span style={{
                            color: '#ff1a1a',
                            textShadow: '0 0 60px rgba(255,26,26,0.5), 0 0 120px rgba(255,26,26,0.2)',
                            animation: 'titlePulse 3s ease-in-out infinite',
                        }}>CIRO</span>
                        <span style={{ display: 'block', fontSize: 'clamp(10px,2vw,16px)', fontWeight: 500, color: 'rgba(255,255,255,0.15)', letterSpacing: '0.5em', marginTop: 12, whiteSpace: 'normal', fontFamily: 'monospace' }}>— PAKISTAN —</span>
                    </h1>

                    {/* Subtitle */}
                    <p style={{
                        fontSize: 'clamp(13px,3vw,17px)', color: 'rgba(255,255,255,0.35)',
                        maxWidth: 460, lineHeight: 1.8, marginBottom: 36, padding: '0 4px',
                    }}>
                        {t.subtitle}
                    </p>

                    {/* Buttons */}
                    <div style={{ display: 'flex', gap: 10, marginBottom: 52, flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 300 }}>
                        {/* Primary button with animated border */}
                        <div style={{ position: 'relative', width: '100%', borderRadius: 10 }}>
                            <div style={{
                                position: 'absolute', inset: -1, borderRadius: 11,
                                backgroundImage: 'linear-gradient(90deg, rgba(255,26,26,0.9), rgba(255,100,20,0.6), rgba(255,26,26,0.9))',
                                backgroundSize: '200% 100%',
                                animation: 'beamMove 2s linear infinite',
                                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                WebkitMaskComposite: 'xor',
                                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                maskComposite: 'exclude',
                                padding: 1, pointerEvents: 'none',
                            }} />
                            <button onClick={onLaunch} style={{
                                background: '#ff1a1a', border: 'none', borderRadius: 10, color: '#fff',
                                padding: '14px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                                boxShadow: '0 0 30px rgba(255,26,26,0.35), inset 0 1px 0 rgba(255,255,255,0.1)',
                                letterSpacing: '0.04em', transition: 'all 0.25s', width: '100%',
                                fontFamily: 'Inter, sans-serif', position: 'relative',
                            }}>
                                {t.getAdvisory}
                            </button>
                        </div>

                        <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} style={{
                            background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10,
                            color: 'rgba(255,255,255,0.4)', padding: '13px 28px', fontSize: 14,
                            fontWeight: 600, cursor: 'pointer', transition: 'all 0.25s', width: '100%',
                        }}>
                            {t.howItWorks}
                        </button>
                    </div>

                    {/* Stats row */}
                    <div style={{
                        display: 'flex', alignItems: 'center',
                        borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 28,
                        flexWrap: 'wrap', justifyContent: 'center', gap: 0, width: '100%',
                    }}>
                        {[
                            { num: '5', sup: '', label: 'AI AGENTS', ur: 'AI ایجنٹس' },
                            { num: '<30', sup: 's', label: 'RESPONSE TIME', ur: 'ردعمل وقت' },
                            { num: '6', sup: '+', label: 'CRISIS TYPES', ur: 'بحران کی اقسام' },
                        ].map((s, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                                {i > 0 && <div style={{ width: 1, height: 32, background: 'rgba(255,26,26,0.15)', margin: '0 4px' }} />}
                                <div style={{ textAlign: 'center', padding: '0 clamp(14px,4vw,28px)' }}>
                                    <div style={{ fontSize: 'clamp(22px,5vw,32px)', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 5, fontFamily: 'Inter, sans-serif' }}>
                                        {s.num}<span style={{ fontSize: '50%', color: '#ff1a1a', verticalAlign: 'super', textShadow: '0 0 8px rgba(255,26,26,0.5)' }}>{s.sup}</span>
                                    </div>
                                    <div style={{ fontSize: 9, color: '#444', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 3, fontFamily: 'monospace' }}>{s.label}</div>
                                    <div style={{ fontSize: 9, color: 'rgba(255,136,68,0.3)', fontFamily: 'serif' }}>{s.ur}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROBLEM */}
            <section style={{ padding: '60px 16px', maxWidth: 1200, margin: '0 auto' }} id="problem">
                <div className="reveal" style={{ display: 'inline-flex', background: '#ff1a1a22', border: '1px solid #ff1a1a44', borderRadius: 100, padding: '5px 14px', fontSize: 10, fontWeight: 600, color: '#ff8888', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>{t.problem}</div>
                <h2 className="reveal" style={{ fontSize: 'clamp(22px,6vw,42px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 12 }}>{t.whyCIRO}</h2>
                <p className="reveal" style={{ color: '#aaa', fontSize: 14, maxWidth: 520, lineHeight: 1.7, marginBottom: 32 }}>{t.whySub}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 12 }}>
                    {[
                        { end: 33, suffix: 'M+', label: isUr ? '2022 پاکستان سیلاب سے متاثر افراد' : 'People affected by 2022 Pakistan floods', src: 'Source: NDMA 2022' },
                        { end: 52, suffix: '°C', label: isUr ? 'جیکب آباد میں گرمی کی لہر' : 'Peak heatwave in Jacobabad', src: 'Source: PMD Pakistan' },
                        { end: 45, suffix: 'min+', label: isUr ? 'ہنگامی ردعمل میں اوسط تاخیر' : 'Average emergency response delay', src: 'Source: Rescue 1122' },
                        { end: 0, suffix: '%', label: isUr ? 'پاکستان میں AI بحران ہم آہنگی' : 'Real-time AI crisis coordination in Pakistan', src: isUr ? 'ڈیزاسٹر سیرو کا خلا' : 'Gap DisasterCIRO fills' },
                    ].map((c, i) => (
                        <StatCard key={i} end={c.end} suffix={c.suffix} label={c.label} src={c.src} />
                    ))}
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section style={{ padding: '60px 16px', maxWidth: 1200, margin: '0 auto' }} id="how-it-works">
                <div className="reveal" style={{ display: 'inline-flex', background: '#ff1a1a22', border: '1px solid #ff1a1a44', borderRadius: 100, padding: '5px 14px', fontSize: 10, fontWeight: 600, color: '#ff8888', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>{isUr ? 'آسان عمل' : 'Simple Process'}</div>
                <h2 className="reveal" style={{ fontSize: 'clamp(22px,6vw,42px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 12 }}>{t.howWorks}</h2>
                <p className="reveal" style={{ color: '#aaa', fontSize: 14, maxWidth: 520, lineHeight: 1.7, marginBottom: 32 }}>{t.howSub}</p>
                <div style={{ maxWidth: 660, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {t.steps.map((step, i) => (
                        <div key={i}>
                            {i > 0 && (
                                <div style={{ textAlign: 'center', padding: '4px 0', position: 'relative' }}>
                                    <div style={{
                                        display: 'inline-block', width: 1, height: 24,
                                        background: 'linear-gradient(180deg, rgba(255,26,26,0.6), rgba(255,26,26,0.1))',
                                        boxShadow: '0 0 8px rgba(255,26,26,0.4)',
                                    }} />
                                </div>
                            )}
                            <div className="reveal chov" style={{
                                position: 'relative', background: '#0e0e0e',
                                borderRadius: 14, padding: '18px 16px',
                                display: 'flex', gap: 14, alignItems: 'flex-start',
                                isolation: 'isolate',
                            }}>
                                {/* Spinning conic border */}
                                <div style={{
                                    position: 'absolute', inset: -1, borderRadius: 15,
                                    background: `conic-gradient(from ${i * 120}deg, transparent 0deg, rgba(255,26,26,0.9) 60deg, rgba(255,80,20,0.5) 90deg, transparent 150deg, transparent 360deg)`,
                                    animation: `spinBorder ${3 + i * 0.5}s linear infinite`,
                                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                    WebkitMaskComposite: 'xor',
                                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                    maskComposite: 'exclude',
                                    padding: 1,
                                    pointerEvents: 'none', zIndex: 0,
                                }} />

                                {/* Step number glow top-left */}
                                <div style={{
                                    position: 'absolute', top: 0, left: 0,
                                    width: 80, height: 80,
                                    background: 'radial-gradient(circle at 0% 0%, rgba(255,26,26,0.08), transparent 70%)',
                                    borderRadius: 14, pointerEvents: 'none', zIndex: 0,
                                }} />

                                {/* Content */}
                                <div style={{ position: 'relative', zIndex: 1, fontSize: 'clamp(28px,6vw,44px)', fontWeight: 900, color: 'rgba(255,26,26,0.15)', lineHeight: 1, flexShrink: 0, minWidth: 40, fontFamily: 'Inter, sans-serif' }}>0{i + 1}</div>
                                <div style={{ position: 'relative', zIndex: 1, minWidth: 0 }}>
                                    <h3 style={{ fontSize: 'clamp(14px,3.5vw,16px)', fontWeight: 800, marginBottom: 6 }}>{step.h}</h3>
                                    <p style={{ color: '#aaa', fontSize: 12, lineHeight: 1.65, marginBottom: 10 }}>{step.p}</p>
                                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        {step.items.map((it, j) => (
                                            <li key={j} style={{ fontSize: 12, color: '#666', direction: 'ltr', display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <span style={{ color: 'rgba(255,26,26,0.4)', flexShrink: 0 }}>›</span>{it}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {/* SEE IT IN ACTION */}
            <section style={{ padding: '60px 16px', maxWidth: 1200, margin: '0 auto', textAlign: 'center' }} id="live-demo">
                <div className="reveal" style={{ display: 'inline-flex', background: '#ff1a1a22', border: '1px solid #ff1a1a44', borderRadius: 100, padding: '5px 14px', fontSize: 10, fontWeight: 600, color: '#ff8888', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>{t.liveDemo}</div>
                <h2 className="reveal" style={{ fontSize: 'clamp(22px,6vw,42px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 12 }}>{t.seeAction}</h2>
                <p className="reveal" style={{ color: '#aaa', fontSize: 14, maxWidth: 500, margin: '0 auto 32px' }}>{t.seeSub}</p>

                {/* Beam border wrapper */}
                <div className="reveal" style={{ position: 'relative', maxWidth: 900, margin: '0 auto', borderRadius: 14, isolation: 'isolate' }}>

                    {/* Beam border layer */}
                    <div style={{
                        position: 'absolute', inset: 0, borderRadius: 14,
                        backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,26,26,0.95) 25%, rgba(255,80,20,0.6) 50%, rgba(255,26,26,0.95) 75%, transparent 100%)',
                        backgroundSize: '200% 100%',
                        animation: 'beamMove 2.5s linear infinite',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        maskComposite: 'exclude',
                        padding: 1,
                        pointerEvents: 'none', zIndex: 2,
                    }} />

                    {/* Corner glow dots */}
                    <div style={{ position: 'absolute', top: -2, left: -2, width: 5, height: 5, borderRadius: '50%', background: '#ff1a1a', boxShadow: '0 0 10px 3px rgba(255,26,26,0.9)', zIndex: 3 }} />
                    <div style={{ position: 'absolute', top: -2, right: -2, width: 5, height: 5, borderRadius: '50%', background: '#ff1a1a', boxShadow: '0 0 10px 3px rgba(255,26,26,0.9)', zIndex: 3 }} />
                    <div style={{ position: 'absolute', bottom: -2, left: -2, width: 5, height: 5, borderRadius: '50%', background: '#ff6644', boxShadow: '0 0 8px 2px rgba(255,100,20,0.8)', zIndex: 3 }} />
                    <div style={{ position: 'absolute', bottom: -2, right: -2, width: 5, height: 5, borderRadius: '50%', background: '#ff6644', boxShadow: '0 0 8px 2px rgba(255,100,20,0.8)', zIndex: 3 }} />

                    {/* Actual content */}
                    <div style={{ borderRadius: 14, overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.5)', direction: 'ltr', position: 'relative', zIndex: 1 }}>
                        {/* Browser bar */}
                        <div style={{ background: '#0a0a0a', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid #1a1a1a' }}>
                            <div style={{ display: 'flex', gap: 5 }}>
                                {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => <span key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: c, display: 'inline-block', opacity: 0.7 }} />)}
                            </div>
                            <div style={{ fontFamily: 'monospace', fontSize: 9, color: '#333', flex: 1, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>localhost:3000 — DisasterCIRO</div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', background: '#0d0d0d' }}>
                            {/* Left — Pipeline */}
                            <div style={{ padding: 16, borderRight: '1px solid #1a1a1a', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <div style={{ fontFamily: 'monospace', fontSize: 8, color: '#444', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 8, borderBottom: '1px solid #1a1a1a' }}>
                                    <span style={{ width: 6, height: 6, background: '#39ff80', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 6px #39ff80', flexShrink: 0 }} />
                                    Agent Pipeline — Live
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                                    {[
                                        { color: '#a78bfa', text: '[Signal Collector] Location: G-10 — Crisis: Flooding' },
                                        { color: '#60a5fa', text: '[Crisis Detector] Weather: 28°C, Rain: 38mm — Validated' },
                                        { color: '#39ff80', text: '[Situation Analyst] FLOODING — 94% confidence, HIGH' },
                                        { color: '#fbbf24', text: '[Action Planner] 28,000 affected · 3km · 2hrs window' },
                                        { color: '#f97316', text: '[Action Planner] Rescue 1122, NDMA, Traffic Police' },
                                        { color: '#39ff80', text: '[Exec Simulator] Complete — 91% → 28% congestion' },
                                    ].map((line, i) => (
                                        <div key={i} style={{ fontFamily: 'monospace', fontSize: 9, color: line.color, lineHeight: 1.7, wordBreak: 'break-word' }}>{line.text}</div>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 8, borderTop: '1px solid #1a1a1a' }}>
                                    <div style={{ fontFamily: 'monospace', fontSize: 8, color: '#444', whiteSpace: 'nowrap' }}>Progress</div>
                                    <div style={{ flex: 1, background: '#111', borderRadius: 100, height: 3, overflow: 'hidden' }}>
                                        <div style={{ background: 'linear-gradient(90deg,#ff1a1a,#ff6600)', height: '100%', width: '100%', borderRadius: 100 }} />
                                    </div>
                                    <div style={{ fontFamily: 'monospace', fontSize: 8, color: '#39ff80' }}>100%</div>
                                </div>
                            </div>

                            {/* Right — Results */}
                            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                                <div style={{ fontFamily: 'monospace', fontSize: 8, color: '#444', letterSpacing: '0.14em', textTransform: 'uppercase', paddingBottom: 8, borderBottom: '1px solid #1a1a1a' }}>Crisis Analysis Results</div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
                                    {[
                                        { label: 'Crisis Type', val: 'FLOODING', color: '#ff1a1a', sub: 'G-10, Islamabad' },
                                        { label: 'Confidence', val: '94%', color: '#39ff80', sub: 'High certainty' },
                                        { label: 'Severity', val: 'HIGH', color: '#fbbf24', sub: '28,000 affected' },
                                        { label: 'Response', val: 'ACTIVE', color: '#39ff80', sub: '3 units deployed' },
                                    ].map((c, i) => (
                                        <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #1a1a1a', borderRadius: 8, padding: 10 }}>
                                            <div style={{ fontFamily: 'monospace', fontSize: 7, color: '#444', textTransform: 'uppercase', marginBottom: 4 }}>{c.label}</div>
                                            <div style={{ fontSize: 14, fontWeight: 800, color: c.color, marginBottom: 2 }}>{c.val}</div>
                                            <div style={{ fontSize: 9, color: '#444' }}>{c.sub}</div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ background: 'rgba(57,255,128,0.04)', border: '1px solid rgba(57,255,128,0.15)', borderRadius: 8, padding: 12, flex: 1 }}>
                                    <div style={{ fontFamily: 'monospace', fontSize: 8, color: '#39ff80', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>Advisory Ready</div>
                                    <div style={{ fontSize: 11, color: '#555', lineHeight: 1.7 }}>Dispatch Rescue 1122 to G-10. Reroute traffic via Ring Road. Alert 28,000 residents.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* AGENTS */}
            <section style={{ padding: '60px 16px', maxWidth: 1200, margin: '0 auto' }} id="agents">
                <div className="reveal" style={{ display: 'inline-flex', background: '#ff1a1a22', border: '1px solid #ff1a1a44', borderRadius: 100, padding: '5px 14px', fontSize: 10, fontWeight: 600, color: '#ff8888', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>{t.agents}</div>
                <h2 className="reveal" style={{ fontSize: 'clamp(22px,6vw,42px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 12 }}>{t.agentTitle}</h2>
                <p className="reveal" style={{ color: '#aaa', fontSize: 14, maxWidth: 520, lineHeight: 1.7, marginBottom: 32 }}>{t.agentSub}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 10 }}>
                    {[
                        { n: '01', name: 'Signal Collector', nameUr: 'سگنل کلیکٹر', desc: 'Parses EN/Urdu/Roman Urdu — extracts location & crisis type', descUr: 'انگریزی/اردو/رومن اردو پارس — مقام اور بحران کی قسم نکالتا ہے', tag: 'Input Processing', tagUr: 'ان پٹ پروسیسنگ' },
                        { n: '02', name: 'Crisis Detector', nameUr: 'بحران ڈیٹیکٹر', desc: 'Validates with real OpenWeatherMap data — assigns confidence & severity', descUr: 'حقیقی موسمی ڈیٹا سے تصدیق — اعتماد اور شدت', tag: 'Detection', tagUr: 'پتہ لگانا' },
                        { n: '03', name: 'Situation Analyst', nameUr: 'صورتحال تجزیہ کار', desc: 'Estimates affected population, spreading risk & time-to-worsen', descUr: 'متاثرین، پھیلاؤ کا خطرہ اور خرابی کا وقت', tag: 'Analysis', tagUr: 'تجزیہ' },
                        { n: '04', name: 'Action Planner', nameUr: 'ایکشن پلانر', desc: 'Generates coordinated response — Rescue 1122, NDMA, Edhi, Traffic Police', descUr: 'مربوط ردعمل — ریسکیو 1122، این ڈی ایم اے، ایدھی', tag: 'Planning', tagUr: 'منصوبہ بندی' },
                        { n: '05', name: 'Exec Simulator', nameUr: 'ایگزیک سمیولیٹر', desc: 'Simulates full response execution with before/after outcome metrics', descUr: 'پہلے/بعد نتائج کے ساتھ مکمل ردعمل کی سمیولیشن', tag: 'Simulation', tagUr: 'سمیولیشن' },
                    ].map((a, i) => (
                        <div key={i} className="reveal chov" style={{
                            position: 'relative', borderRadius: 14, padding: '18px 14px',
                            background: '#0e0e0e', overflow: 'hidden', isolation: 'isolate',
                        }}>
                            {/* Beam border */}
                            <div style={{
                                position: 'absolute', inset: 0, borderRadius: 14,
                                padding: 1, background: 'transparent',
                                backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,26,26,0.9) 30%, rgba(255,80,20,0.6) 50%, rgba(255,26,26,0.9) 70%, transparent 100%)',
                                backgroundSize: '200% 100%',
                                animation: `beamMove ${2.5 + i * 0.3}s linear infinite`,
                                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                WebkitMaskComposite: 'xor',
                                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                maskComposite: 'exclude',
                                pointerEvents: 'none', zIndex: 0,
                            }} />
                            {/* Corner dots */}
                            <div style={{ position: 'absolute', top: -1, left: -1, width: 4, height: 4, borderRadius: '50%', background: '#ff1a1a', boxShadow: '0 0 8px 2px rgba(255,26,26,0.8)', zIndex: 1 }} />
                            <div style={{ position: 'absolute', top: -1, right: -1, width: 4, height: 4, borderRadius: '50%', background: '#ff1a1a', boxShadow: '0 0 8px 2px rgba(255,26,26,0.8)', zIndex: 1 }} />
                            <div style={{ position: 'absolute', bottom: -1, left: -1, width: 4, height: 4, borderRadius: '50%', background: '#ff6644', boxShadow: '0 0 6px 2px rgba(255,100,20,0.6)', zIndex: 1 }} />
                            <div style={{ position: 'absolute', bottom: -1, right: -1, width: 4, height: 4, borderRadius: '50%', background: '#ff6644', boxShadow: '0 0 6px 2px rgba(255,100,20,0.6)', zIndex: 1 }} />

                            {/* Content */}
                            <div style={{ position: 'relative', zIndex: 2 }}>
                                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,26,26,0.08)', border: '1px solid rgba(255,26,26,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, boxShadow: '0 0 12px rgba(255,26,26,0.1)' }}>
                                    <span style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 900, color: '#ff1a1a' }}>{a.n}</span>
                                </div>
                                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6, color: '#e2e8f0' }}>{isUr ? a.nameUr : a.name}</div>
                                <div style={{ fontSize: 11, color: '#555', lineHeight: 1.6, marginBottom: 10 }}>{isUr ? a.descUr : a.desc}</div>
                                <div style={{ background: '#ff1a1a22', border: '1px solid #ff1a1a44', borderRadius: 100, padding: '3px 9px', fontSize: 9, fontWeight: 700, color: '#ff8888', display: 'inline-block', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{isUr ? a.tagUr : a.tag}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* TECH */}
            <section style={{ padding: '60px 16px', maxWidth: 1200, margin: '0 auto' }} id="tech">
                <div className="reveal" style={{ display: 'inline-flex', background: '#ff1a1a22', border: '1px solid #ff1a1a44', borderRadius: 100, padding: '5px 14px', fontSize: 10, fontWeight: 600, color: '#ff8888', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>{t.tech}</div>
                <h2 className="reveal" style={{ fontSize: 'clamp(22px,6vw,42px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 12 }}>{t.techTitle}</h2>
                <p className="reveal" style={{ color: '#aaa', fontSize: 14, maxWidth: 520, lineHeight: 1.7, marginBottom: 32 }}>{t.techSub}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 10 }}>
                    {[
                        { cat: isUr ? 'AI / آرکیسٹریشن' : 'AI / Orchestration', name: 'Google Antigravity', desc: isUr ? 'گوگل ADK کے ذریعے ملٹی ایجنٹ آرکیسٹریشن' : 'Multi-agent orchestration via Google ADK' },
                        { cat: 'AI / ML', name: 'Gemini 2.0 Flash', desc: isUr ? 'کثیر لسانی سمجھ کے ساتھ تمام 5 ایجنٹس' : 'Powers all 5 agents with multilingual understanding' },
                        { cat: isUr ? 'نقشے' : 'Maps', name: 'Google Maps API', desc: isUr ? 'براہ راست بحران مقام میپنگ' : 'Live crisis location mapping and geocoding' },
                        { cat: isUr ? 'ڈیٹا' : 'Data', name: 'OpenWeatherMap', desc: isUr ? 'بحران تصدیق کے لیے حقیقی وقت موسم' : 'Real-time weather for crisis validation' },
                        { cat: isUr ? 'بیک اینڈ' : 'Backend', name: 'FastAPI + Python', desc: isUr ? 'ہائی پرفارمنس async بیک اینڈ' : 'High-performance async backend' },
                        { cat: isUr ? 'فرنٹ اینڈ' : 'Frontend', name: 'Next.js + React', desc: isUr ? 'موبائل فرسٹ ریسپانسیو ویب ایپ' : 'Mobile-first responsive web app' },
                    ].map((t2, i) => (
                        <div key={i} className="reveal chov agent-card">
                            <div style={{ fontFamily: 'monospace', fontSize: 9, color: '#ff8888', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>{t2.cat}</div>
                            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 5, color: '#e2e8f0' }}>{t2.name}</div>
                            <div style={{ fontSize: 11, color: '#555', lineHeight: 1.5 }}>{t2.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section style={{ textAlign: 'center', padding: '80px 16px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ maxWidth: 600, margin: '0 auto', background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,26,26,0.15)', borderRadius: 18, padding: 'clamp(32px,6vw,52px) clamp(20px,6vw,40px)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,26,26,0.4), transparent)' }} />
                    <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,26,26,0.5)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>{t.ctaTag}</div>
                    <h2 style={{ fontSize: 'clamp(22px,6vw,38px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 14, lineHeight: 1.1 }}>
                        {t.ctaTitle}<br /><span style={{ color: '#ff1a1a' }}>{t.ctaRed}</span>
                    </h2>
                    <p style={{ color: '#555', fontSize: 14, marginBottom: 32, lineHeight: 1.7, maxWidth: 400, margin: '0 auto 32px' }}>{t.ctaSub}</p>
                    <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button onClick={onLaunch} style={{ background: '#ff1a1a', border: 'none', borderRadius: 8, color: '#fff', padding: '13px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 0 24px rgba(255,26,26,0.4)', letterSpacing: '0.02em', transition: 'all 0.2s', fontFamily: 'Inter, sans-serif' }}>
                            {t.launch}
                        </button>
                        <button onClick={() => document.getElementById('agents')?.scrollIntoView({ behavior: 'smooth' })} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#555', padding: '13px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', backdropFilter: 'blur(8px)' }}>
                            {t.viewArch}
                        </button>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer style={{ textAlign: 'center', padding: '32px 16px', borderTop: '1px solid #1e1e1e', color: '#555', fontSize: 12, lineHeight: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 6 }}>
                    <img src="/logo.svg" alt="logo" style={{ width: 22, height: 22 }} />
                    <span style={{ fontSize: 15, fontWeight: 800, color: '#ff1a1a', fontFamily: 'Inter, sans-serif' }}>DisasterCIRO Pakistan</span>
                </div>
                <p>{t.footerBuilt}</p>
                <p>{t.footerHack}</p>
            </footer>
        </div>
    );
}