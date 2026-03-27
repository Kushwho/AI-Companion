'use client'

import { useEffect, useState, useCallback } from 'react'

export function useAnalyticsConsent() {
  const [consented, setConsented] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('analytics_consent')
    if (stored !== null) {
      setConsented(stored === 'true')
    }
  }, [])

  const grantConsent = useCallback(() => {
    localStorage.setItem('analytics_consent', 'true')
    setConsented(true)
  }, [])

  const denyConsent = useCallback(() => {
    localStorage.setItem('analytics_consent', 'false')
    setConsented(false)
  }, [])

  return { consented, grantConsent, denyConsent }
}
