'use client'

import { useEffect } from 'react'
import Image from 'next/image'

const agentColors = [
  'rgba(232,101,58',
  'rgba(52,211,153',
  'rgba(99,102,241',
  'rgba(139,92,246',
]

function drawLines() {
  const svg = document.getElementById('netSvg')
  if (!svg) return
  const net = document.getElementById('agentNetwork')
  const nb = net.getBoundingClientRect()
  const sakhi = document.getElementById('playlaCenter').getBoundingClientRect()
  const cx = (sakhi.left + sakhi.right) / 2 - nb.left
  const cy = (sakhi.top + sakhi.bottom) / 2 - nb.top
  svg.innerHTML = ''

  const ns = 'http://www.w3.org/2000/svg'
  const defs = document.createElementNS(ns, 'defs')
  const filter = document.createElementNS(ns, 'filter')
  filter.setAttribute('id', 'glow'); filter.setAttribute('x', '-50%'); filter.setAttribute('y', '-50%')
  filter.setAttribute('width', '200%'); filter.setAttribute('height', '200%')
  const blur = document.createElementNS(ns, 'feGaussianBlur')
  blur.setAttribute('stdDeviation', '3'); blur.setAttribute('result', 'blur')
  const merge = document.createElementNS(ns, 'feMerge')
  const m1 = document.createElementNS(ns, 'feMergeNode'); m1.setAttribute('in', 'blur')
  const m2 = document.createElementNS(ns, 'feMergeNode'); m2.setAttribute('in', 'SourceGraphic')
  merge.appendChild(m1); merge.appendChild(m2); filter.appendChild(blur); filter.appendChild(merge); defs.appendChild(filter)

  const ids = ['a1', 'a2', 'a3', 'a4']
  ids.forEach((id, i) => {
    const node = document.getElementById(id)
    if (!node) return
    const nb2 = node.getBoundingClientRect()
    const nx = (nb2.left + nb2.right) / 2 - nb.left
    const ny = (nb2.top + nb2.bottom) / 2 - nb.top
    const grad = document.createElementNS(ns, 'linearGradient')
    grad.setAttribute('id', 'gr' + i); grad.setAttribute('gradientUnits', 'userSpaceOnUse')
    grad.setAttribute('x1', nx); grad.setAttribute('y1', ny); grad.setAttribute('x2', cx); grad.setAttribute('y2', cy)
    const s1 = document.createElementNS(ns, 'stop'); s1.setAttribute('offset', '0%'); s1.setAttribute('stop-color', agentColors[i] + ',.7)')
    const s2 = document.createElementNS(ns, 'stop'); s2.setAttribute('offset', '100%'); s2.setAttribute('stop-color', agentColors[i] + ',.2)')
    grad.appendChild(s1); grad.appendChild(s2); defs.appendChild(grad)
  })
  svg.appendChild(defs)

  ids.forEach((id, i) => {
    const node = document.getElementById(id)
    if (!node) return
    const nb2 = node.getBoundingClientRect()
    const nx = (nb2.left + nb2.right) / 2 - nb.left
    const ny = (nb2.top + nb2.bottom) / 2 - nb.top
    const mx = (nx + cx) / 2 + (i % 2 === 0 ? -40 : 40)
    const my = (ny + cy) / 2 + (i < 2 ? 30 : -30)
    const d = `M ${nx} ${ny} Q ${mx} ${my} ${cx} ${cy}`
    const glowPath = document.createElementNS(ns, 'path')
    glowPath.setAttribute('d', d); glowPath.setAttribute('fill', 'none')
    glowPath.setAttribute('stroke', agentColors[i] + ',.15)'); glowPath.setAttribute('stroke-width', '6')
    glowPath.setAttribute('filter', 'url(#glow)'); svg.appendChild(glowPath)
    const line = document.createElementNS(ns, 'path')
    line.setAttribute('d', d); line.setAttribute('fill', 'none')
    line.setAttribute('stroke', 'url(#gr' + i + ')'); line.setAttribute('stroke-width', '2')
    line.setAttribute('stroke-dasharray', '8 4'); line.style.animation = 'dashAnim 2s linear infinite'
    const pid = 'tp' + i; line.setAttribute('id', pid); svg.appendChild(line)
    const circle = document.createElementNS(ns, 'circle')
    circle.setAttribute('r', '5'); circle.setAttribute('fill', agentColors[i] + ',.9)')
    circle.setAttribute('filter', 'url(#glow)')
    const anim = document.createElementNS(ns, 'animateMotion')
    anim.setAttribute('dur', 2.5 + i * 0.4 + 's'); anim.setAttribute('repeatCount', 'indefinite'); anim.setAttribute('begin', i * 0.6 + 's')
    const mpath = document.createElementNS(ns, 'mpath')
    mpath.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#' + pid)
    anim.appendChild(mpath); circle.appendChild(anim); svg.appendChild(circle)
    const c2 = document.createElementNS(ns, 'circle')
    c2.setAttribute('r', '3'); c2.setAttribute('fill', agentColors[i] + ',.5)')
    const a2 = document.createElementNS(ns, 'animateMotion')
    a2.setAttribute('dur', 3 + i * 0.3 + 's'); a2.setAttribute('repeatCount', 'indefinite')
    a2.setAttribute('begin', i * 0.8 + 1 + 's'); a2.setAttribute('keyPoints', '1;0')
    a2.setAttribute('keyTimes', '0;1'); a2.setAttribute('calcMode', 'linear')
    const mp2 = document.createElementNS(ns, 'mpath')
    mp2.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#' + pid)
    a2.appendChild(mp2); c2.appendChild(a2); svg.appendChild(c2)
  })
}

const agents = [
  { id: 'a1', style: { top: '2%', left: '12%' }, gradient: 'linear-gradient(135deg, #ffd4a8, #ffb87a)', shadow: '0 4px 24px rgba(232, 101, 58, 0.35)', letter: 'A', letterColor: '#c45a20', statusBg: 'var(--terra)', label: "Alex's Playla", sub: 'Age 8 · English', iconPath: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' },
  { id: 'a2', style: { top: '2%', right: '12%' }, gradient: 'linear-gradient(135deg, #b8e4d0, #7accaa)', shadow: '0 4px 24px rgba(52, 211, 153, 0.3)', letter: 'P', letterColor: '#2a7a5a', statusBg: 'var(--gold)', label: "Priya's Playla", sub: 'Age 9 · Spanish', iconPath: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-3-10l2 2 4-4' },
  { id: 'a3', style: { bottom: '8%', left: '12%' }, gradient: 'linear-gradient(135deg, #c4d8f8, #8ab4ec)', shadow: '0 4px 24px rgba(99, 102, 241, 0.3)', letter: 'R', letterColor: '#3a58c0', statusBg: 'var(--jade)', label: "Ryan's Playla", sub: 'Age 8 · French', iconPath: 'M20 6 9 17l-5-5' },
  { id: 'a4', style: { bottom: '8%', right: '12%' }, gradient: 'linear-gradient(135deg, #e8d0f0, #c8a0e0)', shadow: '0 4px 24px rgba(139, 92, 246, 0.3)', letter: 'M', letterColor: '#7a40b0', statusBg: 'var(--blue)', label: "Mia's Playla", sub: 'Age 10 · German', iconPath: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
]

export default function SocialLayer() {
  useEffect(() => {
    const t = setTimeout(drawLines, 400)
    const resizeHandler = () => setTimeout(drawLines, 200)
    window.addEventListener('resize', resizeHandler)
    return () => { clearTimeout(t); window.removeEventListener('resize', resizeHandler) }
  }, [])

  return (
    <section id="agents">
      <div className="max">
        <div className="section-header fade-up">
          <div className="section-tag" style={{ color: 'var(--purple2)', borderColor: 'rgba(139, 92, 246, 0.2)', background: 'rgba(139, 92, 246, 0.06)' }}>✦ The Social Layer</div>
          <h2 style={{ color: 'var(--text)' }}>Four children. Four Playlas.<br /><em>One shared world.</em></h2>
          <p className="agents-sub">Each child&apos;s Playla has a unique personality. When real friends connect on Playla, their AI companions link up — collaborating on projects, sharing stories, and growing together.</p>
        </div>
        <div className="agent-network fade-up" id="agentNetwork">
          <svg id="netSvg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2, pointerEvents: 'none' }}></svg>
          {agents.map(a => (
            <div key={a.id} className="agent-node" style={a.style} id={a.id}>
              <div className="agent-avatar" style={{ background: a.gradient, boxShadow: a.shadow }}>
                <span className="avatar-letter" style={{ color: a.letterColor }}>{a.letter}</span>
                <div className="agent-status" style={{ background: a.statusBg }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><path d={a.iconPath} /></svg>
                </div>
              </div>
              <div className="agent-label">{a.label}</div>
              <div className="agent-sublabel">{a.sub}</div>
            </div>
          ))}
          <div className="sakhi-node" id="playlaCenter">
            <div className="sakhi-avatar">
              <Image src="/sakhi-mascot.png" alt="Playla mascot icon in the social learning hub, connecting children for collaborative story-telling and group activities" className="sakhi-hub-img" width={42} height={42} />
            </div>
            <div className="sakhi-node-label">Playla Hub</div>
            <div className="sakhi-node-sub">Orchestrating collaboration</div>
          </div>
          <div className="conn-activity" style={{ top: '36%', left: '0%', '--delay': '0s' }}>
            <div className="conn-activity-title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--terra2)" strokeWidth="2" strokeLinecap="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
              Live: Study Session
            </div>
            <div className="conn-activity-item"><div className="conn-dot" style={{ background: 'var(--terra)', color: 'var(--terra)' }}></div>Alex sharing notes</div>
            <div className="conn-activity-item"><div className="conn-dot" style={{ background: 'var(--jade)', color: 'var(--jade)' }}></div>Ryan reviewing</div>
          </div>
          <div className="conn-activity" style={{ top: '36%', right: '0%', '--delay': '4s' }}>
            <div className="conn-activity-title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--purple2)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
              Story World
            </div>
            <div className="conn-activity-item"><div className="conn-dot" style={{ background: 'var(--gold)', color: 'var(--gold)' }}></div>Priya: Ch.4 written</div>
            <div className="conn-activity-item"><div className="conn-dot" style={{ background: 'var(--blue)', color: 'var(--blue)' }}></div>Mia: Ch.5 pending</div>
          </div>
        </div>
        <div className="social-caps fade-up">
          <div className="social-cap">
            <div className="sc-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--terra2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="m8 21 4-4 4 4" /><path d="M7 8h5M7 12h10" /></svg></div>
            <h4>Group Projects</h4><p>Tasks split by strength. Every child contributes.</p>
          </div>
          <div className="social-cap">
            <div className="sc-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--purple2)" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg></div>
            <h4>Story Worlds</h4><p>Co-created universes. New chapters need everyone.</p>
          </div>
          <div className="social-cap">
            <div className="sc-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--jade)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a8 8 0 0 0-8 8c0 3.4 2 6.2 5 7.5V20h6v-2.5c3-1.3 5-4.1 5-7.5a8 8 0 0 0-8-8z" /><path d="M9 22h6" /><path d="M10 13.5a2 2 0 0 0 4 0" /></svg></div>
            <h4>Study Circles</h4><p>Group quizzes and peer explanations.</p>
          </div>
          <div className="social-cap">
            <div className="sc-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg></div>
            <h4>Social Health</h4><p>Kindness tracking. Group dynamic alerts for parents.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
