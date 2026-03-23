'use client'

export default function PromptChips({ chips, onSelect }) {
  if (!chips || chips.length === 0) return null
  return (
    <div className="prompt-chips">
      {chips.map((chip, i) => (
        <button
          key={i}
          type="button"
          className="prompt-chip"
          onClick={() => onSelect(chip)}
        >
          {chip}
        </button>
      ))}
    </div>
  )
}
