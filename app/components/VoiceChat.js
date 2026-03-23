'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import Image from 'next/image'

const PLAYLA_BACKEND_URL = 'https://najthngxwe6g3lkyqn707x4f.34-47-239-31.sslip.io'

export default function VoiceChat() {
  const [connected, setConnected] = useState(false)
  const [status, setStatus] = useState('idle') // idle | connecting | connected
  const [statusText, setStatusText] = useState('Tap the mic to start')
  const [calmMode, setCalmMode] = useState(false)
  const [emotionName, setEmotionName] = useState('—')
  const [emotionScore, setEmotionScore] = useState(0)
  const [alertText, setAlertText] = useState('No concerns')
  const [alertColor, setAlertColor] = useState('var(--text3)')
  const [topics, setTopics] = useState([])
  const [mascotExpr, setMascotExpr] = useState('')
  const [isEndCall, setIsEndCall] = useState(false)
  const [showPanels, setShowPanels] = useState(false)

  const roomRef = useRef(null)
  const audioCtxRef = useRef(null)
  const analyserRef = useRef(null)
  const vizFrameRef = useRef(null)

  const animateVisualizer = useCallback(() => {
    const bars = document.querySelectorAll('.viz-bar')
    const analyser = analyserRef.current
    if (!analyser) return

    const dataArray = new Uint8Array(analyser.frequencyBinCount)
    function draw() {
      if (!roomRef.current) return
      vizFrameRef.current = requestAnimationFrame(draw)
      analyser.getByteFrequencyData(dataArray)
      bars.forEach((bar, i) => {
        const idx = Math.floor((i * dataArray.length) / bars.length)
        const val = dataArray[idx] || 0
        bar.style.height = Math.max(6, (val / 255) * 36) + 'px'
      })
    }
    draw()
  }, [])

  const animateFakeVisualizer = useCallback(() => {
    const bars = document.querySelectorAll('.viz-bar')
    function draw() {
      if (!roomRef.current) return
      vizFrameRef.current = requestAnimationFrame(draw)
      bars.forEach(bar => { bar.style.height = Math.max(6, Math.random() * 30 + 6) + 'px' })
    }
    draw()
  }, [])

  const setupVisualizer = useCallback(() => {
    try {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
      analyserRef.current = audioCtxRef.current.createAnalyser()
      analyserRef.current.fftSize = 64
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        const source = audioCtxRef.current.createMediaStreamSource(stream)
        source.connect(analyserRef.current)
        animateVisualizer()
      }).catch(() => animateFakeVisualizer())
    } catch { animateFakeVisualizer() }
  }, [animateVisualizer, animateFakeVisualizer])

  const updateEmotion = useCallback((name, score, expression) => {
    setEmotionName(name)
    setEmotionScore(Math.round(score * 100))
    setMascotExpr(expression)
    const lower = (name || '').toLowerCase()
    if (['sadness', 'distress', 'pain', 'anger', 'fear', 'anxiety', 'disappointment'].some(e => lower.includes(e))) {
      setAlertText(name + ' Detected')
      setAlertColor('var(--terra)')
    } else if (['joy', 'happiness', 'amusement', 'excitement', 'calmness', 'neutral', 'contentment'].some(e => lower.includes(e))) {
      setAlertText('No concerns')
      setAlertColor('var(--text3)')
    }
  }, [])

  const startCall = useCallback(async () => {
    setStatus('connecting')
    setStatusText('Connecting to Playla…')
    try {
      const res = await fetch(`${PLAYLA_BACKEND_URL}/api/demo-token`, { method: 'POST' })
      if (!res.ok) throw new Error('Failed to get demo token')
      const { token, livekit_url } = await res.json()

      const LivekitClient = (await import('livekit-client'))
      const room = new LivekitClient.Room({ adaptiveStream: true, dynacast: true })

      room.on(LivekitClient.RoomEvent.TrackSubscribed, (track) => {
        if (track.kind === LivekitClient.Track.Kind.Audio) {
          const el = track.attach()
          el.id = 'playla-agent-audio'
          document.body.appendChild(el)
        }
      })
      room.on(LivekitClient.RoomEvent.TrackUnsubscribed, (track) => {
        track.detach().forEach(el => el.remove())
      })

      room.localParticipant.registerRpcMethod('setEmotionState', async (data) => {
        try {
          const { expression, raw_emotion, score } = JSON.parse(data.payload)
          updateEmotion(raw_emotion, score, expression)
        } catch {}
        return JSON.stringify({ received: true })
      })

      room.localParticipant.registerRpcMethod('setTopics', async (data) => {
        try {
          const { topics: t } = JSON.parse(data.payload)
          setTopics(t || [])
        } catch {}
        return JSON.stringify({ received: true })
      })

      await room.connect(livekit_url, token)
      await room.localParticipant.setMicrophoneEnabled(true)

      roomRef.current = room
      setConnected(true)
      setIsEndCall(true)
      setShowPanels(true)
      setStatus('connected')
      setStatusText('Connected — speak to Playla')
      setupVisualizer()
    } catch (err) {
      console.error('Playla call error:', err)
      setStatus('idle')
      setStatusText('Connection failed — try again')
      setTimeout(() => setStatusText('Tap the mic to start'), 3000)
    }
  }, [setupVisualizer, updateEmotion])

  const endCall = useCallback(async () => {
    if (roomRef.current) {
      await roomRef.current.disconnect()
      roomRef.current = null
    }
    document.querySelectorAll('#playla-agent-audio').forEach(el => el.remove())
    if (vizFrameRef.current) cancelAnimationFrame(vizFrameRef.current)
    if (audioCtxRef.current) { audioCtxRef.current.close(); audioCtxRef.current = null }
    setConnected(false)
    setIsEndCall(false)
    setStatus('idle')
    setStatusText('Tap the mic to start')
    setMascotExpr('')
  }, [])

  const toggleCall = useCallback(() => {
    if (connected) endCall()
    else startCall()
  }, [connected, startCall, endCall])

  const toggleCalm = useCallback(() => setCalmMode(prev => !prev), [])

  return (
    <div className={`try-sakhi-card${calmMode ? ' calm-mode' : ''}`} id="trySakhiCard">
      <div className={`sakhi-voice-box${connected ? ' active' : ''}`} id="sakhiVoiceBox">
        <div className="sakhi-voice-mascot-container">
          <div className="mascot-halo" style={{ top: '50%', left: '50%', marginTop: -160, marginLeft: -160, width: 320, height: 320, opacity: 0.3 }}></div>
          <div className="mascot-halo-inner" style={{ top: '50%', left: '50%', marginTop: -100, marginLeft: -100, width: 200, height: 200, opacity: 0.3 }}></div>
          <div className="orbit orbit-1" style={{ width: 180, height: 180, opacity: 0.7 }}><div className="orbit-pip"></div><div className="orbit-pip p2"></div></div>
          <div className="orbit orbit-2" style={{ width: 260, height: 260, opacity: 0.6 }}><div className="orbit-pip"></div><div className="orbit-pip p2"></div></div>
          <div className="orbit orbit-3" style={{ width: 340, height: 340, opacity: 0.5 }}><div className="orbit-pip"></div><div className="orbit-pip p2"></div></div>
          <div className="msg-bubble b1" style={{ top: -10, left: -140 }}><span className="msg-icon">📖</span> Tell me a story!</div>
          <div className="msg-bubble b2" style={{ top: 10, right: -150 }}><span className="msg-icon">🌟</span> I got 95 in maths!</div>
          <div className="msg-bubble b3" style={{ top: 110, left: -150 }}><span className="msg-icon">😊</span> I&apos;m feeling happy today</div>
          <div className="msg-bubble b6" style={{ top: 130, right: -130 }}><span className="msg-icon">🌙</span> Bedtime story...</div>
          <div className={`sakhi-voice-mascot${mascotExpr ? ` expr-${mascotExpr}` : ''}`} id="sakhiMascot">
            <Image src="/sakhi-mascot.png" alt="Playla" width={150} height={150} />
          </div>
        </div>
        <div className="sakhi-voice-title">Talk to Playla</div>
        <div className="sakhi-voice-sub">Experience Playla live — tap the mic and start talking</div>
        <div className={`sakhi-visualizer${connected ? ' active' : ''}`} id="sakhiVisualizer">
          {Array.from({ length: 20 }).map((_, i) => <div key={i} className="viz-bar"></div>)}
        </div>
        <div className={`sakhi-mic-area${connected ? ' speaking' : ''}`} id="sakhiMicArea">
          <div className="sakhi-mic-ring"></div>
          <div className="sakhi-mic-ring-outer"></div>
          <button className={`sakhi-mic-btn${isEndCall ? ' end-call' : ''}`} onClick={toggleCall}>
            {isEndCall ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="22" />
              </svg>
            )}
          </button>
        </div>
        <div className={`sakhi-status ${status === 'connecting' ? 'connecting' : status === 'connected' ? 'connected' : ''}`}>
          <span className="status-dot"></span>
          <span>{statusText}</span>
        </div>
      </div>

      <div className="sakhi-side-panels" id="sakhiSidePanels">
        <div className={`sakhi-emotion-panel${showPanels ? ' show' : ''}`} id="sakhiEmotionPanel">
          <div className="sakhi-emotion-header">
            <span className="sakhi-emotion-label">Detected Emotion</span>
            <span className="sakhi-emotion-name">{emotionName}</span>
          </div>
          <div className="sakhi-emotion-bar-track">
            <div className="sakhi-emotion-bar-fill" style={{ width: `${emotionScore}%` }}></div>
          </div>
          <div className="sakhi-emotion-caption">Playla senses how you feel and adapts in real time</div>
        </div>

        <div className={`sakhi-emotion-panel${showPanels ? ' show' : ''}`} id="sakhiAlertPanel">
          <div className="sakhi-emotion-header">
            <span className="sakhi-emotion-label">Alerts</span>
            <span className="sakhi-emotion-name" style={{ color: alertColor, fontSize: 12 }}>{alertText}</span>
          </div>
          <div className="sakhi-emotion-caption" style={{ marginTop: 8 }}>Detects depressive or distress signals</div>
        </div>

        <div className={`sakhi-emotion-panel${showPanels ? ' show' : ''}`} id="sakhiTopicsPanel">
          <div className="sakhi-emotion-header">
            <span className="sakhi-emotion-label">Topics Explored</span>
          </div>
          <div className="sakhi-topics-list">
            {topics.length > 0 ? topics.map((t, i) => <div key={i} className="sakhi-topic-pill">{t}</div>) : <div className="sakhi-emotion-caption">Listening...</div>}
          </div>
        </div>

        <div className="calm-mode-wrapper">
          <div className="calm-toggle-row" onClick={toggleCalm}>
            <div className="calm-toggle-label"><span className="calm-icon">🌙</span> Calm Mode</div>
            <div className={`calm-switch${calmMode ? ' active' : ''}`}></div>
          </div>
          <div className={`calm-stats${calmMode ? ' show' : ''}`}>
            <div className="calm-stat-box"><span className="stat-icon">📉</span><span>Grayscale reduces screen time by <strong>27%</strong></span></div>
            <div className="calm-stat-box"><span className="stat-icon">🧠</span><span>Decreases perceived reward by <strong>20%</strong></span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
