import { ArrowRight } from "lucide-react"
import { Crumbs } from "@/components/crumbs"
import { serviceCategories, type DirectoryService } from "@/lib/service-categories"

type Category = (typeof serviceCategories)[number]

function serviceHref(service: DirectoryService) {
  return service.jobId ? `/request?job=${service.jobId}` : "/request"
}

export function ServiceCategoryView({ category }: { category: Category }) {
  const others = serviceCategories.filter((item) => item.path !== category.path)

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050605] text-[#f2f6ef]">
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#050605]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between gap-3 px-5 lg:px-10">
          <a href="/" aria-label="MyScapez home"><img src="/myscapez-logo-small.png" alt="MyScapez" className="h-10 w-auto" /></a>
          <nav className="flex items-center gap-4 text-sm text-[#a8b1a7]">
            <a href="/services" className="transition hover:text-[#9cff12]">Services</a>
            <a href="/directory" className="transition hover:text-[#9cff12]">Directory</a>
            <a href="/request" className="glow-button rounded-full px-4 py-2 font-semibold text-[#081006]">Request a mower</a>
          </nav>
        </div>
      </header>
      <Crumbs items={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { href: category.path, label: category.title }]} />
      <article className="mx-auto max-w-7xl px-5 py-12 lg:px-10 lg:py-16">
        <p className="eyebrow">{category.title}</p>
        <h1 className="section-heading mt-4 max-w-4xl">{category.h1}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#9ca99a]">{category.lede}</p>
        <img src={category.image.src} alt={category.image.alt} width={1200} height={800} decoding="async" fetchPriority="high" title={`${category.title} | MyScapez`} className="mt-8 aspect-[3/2] w-full max-h-[460px] rounded-[28px] object-cover" />
        <h2 className="mt-12 text-2xl font-semibold">Services you can ask for</h2>
        <p className="mt-4 max-w-3xl leading-7 text-[#9ca99a]">These are types of work, not a list of businesses. A request is sent only to a business that covers your suburb and has switched that job on. Not every business offers every service.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {category.services.map((service) => (
            <a key={service.slug} href={serviceHref(service)} className="shine-card flex flex-col overflow-hidden p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9cff12]">
              <img src={category.image.src} alt="" width={1200} height={800} loading="lazy" decoding="async" className="h-40 w-full object-cover" />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-[#869184]">{service.description}</p>
                {service.note ? <p className="mt-3 text-xs leading-5 text-[#9aa995]">{service.note}</p> : null}
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#9cff12]">Request this <ArrowRight aria-hidden="true" /></span>
              </div>
            </a>
          ))}
        </div>
        <h2 className="mt-14 text-2xl font-semibold">When no business is listed yet</h2>
        <p className="mt-4 max-w-3xl leading-7 text-[#c5d0c2]">This page does not show contractors, prices, ratings or availability. Reviewed businesses appear in the directory. Until a match is available, send a request and MyScapez uses the suburb and the job.</p>
        <p className="mt-8 flex flex-wrap gap-3">
          <a href="/request" className="glow-button inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-[#081006]">Find a local professional <ArrowRight aria-hidden="true" /></a>
          <a href="/directory" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-[#d9e3d7]">Browse the directory</a>
        </p>
        <h2 className="mt-14 text-2xl font-semibold">Related</h2>
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
