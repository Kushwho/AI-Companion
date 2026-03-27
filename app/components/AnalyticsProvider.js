'use client'

import { useAnalyticsConsent } from '@/app/hooks/useAnalyticsConsent'
import Analytics from './Analytics'
import ConsentBanner from './ConsentBanner'

export default function AnalyticsProvider() {
  const { consented, grantConsent, denyConsent } = useAnalyticsConsent()

  return (
    <>
      {consented === true && <Analytics />}
      {consented === null && (
        <ConsentBanner onAccept={grantConsent} onDecline={denyConsent} />
      )}
    </>
  )
}
