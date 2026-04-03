import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, MessageCircle, Send, Video, Instagram, Calendar, MapPin, Download, Code, ChevronDown, Menu, X, ArrowUp } from 'lucide-react';
import emailjs from '@emailjs/browser';
import ProdigyLogo from './Prodigy_Logo.jpg';
import SomaiyaLogo from './Somaiya-Logo.jpg';
import ExeterLogo from './Exeter-Logo.png'
import { Award, HandHelping, IdCard } from 'lucide-react';

export default function Portfolio() {
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [formStatus, setFormStatus] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [visibleSections, setVisibleSections] = useState(new Set());
    const [typedText, setTypedText] = useState('');
    const [loaderVisible, setLoaderVisible] = useState(true);

    // ═══ TYPEWRITER ═══
    useEffect(() => {
        const phrases = ['AI/ML & Blockchain Enthusiast', 'Financial Innovator', 'Quantitative Thinker', 'Expert in building solutions'];
        let pi = 0, ci = 0, del = false, timeout;
        function type() {
            const cur = phrases[pi];
            if (!del) {
                setTypedText(cur.substring(0, ci + 1)); ci++;
                if (ci === cur.length) { del = true; timeout = setTimeout(type, 2000); return; }
                timeout = setTimeout(type, 60 + Math.random() * 40);
            } else {
                setTypedText(cur.substring(0, ci - 1)); ci--;
                if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; timeout = setTimeout(type, 500); return; }
                timeout = setTimeout(type, 30);
            }
        }
        const start = setTimeout(type, 2500);
        return () => { clearTimeout(start); clearTimeout(timeout); };
    }, []);

    // ═══ LOADER ═══
    useEffect(() => {
        const t = setTimeout(() => setLoaderVisible(false), 2200);
        return () => clearTimeout(t);
    }, []);

    // ═══ SCROLL ═══
    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 50);
            setShowBackToTop(y > 500);
            const docH = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress(docH > 0 ? (y / docH) * 100 : 0);
            const sections = ['home', 'about', 'education', 'experience', 'skills', 'projects', 'extra', 'languages', 'contact'];
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && y >= el.offsetTop - 200) { setActiveSection(sections[i]); break; }
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // ═══ KONAMI CODE EASTER EGG ═══
    // ═══ KONAMI CODE EASTER EGG — CRICKET FIREWORKS ═══
    // ═══ KONAMI CODE EASTER EGG — CRICKET FIREWORKS ═══
    useEffect(() => {
        // Desktop: ↑↑↓↓←→←→BA
        const code = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
        let pos = 0;
        const handleKey = (e) => {
            if (e.keyCode === code[pos]) {
                pos++;
                if (pos === code.length) { pos = 0; launchCricketFireworks(); }
            } else { pos = 0; }
        };

        // Mobile: 5 taps within 3 seconds
        let taps = [];
        const handleTap = () => {
            const now = Date.now();
            taps.push(now);
            taps = taps.filter(t => now - t < 3000);
            if (taps.length >= 5) { taps = []; launchCricketFireworks(); }
        };

        window.addEventListener('keydown', handleKey);
        window.addEventListener('touchstart', handleTap, { passive: true });
        return () => {
            window.removeEventListener('keydown', handleKey);
            window.removeEventListener('touchstart', handleTap);
        };
    }, []);

    const launchCricketFireworks = () => {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;pointer-events:none;overflow:hidden;';
        document.body.appendChild(overlay);

        // Canvas for fireworks
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.cssText = 'position:absolute;inset:0;';
        overlay.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        // Cricket bat SVG
        const bat = document.createElement('div');
        bat.innerHTML = `<svg width="60" height="130" viewBox="0 0 60 130"><rect x="25" y="0" width="10" height="45" rx="3" fill="#6B4F12"/><rect x="22" y="40" width="16" height="12" rx="3" fill="#8B6914"/><path d="M12 52 Q10 55 10 62 L10 118 Q10 126 18 128 L42 128 Q50 126 50 118 L50 62 Q50 55 48 52 Z" fill="#C4941A" stroke="#8B6914" stroke-width="1.5"/><path d="M16 60 L44 60 L46 115 Q46 123 40 125 L20 125 Q14 123 14 115 Z" fill="#D4A42A" opacity="0.4"/><line x1="30" y1="58" x2="30" y2="122" stroke="#8B6914" stroke-width="0.8" opacity="0.3"/></svg>`;
        bat.style.cssText = 'position:absolute;bottom:30%;left:-100px;transition:none;z-index:2;transform-origin:center center;';
        overlay.appendChild(bat);

        // Ball
        const ball = document.createElement('div');
        ball.style.cssText = 'position:absolute;width:28px;height:28px;border-radius:50%;z-index:3;right:-50px;top:38%;';
        ball.style.background = 'radial-gradient(circle at 35% 35%,#ff4444,#cc0000)';
        ball.style.boxShadow = '0 0 10px rgba(255,0,0,0.5),inset -2px -2px 4px rgba(0,0,0,0.3),inset 2px 2px 4px rgba(255,255,255,0.3)';
        // Ball seam
        ball.innerHTML = '<div style="position:absolute;inset:3px;border:1.5px dashed rgba(255,255,255,0.4);border-radius:50%;"></div>';
        overlay.appendChild(ball);

        const W = canvas.width, H = canvas.height;
        const cx = W / 2, cy = H * 0.38; // Impact point

        const playBoom = () => {
            try {
                const ac = new (window.AudioContext || window.webkitAudioContext)();
                const now = ac.currentTime;

                // Layer 1: Mid-range BANG (audible on all speakers)
                const bangDur = 0.6;
                const bangBuf = ac.createBuffer(1, ac.sampleRate * bangDur, ac.sampleRate);
                const bangData = bangBuf.getChannelData(0);
                for (let i = 0; i < bangData.length; i++) {
                    const t = i / ac.sampleRate;
                    bangData[i] = (Math.random() * 2 - 1) * Math.exp(-t * 6)
                        + Math.sin(t * 400 * Math.PI * 2) * Math.exp(-t * 8) * 0.7
                        + Math.sin(t * 800 * Math.PI * 2) * Math.exp(-t * 10) * 0.4;
                }
                const bangSrc = ac.createBufferSource(); bangSrc.buffer = bangBuf;
                const bangGain = ac.createGain(); bangGain.gain.value = 1.0;
                bangSrc.connect(bangGain); bangGain.connect(ac.destination); bangSrc.start();

                // Layer 2: Bright crack
                const crackDur = 0.15;
                const crackBuf = ac.createBuffer(1, ac.sampleRate * crackDur, ac.sampleRate);
                const crackData = crackBuf.getChannelData(0);
                for (let i = 0; i < crackData.length; i++) {
                    crackData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / crackData.length, 5) * 1.2;
                }
                const crackSrc = ac.createBufferSource(); crackSrc.buffer = crackBuf;
                const crackGain = ac.createGain(); crackGain.gain.value = 0.9;
                crackSrc.connect(crackGain); crackGain.connect(ac.destination); crackSrc.start();

                // Layer 3: Sizzle (high freq sparkle)
                const sizzDur = 2.0;
                const sizzBuf = ac.createBuffer(1, ac.sampleRate * sizzDur, ac.sampleRate);
                const sizzData = sizzBuf.getChannelData(0);
                for (let i = 0; i < sizzData.length; i++) {
                    const t = i / ac.sampleRate;
                    sizzData[i] = (Math.random() * 2 - 1) * Math.exp(-t * 2) * 0.3;
                }
                const sizzSrc = ac.createBufferSource(); sizzSrc.buffer = sizzBuf;
                const sizzGain = ac.createGain(); sizzGain.gain.value = 0.6;
                sizzSrc.connect(sizzGain); sizzGain.connect(ac.destination);
                sizzSrc.start(now + 0.05);

                // Layer 4: Crackle pops
                for (let k = 0; k < 8; k++) {
                    setTimeout(() => {
                        try {
                            const a = new (window.AudioContext || window.webkitAudioContext)();
                            const b = a.createBuffer(1, a.sampleRate * 0.1, a.sampleRate);
                            const d = b.getChannelData(0);
                            for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 4);
                            const s = a.createBufferSource(); s.buffer = b;
                            const g = a.createGain(); g.gain.value = 0.4 + Math.random() * 0.3;
                            s.connect(g); g.connect(a.destination); s.start();
                        } catch (e) { }
                    }, 200 + k * 300);
                }
            } catch (e) { }
        };

        // Firework particles
        let particles = [];
        const colors = ['#38bdf8', '#818cf8', '#c084fc', '#f472b6', '#fbbf24', '#34d399', '#fb7185', '#60a5fa', '#a78bfa', '#f9a8d4'];

        const createBurst = (bx, by, count = 60) => {
            for (let i = 0; i < count; i++) {
                const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
                const speed = 2 + Math.random() * 5;
                particles.push({
                    x: bx, y: by,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    life: 1,
                    decay: 0.008 + Math.random() * 0.012,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    size: 2 + Math.random() * 3,
                    trail: []
                });
            }
        };

        // Sparkle particles (smaller, twinkly)
        const createSparkles = (bx, by) => {
            for (let i = 0; i < 30; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 1 + Math.random() * 3;
                particles.push({
                    x: bx, y: by,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    life: 1,
                    decay: 0.015 + Math.random() * 0.02,
                    color: '#ffffff',
                    size: 1 + Math.random() * 1.5,
                    trail: [],
                    sparkle: true
                });
            }
        };

        let animId;
        let phase = 0; // 0=bat enters, 1=ball flies, 2=impact, 3=fireworks
        let t = 0;
        let batX = -100
        let ballX = W + 50
        let batSwung = false;
        let impactFlash = 0;
        let scheduledBursts = [];

        const animate = () => {
            ctx.clearRect(0, 0, W, H);
            t++;

            // Phase 0: Bat slides in from left
            if (phase === 0) {
                batX += (cx - 120 - batX) * 0.08;
                bat.style.left = batX + 'px';
                bat.style.bottom = '30%';
                if (batX > cx - 140) { phase = 1; t = 0; }
            }

            // Phase 1: Ball flies in from right
            if (phase === 1) {
                ballX += (cx - ballX) * 0.06;
                ball.style.right = 'auto';
                ball.style.left = ballX + 'px';
                // Ball spin
                ball.style.transform = `rotate(${t * 15}deg)`;
                if (ballX > cx - 30 && ballX < cx + 10) { phase = 2; t = 0; }
            }

            // Phase 2: Impact!
            if (phase === 2 && !batSwung) {
                batSwung = true;
                bat.style.transition = 'transform 0.15s ease-out';
                bat.style.transform = 'rotate(-45deg)';
                ball.style.display = 'none';
                impactFlash = 1;
                playBoom();

                // Initial big burst at impact
                createBurst(cx, cy, 80);
                createSparkles(cx, cy);

                // Schedule more bursts across screen
                scheduledBursts = [
                    { time: 20, x: cx - 200, y: cy - 100, count: 50 },
                    { time: 35, x: cx + 180, y: cy - 80, count: 50 },
                    { time: 50, x: cx - 100, y: cy + 100, count: 40 },
                    { time: 65, x: cx + 100, y: cy - 150, count: 55 },
                    { time: 80, x: cx, y: cy - 120, count: 45 },
                    { time: 100, x: cx - 250, y: cy + 50, count: 40 },
                    { time: 115, x: cx + 220, y: cy + 60, count: 50 },
                    { time: 135, x: cx, y: cy, count: 70 },
                ];

                setTimeout(() => { bat.style.opacity = '0'; bat.style.transition = 'opacity 0.5s'; }, 500);
                phase = 3;
                t = 0;
            }

            // Phase 3: Fireworks show
            if (phase === 3) {
                // Trigger scheduled bursts
                scheduledBursts = scheduledBursts.filter(b => {
                    if (t >= b.time) {
                        createBurst(b.x, b.y, b.count);
                        createSparkles(b.x, b.y);
                        // Mini boom sounds for each burst
                        try {
                            const ac = new (window.AudioContext || window.webkitAudioContext)();
                            const now = ac.currentTime;
                            // Mini thud
                            const b1 = ac.createBuffer(1, ac.sampleRate * 0.6, ac.sampleRate);
                            const d1 = b1.getChannelData(0);
                            for (let i = 0; i < d1.length; i++) { const t = i / ac.sampleRate; d1[i] = Math.sin(t * 50 * Math.PI * 2) * Math.exp(-t * 5) * 0.5 + (Math.random() * 2 - 1) * Math.pow(1 - i / d1.length, 5) * 0.3; }
                            const s1 = ac.createBufferSource(); s1.buffer = b1;
                            const g1 = ac.createGain(); g1.gain.setValueAtTime(0.35, now); g1.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
                            s1.connect(g1); g1.connect(ac.destination); s1.start();
                            // Mini sizzle
                            const b2 = ac.createBuffer(1, ac.sampleRate * 1, ac.sampleRate);
                            const d2 = b2.getChannelData(0);
                            for (let i = 0; i < d2.length; i++) d2[i] = (Math.random() * 2 - 1) * Math.exp(-i / ac.sampleRate * 2) * 0.08;
                            const s2 = ac.createBufferSource(); s2.buffer = b2;
                            const g2 = ac.createGain(); g2.gain.value = 0.25;
                            const bp = ac.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 5000;
                            s2.connect(bp); bp.connect(g2); g2.connect(ac.destination); s2.start(now + 0.05);
                        } catch (e) { }
                        return false;
                    }
                    return true;
                });

                // Impact flash
                if (impactFlash > 0) {
                    ctx.fillStyle = `rgba(255,255,255,${impactFlash * 0.3})`;
                    ctx.fillRect(0, 0, W, H);
                    impactFlash -= 0.05;
                }
            }

            // Draw & update particles
            particles.forEach(p => {
                p.trail.push({ x: p.x, y: p.y });
                if (p.trail.length > 6) p.trail.shift();

                // Draw trail
                p.trail.forEach((tp, ti) => {
                    const alpha = (ti / p.trail.length) * p.life * 0.4;
                    ctx.beginPath();
                    ctx.arc(tp.x, tp.y, p.size * 0.5, 0, Math.PI * 2);
                    ctx.fillStyle = p.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
                    ctx.fill();
                });

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.sparkle ? p.size * (0.5 + Math.random() * 0.5) : p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life;
                ctx.fill();
                ctx.globalAlpha = 1;

                // Glow
                if (!p.sparkle) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
                    grad.addColorStop(0, p.color + '40');
                    grad.addColorStop(1, 'transparent');
                    ctx.fillStyle = grad;
                    ctx.fill();
                }

                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.04; // gravity
                p.vx *= 0.99;
                p.life -= p.decay;
            });
            particles = particles.filter(p => p.life > 0);

            // End after fireworks done
            if (phase === 3 && t > 200 && particles.length === 0) {
                cancelAnimationFrame(animId);
                overlay.style.transition = 'opacity 0.8s';
                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 800);
                return;
            }

            animId = requestAnimationFrame(animate);
        };

        animate();
    };

    // ═══ INTERSECTION OBSERVER ═══
    useEffect(() => {
        if (loaderVisible) return;
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) setVisibleSections(prev => new Set([...prev, e.target.dataset.reveal]));
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, [loaderVisible]);

    const v = (id) => visibleSections.has(id);

    // ═══ AUDIO ═══
    const playAudio = () => {
        const audio = document.getElementById('captainAudio');
        if (audio) {
            if (isPlaying) { audio.pause(); audio.currentTime = 0; setIsPlaying(false); }
            else { audio.play(); setIsPlaying(true); audio.onended = () => setIsPlaying(false); }
        }
    };

    // ═══ EMAILJS ═══
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('Sending...');
        emailjs.send('service_wvng7kc', 'template_033ifqk', { from_name: formData.name, from_email: formData.email, to_name: 'Jainam Varia', message: formData.message }, '4OnjEDlHEmzam9O6m')
            .then(() => { setFormStatus('Message sent successfully!'); setFormData({ name: '', email: '', message: '' }); setTimeout(() => setFormStatus(''), 3000); })
            .catch(() => { setFormStatus('Failed to send. Please try again.'); setTimeout(() => setFormStatus(''), 3000); });
    };

    const navItems = [
        { id: 'home', label: 'Home' }, { id: 'about', label: 'About' }, { id: 'education', label: 'Education' },
        { id: 'experience', label: 'Experience' }, { id: 'skills', label: 'Skills' }, { id: 'projects', label: 'Projects' },
        { id: 'extra', label: 'Activities' }, { id: 'contact', label: 'Contact' }
    ];

    const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); };

    const glass = 'bg-white/[0.05] backdrop-blur-2xl border border-white/[0.08] rounded-2xl transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.12] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]';
    const pill = 'px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] border border-white/[0.08] text-slate-400 transition-all duration-300 hover:bg-sky-400/10 hover:border-sky-400/30 hover:text-sky-400 hover:-translate-y-0.5 cursor-default';
    const tag = 'px-2.5 py-1 rounded-md text-[11px] font-medium bg-sky-400/[0.08] text-sky-400 border border-sky-400/[0.15]';
    const reveal = (id, delay = 0) => `transition-all duration-700 ease-out ${v(id) ? 'opacity-100 translate-y-0 translate-x-0 scale-100' : 'opacity-0 translate-y-10'}`;

    // ═══ LOADER ═══
    if (loaderVisible) {
        return (
            <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center" style={{ background: '#050a18' }}>
                <div className="text-5xl font-black bg-clip-text text-transparent animate-pulse mb-8" style={{ backgroundImage: 'linear-gradient(135deg,#38bdf8,#c084fc,#f472b6)' }}>JV</div>
                <div className="w-48 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg,#38bdf8,#c084fc)', animation: 'loaderFill 1.8s ease-in-out forwards' }} />
                </div>
                <p className="mt-4 text-xs text-slate-500 tracking-widest" style={{ fontFamily: "'Space Mono',monospace" }}>Loading portfolio...</p>
                <style>{`@keyframes loaderFill{0%{width:0%}60%{width:80%}100%{width:100%}}`}</style>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-slate-300 overflow-x-hidden" style={{ background: '#050a18', fontFamily: "'Outfit',sans-serif" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap');
                ::selection{background:#38bdf8;color:#050a18}
                ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#050a18}::-webkit-scrollbar-thumb{background:linear-gradient(#38bdf8,#c084fc);border-radius:3px}
                @keyframes auroraMove{0%{transform:translate(0,0) scale(1)}25%{transform:translate(80px,-60px) scale(1.1)}50%{transform:translate(-40px,80px) scale(.9)}75%{transform:translate(60px,40px) scale(1.15)}100%{transform:translate(-80px,-40px) scale(1.05)}}
                @keyframes morph{0%,100%{border-radius:30% 70% 70% 30%/30% 30% 70% 70%}25%{border-radius:58% 42% 75% 25%/76% 46% 54% 24%}50%{border-radius:50% 50% 33% 67%/55% 27% 73% 45%}75%{border-radius:33% 67% 58% 42%/63% 68% 32% 37%}}
                @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
                @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
                @keyframes pulseBadge{0%,100%{box-shadow:0 0 0 0 rgba(56,189,248,0.15)}50%{box-shadow:0 0 0 12px rgba(56,189,248,0)}}
                @keyframes blinkCur{0%,100%{opacity:1}50%{opacity:0}}
                .aurora-b{animation:auroraMove 20s ease-in-out infinite alternate}
                .liquid-b{animation:morph 8s ease-in-out infinite}
                .grad-name{background-size:200% 200%;animation:gradShift 6s ease-in-out infinite}
            `}</style>

            {/* AURORA */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="aurora-b absolute w-[600px] h-[600px] rounded-full opacity-30 -top-[10%] -left-[10%]" style={{ filter: 'blur(120px)', background: 'radial-gradient(circle,#38bdf8,transparent 70%)', animationDuration: '25s' }} />
                <div className="aurora-b absolute w-[500px] h-[500px] rounded-full opacity-30 top-[30%] -right-[5%]" style={{ filter: 'blur(120px)', background: 'radial-gradient(circle,#818cf8,transparent 70%)', animationDuration: '30s', animationDelay: '-5s' }} />
                <div className="aurora-b absolute w-[700px] h-[700px] rounded-full opacity-30 -bottom-[15%] left-[30%]" style={{ filter: 'blur(120px)', background: 'radial-gradient(circle,#c084fc,transparent 70%)', animationDuration: '35s', animationDelay: '-10s' }} />
                <div className="aurora-b absolute w-[400px] h-[400px] rounded-full opacity-30 top-[50%] left-[10%]" style={{ filter: 'blur(120px)', background: 'radial-gradient(circle,#f472b6,transparent 70%)', animationDuration: '22s', animationDelay: '-3s' }} />
            </div>

            {/* LIQUID */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="liquid-b absolute w-72 h-72 opacity-[0.06] top-[20%] left-[60%]" style={{ background: '#38bdf8' }} />
                <div className="liquid-b absolute w-60 h-60 opacity-[0.06] top-[60%] left-[20%]" style={{ background: '#818cf8', animationDelay: '-2s' }} />
                <div className="liquid-b absolute w-48 h-48 opacity-[0.06] top-[40%] left-[80%]" style={{ background: '#f472b6', animationDelay: '-4s' }} />
            </div>

            {/* SCROLL PROGRESS */}
            <div className="fixed top-0 left-0 h-[3px] z-[101]" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg,#38bdf8,#818cf8,#c084fc,#f472b6)', boxShadow: '0 0 10px rgba(56,189,248,0.4)' }} />

            {/* NAV */}
            <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-6 ${scrolled ? 'py-3' : 'py-4'}`} style={scrolled ? { background: 'rgba(5,10,24,0.85)', backdropFilter: 'blur(20px)' } : {}}>
                <div className="max-w-[1200px] mx-auto flex items-center justify-between">
                    <button onClick={() => scrollTo('home')} className="font-extrabold text-xl bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg,#38bdf8,#c084fc)' }}>JV</button>
                    <ul className="hidden md:flex gap-7 list-none">
                        {navItems.map(n => (
                            <li key={n.id}>
                                <button onClick={() => scrollTo(n.id)} className="text-xs font-medium uppercase tracking-wider transition-all relative pb-1" style={{ color: activeSection === n.id ? '#f8fafc' : '#64748b' }}>
                                    {n.label}
                                    <span className="absolute bottom-0 left-0 h-0.5 rounded transition-all duration-300" style={{ width: activeSection === n.id ? '100%' : '0%', background: 'linear-gradient(90deg,#38bdf8,#c084fc)' }} />
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-300 z-[101]">
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* MOBILE MENU */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-6" style={{ background: 'rgba(5,10,24,0.96)', backdropFilter: 'blur(20px)' }}>
                    {navItems.map(n => (<button key={n.id} onClick={() => scrollTo(n.id)} className="text-xl text-slate-300 hover:text-sky-400 transition-colors">{n.label}</button>))}
                </div>
            )}

            {/* BACK TO TOP */}
            {showBackToTop && (
                <button onClick={() => scrollTo('home')} className={`fixed bottom-8 right-8 z-50 w-11 h-11 rounded-xl ${glass} flex items-center justify-center text-sky-400 hover:-translate-y-1 transition-all`}>
                    <ArrowUp size={18} />
                </button>
            )}

            {/* ═══ HERO ═══ */}
            <section id="home" className="relative z-[2] min-h-screen flex items-center justify-center text-center px-6 pt-20">
                <div className="max-w-[1100px] mx-auto">
                    <div data-reveal="hb" className={reveal('hb')}>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6" style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', color: '#38bdf8', animation: 'pulseBadge 3s ease-in-out infinite' }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" style={{ animation: 'blinkCur 2s infinite' }} /> Creating Something Big - Stay Tuned!😉
                        </span>
                    </div>
                    <div data-reveal="hn" className={reveal('hn')} style={{ transitionDelay: '100ms' }}>
                        <h1 className="grad-name text-[clamp(2.8rem,7vw,5.5rem)] font-black leading-[1.05] mb-4 bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg,#f8fafc 0%,#38bdf8 40%,#c084fc 70%,#f472b6 100%)' }}>Jainam Varia</h1>
                    </div>
                    <div data-reveal="ht" className={reveal('ht')} style={{ transitionDelay: '200ms' }}>
                        <p className="text-sky-400 mb-3 min-h-[1.6em]" style={{ fontFamily: "'Space Mono',monospace", fontSize: 'clamp(0.85rem,2vw,1.1rem)' }}>
                            {typedText}<span className="inline-block w-0.5 bg-sky-400 ml-0.5 align-text-bottom" style={{ height: '1.1em', animation: 'blinkCur 1s step-end infinite' }} />
                        </p>
                    </div>
                    <div data-reveal="hs" className={reveal('hs')} style={{ transitionDelay: '300ms' }}>
                        <p className="text-sm text-slate-500 mb-8">B.Tech Computer Engineer · MSc Financial Technology</p>
                    </div>
                    <div data-reveal="hi" className={`transition-all duration-700 ${v('hi') ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} mb-8`} style={{ transitionDelay: '350ms' }}>
                        <img src="/profile.jpg" alt="Jainam Varia" className="w-36 h-36 rounded-full mx-auto object-contain shadow-[0_0_30px_rgba(56,189,248,0.15)]" style={{ border: '2px solid rgba(56,189,248,0.3)' }} onError={(e) => { e.target.style.display = 'none' }} />
                    </div>
                    <div data-reveal="hc" className={reveal('hc')} style={{ transitionDelay: '400ms' }}>
                        <div className="flex gap-3 justify-center flex-wrap mb-4">
                            <a href="https://drive.google.com/file/d/1yGlR7KL837Q-Iyi3Igc2dV9nhRr4udC_/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg,#38bdf8,#818cf8)', color: '#050a18', boxShadow: '0 4px 20px rgba(56,189,248,0.25)' }}>
                                <Download size={16} /> AI/ML CV
                            </a>
                            <a href="https://drive.google.com/file/d/1warqB-sx-OUkT_qfCYQF7qEgEWx7xak8/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-slate-300 transition-all hover:-translate-y-0.5 hover:text-sky-400" style={{ border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}>
                                <Code size={16} /> Blockchain CV
                            </a>
                        </div>
                        <div className="flex gap-3 justify-center">
                            {[{ href: 'https://www.linkedin.com/in/jainamvaria/', icon: <Linkedin size={18} /> }, { href: 'https://github.com/jainam1810', icon: <Github size={18} /> }, { href: 'mailto:jainamvaria1010@gmail.com', icon: <Mail size={18} /> }, { href: 'https://wa.me/447544504854', icon: <MessageCircle size={18} /> }, { href: 'https://www.instagram.com/jai_varia_19/', icon: <Instagram size={18} /> }].map((s, i) => (
                                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-sky-400 hover:-translate-y-1 transition-all`} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>{s.icon}</a>
                            ))}
                        </div>
                    </div>
                    <div data-reveal="hsc" className={`mt-8 ${reveal('hsc')}`} style={{ animation: 'float 3s ease-in-out infinite', transitionDelay: '500ms' }}>
                        <button onClick={() => scrollTo('about')} className="text-slate-500 opacity-50 hover:opacity-100 transition-opacity"><ChevronDown size={28} /></button>
                    </div>
                </div>
            </section>

            {/* ═══ ABOUT ═══ */}
            <section id="about" className="relative z-[2] py-24 px-6">
                <div className="max-w-[1100px] mx-auto">
                    <div data-reveal="at" className={reveal('at')}>
                        <div className="w-14 h-[3px] rounded mb-4" style={{ background: 'linear-gradient(90deg,#38bdf8,#c084fc)' }} />
                        <h2 className="text-4xl font-extrabold bg-clip-text text-transparent mb-2" style={{ backgroundImage: 'linear-gradient(135deg,#f8fafc,#38bdf8)' }}>About Me</h2>
                        <p className="text-slate-500 text-sm mb-12 max-w-xl">A tech enthusiast at the intersection of finance & technology</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-10 items-start">
                        <div>
                            {["I'm a 21-year-old tech enthusiast passionate about the intersection of finance and technology. Currently living in Exeter, United Kingdom, pursuing my Master of Science in Financial Technology at the University of Exeter, I bring a strong foundation in computer engineering from my B.Tech at K.J. Somaiya Institute of Technology.", "My journey combines technical expertise with financial acumen, positioning me to drive innovation in the rapidly evolving FinTech landscape. I'm committed to leveraging technology to solve complex financial challenges and create impactful solutions.", "With expertise spanning AI/ML, blockchain development, and quantitative analysis, I've developed projects ranging from forecasting and fraud detection systems to decentralized applications. I am actively exploring opportunities in AI/ML and blockchain-driven roles across the United Kingdom."].map((p, i) => (
                                <p key={i} data-reveal={`ap${i}`} className={`text-slate-400 text-[15px] leading-relaxed mb-5 ${reveal(`ap${i}`)}`} style={{ transitionDelay: `${i * 100}ms` }}>{p}</p>
                            ))}
                        </div>
                        <div data-reveal="ac" className={`grid grid-cols-2 gap-4 transition-all duration-700 ${v('ac') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}>
                            {[{ n: 'MSc', l: 'Financial Technology' }, { n: 'B.Tech', l: 'Computer Engineering' }, { n: 'AI/ML', l: '& Blockchain' }, { n: 'UK', l: 'Based · Exeter' }].map((c, i) => (
                                <div key={i} className={`${glass} p-5 text-center`}>
                                    <div className="text-2xl font-extrabold bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg,#38bdf8,#c084fc)' }}>{c.n}</div>
                                    <div className="text-[11px] text-slate-500 uppercase tracking-wider mt-1">{c.l}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ EDUCATION ═══ */}
            <section id="education" className="relative z-[2] py-24 px-6">
                <div className="max-w-[1100px] mx-auto">
                    <div data-reveal="et" className={reveal('et')}>
                        <div className="w-14 h-[3px] rounded mb-4" style={{ background: 'linear-gradient(90deg,#38bdf8,#c084fc)' }} />
                        <h2 className="text-4xl font-extrabold bg-clip-text text-transparent mb-2" style={{ backgroundImage: 'linear-gradient(135deg,#f8fafc,#38bdf8)' }}>Education</h2>
                        <p className="text-slate-500 text-sm mb-12 max-w-xl">Academic journey across India & the United Kingdom</p>
                    </div>
                    {[{ deg: 'MSc Financial Technology', sch: 'University of Exeter', loc: 'Exeter, Devon, United Kingdom', dt: '2025 - Present', desc: 'Specializing in the intersection of finance and technology, focusing on blockchain, AI in finance, and quantitative analysis', logo: ExeterLogo },
                    { deg: 'B.Tech Computer Engineering', sch: 'K.J. Somaiya Institute of Technology', loc: 'Mumbai, Maharashtra, India', dt: '2021 - 2025', desc: 'Strong foundation in Computer Engineering with specialization in AI/ML & Blockchain principles', logo: SomaiyaLogo }
                    ].map((e, i) => (
                        <div key={i} data-reveal={`e${i}`} className={`${glass} p-6 flex gap-5 items-start mb-5 ${reveal(`e${i}`)}`} style={{ transitionDelay: `${(i + 1) * 100}ms` }}>
                            {e.logo ? <img src={e.logo} alt={e.sch} className="w-12 h-12 rounded-xl object-contain flex-shrink-0" /> : <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xl" style={{ background: 'linear-gradient(135deg,rgba(56,189,248,0.15),rgba(129,140,248,0.15))', border: '1px solid rgba(56,189,248,0.15)' }}>{e.icon}</div>}
                            <div>
                                <h3 className="text-lg font-bold text-slate-100">{e.deg}</h3>
                                <div className="text-sky-400 text-sm font-medium">{e.sch}</div>
                                <div className="flex gap-4 flex-wrap text-xs text-slate-500 mt-1 mb-2"><span className="flex items-center gap-1"><MapPin size={12} />{e.loc}</span><span className="flex items-center gap-1"><Calendar size={12} />{e.dt}</span></div>
                                <p className="text-slate-400 text-sm leading-relaxed">{e.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ EXPERIENCE ═══ */}
            <section id="experience" className="relative z-[2] py-24 px-6">
                <div className="max-w-[1100px] mx-auto">
                    <div data-reveal="xt" className={reveal('xt')}>
                        <div className="w-14 h-[3px] rounded mb-4" style={{ background: 'linear-gradient(90deg,#38bdf8,#c084fc)' }} />
                        <h2 className="text-4xl font-extrabold bg-clip-text text-transparent mb-2" style={{ backgroundImage: 'linear-gradient(135deg,#f8fafc,#38bdf8)' }}>Professional Experience</h2>
                        <p className="text-slate-500 text-sm mb-12 max-w-xl">From startups to corporate - diverse hands-on experience</p>
                    </div>
                    <div className="relative pl-8" style={{ borderLeft: '2px solid transparent', borderImage: 'linear-gradient(180deg,#38bdf8,#c084fc,#f472b6,#818cf8) 1' }}>
                        {[
                            { t: 'Sortation Associate (Part-time)', c: 'Amazon Warehouse', logo: '/amazon-logo.png', d: 'Nov 2025 - Jan 2026', l: 'Exeter, United Kingdom', p: ['Sort, scan, and divert packages to final destinations using RF scanners and conveyor systems, consistently meeting productivity and accuracy targets.', 'Handle physical tasks such as unloading, lifting, and relocating goods up to 23 kg across multiple shifts while following safety and quality standards.', 'Collaborate with team members to resolve sorting bottlenecks and improve workflow efficiency, maintaining flexibility and a positive attitude toward new tasks.'], tg: ['Teamwork & Collaboration', 'Productivity & Efficiency', 'Attention-to-Detail & Accuracy'] },
                            { t: 'Blockchain Research Intern (Operational Risk)', c: 'KIFS Housing Finance Ltd', logo: '/Kifs-logo.PNG', d: 'Jun 2025 - Jul 2025', l: 'Mumbai, India', p: ['Researched and proposed an AI + Blockchain-based ledger for loan risk and fraud detection, improving processing speed by 30–40% and reducing manual intervention by 50%.', 'Designed a strategic implementation plan inspired by Figure Technologies (USA) to enhance system efficiency.', 'Projected improvements included 20% higher fraud detection accuracy and 15–20% cost savings, demonstrating measurable impact.'], tg: ['XGBoost & Autoencoders', 'Python & Golang', 'Scikit-learn & PyTorch', 'Hyperledger Fabric & Corda'] },
                            { t: 'Founder', c: 'Sorneshia', logo: '/Sorneshia-Logo.jpg', d: 'Jun 2024 - May 2025', l: 'Mumbai, India (Remote)', p: ['Founded Sorneshia - a print-on-demand clothing brand, achieving 80+ sales, £830 revenue, £10 average order value, and a 23% profit margin within 8 months.', 'Designed and managed a Shopify e-commerce store, ensuring efficient 2–7 day delivery across India and enhancing customer satisfaction.', 'Executed targeted marketing campaigns by collaborating with influencer and social media agencies, while managing self-run Meta and influencer campaigns to reduce costs and drive sales growth.'], tg: ['HTML CSS JavaScript', 'Excel & PowerBI', 'Google Analytics', 'Meta & Google Ads'] },
                            { t: 'Introducing Broker & Trader', c: 'Oron Trade Ltd', logo: '/Oron_Logo.png', d: 'Aug 2023 - May 2025', l: 'Mumbai, India', p: ['Engaged with 120+ clients and delivered seminars to over 1,000 attendees, explaining the global foreign exchange market and guiding them on investment and trading opportunities.', 'Conducted in-depth market analysis across forex, equities, and cryptocurrency, developing algorithmic trading strategies based on order blocks, liquidity sweeps, and market structure - achieving a 65% win ratio.', 'Applied institutional trading insights, risk management techniques, and strong communication skills to deliver actionable trading signals and build lasting client relationships.'], tg: ['Quantitative & Analytical Thinking', 'Risk Management & Forex', 'Financial Modeling', 'Communication'] },
                            { t: 'Web Developer', c: 'Prodigy InfoTech', logo: ProdigyLogo, d: 'Jun 2024', l: 'Mumbai, India (Remote)', p: ['Developed interactive web applications using HTML, CSS, JavaScript, and Bootstrap, including a dynamic menu, stopwatch, Tic-Tac-Toe game, and portfolio website.', 'Improved UI responsiveness by 30% and reduced page load times by 25%, leading to higher usability and user engagement.', 'Managed version control with Git and GitHub, ensuring clean code structure, efficient collaboration, and long-term maintainability.'], tg: ['HTML', 'CSS', 'JavaScript', 'Git', 'GitHub', 'Bootstrap'] }
                        ].map((x, i) => (
                            <div key={i} data-reveal={`x${i}`} className={`relative mb-10 pl-8 ${reveal(`x${i}`)}`} style={{ transitionDelay: `${i * 100}ms` }}>
                                <div className="absolute -left-[30px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-sky-400 z-10" style={{ border: '3px solid #050a18', boxShadow: '0 0 12px rgba(56,189,248,0.4)' }} />
                                <div className={`${glass} p-6`}>
                                    <div className="flex items-start gap-4 mb-3">
                                        <img src={x.logo} alt={x.c} className="w-12 h-12 rounded-lg object-contain flex-shrink-0" style={{ background: '#ffffff' }} onError={(e) => { e.target.style.display = 'none' }} />
                                        <div><h3 className="text-base font-bold text-slate-100">{x.t}</h3><div className="text-sky-400 text-sm font-medium">{x.c}</div></div>
                                    </div>
                                    <div className="flex gap-4 flex-wrap text-xs text-slate-500 mb-3"><span className="flex items-center gap-1"><Calendar size={12} />{x.d}</span><span className="flex items-center gap-1"><MapPin size={12} />{x.l}</span></div>
                                    <ul className="space-y-2 mb-4">{x.p.map((pt, j) => (<li key={j} className="text-slate-400 text-sm leading-relaxed pl-4 relative"><span className="absolute left-0 text-sky-400">▸</span>{pt}</li>))}</ul>
                                    <div className="flex flex-wrap gap-1.5">{x.tg.map((t, j) => <span key={j} className={tag}>{t}</span>)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ SKILLS ═══ */}
            <section id="skills" className="relative z-[2] py-24 px-6">
                <div className="max-w-[1100px] mx-auto">
                    <div data-reveal="st" className={reveal('st')}>
                        <div className="w-14 h-[3px] rounded mb-4" style={{ background: 'linear-gradient(90deg,#38bdf8,#c084fc)' }} />
                        <h2 className="text-4xl font-extrabold bg-clip-text text-transparent mb-2" style={{ backgroundImage: 'linear-gradient(135deg,#f8fafc,#38bdf8)' }}>Skills & Expertise</h2>
                        <p className="text-slate-500 text-sm mb-12 max-w-xl">Technical toolbox built across AI/ML, Blockchain & FinTech</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                        {[{ t: 'Programming', s: ['Python', 'R', 'Java', 'HTML', 'CSS', 'JavaScript', 'C++', 'SQL'] },
                        { t: 'Tools & Frameworks', s: ['React', 'Node.js', 'Express.js', 'Nest.js', 'Next.js', 'TypeScript.js', 'Zod', 'AWS (S3, DynamoDB)', 'TensorFlow', 'Pandas', 'NumPy', 'Matplotlib', 'PyTorch', 'Scikit-learn', 'Streamlit', 'Git', 'Docker', 'Figma', 'Notion', 'Scrum / Agile', 'PowerBI', 'Tableau', 'Many More'] }, { t: 'AI & Machine Learning', s: ['Linear Regression', 'Logistic Regression', 'SVR', 'SVM', 'XGBoost', 'Random Forest', 'Gradient Boosting', 'Autoencoders', 'RBM', 'Decision Tree', 'GMMs', 'CNNs', 'RNNs', 'LSTMs', 'LLMs', 'NLP'] }, { t: 'Blockchain Development', s: ['Solidity', 'Hardhat', 'Ethereum', 'Smart Contracts', 'DApps', 'ECDSA', 'Web3.js'] }].map((c, i) => (
                            <div key={i} data-reveal={`s${i}`} className={`${glass} p-6 ${reveal(`s${i}`)}`} style={{ transitionDelay: `${i * 100}ms` }}>
                                <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
                                    <span style={{ background: 'linear-gradient(135deg,rgba(56,189,248,0.15),rgba(129,140,248,0.15))' }}>{c.i}</span>{c.t}
                                </h3>
                                <div className="flex flex-wrap gap-1.5">{c.s.map((s, j) => <span key={j} className={pill}>{s}</span>)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ PROJECTS ═══ */}
            <section id="projects" className="relative z-[2] py-24 px-6">
                <div className="max-w-[1100px] mx-auto">
                    <div data-reveal="pt" className={reveal('pt')}>
                        <div className="w-14 h-[3px] rounded mb-4" style={{ background: 'linear-gradient(90deg,#38bdf8,#c084fc)' }} />
                        <h2 className="text-4xl font-extrabold bg-clip-text text-transparent mb-2" style={{ backgroundImage: 'linear-gradient(135deg,#f8fafc,#38bdf8)' }}>Projects</h2>
                        <p className="text-slate-500 text-sm mb-12 max-w-xl">From AI-driven finance tools to decentralized applications</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                        {[
                            { t: 'RemitChain', d: 'Developed and deployed a Solidity smart contract enabling cross-border stablecoin transfers with multi-currency support, Chainlink oracle integration, and a unique sender protection mechanism', im: 'Reduces transfer fees from 6.2% to 0.3% across 5 currency pairs(currently) with full on-chain transparency', tg: ['Solidity', 'Ethereum', 'Hardhat', 'Remix', 'React.js', 'ethers.js', 'Chainlink'], gh: 'https://github.com/jainam1810/RemitChain', vi: 'https://drive.google.com/file/d/1DwVyKL0udW9F8XenC861UIqqlZJfwkZV/view?usp=sharing' },
                            { t: 'AI-Powered Financial Advisor', d: 'AI-powered personal finance dashboard inspired by UK Open Banking, built using Streamlit, ML, and time-series forecasting to deliver intelligent financial insights.', im: 'FinanceAI - Analysing transactions to forecast cashflow, detect recurring payments with 85+% accuracy and predict low balance risk 30-90 days ahead', tg: ['Logistic Regression', 'TF-IDF', 'Streamlit', 'ARIMA'], gh: 'https://github.com/jainam1810/AI-Powered_Financial_Advisor', vi: 'https://drive.google.com/file/d/13m88EsBa5mc8n9E_KlV0PIOucQZqB_Rg/view' },
                            { t: 'Faucet DApp', d: 'A simple Ethereum faucet built with Solidity, Hardhat, and React. It lets users connect their wallet and withdraw test ETH from a smart contract.', im: 'Faucets - provide free test ETH, reducing onboarding friction by 70% and testing costs by 90%', tg: ['Solidity', 'React', 'JavaScript', 'Hardhat'], gh: 'https://github.com/jainam1810/faucet-dapp', vi: 'https://drive.google.com/file/d/1Ym9dTf-kELQWafDMGg2qVsjM03RKgblg/view?usp=drive_link' },
                            { t: 'Credit Card Fraud Detection', d: 'Deep learning models using Autoencoders to detect anomalies and RBMs to capture complex patterns in transaction data.', im: 'CCFD - achieves 91% accuracy and cuts false positives by 35%, reducing losses and boosting customer trust', tg: ['Python', 'TensorFlow', 'Scikit-learn', 'NumPy', 'Deep Learning'], gh: 'https://github.com/jainam1810/Credit-Card-Fraud-Detection', vi: null },
                            { t: 'Merkle GiftList', d: 'Blockchain-based verification system using Merkle Trees, storing only the 32-byte Merkle root while allowing clients to prove membership.', im: 'Merkle Root-based verification cuts storage by 95%, verifies under 100ms, cuts gas fees by 50%', tg: ['JavaScript', 'Node.js', 'Express.js', 'Blockchain', 'Merkle Trees'], gh: 'https://github.com/jainam1810/Merkle-GiftList', vi: null },
                            { t: 'Air Quality Index Prediction', d: 'ML models including Random Forest, Decision Tree, and SVM using historical pollution and weather data for AQI forecasting.', im: 'Achieves 92% accuracy with under 100ms response time, enabling real-time monitoring', tg: ['Python', 'Pandas', 'Scikit-learn', 'ML', 'NumPy'], gh: 'https://github.com/jainam1810/Air_Quality_Index_Prediction', vi: null }
                        ].map((p, i) => (
                            <div key={i} data-reveal={`p${i}`} className={`${glass} overflow-hidden transition-all duration-700 ${v(`p${i}`) ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                                <div className="p-6">
                                    <span className="text-3xl mb-4 block">{p.e}</span>
                                    <h3 className="text-xl font-bold text-slate-100 mb-2">{p.t}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{p.d}</p>
                                    <div className="text-xs font-medium text-sky-400 p-3 rounded-lg mb-4 leading-relaxed" style={{ background: 'rgba(56,189,248,0.05)', border: '1px solid rgba(56,189,248,0.1)' }}>{p.im}</div>
                                    <div className="flex flex-wrap gap-1.5 mb-4">{p.tg.map((t, j) => <span key={j} className="px-2 py-0.5 rounded text-[11px] text-slate-500" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>{t}</span>)}</div>
                                    <div className="flex gap-2">
                                        <a href={p.gh} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-sky-400 transition-all" style={{ border: '1px solid rgba(255,255,255,0.08)' }}><Github size={14} /> GitHub</a>
                                        {p.vi && <a href={p.vi} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-sky-400 transition-all" style={{ border: '1px solid rgba(255,255,255,0.08)' }}><Video size={14} /> Demo</a>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ EXTRACURRICULAR ═══ */}
            <section id="extra" className="relative z-[2] py-24 px-6">
                <div className="max-w-[1100px] mx-auto">
                    <div data-reveal="ect" className={reveal('ect')}>
                        <div className="w-14 h-[3px] rounded mb-4" style={{ background: 'linear-gradient(90deg,#38bdf8,#c084fc)' }} />
                        <h2 className="text-4xl font-extrabold bg-clip-text text-transparent mb-2" style={{ backgroundImage: 'linear-gradient(135deg,#f8fafc,#38bdf8)' }}>Extra-curricular & Volunteer</h2>
                        <p className="text-slate-500 text-sm mb-12 max-w-xl">Leadership, community, and professional development</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-5">
                        {[{ e: null, r: 'Captain', o: 'KJSIT Official Cricket Team', pr: 'March 2023 - May 2024 · Sports Leadership', ps: ["Captain of KJSIT Cricket Team, leading the side to Runner-Up at Inter-College ICT Sportsaga and securing the institute's first-ever inter-college cricket trophy.", "Winning Captain of the Intra-College Box Cricket Tournament 2022, demonstrating leadership, strategy, and team coordination."], tg: ['Leadership', 'Discipline', 'Teamwork', 'Communication'] },
                        { e: null, r: 'Volunteer', o: 'BAPS Swaminarayan Sanstha', pr: '2017 - Present · Community Service', ps: ["Mentored children and teenagers on spirituality, discipline, and academic excellence, guiding them towards personal growth and positive life habits.", "Organised and led sports and spiritual events, promoting teamwork, healthy lifestyles, and avoidance of harmful addictions through guided sessions."], tg: ['Event Planning', 'Public Speaking', 'Mentorship', 'Collaboration'] },
                        { e: null, r: 'Member', o: 'Business & Finance Society', pr: 'Oct 2025 - Present · University of Exeter', ps: ["Member, Business & Finance Society (University of Exeter) - attended and contributed to multiple society-led academic, technical, and finance-focused events.", "Assisted in organising guest lectures, seminars, technical events, and sports fest, supporting event logistics and smooth execution."], tg: ['Networking', 'Event Management', 'Finance', 'Collaboration'] }
                        ].map((x, i) => (
                            <div key={i} data-reveal={`ec${i}`} className={`${glass} p-6 ${reveal(`ec${i}`)}`} style={{ transitionDelay: `${i * 100}ms` }}>
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: 'linear-gradient(135deg,rgba(56,189,248,0.12),rgba(129,140,248,0.12)', border: '1px solid rgba(56,189,248,0.15)' }}>
                                    {x.r === 'Captain' ? <Award size={24} className="text-sky-400" /> : x.r === 'Volunteer' ? <HandHelping size={24} className="text-sky-400" /> : <IdCard size={24} className="text-sky-400" />}
                                </div>
                                <h3 className="text-xl font-bold text-slate-100">{x.r}</h3>
                                <div className="text-sky-400 text-sm font-medium mb-1">{x.o}</div>
                                <div className="text-xs text-slate-500 mb-3">{x.pr}</div>
                                <ul className="space-y-2 mb-4">{x.ps.map((p, j) => (<li key={j} className="text-slate-400 text-xs leading-relaxed pl-4 relative"><span className="absolute left-0 text-sky-400 text-xs">✓</span>{p}</li>))}</ul>
                                <div className="flex flex-wrap gap-1">{x.tg.map((t, j) => <span key={j} className="px-2 py-0.5 rounded text-[11px] text-slate-500" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>{t}</span>)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ LANGUAGES ═══ */}
            <section id="languages" className="relative z-[2] py-24 px-6">
                <div className="max-w-[1100px] mx-auto">
                    <div data-reveal="lt" className={reveal('lt')}>
                        <div className="w-14 h-[3px] rounded mb-4" style={{ background: 'linear-gradient(90deg,#38bdf8,#c084fc)' }} />
                        <h2 className="text-4xl font-extrabold bg-clip-text text-transparent mb-2" style={{ backgroundImage: 'linear-gradient(135deg,#f8fafc,#38bdf8)' }}>Languages</h2>
                        <p className="text-slate-500 text-sm mb-12 max-w-xl">Multilingual communicator across cultures</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {[{ n: 'English', l: 'Fluent', p: 95 }, { n: 'Hindi', l: 'Native', p: 100 }, { n: 'Gujarati', l: 'Native', p: 100 }, { n: 'Marathi', l: 'Fluent', p: 90 }, { n: 'Punjabi', l: 'Intermediate', p: 55 }, { n: 'French', l: 'Basic', p: 25 }].map((lg, i) => (
                            <div key={i} data-reveal={`l${i}`} className={`${glass} p-4 text-center ${reveal(`l${i}`)}`} style={{ transitionDelay: `${i * 50}ms` }}>
                                <div className="font-bold text-slate-100">{lg.n}</div>
                                <div className="text-xs text-slate-500 mb-2">{lg.l}</div>
                                <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                                    <div className="h-full rounded-full transition-all duration-[1500ms] ease-out" style={{ width: v(`l${i}`) ? `${lg.p}%` : '0%', background: 'linear-gradient(90deg,#38bdf8,#c084fc)' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ CONTACT ═══ */}
            <section id="contact" className="relative z-[2] py-24 px-6 pb-12">
                <div className="max-w-[1100px] mx-auto">
                    <div data-reveal="ct" className={reveal('ct')}>
                        <div className="w-14 h-[3px] rounded mb-4" style={{ background: 'linear-gradient(90deg,#38bdf8,#c084fc)' }} />
                        <h2 className="text-4xl font-extrabold bg-clip-text text-transparent mb-2" style={{ backgroundImage: 'linear-gradient(135deg,#f8fafc,#38bdf8)' }}>Get In Touch</h2>
                        <p className="text-slate-500 text-sm mb-12 max-w-xl">I'm always open to discussing new opportunities, collaborations, or just having a chat about AI/ML & Blockchain.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-10 items-start">
                        <div data-reveal="ci" className={`transition-all duration-700 ${v('ci') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
                            <h3 className="text-xl font-bold text-slate-100 mb-4">Let's Connect</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">Whether you have a project idea, want to collaborate on research, or just want to say hello - I'd love to hear from you. Currently based in Exeter, UK.</p>
                            <div className="flex flex-wrap gap-3">
                                {[{ h: 'https://www.linkedin.com/in/jainamvaria/', i: <Linkedin size={16} />, l: 'LinkedIn' }, { h: 'mailto:jainamvaria1010@gmail.com', i: <Mail size={16} />, l: 'Email' }, { h: 'https://github.com/jainam1810', i: <Github size={16} />, l: 'GitHub' }, { h: 'https://wa.me/447544504854', i: <MessageCircle size={16} />, l: 'WhatsApp' }, { h: 'https://www.instagram.com/jai_varia_19/', i: <Instagram size={16} />, l: 'Instagram' }].map((s, i) => (
                                    <a key={i} href={s.h} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 ${glass} hover:text-sky-400 hover:-translate-y-0.5`}>{s.i} {s.l}</a>
                                ))}
                            </div>
                        </div>
                        <div data-reveal="cf" className={`${glass} p-6 transition-all duration-700 ${v('cf') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}>
                            <h3 className="text-lg font-bold text-slate-100 mb-5">Send Me a Message</h3>
                            <form onSubmit={handleSubmit}>
                                {[{ l: 'Your Name', n: 'name', t: 'text', ph: 'John Doe' }, { l: 'Your Email', n: 'email', t: 'email', ph: 'john@example.com' }].map((f, i) => (
                                    <div key={i} className="mb-4">
                                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{f.l}</label>
                                        <input type={f.t} name={f.n} value={formData[f.n]} onChange={handleInputChange} placeholder={f.ph} required className="w-full px-4 py-3 rounded-xl text-sm text-slate-300 outline-none transition-all" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }} />
                                    </div>
                                ))}
                                <div className="mb-4">
                                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Your Message</label>
                                    <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell me about your idea..." required rows={4} className="w-full px-4 py-3 rounded-xl text-sm text-slate-300 outline-none resize-y transition-all" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }} />
                                </div>
                                <button type="submit" className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg,#38bdf8,#818cf8)', color: '#050a18' }}>
                                    <Send size={16} /> Send Message
                                </button>
                                {formStatus && <p className={`mt-3 text-sm text-center ${formStatus.includes('success') ? 'text-emerald-400' : formStatus.includes('Failed') ? 'text-red-400' : 'text-sky-400'}`}>{formStatus}</p>}
                            </form>
                        </div>
                    </div>

                    {/* VOICE */}
                    <div data-reveal="vo" className={`${glass} text-center mt-12 p-8 ${reveal('vo')}`}>
                        <span className="text-4xl mb-4 block">✪</span>
                        <p className="text-base italic text-slate-400 max-w-xl mx-auto mb-5 leading-relaxed">"So no matter what, I promise you, If you need us, if you need me, I'll be there!"</p>
                        <button onClick={playAudio} className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sky-400 text-sm font-medium transition-all hover:scale-105 ${isPlaying ? 'shadow-[0_0_20px_rgba(56,189,248,0.2)]' : ''}`} style={{ border: `1px solid ${isPlaying ? '#38bdf8' : 'rgba(255,255,255,0.08)'}`, background: 'rgba(255,255,255,0.05)' }}>
                            <span className="relative w-2.5 h-2.5 rounded-full bg-sky-400 flex-shrink-0"><span className="absolute inset-[-4px] rounded-full border-2 border-sky-400 animate-ping opacity-30" /></span>
                            {isPlaying ? 'Playing...' : 'Play Voice Note'}
                            {isPlaying && <span className="flex items-center gap-0.5 h-4">{[...Array(5)].map((_, i) => (<span key={i} className="w-[3px] bg-sky-400 rounded-sm animate-pulse" style={{ height: `${Math.random() * 12 + 4}px`, animationDelay: `${i * 100}ms` }} />))}</span>}
                        </button>
                        <audio id="captainAudio" src="/Captain_audio.mp3" />
                        <p className="mt-4 text-[11px] text-slate-500">Press ↑ ↑ ↓ ↓ ← → ← → BA (desktop) / tap 5 times on screen in 3 seconds (mobile) </p>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="relative z-[2] text-center py-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-sm text-slate-500">© 2026 <span className="font-semibold bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg,#38bdf8,#c084fc)' }}>Jainam Varia</span>. All Rights Reserved.</p>
                <p className="mt-3 text-[11px] text-slate-600">Crafted with passion from Exeter, UK</p>
            </footer>
        </div>
    );
}