'use client'

export default function GenrePills({ genres, selected, onSelect }) {
  return (
    <div className="story-gen-pills" role="tablist" aria-label="Story genres">
      {genres.map((g) => (
        <a
          key={g.genreId}
          href={`/stories/${g.slug}`}
          role="tab"
          aria-selected={selected === g.genreId}
          className={`genre-pill${selected === g.genreId ? ' active' : ''}`}
          onClick={(e) => {
            e.preventDefault()
            onSelect(g.genreId)
          }}
        >
          <span className="pill-emoji">{g.emoji}</span>
          {g.name}
        </a>
      ))}
    </div>
  )
}
