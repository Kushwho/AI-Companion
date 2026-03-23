'use client'

import { useEffect, useState } from 'react'
import 'driver.js/dist/driver.css'

export default function Tour() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('playla_tour_seen')
    if (!hasSeenTour) {
      const t = setTimeout(() => setShow(true), 3000)
      return () => clearTimeout(t)
    }
  }, [])

  function dismiss() {
    setShow(false)
    localStorage.setItem('playla_tour_seen', 'true')
  }

  async function startTour() {
    dismiss()
    const emotionPanel = document.getElementById('sakhiEmotionPanel')
    const alertPanel = document.getElementById('sakhiAlertPanel')
    const topicsPanel = document.getElementById('sakhiTopicsPanel')
    if (emotionPanel) emotionPanel.classList.add('show')
    if (alertPanel) alertPanel.classList.add('show')
    if (topicsPanel) topicsPanel.classList.add('show')

    const driverModule = await import('driver.js')
    const driver = driverModule.driver
    const driverObj = driver({
      showProgress: true,
      animate: true,
      onDestroyStarted: () => {
        if (emotionPanel) emotionPanel.classList.remove('show')
        if (alertPanel) alertPanel.classList.remove('show')
        if (topicsPanel) topicsPanel.classList.remove('show')
        driverObj.destroy()
      },
      steps: [
        { element: '#sakhiVoiceBox', popover: { title: 'Talk to Playla 🎙️', description: 'Tap the mic icon to start a live voice conversation with Playla for bedtime stories or patient homework help.', side: 'left', align: 'start' } },
        { element: '.calm-mode-wrapper', popover: { title: 'Calm Mode 🌙', description: 'Toggle this to reduce screen time and dopamine by turning the interface grayscale and minimal.', side: 'bottom', align: 'start' } },
        { element: '#sakhiEmotionPanel', popover: { title: 'Emotion & Alerts 💚', description: "Real-time insights into your child's mood and early distress signals inferred from their conversation.", side: 'left', align: 'start' } },
        { element: '#sakhiTopicsPanel', popover: { title: 'Topics Explored 📚', description: 'See exactly what subjects or stories your child is engaging with recently.', side: 'left', align: 'start' } },
      ],
    })
    driverObj.drive()
  }

  if (!show) return null

  return (
    <div className={`tour-popup-overlay${show ? ' show' : ''}`} id="tourPopupOverlay">
      <div className="tour-popup">
        <div className="tour-popup-icon">✨</div>
        <h3>Welcome to Playla</h3>
        <p>Would you like a quick tour to see how Playla helps your child learn and keeps you informed?</p>
        <div className="tour-popup-actions">
          <button className="btn btn-ghost" onClick={dismiss}>Skip for now</button>
          <button className="btn btn-primary" onClick={startTour}>Start Tour</button>
        </div>
      </div>
    </div>
  )
}
