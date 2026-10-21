import type { WorkJobId } from "@/lib/work-catalog"

export type DirectoryService = {
  slug: string
  title: string
  description: string
  jobId?: WorkJobId
  note?: string
}

export const serviceCategories = [
  {
    slug: "mowing",
    path: "/mowing",
    title: "Mowing",
    h1: "A tidy lawn starts with a good mow.",
    lede: "From regular residential mowing to acreage mowing and slashing, find local professionals for lawns and properties of all sizes.",
    cta: "Explore Mowing Services",
    metaTitle: "Lawn mowing in South East Queensland",
    metaDescription: "Residential, regular, one-off, acreage, commercial and slashing. Request a local mowing professional and approve the quote before any work starts.",
    image: {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-2000BA59-3GxF9IKnK281oRJFvh3fGjKqLllgOC.jpeg",
      alt: "Freshly mown backyard lawn beside a pool, timber deck and stepping stones",
    },
    services: [
      { slug: "residential-lawn-mowing", title: "Residential lawn mowing", description: "Regular or one-off mowing for suburban homes and other residential properties.", jobId: "mow-standard" },
      { slug: "regular-lawn-maintenance", title: "Regular lawn maintenance", description: "Scheduled mowing to keep the grass under control through the year.", jobId: "mow-regular" },
      { slug: "one-off-lawn-mowing", title: "One-off lawn mowing", description: "A single visit when the lawn needs tidying up.", jobId: "mow-once" },
      { slug: "acreage-mowing", title: "Acreage mowing", description: "Mowing for larger residential properties, acreage blocks and rural-style properties.", jobId: "comm-acreage" },
      { slug: "commercial-mowing", title: "Commercial mowing", description: "Lawn mowing for commercial premises and other business properties.", jobId: "comm-grounds" },
      { slug: "slashing-overgrown-grass", title: "Slashing and overgrown grass", description: "Long grass and overgrown areas, where the operator has the right slashing equipment.", jobId: "mow-slash" },
      { slug: "ride-on-mowing", title: "Ride-on mowing", description: "Mowing suitable larger areas with ride-on equipment.", jobId: "mow-rideon" },
      { slug: "vacant-block-mowing", title: "Vacant block mowing", description: "Grass management for vacant residential blocks and other suitable undeveloped land.", jobId: "comm-vacant" },
      { slug: "rental-property-mowing", title: "Rental property mowing", description: "Mowing for landlords, tenants and property managers. On the request form, choose the mowing job and set the property type to Rental.", jobId: "mow-standard" },
      { slug: "lawn-edging", title: "Lawn edging", description: "Neat edges along paths, driveways and garden borders.", jobId: "mow-edge" },
    ] as DirectoryService[],
  },
  {
    slug: "lawn-care",
    path: "/lawn-care",
    title: "Lawn Care",
    h1: "Keep your lawn looking its best.",
    lede: "Find local lawn care professionals for ongoing maintenance, treatments and other services to help keep your grass healthy.",
    cta: "Explore Lawn Care Services",
    metaTitle: "Lawn care in South East Queensland",
    metaDescription: "Fertilising, aeration, edging and weed treatment from local lawn care businesses. Chemical weed work stays off until the business holds the authorisation.",
    image: {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-61CFC6DF-OG6BddYuTKaiVDoVSucVuy9og4fpUX.jpeg",
      alt: "Neatly edged suburban lawn with a garden border and green grass",
    },
    services: [
      { slug: "lawn-maintenance", title: "Lawn maintenance", description: "Ongoing care to keep a lawn usable. What that includes depends on the grass, the season and the business.", note: "There is no single lawn-maintenance option on the form yet. Describe the work in your request." },
      { slug: "lawn-fertilising", title: "Lawn fertilising", description: "Feeding a lawn. Results depend on the turf, the weather and what is already in the soil.", jobId: "lawn-feed" },
      { slug: "lawn-treatments", title: "Lawn treatments", description: "Treatments a business is prepared to carry out. MyScapez does not promise a particular result.", jobId: "lawn-weed", note: "Chemical weed treatment stays off until the business says it holds the Queensland authorisation that job needs." },
      { slug: "weed-control", title: "Weed control", description: "Weed work in a lawn. The right approach changes with the weed, the turf and the region.", jobId: "lawn-weed", note: "Chemical weed treatment stays off until the business says it holds the Queensland authorisation that job needs." },
      { slug: "lawn-aeration", title: "Lawn aeration", description: "Aeration to relieve compacted soil. It is not a fix for every lawn problem.", jobId: "lawn-aerate" },
      { slug: "lawn-renovation", title: "Lawn renovation", description: "A broader reset of a tired lawn. Scope varies, so describe the condition in your request.", note: "Lawn renovation is not a separate option on the form yet." },
      { slug: "lawn-repair", title: "Lawn repair and restoration", description: "Patching or repairing worn areas, including turf repair where that is the job.", jobId: "lawn-turf" },
      { slug: "turf-installation", title: "Turf installation and replacement", description: "Laying or replacing turf. The turf type should suit the site.", jobId: "lawn-turf" },
      { slug: "seasonal-lawn-care", title: "Seasonal lawn care", description: "Work timed to the season. Queensland conditions are not the same as southern states.", note: "Seasonal lawn care is not a separate option on the form yet. Describe the timing in your request." },
      { slug: "lawn-edging-finishing", title: "Lawn edging and finishing", description: "Crisp edges and a tidy finish along paths, driveways and garden borders.", jobId: "mow-edge" },
    ] as DirectoryService[],
  },
  {
    slug: "landscaping",
    path: "/landscaping",
    title: "Landscaping",
    h1: "Make more of your outdoor space.",
    lede: "Discover local landscaping professionals for garden improvements, new outdoor spaces and landscaping projects.",
    cta: "Explore Landscaping Services",
    metaTitle: "Landscaping in South East Queensland",
    metaDescription: "Garden beds, planting, turf and outdoor improvements from local landscaping businesses. Licensed construction is not assumed.",
    image: {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-E9EDB5D0-mu2rPwoyp9xznRVy3JJNxtVhI6VkVo.jpeg",
      alt: "Sunny suburban backyard lawn with trimmed garden beds and a patio",
    },
    services: [
      { slug: "residential-landscaping", title: "Residential landscaping", description: "Outdoor work around a home. Describe the garden, the access and what you want changed.", note: "Residential landscaping is not one option on the form. Use the closest garden or turf job, or describe the project." },
      { slug: "commercial-landscaping", title: "Commercial landscaping", description: "Outdoor work at a business property. This is not the same as commercial mowing.", note: "Commercial landscaping is not a separate option on the form yet." },
      { slug: "garden-design", title: "Garden design and planning", description: "Planning a garden before any build. Not every landscaper offers design on its own.", note: "Design-only work is not a separate option on the form yet." },
      { slug: "garden-makeovers", title: "Garden makeovers", description: "Tidying or reworking an existing garden. The size of the job belongs in the request.", jobId: "garden-tidy" },
      { slug: "garden-beds", title: "Garden bed installation", description: "New or rebuilt garden beds. Soil, edging and plants should suit the site.", note: "Garden bed installation is not a separate option on the form yet." },
      { slug: "planting", title: "Planting and garden renovation", description: "Planting and smaller renovation work. Plant choice depends on the local conditions.", note: "Planting is not a separate option on the form yet. Pruning is, if that is the job you need." },
      { slug: "turf-and-lawn", title: "Turf and lawn installation", description: "Turf as part of a landscape, not only a patch in an existing lawn.", jobId: "lawn-turf" },
      { slug: "landscape-construction", title: "Landscape construction", description: "Built work such as paving, walls or steps. That can be different from general garden work, and some of it needs a particular licence.", note: "MyScapez does not decide which licence applies. Landscape construction is not a separate option on the form yet." },
      { slug: "outdoor-improvements", title: "Outdoor space improvements", description: "Practical improvements to a yard so it is easier to use and look after.", jobId: "garden-tidy" },
      { slug: "new-garden", title: "New garden installations", description: "A new garden rather than a tidy of what is already there.", note: "A new garden installation is not a separate option on the form yet. Describe the project in your request." },
    ] as DirectoryService[],
  },
] as const

export function categoryBySlug(slug: string) {
  const category = serviceCategories.find((item) => item.slug === slug)
  if (!category) throw new Error(`Unknown service category ${slug}`)
  return category
}
