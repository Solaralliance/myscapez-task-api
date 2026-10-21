"use client"

import { ArrowRight } from "lucide-react"
import { useParams } from "next/navigation"
import { BusinessProfile } from "@/components/business-profile"
import { Crumbs } from "@/components/crumbs"
import { listingBySlug } from "@/lib/seq-directory"

export default function ListingProfilePage() {
  const params = useParams<{ slug: string }>()
  const listing = listingBySlug(params.slug)

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050605] text-[#f2f6ef]">
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#050605]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between gap-3 px-5 lg:px-10">
          <a href="/" aria-label="MyScapez home">
            <img src="/myscapez-logo-small.png" alt="MyScapez" className="h-10 w-auto" />
          </a>
          <nav className="flex items-center gap-4 text-sm text-[#a8b1a7] sm:gap-6">
            <a href="/directory" className="transition hover:text-[#9cff12]">Directory</a>
            <a href="/directory#join" className="glow-button rounded-full px-4 py-2 font-semibold text-[#081006]">List your business</a>
          </nav>
        </div>
      </header>
      {listing ? <Crumbs items={[{ href: "/", label: "Home" }, { href: "/directory", label: "Directory" }, { href: `/directory/${listing.slug}`, label: listing.name }]} /> : null}
      <section className="relative overflow-hidden px-5 py-16 lg:px-10 lg:py-24">
        <div className="ambient-background" aria-hidden="true">
          <span className="ambient-orb ambient-orb-one" />
          <span className="ambient-orb ambient-orb-two" />
        </div>
        <div className="relative z-10 mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[.8fr_1.2fr]">
          {listing ? (
            <>
              <div>
                <p className="eyebrow">Business profile</p>
                <h1 className="section-heading mt-4">How a listing <span>shows up.</span></h1>
                <p className="mt-6 max-w-md leading-7 text-[#9ca99a]">This is a sample profile for the South East Queensland directory. Real listings use the same layout: headline, services, suburbs and photos. Contact details stay off the page.</p>
                <a href="/request" className="glow-button mt-8 inline-flex min-h-14 items-center gap-3 rounded-full px-7 font-semibold text-[#081006]">Request this kind of pro <ArrowRight aria-hidden="true" /></a>
              </div>
              <BusinessProfile {...listing} example />
            </>
          ) : (
            <div>
              <p className="eyebrow">Directory</p>
              <h1 className="section-heading mt-4">That listing <span>isn’t here.</span></h1>
              <p className="mt-6 max-w-md leading-7 text-[#9ca99a]">The SEQ directory only has lawn mowing, lawn care and landscaping profiles.</p>
              <a href="/directory" className="mt-8 inline-flex font-semibold text-[#9cff12]">Back to the directory</a>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
