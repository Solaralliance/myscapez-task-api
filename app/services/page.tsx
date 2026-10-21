import { Crumbs } from "@/components/crumbs"
import { trades } from "@/lib/seq-directory"
import { workGroups } from "@/lib/work-catalog"

const tradePaths = { mowing: "/mowing", care: "/lawn-care", landscaping: "/landscaping" } as const

export default function ServicesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050605] text-[#f2f6ef]">
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#050605]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between gap-3 px-5 lg:px-10">
          <a href="/" aria-label="MyScapez home"><img src="/myscapez-logo-small.png" alt="MyScapez" className="h-10 w-auto" /></a>
          <nav className="flex items-center gap-4 text-sm text-[#a8b1a7]">
            <a href="/directory" className="transition hover:text-[#9cff12]">Directory</a>
            <a href="/request" className="glow-button rounded-full px-4 py-2 font-semibold text-[#081006]">Request a mower</a>
          </nav>
        </div>
      </header>
      <Crumbs items={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }]} />
      <article className="mx-auto max-w-3xl px-5 py-16 lg:px-10 lg:py-24">
        <p className="eyebrow">Service definitions</p>
        <h1 className="section-heading mt-4">What each service includes.</h1>
        <p className="mt-6 leading-7 text-[#9ca99a]">A business joins under one trade. A customer request uses the job names below. The business receives that request only if it has switched the job on and covers the suburb.</p>
        <h2 className="mt-12 text-2xl font-semibold">The three trades</h2>
        <dl className="mt-6 flex flex-col gap-6">
          {trades.map((trade) => (
            <div key={trade.id}>
              <dt><a href={tradePaths[trade.id]} className="text-lg font-semibold text-[#9cff12]">{trade.title}</a></dt>
              <dd className="mt-2 leading-7 text-[#c5d0c2]">{trade.copy}</dd>
            </div>
          ))}
        </dl>
        <h2 className="mt-12 text-2xl font-semibold">The jobs a business can switch on</h2>
        <div className="mt-6 flex flex-col gap-8">
          {workGroups.map((group) => (
            <section key={group.id}>
              <h3 className="text-lg font-semibold">{group.title}</h3>
              <p className="mt-2 leading-7 text-[#9ca99a]">{group.summary}</p>
              <ul className="mt-3 list-disc pl-5 leading-7 text-[#c5d0c2]">
                {group.jobs.map((job) => (
                  <li key={job.id}>{job.title}{"note" in job && job.note ? ` ${job.note}` : ""}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <section id="weed-treatment" className="mt-12 border-t border-white/10 pt-8">
          <h2 className="text-2xl font-semibold">When weed treatment is not offered</h2>
          <p className="mt-4 leading-7 text-[#c5d0c2]">Lawn weed treatment stays off a profile until the business says it holds the Queensland licence or authorisation that chemical job needs. MyScapez does not decide which licence applies.</p>
          <p className="mt-4 leading-7 text-[#c5d0c2]">Business Queensland says ground distribution of herbicides is carried out in the course of the business of, at the direction of, or under the authority of a licensed ground distribution contractor, under the Agricultural Chemicals Distribution Control Act 1966. Some work sits outside that rule, including areas of Queensland where the Act does not apply.</p>
          <p className="mt-4 text-sm leading-6 text-[#9ca99a]">
            Source: <a href="https://www.business.qld.gov.au/industries/farms-fishing-forestry/agriculture/sustainable/chemical/ground-distribution-herbicide/licence" className="text-[#9cff12] underline">Business Queensland, ground distribution contractor's licence</a>.
            Checked 21 October 2026.
          </p>
        </section>
        <p className="mt-10 flex flex-wrap gap-4 text-sm font-semibold">
          <a href="/guides/request" className="text-[#9cff12]">What to send with a request</a>
          <a href="/directory" className="text-[#9cff12]">Directory</a>
        </p>
      </article>
    </main>
  )
}
