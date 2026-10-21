import { jobById, type WorkJobId } from "@/lib/work-catalog"
import { seqSuburbs } from "@/lib/seq-directory"
import { canonicalSuburb, cleanJobDetails, cleanPerson, knownJobIds, plainEmail, plainPhone, plainText } from "@/lib/form-text"

export type BusinessProfile = {
  id: string
  name: string
  email: string
  phone: string
  categories: string[]
  suburbs: string[]
  ownerToken?: string
}

export type CustomerRecord = {
  id: string
  name: string
  email: string
  phone: string
  suburb: string
}

export type LeadBucket = "Matched" | "No coverage" | "Needs review"

export type LeadRecord = {
  id: string
  customerId: string
  customerName: string
  email: string
  phone: string
  category: string
  suburb: string
  propertyType: string
  lawnSize: string
  frequency: string
  extras: string[]
  photoCount: number
  preferredDay: string
  score: number
  bucket: LeadBucket
  reasons: string[]
  matchedBusinessIds: string[]
  matchedContacts: { id: string; name: string; phone: string; email: string }[]
  createdAt: string
}

type Store = { businesses: BusinessProfile[]; customers: CustomerRecord[]; leads: LeadRecord[] }

const KEY = "myscapez-match-v2"
const SESSION = "myscapez-business-session"

const seedBusinesses: BusinessProfile[] = [
  {
    id: "greenline-grounds",
    name: "Greenline Grounds",
    email: "hello@greenline.example",
    phone: "",
    categories: ["mow-standard", "mow-regular", "mow-once", "mow-edge", "mow-overgrown", "garden-hedge", "clean-waste"],
    suburbs: ["North Lakes", "Mango Hill", "Kallangur"],
  },
  {
    id: "coastal-turf",
    name: "Coastal Turf Co",
    email: "hello@coastalturf.example",
    phone: "",
    categories: ["lawn-turf", "comm-grounds", "clean-overgrown"],
    suburbs: ["Southport", "Robina", "Burleigh Heads"],
  },
]

function emptyStore(): Store {
  return { businesses: seedBusinesses, customers: [], leads: [] }
}

export function loadStore(): Store {
  if (typeof window === "undefined") return emptyStore()
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) {
      const seed = emptyStore()
      window.localStorage.setItem(KEY, JSON.stringify(seed))
      return seed
    }
    const parsed = JSON.parse(raw) as Store
    if (!parsed.businesses?.length) parsed.businesses = seedBusinesses
    return parsed
  } catch {
    return emptyStore()
  }
}

function writeStore(store: Store) {
  window.localStorage.setItem(KEY, JSON.stringify(store))
}

export function saveBusiness(profile: BusinessProfile) {
  const email = plainEmail(profile.email)
  const session = businessSession()
  if (!session?.token || session.email !== email) {
    throw new Error("Open the business login in this browser before saving a profile.")
  }
  const store = loadStore()
  const id = plainText(profile.id, 80) || email
  const previous = store.businesses.find((item) => item.id === id)
  if (previous && previous.ownerToken !== session.token) {
    throw new Error("This profile can only be changed from the browser that created it.")
  }
  const cleaned: BusinessProfile = {
    id,
    name: plainText(profile.name, 80),
    email,
    phone: plainPhone(profile.phone),
    categories: knownJobIds(profile.categories),
    suburbs: [...new Set(profile.suburbs.map((suburb) => canonicalSuburb(suburb)).filter(Boolean))],
    ownerToken: session.token,
  }
  const index = store.businesses.findIndex((item) => item.id === cleaned.id)
  if (index >= 0) store.businesses[index] = cleaned
  else store.businesses.push(cleaned)
  writeStore(store)
  return cleaned
}

export function matchBusinesses(category: string, suburb: string, businesses = loadStore().businesses) {
  const place = suburb.trim().toLowerCase()
  return businesses.filter((business) => business.categories.includes(category) && business.suburbs.some((item) => item.toLowerCase() === place))
}

export function scoreLead(input: { category: string; suburb: string; email: string; phone: string; matches: BusinessProfile[] }) {
  const reasons: string[] = []
  let score = 0
  if (jobById(input.category)) {
    score += 20
    reasons.push("Job type is one a lawn business can choose.")
  }
  if (seqSuburbs.some((suburb) => suburb.toLowerCase() === input.suburb.trim().toLowerCase())) {
    score += 20
    reasons.push("Suburb is in the South East Queensland list.")
  }
  if (input.matches.length > 0) {
    score += 40
    reasons.push(`${input.matches.length} ${input.matches.length === 1 ? "business covers" : "businesses cover"} this job in this suburb.`)
  } else {
    reasons.push("No signed-up business has chosen this job in this suburb.")
  }
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    score += 10
    reasons.push("Customer email is present.")
  }
  if (input.phone.replace(/\D/g, "").length >= 10) {
    score += 10
    reasons.push("Customer phone is present.")
  }
  const bucket: LeadBucket = input.matches.length > 0 ? "Matched" : score >= 40 ? "No coverage" : "Needs review"
  return { score, bucket, reasons }
}

export function saveLead(input: {
  name: string
  email: string
  phone: string
  suburb: string
  category: WorkJobId | string
  preferredDay: string
  propertyType: string
  lawnSize: string
  frequency: string
  extras: string[]
  photoCount: number
}) {
  const person = cleanPerson(input)
  const details = cleanJobDetails(input)
  const category = knownJobIds([input.category])[0] || ""
  if (person.name.length < 2 || !person.email || person.phone.length < 10 || !person.suburb || !category) {
    throw new Error("Check the form and try again.")
  }
  const store = loadStore()
  const matches = matchBusinesses(category, person.suburb, store.businesses)
  const scored = scoreLead({ category, suburb: person.suburb, email: person.email, phone: person.phone, matches })
  const customerId = `cust-${Date.now()}`
  const customer: CustomerRecord = { id: customerId, name: person.name, email: person.email, phone: person.phone, suburb: person.suburb }
  const lead: LeadRecord = {
    id: `lead-${Date.now()}`,
    customerId,
    customerName: customer.name,
    email: customer.email,
    phone: customer.phone,
    category,
    suburb: person.suburb,
    propertyType: details.propertyType,
    lawnSize: details.lawnSize,
    frequency: details.frequency,
    extras: details.extras,
    photoCount: details.photoCount,
    preferredDay: details.preferredDay,
    score: scored.score,
    bucket: scored.bucket,
    reasons: scored.reasons,
    matchedBusinessIds: matches.map((business) => business.id),
    matchedContacts: matches.map((business) => ({ id: business.id, name: business.name, phone: business.phone || "", email: business.email })),
    createdAt: new Date().toISOString(),
  }
  store.customers.unshift(customer)
  store.leads.unshift(lead)
  writeStore(store)
  return { lead, matches }
}

function browserToken() {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("")
}

export function setBusinessSession(email: string) {
  const clean = plainEmail(email)
  if (!clean) return
  const current = businessSession()
  window.localStorage.setItem(SESSION, JSON.stringify({ email: clean, token: current?.token || browserToken() }))
}

export function businessSession(): { email: string; token?: string } | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(SESSION)
    return raw ? (JSON.parse(raw) as { email: string; token?: string }) : null
  } catch {
    return null
  }
}

export function businessForSession() {
  const session = businessSession()
  if (!session) return null
  return loadStore().businesses.find((business) => business.email.toLowerCase() === session.email.toLowerCase() && business.ownerToken === session.token) ?? null
}
