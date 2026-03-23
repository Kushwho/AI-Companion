import Link from 'next/link'

export default function StoryBreadcrumbs({ items }) {
  return (
    <div className="story-breadcrumbs" role="navigation" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && <span className="sep">/</span>}
          {' '}
          {i === items.length - 1 ? (
            <span className="current">{item.label}</span>
          ) : (
            <Link href={item.href}>{item.label}</Link>
          )}
        </span>
      ))}
    </div>
  )
}
