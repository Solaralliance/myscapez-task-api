import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { listingBySlug } from "@/lib/seq-directory"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const listing = listingBySlug((await params).slug)
  if (!listing) return { title: { absolute: "Listing not found | MyScapez" }, robots: { index: false, follow: false } }
  return {
    title: { absolute: `${listing.name} sample listing | MyScapez` },
    description: listing.about,
    alternates: { canonical: `/directory/${listing.slug}` },
    robots: { index: false, follow: true },
  }
}

export default async function ListingLayout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  if (!listingBySlug((await params).slug)) notFound()
  return children
}
