export const trades = [
  { id: "mowing", title: "Lawn mowing", copy: "Regular and one-off cuts with a clean, even finish." },
  { id: "care", title: "Lawn care", copy: "Edging, feeding, weeds and the work that keeps a lawn healthy." },
  { id: "landscaping", title: "Landscaping", copy: "Turf, garden beds and outdoor work around the lawn." },
] as const

export type TradeTitle = (typeof trades)[number]["title"]

export const seqRegions = {
  Brisbane: ["Bracken Ridge", "Chermside", "The Gap", "Indooroopilly", "Paddington", "Carindale", "Wynnum", "Mount Gravatt", "Ashgrove", "Toowong", "Kenmore", "Sunnybank", "Holland Park", "Nundah", "Stafford", "Aspley"],
  "Moreton Bay": ["North Lakes", "Mango Hill", "Kallangur", "Redcliffe", "Caboolture", "Morayfield", "Burpengary", "Narangba", "Deception Bay", "Strathpine", "Bray Park"],
  Logan: ["Springwood", "Shailer Park", "Beenleigh", "Logan Central", "Browns Plains", "Marsden", "Crestmead"],
  Ipswich: ["Ipswich", "Springfield", "Redbank Plains", "Goodna", "Ripley", "Brassall"],
  Redland: ["Cleveland", "Capalaba", "Victoria Point", "Thornlands", "Wellington Point", "Redland Bay", "Alexandra Hills"],
  "Gold Coast": ["Southport", "Nerang", "Robina", "Burleigh Heads", "Surfers Paradise", "Broadbeach", "Helensvale", "Coomera", "Mudgeeraba", "Palm Beach"],
  "Sunshine Coast": ["Caloundra", "Maroochydore", "Buderim", "Noosa Heads", "Nambour", "Sippy Downs", "Kawana", "Coolum Beach", "Mooloolaba"],
} as const

export type SeqRegion = keyof typeof seqRegions

export const seqSuburbs = Object.values(seqRegions).flat()

export function searchSuburbs(query: string) {
  const needle = query.trim().toLowerCase()
  if (needle.length < 2) return []
  const byName: { suburb: string; region: SeqRegion }[] = []
  const byRegion: { suburb: string; region: SeqRegion }[] = []
  for (const region of Object.keys(seqRegions) as SeqRegion[]) {
    for (const suburb of seqRegions[region]) {
      if (suburb.toLowerCase().includes(needle)) byName.push({ suburb, region })
      else if (region.toLowerCase().includes(needle)) byRegion.push({ suburb, region })
    }
  }
  return (byName.length > 0 ? byName : byRegion).slice(0, 8)
}

/** Real postcodes for the suburbs this directory already lists. Not a full Australia database. */
export const seqPostcodes: Record<string, { suburb: string; region: SeqRegion }[]> = {
  "4017": [{ suburb: "Bracken Ridge", region: "Brisbane" }],
  "4020": [{ suburb: "Redcliffe", region: "Moreton Bay" }],
  "4032": [{ suburb: "Chermside", region: "Brisbane" }],
  "4061": [{ suburb: "The Gap", region: "Brisbane" }],
  "4064": [{ suburb: "Paddington", region: "Brisbane" }],
  "4068": [{ suburb: "Indooroopilly", region: "Brisbane" }],
  "4122": [{ suburb: "Mount Gravatt", region: "Brisbane" }],
  "4127": [{ suburb: "Springwood", region: "Logan" }],
  "4128": [{ suburb: "Shailer Park", region: "Logan" }],
  "4152": [{ suburb: "Carindale", region: "Brisbane" }],
  "4157": [{ suburb: "Capalaba", region: "Redland" }],
  "4163": [{ suburb: "Cleveland", region: "Redland" }],
  "4165": [{ suburb: "Victoria Point", region: "Redland" }],
  "4178": [{ suburb: "Wynnum", region: "Brisbane" }],
  "4207": [{ suburb: "Beenleigh", region: "Logan" }],
  "4211": [{ suburb: "Nerang", region: "Gold Coast" }],
  "4215": [{ suburb: "Southport", region: "Gold Coast" }],
  "4220": [{ suburb: "Burleigh Heads", region: "Gold Coast" }],
  "4226": [{ suburb: "Robina", region: "Gold Coast" }],
  "4300": [{ suburb: "Springfield", region: "Ipswich" }],
  "4301": [{ suburb: "Redbank Plains", region: "Ipswich" }],
  "4305": [{ suburb: "Ipswich", region: "Ipswich" }],
  "4503": [{ suburb: "Kallangur", region: "Moreton Bay" }],
  "4506": [{ suburb: "Morayfield", region: "Moreton Bay" }],
  "4509": [
    { suburb: "North Lakes", region: "Moreton Bay" },
    { suburb: "Mango Hill", region: "Moreton Bay" },
  ],
  "4510": [{ suburb: "Caboolture", region: "Moreton Bay" }],
  "4551": [{ suburb: "Caloundra", region: "Sunshine Coast" }],
  "4556": [{ suburb: "Buderim", region: "Sunshine Coast" }],
  "4558": [{ suburb: "Maroochydore", region: "Sunshine Coast" }],
  "4567": [{ suburb: "Noosa Heads", region: "Sunshine Coast" }],
}

export function isSeqPostcode(value: string) {
  const digits = value.replace(/\D/g, "")
  if (digits.length !== 4) return false
  const postcode = Number(digits)
  return (postcode >= 4000 && postcode <= 4287) || (postcode >= 4300 && postcode <= 4347) || (postcode >= 4500 && postcode <= 4519) || (postcode >= 4550 && postcode <= 4575)
}

export function lookupPostcode(value: string) {
  const digits = value.replace(/\D/g, "")
  if (digits.length !== 4) return null
  return seqPostcodes[digits] ?? null
}

export function phoneError(value: string) {
  const digits = value.replace(/\D/g, "")
  if (digits.startsWith("61")) return "Replace the 61 country code with 0."
  if (!/^0\d{9}$/.test(digits)) return "Enter a 10-digit Australian number, including the area code."
  return ""
}

const lawnPhotos = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-2000BA59-3GxF9IKnK281oRJFvh3fGjKqLllgOC.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-61CFC6DF-OG6BddYuTKaiVDoVSucVuy9og4fpUX.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-E9EDB5D0-mu2rPwoyp9xznRVy3JJNxtVhI6VkVo.jpeg",
]

export type ExampleListing = {
  slug: string
  name: string
  initials: string
  headline: string
  about: string
  base: string
  region: SeqRegion
  services: TradeTitle[]
  suburbs: string[]
  photos: string[]
}

export const exampleListings: ExampleListing[] = [
  {
    slug: "greenline-grounds",
    name: "Greenline Grounds",
    initials: "GG",
    headline: "Lawn mowing and lawn care around North Lakes",
    about: "Example listing. Greenline Grounds is a sample of how a MyScapez profile reads: what the business does, and the South East Queensland suburbs it covers. Phone numbers stay off the public page.",
    base: "North Lakes",
    region: "Moreton Bay",
    services: ["Lawn mowing", "Lawn care"],
    suburbs: ["North Lakes", "Mango Hill", "Kallangur", "Bracken Ridge"],
    photos: lawnPhotos,
  },
  {
    slug: "the-lawn-bureau",
    name: "The Lawn Bureau",
    initials: "LB",
    headline: "Mowing and landscaping from Mango Hill",
    about: "Example listing. This profile shows a business that mows and does light landscaping, with the suburbs it is willing to travel to inside South East Queensland.",
    base: "Mango Hill",
    region: "Moreton Bay",
    services: ["Lawn mowing", "Landscaping"],
    suburbs: ["Mango Hill", "North Lakes", "Kallangur"],
    photos: [lawnPhotos[2], lawnPhotos[0], lawnPhotos[1]],
  },
  {
    slug: "cut-above-co",
    name: "Cut Above Co.",
    initials: "CA",
    headline: "Lawn care and landscaping in Bracken Ridge",
    about: "Example listing. Cut Above Co. shows the same profile layout for a business focused on lawn care and landscaping rather than mowing alone.",
    base: "Bracken Ridge",
    region: "Brisbane",
    services: ["Lawn care", "Landscaping"],
    suburbs: ["Bracken Ridge", "Chermside", "The Gap"],
    photos: [lawnPhotos[1], lawnPhotos[2], lawnPhotos[0]],
  },
]

export function listingBySlug(slug: string) {
  return exampleListings.find((listing) => listing.slug === slug)
}

export function isValidAbn(value: string) {
  const digits = value.replace(/\D/g, "")
  if (digits.length !== 11) return false
  const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
  const nums = digits.split("").map(Number)
  nums[0] -= 1
  const sum = nums.reduce((total, digit, index) => total + digit * weights[index], 0)
  return sum % 89 === 0
}
