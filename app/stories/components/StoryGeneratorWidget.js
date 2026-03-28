'use client'

import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { trackStoryGenerated } from '@/app/utils/analytics'
import GenrePills from './GenrePills'
import PromptChips from './PromptChips'
import SceneReader from './SceneReader'

const LOADING_MESSAGES = [
  'Playla is crafting your story...',
  'Painting the scenes...',
  'Adding the narration...',
  'Bringing characters to life...',
  'Almost there...',
]

export default function StoryGeneratorWidget({
  genres,
  defaultGenre = '',
  defaultPrompt = '',
  promptChips = [],
  childAge,
  numScenes = 3,
}) {
  const [selectedGenre, setSelectedGenre] = useState(defaultGenre)
  const [prompt, setPrompt] = useState(defaultPrompt)
  const [phase, setPhase] = useState('idle')
  const [story, setStory] = useState(null)
  const [error, setError] = useState(null)
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0])
  const [eta, setEta] = useState(30)
  const msgInterval = useRef(null)
  const etaInterval = useRef(null)

  const activeGenre = useMemo(
    () => genres.find((g) => g.genreId === selectedGenre),
    [genres, selectedGenre]
  )
  const currentChips = activeGenre?.promptChips || promptChips

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      if (msgInterval.current) clearInterval(msgInterval.current)
      if (etaInterval.current) clearInterval(etaInterval.current)
    }
  }, [])

  const handleSurprise = useCallback(() => {
    const randomGenre = genres[Math.floor(Math.random() * genres.length)]
    setSelectedGenre(randomGenre.genreId)
    const chips = randomGenre.promptChips || []
    if (chips.length > 0) {
      setPrompt(chips[Math.floor(Math.random() * chips.length)])
    }
  }, [genres])

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) return

    if (msgInterval.current) clearInterval(msgInterval.current)

    setPhase('generating')
    setError(null)
    setLoadingMsg(LOADING_MESSAGES[0])
    setEta(45)

    let msgIdx = 0
    msgInterval.current = setInterval(() => {
      msgIdx = (msgIdx + 1) % LOADING_MESSAGES.length
      setLoadingMsg(LOADING_MESSAGES[msgIdx])
    }, 5000)

    etaInterval.current = setInterval(() => {
      setEta((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    try {
      const res = await fetch('/api/stories/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea: prompt.trim(),
          genre: selectedGenre || 'adventure',
          num_scenes: numScenes,
          child_age: childAge || 7,
          aspect_ratio: '16:9',
          output_format: 'webp',
        }),
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error || 'Story generation failed. Please try again.')
      }

      const data = await res.json()
      setStory(data)
      setPhase('reading')
      trackStoryGenerated(prompt.trim(), selectedGenre || 'adventure')
    } catch (err) {
      setError(err.message)
      setPhase('idle')
    } finally {
      clearInterval(msgInterval.current)
      clearInterval(etaInterval.current)
    }
  }, [prompt, selectedGenre, numScenes, childAge])

  const handleNewStory = useCallback(() => {
    setStory(null)
    setPrompt('')
    setPhase('idle')
  }, [])

  return (
    <div className="story-gen-card">
      {phase === 'reading' && story && (
        <SceneReader story={story} onNewStory={handleNewStory} />
      )}

      {phase === 'generating' && (
        <div className="story-loading">
          <div className="story-loading-spinner" />
          <p className="story-loading-text">{loadingMsg}</p>
          <p className="story-loading-eta">
            {eta > 0 ? `Estimated time: ~${eta}s` : 'Taking a bit longer...'}
          </p>
        </div>
      )}

      {phase === 'idle' && (
        <>
          <GenrePills genres={genres} selected={selectedGenre} onSelect={setSelectedGenre} />

          <div className="story-gen-input-area">
            <textarea
              className="story-gen-textarea"
              placeholder={activeGenre?.promptPlaceholder || "Describe your story idea... e.g., 'A brave astronaut discovers a hidden planet made of music'"}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              maxLength={500}
              rows={3}
            />
          </div>

          <PromptChips chips={currentChips} onSelect={setPrompt} />

          <div className="story-gen-actions">
            <button
              className="btn-generate"
              onClick={handleGenerate}
              disabled={!prompt.trim()}
            >
              ✦ Generate Story
            </button>
            <button className="btn-surprise" onClick={handleSurprise}>
              🎲 Surprise Me
            </button>
          </div>

          {error && (
            <div className="story-error">
              <p>{error}</p>
              <button className="btn-surprise" onClick={() => setError(null)}>Try Again</button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
