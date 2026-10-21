import { jobById, type WorkJobId } from "@/lib/work-catalog"

function listed(ids: readonly WorkJobId[]) {
  return ids.map((id) => {
    const job = jobById(id)
    if (!job) throw new Error(`Unknown job ${id}`)
    return { id: job.id, title: job.title, note: job.note }
  })
}

export const serviceCategories = [
  {
    slug: "mowing",
    path: "/mowing",
    title: "Mowing",
    h1: "Good lawns start with a good mow.",
    lede: "From regular residential mowing to acreage mowing and slashing, find local professionals to get your grass under control.",
    cta: "Explore Mowing Services",
    metaTitle: "Lawn mowing",
    metaDescription: "Find local lawn mowing in South East Queensland, from a regular residential cut to ride-on, slashing and acreage. You approve the quote before work starts.",
    image: {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-2000BA59-3GxF9IKnK281oRJFvh3fGjKqLllgOC.jpeg",
      alt: "Freshly mown backyard lawn beside a pool, timber deck and stepping stones",
    },
    audience: "Homeowners, renters and property managers who need the grass cut, including a one-off, a regular round, or a larger block.",
    jobs: listed(["mow-standard", "mow-regular", "mow-once", "mow-rideon", "mow-slash", "mow-overgrown", "comm-acreage", "comm-grounds", "comm-vacant"]),
  },
  {
    slug: "lawn-care",
    path: "/lawn-care",
    title: "Lawn Care",
    h1: "A healthier lawn starts here.",
    lede: "Find local lawn care professionals to help keep your grass healthy, green and looking its best throughout the seasons.",
    cta: "Explore Lawn Care Services",
    metaTitle: "Lawn care",
    metaDescription: "Lawn edging, fertilising, aeration and weed treatment from local South East Queensland professionals. Chemical weed work stays off until the business holds the authorisation.",
    image: {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-61CFC6DF-OG6BddYuTKaiVDoVSucVuy9og4fpUX.jpeg",
      alt: "Neatly edged suburban lawn with a garden border and green grass",
    },
    audience: "Homeowners who want the lawn kept healthy after the cut: edges, feeding, aeration, and weed treatment where the business is allowed to do that work.",
    jobs: listed(["mow-edge", "lawn-feed", "lawn-aerate", "lawn-weed"]),
  },
  {
    slug: "landscaping",
    path: "/landscaping",
    title: "Landscaping",
    h1: "Make more of your outdoor space.",
    lede: "From garden makeovers to new outdoor layouts, connect with local landscaping professionals to bring your ideas to life.",
    cta: "Explore Landscaping Services",
    metaTitle: "Landscaping",
    metaDescription: "Turf, garden beds, hedges and outdoor work around the lawn. MyScapez connects you with a local landscaping business that has switched that job on.",
    image: {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-E9EDB5D0-mu2rPwoyp9xznRVy3JJNxtVhI6VkVo.jpeg",
      alt: "Sunny suburban backyard lawn with trimmed garden beds and a patio",
    },
    audience: "Homeowners who want turf, garden beds or a tidy outdoor area around the lawn. This is not a full design-and-construct catalogue.",
    jobs: listed(["lawn-turf", "garden-weed", "garden-hedge", "garden-prune", "garden-mulch", "garden-tidy"]),
  },
] as const

export type ServiceCategory = (typeof serviceCategories)[number]

export function categoryBySlug(slug: string) {
  const category = serviceCategories.find((item) => item.slug === slug)
  if (!category) throw new Error(`Unknown service category ${slug}`)
  return category
}
