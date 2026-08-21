/**
 * The hidden cricket easter egg, carried over from the previous site.
 * A bat slides in, a ball flies at it, and the connection sets off a full
 * fireworks show with Web Audio booms.
 *
 * Trigger: Konami code on desktop, or 7 taps in 1.5s on touch.
 */

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  decay: number
  color: string
  size: number
  trail: { x: number; y: number }[]
  sparkle?: boolean
}

const COLORS = [
  '#38bdf8',
  '#818cf8',
  '#c084fc',
  '#f472b6',
  '#fbbf24',
  '#34d399',
  '#fb7185',
  '#60a5fa',
  '#a78bfa',
  '#f9a8d4',
]

const BAT_SVG = `<svg width="60" height="130" viewBox="0 0 60 130"><rect x="25" y="0" width="10" height="45" rx="3" fill="#6B4F12"/><rect x="22" y="40" width="16" height="12" rx="3" fill="#8B6914"/><path d="M12 52 Q10 55 10 62 L10 118 Q10 126 18 128 L42 128 Q50 126 50 118 L50 62 Q50 55 48 52 Z" fill="#C4941A" stroke="#8B6914" stroke-width="1.5"/><path d="M16 60 L44 60 L46 115 Q46 123 40 125 L20 125 Q14 123 14 115 Z" fill="#D4A42A" opacity="0.4"/><line x1="30" y1="58" x2="30" y2="122" stroke="#8B6914" stroke-width="0.8" opacity="0.3"/></svg>`

type AudioCtor = typeof AudioContext

function getAudioContext(): AudioContext | null {
  const Ctor: AudioCtor | undefined =
    window.AudioContext ?? (window as unknown as { webkitAudioContext?: AudioCtor }).webkitAudioContext
  return Ctor ? new Ctor() : null
}

function playBoom() {
  try {
    const ac = getAudioContext()
    if (!ac) return
    const now = ac.currentTime

    // Layer 1: mid-range bang, audible on any speaker
    const bangDur = 0.6
    const bangBuf = ac.createBuffer(1, ac.sampleRate * bangDur, ac.sampleRate)
    const bangData = bangBuf.getChannelData(0)
    for (let i = 0; i < bangData.length; i++) {
      const t = i / ac.sampleRate
      bangData[i] =
        (Math.random() * 2 - 1) * Math.exp(-t * 6) +
        Math.sin(t * 400 * Math.PI * 2) * Math.exp(-t * 8) * 0.7 +
        Math.sin(t * 800 * Math.PI * 2) * Math.exp(-t * 10) * 0.4
    }
    const bangSrc = ac.createBufferSource()
    bangSrc.buffer = bangBuf
    const bangGain = ac.createGain()
    bangGain.gain.value = 1
    bangSrc.connect(bangGain)
    bangGain.connect(ac.destination)
    bangSrc.start()

    // Layer 2: bright crack
    const crackBuf = ac.createBuffer(1, ac.sampleRate * 0.15, ac.sampleRate)
    const crackData = crackBuf.getChannelData(0)
    for (let i = 0; i < crackData.length; i++) {
      crackData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / crackData.length, 5) * 1.2
    }
    const crackSrc = ac.createBufferSource()
    crackSrc.buffer = crackBuf
    const crackGain = ac.createGain()
    crackGain.gain.value = 0.9
    crackSrc.connect(crackGain)
    crackGain.connect(ac.destination)
    crackSrc.start()

    // Layer 3: sizzle
    const sizzBuf = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate)
    const sizzData = sizzBuf.getChannelData(0)
    for (let i = 0; i < sizzData.length; i++) {
      const t = i / ac.sampleRate
      sizzData[i] = (Math.random() * 2 - 1) * Math.exp(-t * 2) * 0.3
    }
    const sizzSrc = ac.createBufferSource()
    sizzSrc.buffer = sizzBuf
    const sizzGain = ac.createGain()
    sizzGain.gain.value = 0.6
    sizzSrc.connect(sizzGain)
    sizzGain.connect(ac.destination)
    sizzSrc.start(now + 0.05)

    // Layer 4: crackle pops
    for (let k = 0; k < 8; k++) {
      window.setTimeout(
        () => {
          try {
            const a = getAudioContext()
            if (!a) return
            const b = a.createBuffer(1, a.sampleRate * 0.1, a.sampleRate)
            const d = b.getChannelData(0)
            for (let i = 0; i < d.length; i++) {
              d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 4)
            }
            const s = a.createBufferSource()
            s.buffer = b
            const g = a.createGain()
            g.gain.value = 0.4 + Math.random() * 0.3
            s.connect(g)
            g.connect(a.destination)
            s.start()
          } catch {
            /* audio is best-effort */
          }
        },
        200 + k * 300,
      )
    }
  } catch {
    /* audio is best-effort */
  }
}

function playMiniBoom() {
  try {
    const ac = getAudioContext()
    if (!ac) return
    const now = ac.currentTime

    const b1 = ac.createBuffer(1, ac.sampleRate * 0.6, ac.sampleRate)
    const d1 = b1.getChannelData(0)
    for (let i = 0; i < d1.length; i++) {
      const t = i / ac.sampleRate
      d1[i] =
        Math.sin(t * 50 * Math.PI * 2) * Math.exp(-t * 5) * 0.5 +
        (Math.random() * 2 - 1) * Math.pow(1 - i / d1.length, 5) * 0.3
    }
    const s1 = ac.createBufferSource()
    s1.buffer = b1
    const g1 = ac.createGain()
    g1.gain.setValueAtTime(0.35, now)
    g1.gain.exponentialRampToValueAtTime(0.001, now + 0.6)
    s1.connect(g1)
    g1.connect(ac.destination)
    s1.start()

    const b2 = ac.createBuffer(1, ac.sampleRate, ac.sampleRate)
    const d2 = b2.getChannelData(0)
    for (let i = 0; i < d2.length; i++) {
      d2[i] = (Math.random() * 2 - 1) * Math.exp((-i / ac.sampleRate) * 2) * 0.08
    }
    const s2 = ac.createBufferSource()
    s2.buffer = b2
    const g2 = ac.createGain()
    g2.gain.value = 0.25
    const bp = ac.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = 5000
    s2.connect(bp)
    bp.connect(g2)
    g2.connect(ac.destination)
    s2.start(now + 0.05)
  } catch {
    /* audio is best-effort */
  }
}

let running = false

export function launchCricketFireworks() {
  if (running) return
  running = true

  const overlay = document.createElement('div')
  overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;pointer-events:none;overflow:hidden;'
  document.body.appendChild(overlay)

  const canvas = document.createElement('canvas')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  canvas.style.cssText = 'position:absolute;inset:0;'
  overlay.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    overlay.remove()
    running = false
    return
  }

  const bat = document.createElement('div')
  bat.innerHTML = BAT_SVG
  bat.style.cssText =
    'position:absolute;bottom:30%;left:-100px;transition:none;z-index:2;transform-origin:center center;'
  overlay.appendChild(bat)

  const ball = document.createElement('div')
  ball.style.cssText =
    'position:absolute;width:28px;height:28px;border-radius:50%;z-index:3;right:-50px;top:38%;'
  ball.style.background = 'radial-gradient(circle at 35% 35%,#ff4444,#cc0000)'
  ball.style.boxShadow =
    '0 0 10px rgba(255,0,0,0.5),inset -2px -2px 4px rgba(0,0,0,0.3),inset 2px 2px 4px rgba(255,255,255,0.3)'
  ball.innerHTML =
    '<div style="position:absolute;inset:3px;border:1.5px dashed rgba(255,255,255,0.4);border-radius:50%;"></div>'
  overlay.appendChild(ball)

  const W = canvas.width
  const H = canvas.height
  const cx = W / 2
  const cy = H * 0.38

  let particles: Particle[] = []

  const createBurst = (bx: number, by: number, count = 60) => {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3
      const speed = 2 + Math.random() * 5
      particles.push({
        x: bx,
        y: by,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.008 + Math.random() * 0.012,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 2 + Math.random() * 3,
        trail: [],
      })
    }
  }

  const createSparkles = (bx: number, by: number) => {
    for (let i = 0; i < 30; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 1 + Math.random() * 3
      particles.push({
        x: bx,
        y: by,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.015 + Math.random() * 0.02,
        color: '#ffffff',
        size: 1 + Math.random() * 1.5,
        trail: [],
        sparkle: true,
      })
    }
  }

  let animId = 0
  let phase = 0
  let t = 0
  let batX = -100
  let ballX = W + 50
  let batSwung = false
  let impactFlash = 0
  let scheduledBursts: { time: number; x: number; y: number; count: number }[] = []

  const animate = () => {
    ctx.clearRect(0, 0, W, H)
    t++

    if (phase === 0) {
      batX += (cx - 120 - batX) * 0.08
      bat.style.left = `${batX}px`
      bat.style.bottom = '30%'
      if (batX > cx - 140) {
        phase = 1
        t = 0
      }
    }

    if (phase === 1) {
      ballX += (cx - ballX) * 0.06
      ball.style.right = 'auto'
      ball.style.left = `${ballX}px`
      ball.style.transform = `rotate(${t * 15}deg)`
      if (ballX > cx - 30 && ballX < cx + 10) {
        phase = 2
        t = 0
      }
    }

    if (phase === 2 && !batSwung) {
      batSwung = true
      bat.style.transition = 'transform 0.15s ease-out'
      bat.style.transform = 'rotate(-45deg)'
      ball.style.display = 'none'
      impactFlash = 1
      playBoom()

      createBurst(cx, cy, 80)
      createSparkles(cx, cy)

      scheduledBursts = [
        { time: 20, x: cx - 200, y: cy - 100, count: 50 },
        { time: 35, x: cx + 180, y: cy - 80, count: 50 },
        { time: 50, x: cx - 100, y: cy + 100, count: 40 },
        { time: 65, x: cx + 100, y: cy - 150, count: 55 },
        { time: 80, x: cx, y: cy - 120, count: 45 },
        { time: 100, x: cx - 250, y: cy + 50, count: 40 },
        { time: 115, x: cx + 220, y: cy + 60, count: 50 },
        { time: 135, x: cx, y: cy, count: 70 },
      ]

      window.setTimeout(() => {
        bat.style.opacity = '0'
        bat.style.transition = 'opacity 0.5s'
      }, 500)
      phase = 3
      t = 0
    }

    if (phase === 3) {
      scheduledBursts = scheduledBursts.filter((b) => {
        if (t >= b.time) {
          createBurst(b.x, b.y, b.count)
          createSparkles(b.x, b.y)
          playMiniBoom()
          return false
        }
        return true
      })

      if (impactFlash > 0) {
        ctx.fillStyle = `rgba(255,255,255,${impactFlash * 0.3})`
        ctx.fillRect(0, 0, W, H)
        impactFlash -= 0.05
      }
    }

    particles.forEach((p) => {
      p.trail.push({ x: p.x, y: p.y })
      if (p.trail.length > 6) p.trail.shift()

      p.trail.forEach((tp, ti) => {
        const alpha = (ti / p.trail.length) * p.life * 0.4
        ctx.beginPath()
        ctx.arc(tp.x, tp.y, p.size * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = p.color + Math.floor(alpha * 255).toString(16).padStart(2, '0')
        ctx.fill()
      })

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.sparkle ? p.size * (0.5 + Math.random() * 0.5) : p.size, 0, Math.PI * 2)
      ctx.fillStyle = p.color
      ctx.globalAlpha = p.life
      ctx.fill()
      ctx.globalAlpha = 1

      if (!p.sparkle) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
        grad.addColorStop(0, `${p.color}40`)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.fill()
      }

      p.x += p.vx
      p.y += p.vy
      p.vy += 0.04
      p.vx *= 0.99
      p.life -= p.decay
    })
    particles = particles.filter((p) => p.life > 0)

    if (phase === 3 && t > 200 && particles.length === 0) {
      cancelAnimationFrame(animId)
      overlay.style.transition = 'opacity 0.8s'
      overlay.style.opacity = '0'
      window.setTimeout(() => {
        overlay.remove()
        running = false
      }, 800)
      return
    }

    animId = requestAnimationFrame(animate)
  }

  animate()
}
