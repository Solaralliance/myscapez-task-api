import { Crumbs } from "@/components/crumbs"
import { bookingExtras, frequencies, lawnSizes, propertyTypes } from "@/lib/work-catalog"

export default function RequestGuidePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050605] text-[#f2f6ef]">
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#050605]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between gap-3 px-5 lg:px-10">
          <a href="/" aria-label="MyScapez home"><img src="/myscapez-logo-small.png" alt="MyScapez" className="h-10 w-auto" /></a>
          <nav className="flex items-center gap-4 text-sm text-[#a8b1a7]">
            <a href="/services" className="transition hover:text-[#9cff12]">Services</a>
            <a href="/request" className="glow-button rounded-full px-4 py-2 font-semibold text-[#081006]">Request a mower</a>
          </nav>
        </div>
      </header>
      <Crumbs items={[{ href: "/", label: "Home" }, { href: "/guides/request", label: "Quote request" }]} />
      <article className="mx-auto max-w-3xl px-5 py-16 lg:px-10 lg:py-24">
        <p className="eyebrow">Quote preparation</p>
        <h1 className="section-heading mt-4">What to send with a quote request.</h1>
        <p className="mt-6 leading-7 text-[#9ca99a]">A request is matched on the job and the suburb. These are the details the form asks for. This is not a mowing calendar, and it does not say how often a particular lawn should be cut.</p>
        <h2 className="mt-10 text-2xl font-semibold">Required</h2>
        <dl className="mt-4 flex flex-col gap-4 leading-7 text-[#c5d0c2]">
          <div><dt className="font-semibold text-[#f2f6ef]">Your name, email and phone</dt><dd>Used to reach you about that request. They are not published on a business profile.</dd></div>
          <div><dt className="font-semibold text-[#f2f6ef]">Suburb</dt><dd>Chosen from the South East Queensland list. A street address is not collected.</dd></div>
          <div><dt className="font-semibold text-[#f2f6ef]">Type of work</dt><dd>One job from the <a href="/services" className="text-[#9cff12] underline">service list</a>. A business that has not switched that job on does not receive it.</dd></div>
          <div><dt className="font-semibold text-[#f2f6ef]">Property</dt><dd>{propertyTypes.join(", ")}.</dd></div>
          <div><dt className="font-semibold text-[#f2f6ef]">Lawn size</dt><dd>{lawnSizes.join(", ")}. These are the labels on the form, not a measurement in square metres.</dd></div>
          <div><dt className="font-semibold text-[#f2f6ef]">How often</dt><dd>{frequencies.join(", ")}. These are choices, not a recommendation.</dd></div>
        </dl>
        <h2 className="mt-10 text-2xl font-semibold">Optional</h2>
        <p className="mt-4 leading-7 text-[#c5d0c2]">A preferred day, and extras: {bookingExtras.join(", ")}. Up to six JPEG, PNG or WebP photos under 5 MB can be checked on the form. The files are not uploaded.</p>
        <h2 className="mt-10 text-2xl font-semibold">The price</h2>
        <p className="mt-4 leading-7 text-[#c5d0c2]">The homepage shows a $59 starting callout. The quote you approve is the price before any work begins. MyScapez does not take a cut of the job.</p>
        <p className="mt-10"><a href="/request" className="glow-button inline-flex min-h-12 items-center rounded-full px-6 font-semibold text-[#081006]">Start a request</a></p>
      </article>
    </main>
  )
}
