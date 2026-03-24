'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import AudioPlayer from './AudioPlayer'

export default function SceneReader({ story, onNewStory }) {
  const [sceneIndex, setSceneIndex] = useState(0)
  const [ended, setEnded] = useState(false)
  const [listening, setListening] = useState(false)
  const autoAdvanceTimer = useRef(null)

  const scene = story.scenes[sceneIndex]
  const isLastScene = sceneIndex === story.scenes.length - 1

  useEffect(() => {
    setSceneIndex(0)
    setEnded(false)
    setListening(false)
  }, [story])

  useEffect(() => {
    return () => {
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current)
    }
  }, [])

  const goToScene = useCallback((idx) => {
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current)
    if (idx >= 0 && idx < story.scenes.length) {
      setSceneIndex(idx)
      setEnded(false)
    }
  }, [story.scenes.length])

  const handleAudioEnded = useCallback(() => {
    if (isLastScene) {
      autoAdvanceTimer.current = setTimeout(() => setEnded(true), 500)
    } else {
      autoAdvanceTimer.current = setTimeout(() => {
        setSceneIndex((i) => i + 1)
      }, 500)
    }
  }, [isLastScene])

  // Auto-advance without audio — faster timing
  useEffect(() => {
    if (listening && scene?.audio_url) return
    if (ended) return

    const wordCount = (scene?.story_text || '').split(/\s+/).length
    const readingTimeSec = Math.min(Math.max(Math.ceil(wordCount / 3.3), 3), 12)

    autoAdvanceTimer.current = setTimeout(() => {
      if (isLastScene) {
        setEnded(true)
      } else {
        setSceneIndex((i) => i + 1)
      }
    }, readingTimeSec * 1000)

    return () => {
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current)
    }
  }, [sceneIndex, isLastScene, ended, listening, scene?.audio_url, scene?.story_text])

  const handleListen = () => {
    setListening(true)
  }

  const handleStopListening = () => {
    setListening(false)
  }

  if (ended) {
    return (
      <div className="story-end-card">
        <h2>The End</h2>
        <p>We hope you enjoyed &ldquo;{story.title}&rdquo;</p>
        <div className="story-end-actions">
          <button className="btn-surprise" onClick={() => { setEnded(false); setSceneIndex(0); setListening(false) }}>
            Read Again
          </button>
          <button className="btn-generate" onClick={onNewStory}>
            Try New Story
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="scene-reader">
      <div className="scene-reader-header">
        <div className="scene-title-row">
          <h2 className="story-title">{story.title}</h2>
          {scene.audio_url && !listening && (
            <button className="btn-listen-inline" onClick={handleListen}>
              🔊 Listen
            </button>
          )}
          {listening && (
            <button className="btn-listen-inline active" onClick={handleStopListening}>
              🔇 Stop
            </button>
          )}
        </div>
        <span className="scene-badge">
          Scene {scene.scene_number} of {story.total_scenes}
        </span>
      </div>

      <div className="scene-image-wrap">
        {scene.image_url ? (
          <img src={scene.image_url} alt={`Scene ${scene.scene_number} illustration`} loading="lazy" />
        ) : (
          <div className="scene-image-placeholder">🎨</div>
        )}
      </div>

      <div className="scene-text">{scene.story_text}</div>

      {listening && scene.audio_url && (
        <AudioPlayer
          src={scene.audio_url}
          onEnded={handleAudioEnded}
          autoPlay={true}
        />
      )}

      <div className="scene-nav">
        <button
          className="scene-nav-btn"
          disabled={sceneIndex === 0}
          onClick={() => goToScene(sceneIndex - 1)}
        >
          ← Previous
        </button>
        <div className="scene-dots">
          {story.scenes.map((_, i) => (
            <button
              key={i}
              className={`scene-dot${i === sceneIndex ? ' active' : ''}`}
              onClick={() => goToScene(i)}
              aria-label={`Go to scene ${i + 1}`}
            />
          ))}
        </div>
        <button
          className="scene-nav-btn"
          disabled={isLastScene}
          onClick={() => goToScene(sceneIndex + 1)}
        >
          Next →
        </button>
      </div>
    </div>
  )
}
