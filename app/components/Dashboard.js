'use client'

import { useState } from 'react'

const tabs = [
  { icon: '🧠', bg: 'rgba(232, 101, 58, 0.1)', title: 'Learning Progress', sub: 'Mastery maps, weak spots, skill growth' },
  { icon: '💚', bg: 'rgba(52, 211, 153, 0.08)', title: 'Emotional Health', sub: 'Mood trends, triggers, crisis alerts' },
  { icon: '👥', bg: 'rgba(99, 102, 241, 0.08)', title: 'Social Confidence', sub: 'Group engagement, participation score' },
  { icon: '🏆', bg: 'rgba(245, 158, 11, 0.08)', title: 'Monthly Report', sub: 'Milestones, strengths, growth summary' },
]

const headers = [
  { name: 'Alex Thompson', age: 'Age 8 · Grade 3', badge: 'Week 12 of 52', dots: ['#34D399', '#F59E0B', '#E8653A'] },
  { name: 'Alex Thompson', age: 'Age 8 · Emotional Wellness', badge: 'This Week', dots: ['#34D399', '#34D399', '#F59E0B'] },
  { name: 'Alex Thompson', age: 'Age 8 · Social Health', badge: 'Group Activity', dots: ['#6366F1', '#34D399', '#34D399'] },
  { name: 'Alex Thompson', age: 'Age 8 · Monthly Summary', badge: 'March 2026', dots: ['#F59E0B', '#34D399', '#6366F1'] },
]

function LearningTab() {
  const barData = [{ a: 70, p: 20 }, { a: 85, p: 10 }, { a: 50, p: 30 }, { a: 90, p: 8 }, { a: 65, p: 25 }, { a: 95, p: 5 }, { a: 72, p: 18 }]
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const subjects = [['Mathematics', '#34D399', 84], ['Science', '#6366F1', 72], ['English Reading', '#F59E0B', 67], ['Writing', '#E8653A', 91], ['Fractions (focus)', '#E8653A', 38]]
  return (
    <div className="db-body">
      <div className="db-row db-row-3">
        <div className="db-stat"><div className="db-stat-top"><span className="db-stat-label">Maths</span><span className="db-stat-badge" style={{ background: 'rgba(52,211,153,.12)', color: '#34D399' }}>Strong</span></div><div className="db-stat-val" style={{ color: '#34D399' }}>84%</div><div className="db-stat-sub">Mastery score</div><div className="db-stat-trend trend-up">↑ 6% from last week</div></div>
        <div className="db-stat"><div className="db-stat-top"><span className="db-stat-label">Science</span><span className="db-stat-badge" style={{ background: 'rgba(245,158,11,.12)', color: '#F59E0B' }}>Growing</span></div><div className="db-stat-val" style={{ color: '#F59E0B' }}>61%</div><div className="db-stat-sub">Mastery score</div><div className="db-stat-trend trend-up">↑ 3% from last week</div></div>
        <div className="db-stat"><div className="db-stat-top"><span className="db-stat-label">Fractions</span><span className="db-stat-badge" style={{ background: 'rgba(232,101,58,.12)', color: '#E8653A' }}>Weak</span></div><div className="db-stat-val" style={{ color: '#E8653A' }}>38%</div><div className="db-stat-sub">Needs attention</div><div className="db-stat-trend trend-dn">↓ 2% this week</div></div>
      </div>
      <div className="db-chart">
        <div className="db-chart-header"><span className="db-chart-title">Study sessions — last 7 days</span><div className="db-chart-legend"><span className="db-legend-item"><div className="db-legend-dot" style={{ background: '#34D399' }}></div>Active</span><span className="db-legend-item"><div className="db-legend-dot" style={{ background: '#F59E0B' }}></div>Passive</span></div></div>
        <div className="bar-chart">{barData.map((d, i) => <div key={i} className="bar-wrap"><div className="bar" style={{ height: `${d.a + d.p}%`, background: `linear-gradient(to top,rgba(245,158,11,.5) ${(d.p / (d.a + d.p)) * 100}%,#34D399 ${(d.p / (d.a + d.p)) * 100}%)` }}></div><span className="bar-lbl">{days[i]}</span></div>)}</div>
      </div>
      <div className="db-chart">
        <div className="db-chart-header"><span className="db-chart-title">Subject mastery breakdown</span></div>
        <div className="prog-row">{subjects.map(([n, c, p], i) => <div key={i} className="prog-item"><div className="prog-top"><span className="prog-name">{n}</span><span className="prog-pct" style={{ color: c }}>{p}%</span></div><div className="prog-track"><div className="prog-fill" style={{ width: `${p}%`, background: c }}></div></div></div>)}</div>
      </div>
      <div className="db-alert" style={{ background: 'rgba(232,101,58,.06)', borderColor: 'rgba(232,101,58,.2)' }}><span className="db-alert-icon">💡</span><div className="db-alert-body"><div className="db-alert-title" style={{ color: '#FF7A50' }}>Weak Concept Detected</div><div className="db-alert-msg">Alex is consistently struggling with fractions — 3 sessions flagged this week. Recommended: 15 min focused practice on Wed/Thu evenings.</div></div></div>
    </div>
  )
}

function EmotionalTab() {
  const moods = [72, 85, 48, 92, 44, 90, 74]
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const emotions = [['😊', 'Happy', '#34D399', 74], ['😌', 'Calm', '#6366F1', 52], ['😰', 'Anxious', '#F59E0B', 14], ['😢', 'Sad', '#E8653A', 6], ['🤩', 'Excited', '#F59E0B', 62], ['😤', 'Frustrated', '#E8653A', 18]]
  return (
    <div className="db-body">
      <div className="db-row db-row-3">
        <div className="db-stat"><div className="db-stat-top"><span className="db-stat-label">Happiness Index</span></div><div className="db-stat-val" style={{ color: '#34D399' }}>74%</div><div className="db-stat-sub">7-day average</div><div className="db-stat-trend trend-up">↑ 8% vs last week</div></div>
        <div className="db-stat"><div className="db-stat-top"><span className="db-stat-label">Anxiety Score</span></div><div className="db-stat-val" style={{ color: '#F59E0B' }}>14%</div><div className="db-stat-sub">Within normal range</div><div className="db-stat-trend trend-up">↓ 4% vs last week</div></div>
        <div className="db-stat"><div className="db-stat-top"><span className="db-stat-label">Confidence</span></div><div className="db-stat-val" style={{ color: '#6366F1' }}>68%</div><div className="db-stat-sub">Voice tone analysis</div><div className="db-stat-trend trend-up">↑ 5% this month</div></div>
      </div>
      <div className="db-chart">
        <div className="db-chart-header"><span className="db-chart-title">Mood pattern — last 7 days</span></div>
        <div className="bar-chart">{moods.map((h, i) => <div key={i} className="bar-wrap"><div className="bar" style={{ height: `${h}%`, background: h > 70 ? '#34D399' : h > 55 ? '#F59E0B' : '#E8653A' }}></div><span className="bar-lbl">{days[i]}</span></div>)}</div>
      </div>
      <div className="db-chart">
        <div className="db-chart-header"><span className="db-chart-title">Emotion breakdown this week</span></div>
        <div className="emotion-grid">{emotions.map(([e, n, c, p], i) => <div key={i} className="emotion-item"><span className="emotion-emoji">{e}</span><div className="emotion-info"><div className="emotion-name">{n} <span style={{ color: c, fontSize: 10, fontWeight: 700 }}>{p}%</span></div><div className="emotion-bar"><div className="emotion-bar-fill" style={{ width: `${p}%`, background: c }}></div></div></div></div>)}</div>
      </div>
      <div className="db-alert" style={{ background: 'rgba(245,158,11,.06)', borderColor: 'rgba(245,158,11,.2)' }}><span className="db-alert-icon">📌</span><div className="db-alert-body"><div className="db-alert-title" style={{ color: '#F59E0B' }}>Pattern Detected</div><div className="db-alert-msg">Anxiety spikes consistently on Sunday evenings — likely school-week anticipation. Consider a calming Sunday bedtime routine with Playla.</div></div></div>
    </div>
  )
}

function SocialTab() {
  const activities = [
    ['Science Project', 'Led group — contributed intro + data', '#34D399', 'Done ✓'],
    ['Quiz Night', 'Participated — scored 8/10', '#6366F1', 'Done ✓'],
    ['Story World Ch.5', 'Co-authored with Priya', '#F59E0B', 'In progress'],
    ['Science revision', 'Facilitated group review', '#34D399', 'Done ✓'],
  ]
  return (
    <div className="db-body">
      <div className="db-row db-row-3">
        <div className="db-stat"><div className="db-stat-top"><span className="db-stat-label">Active Friends</span><span className="db-stat-badge" style={{ background: 'rgba(99,102,241,.12)', color: '#6366F1' }}>Healthy</span></div><div className="db-stat-val" style={{ color: '#6366F1' }}>3</div><div className="db-stat-sub">Ryan, Priya, Mia</div><div className="db-stat-trend trend-nt">Same as last week</div></div>
        <div className="db-stat"><div className="db-stat-top"><span className="db-stat-label">Participation</span></div><div className="db-stat-val" style={{ color: '#34D399' }}>78%</div><div className="db-stat-sub">Group sessions</div><div className="db-stat-trend trend-up">↑ 12% this month</div></div>
        <div className="db-stat"><div className="db-stat-top"><span className="db-stat-label">Leadership</span></div><div className="db-stat-val" style={{ color: '#F59E0B' }}>3×</div><div className="db-stat-sub">Led group this week</div><div className="db-stat-trend trend-up">New high ↑</div></div>
      </div>
      <div className="db-chart">
        <div className="db-chart-header"><span className="db-chart-title">Group activities this week</span></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{activities.map(([a, d, c, s], i) => <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: 'var(--surface)', borderRadius: 10, border: '1px solid var(--border)' }}><div><div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 3 }}>{a}</div><div style={{ fontSize: 12, color: 'var(--text3)' }}>{d}</div></div><span style={{ fontSize: 11, color: c, background: c + '15', padding: '4px 12px', borderRadius: 20, whiteSpace: 'nowrap' }}>{s}</span></div>)}</div>
      </div>
      <div className="db-alert" style={{ background: 'rgba(52,211,153,.06)', borderColor: 'rgba(52,211,153,.2)' }}><span className="db-alert-icon">✅</span><div className="db-alert-body"><div className="db-alert-title" style={{ color: '#34D399' }}>Healthy Group Dynamic</div><div className="db-alert-msg">Alex is actively contributing and leading group sessions. Social confidence improving week-on-week. No isolation signals detected.</div></div></div>
    </div>
  )
}

function MonthlyTab() {
  const strengths = [['Curiosity', '#F59E0B', 88], ['Empathy', '#34D399', 76], ['Persistence', '#6366F1', 62], ['Creativity', '#E8653A', 80], ['Leadership', '#F59E0B', 54]]
  const milestones = [['🏆', 'Led first group project independently — EVS received school praise'], ['📖', 'Co-authored 12-chapter story with friends across 3 weeks'], ['🧠', 'Mastered multiplication tables — zero prompts needed'], ['💚', 'Cried once, talked to Playla, resolved it — emotional growth detected']]
  return (
    <div className="db-body">
      <div className="db-row db-row-3">
        <div className="db-stat"><div className="db-stat-top"><span className="db-stat-label">Skills Unlocked</span></div><div className="db-stat-val" style={{ color: '#F59E0B' }}>12</div><div className="db-stat-sub">Across all subjects</div><div className="db-stat-trend trend-up">Best month yet ↑</div></div>
        <div className="db-stat"><div className="db-stat-top"><span className="db-stat-label">Stories Heard</span></div><div className="db-stat-val" style={{ color: '#6366F1' }}>47</div><div className="db-stat-sub">14 co-created</div><div className="db-stat-trend trend-up">↑ 18 vs Feb</div></div>
        <div className="db-stat"><div className="db-stat-top"><span className="db-stat-label">Growth Score</span></div><div className="db-stat-val" style={{ color: '#34D399' }}>9.1</div><div className="db-stat-sub">Out of 10</div><div className="db-stat-trend trend-up">Top 15% nationally</div></div>
      </div>
      <div className="db-chart">
        <div className="db-chart-header"><span className="db-chart-title">Character strengths identified by AI</span></div>
        <div className="prog-row">{strengths.map(([n, c, p], i) => <div key={i} className="prog-item"><div className="prog-top"><span className="prog-name">{n}</span><span className="prog-pct" style={{ color: c }}>{p}%</span></div><div className="prog-track"><div className="prog-fill" style={{ width: `${p}%`, background: c }}></div></div></div>)}</div>
      </div>
      <div className="milestone-list">{milestones.map(([icon, text], i) => <div key={i} className="milestone-item"><span className="milestone-icon">{icon}</span><span className="milestone-text">{text}</span></div>)}</div>
    </div>
  )
}

const tabPanels = [LearningTab, EmotionalTab, SocialTab, MonthlyTab]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(0)
  const h = headers[activeTab]
  const TabContent = tabPanels[activeTab]

  return (
    <section id="dashboard">
      <div className="max">
        <div className="section-header fade-up">
          <div className="section-tag" style={{ color: 'var(--terra2)', borderColor: 'rgba(232, 101, 58, 0.15)', background: 'rgba(232, 101, 58, 0.05)' }}>✦ Parent Dashboard</div>
          <h2>Know how your child<br /><em>is really doing.</em></h2>
          <p className="sub">Spot learning gaps before report cards, catch social anxiety early, and celebrate small wins daily. Professional-grade insights right on your phone.</p>
        </div>
        <div className="dash-layout">
          <div className="dash-tabs" id="dashTabs">
            {tabs.map((t, i) => (
              <div key={i} className={`dash-tab${i === activeTab ? ' active' : ''}`} onClick={() => setActiveTab(i)}>
                <div className="dt-icon" style={{ background: t.bg }}>{t.icon}</div>
                <div className="dt-text"><h4>{t.title}</h4><p>{t.sub}</p></div>
              </div>
            ))}
          </div>
          <div className="dash-main" id="dashMain">
            <div className="db-header">
              <div className="db-header-left">
                <div className="db-child-avatar">🧒</div>
                <div><div className="db-child-name">{h.name}</div><div className="db-child-meta">{h.age}</div></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="db-status-row">{h.dots.map((c, i) => <div key={i} className="db-status-dot" style={{ background: c }}></div>)}</div>
                <div className="db-date-range">{h.badge}</div>
              </div>
            </div>
            <TabContent />
          </div>
        </div>
        <div className="dash-privacy"><span>🔒</span><p><strong>Conversations are never read by us, never sold.</strong> Emotion tracking analyses patterns only — not content.</p></div>
      </div>
    </section>
  )
}
