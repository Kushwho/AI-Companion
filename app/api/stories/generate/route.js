export async function POST(request) {
  const body = await request.json()
  const { idea, genre, num_scenes, child_age, setting, aspect_ratio, output_format } = body

  if (!idea || typeof idea !== 'string' || idea.trim().length === 0) {
    return Response.json({ error: 'Story idea is required' }, { status: 400 })
  }

  if (idea.length > 500) {
    return Response.json({ error: 'Story idea must be under 500 characters' }, { status: 400 })
  }

  const BACKEND_URL = process.env.STORY_BACKEND_URL || 'https://34-180-58-37.sslip.io'

  try {
    const payload = { idea: idea.trim() }
    if (genre) payload.genre = genre
    if (num_scenes) payload.num_scenes = num_scenes
    if (child_age) payload.child_age = child_age
    if (setting) payload.setting = setting
    if (aspect_ratio) payload.aspect_ratio = aspect_ratio
    if (output_format) payload.output_format = output_format

    const res = await fetch(`${BACKEND_URL}/api/stories/public/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const errBody = await res.text().catch(() => '')
      console.error('Story backend error:', res.status, errBody)
      return Response.json(
        { error: 'Story generation failed. Please try again.' },
        { status: res.status >= 500 ? 502 : res.status }
      )
    }

    const data = await res.json()
    return Response.json(data)
  } catch (err) {
    console.error('Story backend unreachable:', err.message)
    return Response.json(
      { error: 'Story service is temporarily unavailable. Please try again later.' },
      { status: 503 }
    )
  }
}
