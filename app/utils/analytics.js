export function trackEvent(eventName, params) {
  if (typeof window === 'undefined' || !window.gtag) return
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Analytics] ${eventName}`, params)
    return
  }
  window.gtag('event', eventName, params)
}

export function trackAppCtaClick(location, text) {
  trackEvent('app_cta_click', {
    cta_location: location,
    cta_text: text,
    page_path: window.location.pathname,
  })
}

export function trackWaitlistSignup(source) {
  trackEvent('waitlist_signup', {
    signup_source: source,
    page_path: window.location.pathname,
  })
}

export function trackStoryGenerated(topic, genre) {
  trackEvent('story_generated', {
    story_topic: topic,
    genre,
    page_path: window.location.pathname,
  })
}

export function trackVoiceDemoStarted() {
  trackEvent('voice_demo_started', {
    page_path: window.location.pathname,
  })
}

export function trackVoiceDemoEnded() {
  trackEvent('voice_demo_ended', {
    page_path: window.location.pathname,
  })
}
