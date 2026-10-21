/** Company site. This repository is the site for that domain. */
export const brandUrl = "https://myscapez.com"

/**
 * Host for canonicals, the sitemap, and breadcrumbs.
 * Defaults to the company domain. Set NEXT_PUBLIC_SITE_URL only for a
 * separate deploy that should not be indexed as myscapez.com.
 */
const configuredSite = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "")
export const siteUrl = configuredSite || brandUrl

export const directoryAnswers = [
  {
    question: "Which businesses can be listed?",
    answer: "Lawn mowing, lawn care and landscaping businesses that work in South East Queensland. A page is not created for every suburb.",
  },
  {
    question: "How does a job reach a business?",
    answer: "The request is matched to a business that has chosen that type of work and covers that suburb. Other businesses do not receive it.",
  },
  {
    question: "Are the three profiles real businesses?",
    answer: "No. Greenline Grounds, The Lawn Bureau and Cut Above Co. are samples of the layout. A listing is not public until it has been reviewed.",
  },
  {
    question: "What stays off the public page?",
    answer: "Phone numbers, email addresses and street addresses are not shown. Quote photos are not uploaded.",
  },
  {
    question: "Where are the services defined?",
    answer: "The services page lists lawn mowing, lawn care and landscaping, and every job a business can switch on. The same names are used on the request form.",
  },
] as const

export const indexablePaths = ["/", "/about", "/directory", "/jobs", "/request", "/services", "/mowing", "/lawn-care", "/landscaping", "/guides/request"] as const
