import { formErrors } from "@/lib/form-errors"
import { rateLimit } from "@/lib/rate-limit"

export const MAX_FORM_BYTES = 12_000

const seen = new Map<string, number>()

export async function readJsonBody(request: Request) {
  const declared = Number(request.headers.get("content-length") || 0)
  if (Number.isFinite(declared) && declared > MAX_FORM_BYTES) {
    return { ok: false as const, status: 413, error: formErrors.invalid }
  }
  const type = request.headers.get("content-type") || ""
  if (!type.toLowerCase().includes("application/json")) {
    return { ok: false as const, status: 415, error: formErrors.invalid }
  }
  const text = await request.text()
  if (text.length > MAX_FORM_BYTES) {
    return { ok: false as const, status: 413, error: formErrors.invalid }
  }
  try {
    const value = JSON.parse(text) as unknown
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return { ok: false as const, status: 400, error: formErrors.invalid }
    }
    return { ok: true as const, value: value as Record<string, unknown> }
  } catch {
    return { ok: false as const, status: 400, error: formErrors.invalid }
  }
}

export function allowForm(ip: string) {
  return rateLimit(`form:${ip}`)
}

export async function fingerprint(parts: string[]) {
  const data = new TextEncoder().encode(parts.map((part) => part.trim().toLowerCase()).join("|"))
  const digest = await crypto.subtle.digest("SHA-256", data)
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("")
}

/** True when this same enquiry was already accepted inside the window. */
export function alreadyReceived(key: string, windowMs = 30 * 60 * 1000) {
  const now = Date.now()
  for (const [saved, time] of seen) {
    if (now - time >= windowMs) seen.delete(saved)
  }
  const previous = seen.get(key)
  if (previous && now - previous < windowMs) return true
  seen.set(key, now)
  return false
}

export async function turnstilePasses(token: unknown, secret: string | undefined, ip: string) {
  if (!secret) return true
  if (typeof token !== "string" || token.length < 10 || token.length > 2048) return false
  const body = new URLSearchParams({ secret, response: token })
  if (ip && ip !== "local") body.set("remoteip", ip)
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
    })
    if (!response.ok) return false
    const result = (await response.json()) as { success?: boolean }
    return result.success === true
  } catch {
    return false
  }
}
