const hits = new Map<string, number[]>()

/** Per server instance. A limit here slows one running server. It does not share a counter across every Vercel instance. */
export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs)
  if (recent.length >= limit) {
    hits.set(key, recent)
    return false
  }
  recent.push(now)
  hits.set(key, recent)
  return true
}
