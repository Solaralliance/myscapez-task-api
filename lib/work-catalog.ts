export const workGroups = [
  {
    id: "mowing",
    title: "Lawn mowing",
    summary: "Mowing, ride-on mowing, slashing, edging and overgrown lawns.",
    jobs: [
      { id: "mow-standard", title: "Standard residential mowing" },
      { id: "mow-regular", title: "Regular scheduled mowing" },
      { id: "mow-once", title: "One-off mowing" },
      { id: "mow-rideon", title: "Ride-on mowing" },
      { id: "mow-slash", title: "Slashing long grass" },
      { id: "mow-overgrown", title: "Overgrown lawn" },
      { id: "mow-edge", title: "Edging and whipper snipping" },
      { id: "mow-verge", title: "Nature strip or verge" },
    ],
  },
  {
    id: "garden",
    title: "Garden maintenance",
    summary: "Weeding, hedges, pruning, mulching and garden tidy-ups.",
    jobs: [
      { id: "garden-weed", title: "Weeding and garden beds" },
      { id: "garden-hedge", title: "Hedge trimming" },
      { id: "garden-prune", title: "Small shrub pruning" },
      { id: "garden-mulch", title: "Mulch spreading" },
      { id: "garden-tidy", title: "Garden tidy-up" },
    ],
  },
  {
    id: "improve",
    title: "Lawn improvement",
    summary: "Fertilising, aeration, weed control, turfing and lawn repairs.",
    jobs: [
      { id: "lawn-feed", title: "Fertilising" },
      { id: "lawn-weed", title: "Lawn weed treatment", note: "Only if the business holds the Queensland licence or authorisation this chemical work needs." },
      { id: "lawn-aerate", title: "Aeration" },
      { id: "lawn-turf", title: "Turf installation or patch repair" },
    ],
  },
  {
    id: "cleanup",
    title: "Clean-ups and green waste",
    summary: "Overgrown yards, end-of-lease work, and green waste removal.",
    jobs: [
      { id: "clean-overgrown", title: "Overgrown yard clean-up" },
      { id: "clean-lease", title: "End-of-lease tidy" },
      { id: "clean-sale", title: "Pre-sale or pre-inspection tidy" },
      { id: "clean-waste", title: "Green waste removal" },
    ],
  },
  {
    id: "commercial",
    title: "Commercial and acreage",
    summary: "Body corporate, business premises, large blocks and contract work.",
    jobs: [
      { id: "comm-acreage", title: "Acreage and large blocks" },
      { id: "comm-body", title: "Body corporate or strata" },
      { id: "comm-grounds", title: "Commercial grounds" },
      { id: "comm-vacant", title: "Vacant property" },
    ],
  },
  {
    id: "extras",
    title: "Outdoor cleaning and extras",
    summary: "Add-ons. Only for businesses with the gear, insurance and any licence the job needs.",
    jobs: [
      { id: "extra-pressure", title: "Pressure washing", note: "Not for delicate surfaces or roof work." },
      { id: "extra-gutter", title: "Gutter clearing", note: "Safe, accessible gutters only. Not roof work." },
      { id: "extra-irrigation", title: "Irrigation check" },
    ],
  },
] as const

export const propertyTypes = ["House", "Townhouse", "Acreage", "Rental", "Commercial"] as const
export const lawnSizes = ["Small", "Medium", "Large", "Acreage"] as const
export const frequencies = ["One-off", "Weekly", "Fortnightly", "Monthly"] as const
export const bookingExtras = ["Edging", "Blow clippings off paths", "Green waste removal", "Hedge trimming"] as const

export type WorkJobId = (typeof workGroups)[number]["jobs"][number]["id"]

export function jobById(id: string) {
  for (const group of workGroups) {
    const job = group.jobs.find((item) => item.id === id)
    if (job) return { ...job, group: group.title, note: "note" in job ? job.note : "" }
  }
  return null
}
