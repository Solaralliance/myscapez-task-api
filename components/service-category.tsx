import { ArrowRight } from "lucide-react"
import { Crumbs } from "@/components/crumbs"
import { serviceCategories, type ServiceCategory } from "@/lib/service-categories"

export function ServiceCategoryView({ category }: { category: ServiceCategory }) {
  const others = serviceCategories.filter((item) => item.path !== category.path)

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
      <Crumbs items={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { href: category.path, label: category.title }]} />
      <article className="mx-auto max-w-3xl px-5 py-16 lg:px-10 lg:py-24">
        <p className="eyebrow">{category.title}</p>
        <h1 className="section-heading mt-4">{category.h1}</h1>
        <p className="mt-6 text-lg leading-8 text-[#9ca99a]">{category.lede}</p>
        <img src={category.image.src} alt={category.image.alt} width={1200} height={800} decoding="async" title={`${category.title} | MyScapez | Authored by Jai Butchers`} className="mt-8 aspect-[3/2] w-full rounded-[28px] object-cover" />
        <h2 className="mt-12 text-2xl font-semibold">Who this is for</h2>
        <p className="mt-4 leading-7 text-[#c5d0c2]">{category.audience}</p>
        <h2 className="mt-12 text-2xl font-semibold">What a business can switch on</h2>
        <p className="mt-4 leading-7 text-[#9ca99a]">These are the existing MyScapez job names for this category. A request is sent only to a business that has switched that job on and covers the suburb. Not every business offers every job.</p>
        <ul className="mt-4 list-disc pl-5 leading-7 text-[#c5d0c2]">
          {category.jobs.map((job) => (
            <li key={job.id}>{job.title}{job.note ? ` ${job.note}` : ""}</li>
          ))}
        </ul>
        <h2 className="mt-12 text-2xl font-semibold">Find a provider</h2>
        <p className="mt-4 leading-7 text-[#c5d0c2]">This page does not list contractors, prices or availability. Reviewed businesses appear in the directory. Until then, send a request and MyScapez matches it to a business that does this work in your suburb.</p>
        <p className="mt-8 flex flex-wrap gap-3">
          <a href="/request" className="glow-button inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-[#081006]">{category.cta} <ArrowRight aria-hidden="true" /></a>
          <a href="/directory" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-[#d9e3d7]">Browse the directory</a>
        </p>
        <h2 className="mt-12 text-2xl font-semibold">Related</h2>
        <p className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
          <a href="/" className="text-[#9cff12]">Home</a>
          <a href="/services" className="text-[#9cff12]">All service definitions</a>
          {others.map((item) => (
            <a key={item.path} href={item.path} className="text-[#9cff12]">{item.title}</a>
          ))}
        </p>
      </article>
    </main>
  )
}
