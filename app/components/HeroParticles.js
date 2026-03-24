'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const colors = [
  { r: 232, g: 101, b: 58 },
  { r: 139, g: 92, b: 246 },
  { r: 52, g: 211, b: 153 },
  { r: 245, g: 158, b: 11 },
  { r: 99, g: 102, b: 241 },
  { r: 255, g: 184, b: 122 },
]

class Particle {
  constructor(W, H) { this.W = W; this.H = H; this.reset() }
  reset() {
    const cx = this.W / 2, cy = this.H / 2
    const angle = Math.random() * Math.PI * 2
    const dist = 80 + Math.random() * (Math.min(this.W, this.H) / 2 - 40)
    this.x = cx + Math.cos(angle) * dist
    this.y = cy + Math.sin(angle) * dist
    this.vx = (Math.random() - 0.5) * 0.3
    this.vy = (Math.random() - 0.5) * 0.3 - 0.15
    this.size = Math.random() * 3 + 1
    this.alpha = 0
    this.maxAlpha = Math.random() * 0.6 + 0.2
    this.fadeSpeed = Math.random() * 0.008 + 0.003
    this.phase = 0
    this.holdTime = Math.random() * 200 + 100
    this.holdCount = 0
    this.color = colors[Math.floor(Math.random() * colors.length)]
    this.twinkle = Math.random() > 0.6
    this.twinkleSpeed = Math.random() * 0.05 + 0.02
    this.twinklePhase = Math.random() * Math.PI * 2
    this.isStar = Math.random() > 0.75
  }
  update() {
    this.x += this.vx; this.y += this.vy
    if (this.twinkle) this.twinklePhase += this.twinkleSpeed
    if (this.phase === 0) { this.alpha += this.fadeSpeed; if (this.alpha >= this.maxAlpha) { this.alpha = this.maxAlpha; this.phase = 1 } }
    else if (this.phase === 1) { this.holdCount++; if (this.holdCount >= this.holdTime) this.phase = 2 }
    else { this.alpha -= this.fadeSpeed; if (this.alpha <= 0) { this.alpha = 0; this.reset(); this.phase = 0 } }
  }
  draw(ctx) {
    let a = this.alpha
    if (this.twinkle) a *= 0.5 + 0.5 * Math.sin(this.twinklePhase)
    if (a <= 0) return
    const { r, g, b } = this.color
    ctx.save()
    if (this.isStar) {
      ctx.translate(this.x, this.y); ctx.rotate(this.twinklePhase * 0.5)
      const s = this.size
      ctx.beginPath()
      for (let i = 0; i < 4; i++) { const ang = (i * Math.PI) / 2; ctx.moveTo(0, 0); ctx.lineTo(Math.cos(ang) * s * 2, Math.sin(ang) * s * 2) }
      ctx.strokeStyle = `rgba(${r},${g},${b},${a})`; ctx.lineWidth = 0.8; ctx.stroke()
      ctx.beginPath(); ctx.arc(0, 0, s * 0.4, 0, Math.PI * 2); ctx.fillStyle = `rgba(${r},${g},${b},${a})`; ctx.fill()
    } else {
      ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fillStyle = `rgba(${r},${g},${b},${a})`; ctx.fill()
      ctx.beginPath(); ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3)
      grad.addColorStop(0, `rgba(${r},${g},${b},${a * 0.4})`); grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
      ctx.fillStyle = grad; ctx.fill()
    }
    ctx.restore()
  }
}

export default function HeroParticles() {
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const scene = sceneRef.current
    if (!canvas || !scene) return
    const ctx = canvas.getContext('2d')
    let W, H, raf
    const particles = []

    function resize() {
      const r = scene.getBoundingClientRect()
      W = canvas.width = r.width
      H = canvas.height = r.height
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 45; i++) {
      const p = new Particle(W, H)
      p.holdCount = Math.random() * 200
      particles.push(p)
    }

    function animate() {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => { p.W = W; p.H = H; p.update(); p.draw(ctx) })
      raf = requestAnimationFrame(animate)
    }

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { if (!raf) animate() }
      else { cancelAnimationFrame(raf); raf = null }
    }, { threshold: 0.1 })
    obs.observe(scene)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
      obs.disconnect()
    }
  }, [])

  return (
    <div className="mascot-scene" id="mascotScene" ref={sceneRef}>
      <canvas className="mascot-canvas" id="mascotCanvas" ref={canvasRef}></canvas>
      <div className="mascot-halo"></div>
      <div className="mascot-halo-inner"></div>
      <div className="orbit orbit-1"><div className="orbit-pip"></div><div className="orbit-pip p2"></div></div>
      <div className="orbit orbit-2"><div className="orbit-pip"></div><div className="orbit-pip p2"></div></div>
      <div className="orbit orbit-3"><div className="orbit-pip"></div><div className="orbit-pip p2"></div></div>
      <div className="mascot-body">
        <Image className="mascot-img" src="/sakhi-mascot.png" alt="Playla mascot — a friendly animated owl character that serves as the AI learning companion for children aged 4-12, shown greeting the user on the homepage hero section" width={280} height={280} priority={true} />
      </div>
      <div className="msg-bubble b1"><span className="msg-icon">📖</span> Tell me a story!</div>
      <div className="msg-bubble b2"><span className="msg-icon">🌟</span> I got 95 in maths!</div>
      <div className="msg-bubble b3"><span className="msg-icon">😊</span> I&apos;m feeling happy today</div>
      <div className="msg-bubble b4"><span className="msg-icon">🎮</span> Let&apos;s play a quiz!</div>
      <div className="msg-bubble b5"><span className="msg-icon">💚</span> You&apos;re my best friend</div>
      <div className="msg-bubble b6"><span className="msg-icon">🌙</span> Bedtime story...</div>
    </div>
  )
}
