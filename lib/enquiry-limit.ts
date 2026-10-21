const KEY = "myscapez-enquiry-times"

export function allowEnquiry(max = 5, windowMs = 10 * 60 * 1000) {
  if (typeof window === "undefined") return true
  const now = Date.now()
  let times: number[] = []
  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) || "[]") as unknown
    if (Array.isArray(parsed)) times = parsed.filter((time): time is number => typeof time === "number")
  } catch {
    times = []
  }
  const recent = times.filter((time) => now - time < windowMs)
  if (recent.length >= max) return false
  recent.push(now)
  window.localStorage.setItem(KEY, JSON.stringify(recent))
  return true
}
