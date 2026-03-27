'use client'

export default function ConsentBanner({ onAccept, onDecline }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      background: 'var(--bg2, #1a1a2e)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      padding: '14px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      flexWrap: 'wrap',
      fontFamily: 'var(--font-outfit), sans-serif',
      fontSize: 14,
      color: 'var(--text2, #b0b0c0)',
    }}>
      <span>We use cookies for anonymous analytics to improve our site. No personal data is collected.</span>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={onAccept}
          style={{
            background: 'var(--accent, #6c63ff)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '8px 18px',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Accept
        </button>
        <button
          onClick={onDecline}
          style={{
            background: 'transparent',
            color: 'var(--text3, #888)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8,
            padding: '8px 18px',
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Decline
        </button>
      </div>
    </div>
  )
}
