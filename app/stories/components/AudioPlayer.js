'use client'

import { useRef, useState, useEffect, useCallback } from 'react'

export default function AudioPlayer({ src, onEnded, autoPlay = true }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [duration, setDuration] = useState(0)
  const [displayTime, setDisplayTime] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !src) return

    audio.src = src
    audio.load()

    if (autoPlay) {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    }

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [src, autoPlay])

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    const floored = Math.floor(audio.currentTime)
    setDisplayTime((prev) => {
      if (prev === floored) return prev
      return floored
    })
    setProgress((audio.currentTime / audio.duration) * 100)
  }, [])

  const handleLoadedMetadata = useCallback(() => {
    setDuration(audioRef.current?.duration || 0)
  }, [])

  const handleEnded = useCallback(() => {
    setPlaying(false)
    setProgress(100)
    onEnded?.()
  }, [onEnded])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !audio.muted
    setMuted(!muted)
  }

  const handleProgressClick = (e) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    audio.currentTime = pct * audio.duration
  }

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  if (!src) return null

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
      <button className="audio-btn" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
        {playing ? '⏸' : '▶'}
      </button>
      <div className="audio-progress" onClick={handleProgressClick}>
        <div className="audio-progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <span className="audio-time">
        {formatTime(displayTime)}/{formatTime(duration)}
      </span>
      <button className="audio-mute-btn" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
        {muted ? '🔇' : '🔊'}
      </button>
    </div>
  )
}
