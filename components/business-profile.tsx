import { MapPin } from "lucide-react"
import type { TradeTitle } from "@/lib/seq-directory"

export function BusinessProfile({
  name,
  initials,
  headline,
  about,
  base,
  region,
  services,
  suburbs,
  photos,
  example,
}: {
  name: string
  initials: string
  headline: string
  about: string
  base: string
  region: string
  services: TradeTitle[] | string[]
  suburbs: string[]
  photos?: string[]
  example?: boolean
}) {
  return (
    <article className="rounded-[28px] border border-[#9cff12]/25 bg-[#0d150b] p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-2xl border border-[#9cff12]/30 bg-[#9cff12]/10 text-lg font-semibold text-[#b7ff60]">
            {initials}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9cff12]">
              {example ? "Example listing" : "Profile preview"}
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">{name}</h2>
          </div>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-[#91a08e]">SEQ</span>
      </div>

      <p className="mt-6 text-lg font-medium text-[#e7f0e4]">{headline}</p>
      <p className="mt-3 flex items-center gap-1.5 text-sm text-[#849082]">
        <MapPin aria-hidden="true" /> Based in {base}, {region}
      </p>
      <p className="mt-5 max-w-2xl leading-7 text-[#9aa995]">{about}</p>

      <div className="mt-8">
        <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9cff12]">Services</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {services.map((service) => (
            <li key={service} className="rounded-full border border-[#9cff12]/30 bg-[#9cff12]/10 px-3 py-2 text-sm text-[#d9f7c7]">
              {service}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9cff12]">Suburbs covered</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {suburbs.map((suburb) => (
            <li key={suburb} className="rounded-full border border-white/10 px-3 py-2 text-sm text-[#c8d2c5]">
              {suburb}
            </li>
          ))}
        </ul>
      </div>

      {photos && photos.length > 0 ? (
        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9cff12]">Recent work</h3>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {photos.map((src) => (
              <img key={src} src={src} alt={`${name} sample lawn`} width={1200} height={800} loading="lazy" decoding="async" className="h-24 w-full rounded-2xl object-cover sm:h-36" />
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-8 text-sm leading-6 text-[#657162]">Work photos can be added once the listing is approved. They are not stored from this form.</p>
      )}

      <p className="mt-8 text-sm leading-6 text-[#657162]">
        The public profile shows the business name, services and suburbs. The phone number and email stay private, and job enquiries come through MyScapez.
      </p>
    </article>
  )
}
