import { bookingExtras, frequencies, jobById, lawnSizes, propertyTypes } from "@/lib/work-catalog"
import { seqSuburbs } from "@/lib/seq-directory"

/** Plain text only. Angle brackets are removed so a form value cannot be stored as markup. */
export function plainText(value: unknown, max = 200) {
  return String(value ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, max)
}

export function plainEmail(value: unknown) {
  const email = plainText(value, 254).toLowerCase()
  return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email) ? email : ""
}

export function plainPhone(value: unknown) {
  return String(value ?? "").replace(/\D/g, "").slice(0, 15)
}

function oneOf(value: unknown, allowed: readonly string[]) {
  const text = plainText(value, 40)
  return allowed.includes(text) ? text : ""
}

export function canonicalSuburb(value: unknown) {
  const text = plainText(value, 80).toLowerCase()
  return seqSuburbs.find((suburb) => suburb.toLowerCase() === text) ?? ""
}

export function plainList(values: unknown, maxItems = 12, maxLen = 80) {
  if (!Array.isArray(values)) return []
  return [...new Set(values.map((item) => plainText(item, maxLen)).filter(Boolean))].slice(0, maxItems)
}

export function knownJobIds(values: readonly unknown[]) {
  const ids = values.map((value) => plainText(value, 40)).filter((id) => jobById(id))
  return [...new Set(ids)]
}

export function cleanPerson(input: { name: unknown; email: unknown; phone: unknown; suburb: unknown }) {
  return {
    name: plainText(input.name, 80),
    email: plainEmail(input.email),
    phone: plainPhone(input.phone),
    suburb: canonicalSuburb(input.suburb),
  }
}

export function cleanJobDetails(input: { propertyType: unknown; lawnSize: unknown; frequency: unknown; extras: unknown; preferredDay: unknown; photoCount: unknown }) {
  const day = plainText(input.preferredDay, 10)
  const extras = Array.isArray(input.extras) ? input.extras.map((item) => plainText(item, 60)).filter((item) => (bookingExtras as readonly string[]).includes(item)) : []
  const count = Number(input.photoCount)
  return {
    propertyType: oneOf(input.propertyType, propertyTypes),
    lawnSize: oneOf(input.lawnSize, lawnSizes),
    frequency: oneOf(input.frequency, frequencies),
    extras,
    preferredDay: /^\d{4}-\d{2}-\d{2}$/.test(day) ? day : "",
    photoCount: Number.isFinite(count) ? Math.min(6, Math.max(0, Math.floor(count))) : 0,
  }
}
