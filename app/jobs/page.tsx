'use client'

import { FormEvent, useState } from "react"
import { ArrowRight } from "lucide-react"

const volumes = [
  { label: "1–2 a month", low: 1, high: 2 },
  { label: "3–4 a month", low: 3, high: 4 },
  { label: "5–8 a month", low: 5, high: 8 },
]

const exampleJobs = [
  { trade: "Lawn mowing", suburb: "North Lakes", postcode: "4509", name: "Sam", summary: "Fortnightly mow of a standard suburban yard. Clippings caught." },
  { trade: "Lawn care", suburb: "Cleveland", postcode: "4163", name: "Priya", summary: "Edges, a feed, and weeds along the path. Front and back." },
  { trade: "Landscaping", suburb: "Springfield", postcode: "4300", name: "Chris", summary: "Replace a tired patch of lawn with new turf, about 40 square metres." },
  { trade: "Lawn mowing", suburb: "Southport", postcode: "4215", name: "Helen", summary: "One-off mow of a small courtyard before a rental inspection." },
  { trade: "Lawn care", suburb: "Capalaba", postcode: "4157", name: "Dan", summary: "Overgrown edges and a tidy of the nature strip." },
  { trade: "Landscaping", suburb: "Caloundra", postcode: "4551", name: "Mia", summary: "A new garden bed along the fence, then returf the worn strip beside it." },
]

const steps = [
  { number: "1", title: "A homeowner asks", copy: "They describe a lawn mowing, lawn care or landscaping job in South East Queensland." },
  { number: "2", title: "You see it if it fits", copy: "A lead can be offered when you cover that suburb and that trade. You are not sent every job in Australia." },
  { number: "3", title: "You choose", copy: "Your profile is what they see. You decide which jobs to take. We do not take a cut of the job." },
]

function money(value: number) {
  return `$${value.toLocaleString("en-AU")}`
}

function JobsPage() {
  const [volume, setVolume] = useState(0)
  const [price, setPrice] = useState("")
  const amount = Number(price.replace(/[^0-9.]/g, ""))
  const ready = Number.isFinite(amount) && amount > 0
  const band = volumes[volume]

  function onPrice(event: FormEvent<HTMLInputElement>) {
    setPrice(event.currentTarget.value)
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050605] text-[#f2f6ef]">
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#050605]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between gap-3 px-5 lg:px-10">
          <a href="/" aria-label="MyScapez home">
            <img src="/myscapez-logo-small.png" alt="MyScapez" className="h-10 w-auto" />
          </a>
          <nav className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm text-[#a8b1a7]">
            <a href="/directory" className="transition hover:text-[#9cff12]">Directory</a>
            <a href="/directory#step=0" className="glow-button rounded-full px-4 py-2 font-semibold text-[#081006]">List your business</a>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden px-5 pb-16 pt-16 lg:px-10 lg:pb-24 lg:pt-28">
        <div className="ambient-background" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="eyebrow">South East Queensland</p>
            <h1 className="section-heading mt-4">Lawn jobs <span>near you.</span></h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#9ca99a]">
              See the kind of lawn mowing, lawn care and landscaping jobs homeowners ask for, then work out an example of what that volume could be worth at your price.
            </p>
          </div>
          <form className="shine-card" onSubmit={(event) => event.preventDefault()}>
            <h2 className="text-2xl font-semibold tracking-[-0.04em]">What that work could be worth</h2>
            <p className="mt-2 text-sm leading-6 text-[#869184]">Example only. Type your own price. This is not a forecast and not a promise of jobs.</p>
            <label className="mt-6 flex flex-col gap-2 text-sm font-medium">Jobs you'd like
              <select value={volume} onChange={(event) => setVolume(Number(event.target.value))} className="form-input">
                {volumes.map((item, index) => <option key={item.label} value={index}>{item.label}</option>)}
              </select>
            </label>
            <label className="mt-4 flex flex-col gap-2 text-sm font-medium">Area
              <input readOnly value="South East Queensland" className="form-input" />
            </label>
            <label className="mt-4 flex flex-col gap-2 text-sm font-medium">Your price per job
              <input inputMode="decimal" value={price} onInput={onPrice} className="form-input" placeholder="e.g. 80" />
            </label>
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9cff12]">Example total</p>
              {ready ? (
                <p className="mt-2 text-lg leading-7">
                  {band.low} × {money(amount)} = {money(band.low * amount)}
                  {band.high !== band.low && <>, up to {band.high} × {money(amount)} = {money(band.high * amount)}</>}
                  {" "}a month.
                </p>
              ) : (
                <p className="mt-2 leading-7 text-[#9aa995]">Type a price per job and the example total will show here.</p>
              )}
            </div>
          </form>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-[#080b08] px-5 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Example jobs</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">The kind of lawn work posted in SEQ</h2>
          <p className="mt-4 max-w-2xl text-[#9aa995]">These are examples, not live leads. We do not have a public count of jobs yet.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {exampleJobs.map((job) => (
              <article key={`${job.suburb}-${job.name}`} className="shine-card">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold text-[#9cff12]">{job.trade}</p>
                  <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-[#c8d2c5]">Example job</span>
                </div>
                <p className="mt-4 text-sm text-[#9aa995]">{job.suburb}, {job.postcode}</p>
                <p className="mt-3 leading-7 text-[#d9e3d7]">{job.summary}</p>
                <p className="mt-4 text-sm text-[#657162]">{job.name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Leads for lawn businesses. Not every trade in the country.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <article key={step.number} className="shine-card">
                <p className="text-sm font-semibold text-[#9cff12]">{step.number}</p>
                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#869184]">{step.copy}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 max-w-3xl rounded-[24px] border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-xl font-semibold">The work moves with the weather</h3>
            <p className="mt-3 leading-7 text-[#9aa995]">
              Grass in South East Queensland grows faster in the warm, wet months and slows when it is cooler or dry. A week of heavy rain can also push jobs around. A listing does not fill a quiet week by itself. It is one way for nearby homeowners to find you.
            </p>
          </div>
          <a href="/directory#step=0" className="glow-button mt-10 inline-flex min-h-14 items-center justify-center gap-3 rounded-full px-7 font-semibold text-[#081006]">
            List your business <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  )
}

export default JobsPage
