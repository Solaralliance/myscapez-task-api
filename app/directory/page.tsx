"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
import { ArrowRight, Check, MapPin, ShieldCheck, Sparkles } from "lucide-react"
import { BusinessProfile } from "@/components/business-profile"
import { TurnstileField } from "@/components/turnstile-field"
import { safeFormError } from "@/lib/form-errors"
import { Crumbs } from "@/components/crumbs"
import { directoryAnswers, siteUrl } from "@/lib/public-pages"
import { exampleListings, isSeqPostcode, isValidAbn, lookupPostcode, phoneError, seqRegions, trades, type SeqRegion, type TradeTitle } from "@/lib/seq-directory"


const steps = [
  { label: "Business location", title: "Your business postcode" },
  { label: "Trade category", title: "What's the main type of work you do?" },
  { label: "Email address", title: "What is your email address?" },
  { label: "Contact details", title: "Contact number" },
  { label: "Business owner", title: "Provide a few more details about you and your business." },
  { label: "Profile", title: "Your public profile" },
  { label: "About the business", title: "Tell us more about your business." },
  { label: "Last questions", title: "Last few questions..." },
] as const

function initialsFrom(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2)
  const letters = parts.map((part) => part[0]?.toUpperCase() ?? "").join("")
  return letters || "MB"
}

function DirectoryPage() {
  const [step, setStep] = useState(0)
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState("")
  const [postcode, setPostcode] = useState("")
  const [mainTrade, setMainTrade] = useState<TradeTitle | "">("")
  const [alsoOffer, setAlsoOffer] = useState<TradeTitle[]>([])
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [abn, setAbn] = useState("")
  const [region, setRegion] = useState<SeqRegion>("Moreton Bay")
  const [suburbs, setSuburbs] = useState<string[]>([])
  const [headline, setHeadline] = useState("")
  const [about, setAbout] = useState("")
  const [newListing, setNewListing] = useState("")
  const [employees, setEmployees] = useState("")
  const [hasAbn, setHasAbn] = useState("")
  const [structure, setStructure] = useState("")
  const [years, setYears] = useState("")
  const [heard, setHeard] = useState("")
  const [heardOther, setHeardOther] = useState("")

  const skipHashWrite = useRef(true)
  const scrollToForm = useRef(false)

  useEffect(() => {
    const raw = new URLSearchParams(window.location.hash.replace(/^#/, "")).get("step")
    const number = Number(raw)
    if (raw !== null && number >= 0 && number < steps.length) {
      scrollToForm.current = true
      setStep(number)
    }
  }, [])

  useEffect(() => {
    if (skipHashWrite.current) {
      skipHashWrite.current = false
      const raw = new URLSearchParams(window.location.hash.replace(/^#/, "")).get("step")
      if (raw !== null && Number(raw) !== step) return
    }
    const next = `#step=${step}`
    if (window.location.hash !== next) window.history.replaceState(null, "", next)
    if (scrollToForm.current) {
      document.getElementById("listing-form")?.scrollIntoView({ block: "start" })
      scrollToForm.current = false
    }
  }, [step])

  function toggleAlso(title: TradeTitle) {
    setAlsoOffer((current) => (current.includes(title) ? current.filter((item) => item !== title) : [...current, title]))
    setError("")
  }

  function toggleSuburb(suburb: string) {
    setSuburbs((current) => (current.includes(suburb) ? current.filter((item) => item !== suburb) : [...current, suburb]))
    setError("")
  }

  function applyPostcode() {
    const matches = lookupPostcode(postcode)
    if (!matches) return false
    setRegion(matches[0].region)
    setSuburbs((current) => (current.length > 0 ? current : matches.map((match) => match.suburb)))
    return true
  }

  function validate(index: number) {
    if (index === 0) {
      const digits = postcode.replace(/\D/g, "")
      if (digits.length !== 4) return "Enter a 4-digit postcode."
      if (!isSeqPostcode(digits)) return "That postcode is outside South East Queensland. We are starting there."
    }
    if (index === 1 && !mainTrade) return "Select your main trade. Listings are lawn mowing, lawn care or landscaping."
    if (index === 2 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Please enter a valid email address."
    if (index === 3) {
      const message = phoneError(phone)
      if (message) return message
    }
    if (index === 4) {
      if (!/^[A-Za-z][A-Za-z .'-]{1,}$/.test(firstName.trim())) return "Enter your first name."
      if (!/^[A-Za-z][A-Za-z .'-]{1,}$/.test(lastName.trim())) return "Enter your last name."
    }
    if (index === 5) {
      if (suburbs.length === 0) return "Choose at least one South East Queensland suburb you cover."
      if (headline.trim().length < 8) return "Add a short headline customers will see."
      if (about.trim().length < 40) return "Add a few sentences about the business. At least 40 characters."
    }
    if (index === 6 && hasAbn === "Yes" && !isValidAbn(abn)) return "Enter a valid 11-digit ABN."
    return ""
  }

  function goNext() {
    const message = validate(step)
    if (message) {
      setError(message)
      return
    }
    if (step === 0) applyPostcode()
    setError("")
    setStep((current) => Math.min(current + 1, steps.length - 1))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending || submitted) return
    const earlier = validate(5)
    if (earlier) {
      setStep(5)
      setError(earlier)
      return
    }
    const message = validate(6)
    if (message) {
      setStep(6)
      setError(message)
      return
    }
    setSending(true)
    try {
      const response = await fetch("/api/listings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ postcode, mainTrade, email, phone, firstName, lastName, businessName, suburbs, headline, about, hasAbn, abn, turnstileToken }),
      })
      const payload = await response.json().catch(() => null)
      if (!response.ok) {
        setError(safeFormError(payload?.error))
        return
      }
      setError("")
      setSubmitted(true)
    } catch {
      setError("Check the form and try again.")
    } finally {
      setSending(false)
    }
  }

  const displayName = businessName.trim() || `${firstName.trim()} ${lastName.trim()}`.trim()
  const services = mainTrade ? [mainTrade, ...alsoOffer.filter((item) => item !== mainTrade)] : []
  const matches = lookupPostcode(postcode)

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050605] text-[#f2f6ef]">
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#050605]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between gap-3 px-5 lg:px-10">
          <a href="/" aria-label="MyScapez home">
            <img src="/myscapez-logo-small.png" alt="MyScapez" className="h-10 w-auto" />
          </a>
          <nav className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm text-[#a8b1a7]">
            <a href="/services" className="transition hover:text-[#9cff12]">Services</a>
            <a href="/jobs" className="transition hover:text-[#9cff12]">Lawn jobs</a>
            <a href="/about" className="transition hover:text-[#9cff12]">About us</a>
            <a href="/login/business" className="transition hover:text-[#9cff12]">Business log in</a>
            <a href="/request" className="glow-button rounded-full px-4 py-2 font-semibold text-[#081006]">I need a mower</a>
          </nav>
        </div>
      </header>
      <Crumbs items={[{ href: "/", label: "Home" }, { href: "/directory", label: "Directory" }]} />

      <section className="relative overflow-hidden px-5 pb-16 pt-16 lg:px-10 lg:pb-24 lg:pt-28">
        <div className="ambient-background" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="eyebrow">South East Queensland</p>
          <h1 className="section-heading mt-4 max-w-4xl">Lawn businesses, <span>on the map.</span></h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#9ca99a]">
            A free directory for lawn mowing, lawn care and landscaping only. We are starting in South East Queensland, from the Sunshine Coast through Brisbane to the Gold Coast.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#step=0" className="glow-button inline-flex min-h-14 items-center justify-center gap-3 rounded-full px-7 font-semibold text-[#081006]">
              List your business <ArrowRight aria-hidden="true" />
            </a>
            <a href="/directory/greenline-grounds" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/15 px-7 text-[#d9e3d7] transition hover:border-[#9cff12]/60 hover:text-[#9cff12]">
              View an example profile
            </a>
            <a href="/jobs" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/15 px-7 text-[#d9e3d7] transition hover:border-[#9cff12]/60 hover:text-[#9cff12]">
              See example jobs
            </a>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-[#080b08] px-5 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Example directory</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">What customers browse</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#879286]">These three cards are samples, using the same names already on the home page. They are not live businesses.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {exampleListings.map((listing) => (
              <a key={listing.slug} href={`/directory/${listing.slug}`} className="shine-card block">
                <div className="flex items-start justify-between">
                  <div className="flex size-12 items-center justify-center rounded-2xl border border-[#9cff12]/30 bg-[#9cff12]/10 font-semibold text-[#b7ff60]">{listing.initials}</div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-[#91a08e]">Example</span>
                </div>
                <h3 className="mt-7 text-lg font-semibold">{listing.name}</h3>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-[#849082]"><MapPin aria-hidden="true" /> {listing.base}, {listing.region}</p>
                <p className="mt-4 text-sm text-[#9cff12]">{listing.services.join(" · ")}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          <article className="shine-card"><Sparkles className="text-[#9cff12]" aria-hidden="true" /><h2 className="mt-8 text-xl font-semibold">Lawn work, in groups</h2><p className="mt-3 text-sm leading-6 text-[#869184]">Mowing, garden maintenance, lawn improvement, clean-ups, commercial and acreage, plus extras. A business only receives a job it has switched on.</p></article>
          <article className="shine-card"><MapPin className="text-[#9cff12]" aria-hidden="true" /><h2 className="mt-8 text-xl font-semibold">SEQ suburbs only</h2><p className="mt-3 text-sm leading-6 text-[#869184]">Pick the suburbs you actually cover, from the Sunshine Coast, Brisbane, Ipswich, Logan, Redland and the Gold Coast.</p></article>
          <article className="shine-card"><ShieldCheck className="text-[#9cff12]" aria-hidden="true" /><h2 className="mt-8 text-xl font-semibold">Private contact details</h2><p className="mt-3 text-sm leading-6 text-[#869184]">Customers see your profile. Your phone and email are for verification, not the public page.</p></article>
        </div>
      </section>

      <section className="px-5 pb-8 lg:px-10" aria-labelledby="directory-answers">
        <div className="mx-auto max-w-7xl">
          <h2 id="directory-answers" className="text-3xl font-semibold">Answers before you list</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {directoryAnswers.map((item) => (
              <article key={item.question} className="shine-card">
                <h3 className="text-lg font-semibold">{item.question}</h3>
                <p className="mt-3 text-sm leading-6 text-[#869184]">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="join" className="px-5 pb-20 lg:px-10 lg:pb-28">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[32px] border border-[#9cff12]/25 bg-[#0d150b] p-6 sm:p-10 lg:grid-cols-[.75fr_1.25fr] lg:p-14">
          <div>
            <p className="eyebrow">List your business</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">One question <span className="text-[#9cff12]">at a time.</span></h2>
            <ol className="mt-8 flex flex-col gap-3">
              {steps.map((item, index) => (
                <li key={item.label} className={`flex items-center gap-3 text-sm ${index === step ? "text-[#f2f6ef]" : "text-[#7f8d7d]"}`}>
                  <span className={`flex size-8 items-center justify-center rounded-full border ${index <= step ? "border-[#9cff12] text-[#9cff12]" : "border-white/15"}`}>{index + 1}</span>
                  {item.label}
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm leading-6 text-[#657162]">Nothing is published from this form. You get a preview of the public profile, and we review SEQ lawn businesses before a listing goes live.</p>
          </div>

          <div id="listing-form" className="rounded-[24px] border border-white/10 bg-black/20 p-5 sm:p-7">
            {submitted ? (
              <div className="flex flex-col gap-6">
                <div className="flex size-14 items-center justify-center rounded-full bg-[#9cff12] text-[#081006]"><Check aria-hidden="true" /></div>
                <div>
                  <h3 className="text-2xl font-semibold">Preview ready. Not published.</h3>
                  <p className="mt-2 leading-7 text-[#9aa995]">This is how the public profile would look. Your phone, email and ABN are not on it. We have not saved this listing.</p>
                </div>
                <BusinessProfile
                  name={displayName}
                  initials={initialsFrom(displayName)}
                  headline={headline.trim()}
                  about={about.trim()}
                  base={suburbs[0]}
                  region={region}
                  services={services}
                  suburbs={suburbs}
                />
                <button type="button" onClick={() => setSubmitted(false)} className="text-left text-sm font-semibold text-[#9cff12]">Edit my details</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9cff12]">Step {step + 1} of {steps.length}</p>
                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full bg-[#9cff12]" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold">{steps[step].title}</h3>
                </div>

                {step === 0 && (
                  <label className="flex flex-col gap-2 text-sm font-medium">Your business postcode
                    <input required inputMode="numeric" autoComplete="postal-code" maxLength={4} value={postcode} onChange={(event) => { setPostcode(event.target.value.replace(/\D/g, "").slice(0, 4)); setError("") }} className="form-input" placeholder="4509" />
                    <span className="text-xs font-normal text-[#657162]">4 digits. South East Queensland only for now.</span>
                    {matches && <span className="text-sm font-normal text-[#9cff12]">{matches.map((match) => match.suburb).join(", ")} · {matches[0].region}</span>}
                    {postcode.length === 4 && isSeqPostcode(postcode) && !matches && <span className="text-sm font-normal text-[#9cff12]">South East Queensland. Choose the suburbs you cover on the last step.</span>}
                  </label>
                )}

                {step === 1 && (
                  <div className="grid gap-3">
                    <p className="text-sm text-[#879286]">Choose one category for now. You can add more later.</p>
                    {trades.map((trade) => {
                      const active = mainTrade === trade.title
                      return (
                        <button type="button" key={trade.id} onClick={() => { setMainTrade(trade.title); setError("") }} aria-pressed={active} className={`rounded-2xl border p-4 text-left ${active ? "border-[#9cff12] bg-[#9cff12]/10" : "border-white/10 bg-white/[0.03]"}`}>
                          <span className="flex items-center justify-between gap-3 font-semibold">{trade.title}{active && <Check className="text-[#9cff12]" aria-hidden="true" />}</span>
                          <span className="mt-1 block text-sm leading-6 text-[#869184]">{trade.copy}</span>
                        </button>
                      )
                    })}
                    {mainTrade && (
                      <div className="mt-2 flex flex-col gap-2">
                        <p className="text-sm text-[#9aa995]">Also offer</p>
                        {trades.filter((trade) => trade.title !== mainTrade).map((trade) => {
                          const active = alsoOffer.includes(trade.title)
                          return (
                            <button type="button" key={trade.id} onClick={() => toggleAlso(trade.title)} aria-pressed={active} className={`min-h-11 rounded-full border px-4 text-left text-sm ${active ? "border-[#9cff12] text-[#d9f7c7]" : "border-white/15 text-[#c8d2c5]"}`}>
                              {trade.title}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )}

                {step === 2 && (
                  <div className="flex flex-col gap-5">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-lg font-semibold">You're in demand</p>
                      <p className="mt-2 text-sm leading-6 text-[#c8d2c5]">
                        {mainTrade || "Lawn"} work around {postcode || "your postcode"}. Homeowners on MyScapez ask for lawn mowing, lawn care and landscaping in South East Queensland.
                      </p>
                      <p className="mt-2 text-xs leading-5 text-[#657162]">We don't show a lead count yet. That number will only appear once real jobs are posted near this postcode.</p>
                    </div>
                    <label className="flex flex-col gap-2 text-sm font-medium">Email address
                      <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="form-input" placeholder="you@business.com" autoComplete="email" />
                    </label>
                    <p className="text-xs leading-5 text-[#657162]">By clicking Next, you agree we can email you about this listing. Your email stays off the public profile.</p>
                  </div>
                )}

                {step === 3 && (
                  <label className="flex flex-col gap-2 text-sm font-medium">Contact number
                    <input required type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className="form-input" placeholder="04xx xxx xxx" autoComplete="tel" />
                    <span className="text-xs font-normal text-[#657162]">10 digits, starting with 0. Required. This phone number is not published on the directory.</span>
                  </label>
                )}

                {step === 4 && (
                  <div className="flex flex-col gap-5">
                    <p className="text-sm leading-6 text-[#9aa995]">This will help us verify your business.</p>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="flex flex-col gap-2 text-sm font-medium">First name
                        <input required value={firstName} onChange={(event) => setFirstName(event.target.value)} className="form-input" autoComplete="given-name" />
                      </label>
                      <label className="flex flex-col gap-2 text-sm font-medium">Last name
                        <input required value={lastName} onChange={(event) => setLastName(event.target.value)} className="form-input" autoComplete="family-name" />
                      </label>
                      <label className="flex flex-col gap-2 text-sm font-medium sm:col-span-2">Registered business name <span className="font-normal text-[#657162]">Optional</span>
                        <input value={businessName} onChange={(event) => setBusinessName(event.target.value)} className="form-input" placeholder="Green Edge Lawns" autoComplete="organization" />
                      </label>
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-3">
                      <label className="flex flex-col gap-2 text-sm font-medium">Suburbs you cover
                        <select value={region} onChange={(event) => setRegion(event.target.value as SeqRegion)} className="form-input">
                          {Object.keys(seqRegions).map((name) => <option key={name}>{name}</option>)}
                        </select>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {seqRegions[region].map((suburb) => {
                          const active = suburbs.includes(suburb)
                          return (
                            <button type="button" key={suburb} onClick={() => toggleSuburb(suburb)} aria-pressed={active} className={`min-h-11 rounded-full border px-3 text-sm ${active ? "border-[#9cff12] bg-[#9cff12]/10 text-[#d9f7c7]" : "border-white/15 text-[#c8d2c5]"}`}>
                              {suburb}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                    <label className="flex flex-col gap-2 text-sm font-medium">Headline
                      <input required value={headline} onChange={(event) => setHeadline(event.target.value)} className="form-input" placeholder="Lawn mowing across North Lakes" maxLength={80} />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-medium">About the business
                      <textarea required value={about} onChange={(event) => setAbout(event.target.value)} rows={4} className="form-input resize-y" placeholder="What you do, and the lawns you look after." maxLength={600} />
                    </label>
                  </div>
                )}

                {step === 6 && (
                  <div className="flex flex-col gap-5">
                    <p className="text-sm leading-6 text-[#9aa995]">Optional. These answers are not published on the public profile, and nothing is saved from this form.</p>
                    <label className="flex flex-col gap-2 text-sm font-medium">Are you new to MyScapez?
                      <select value={newListing} onChange={(event) => setNewListing(event.target.value)} className="form-input">
                        <option value="">Select an option</option>
                        <option>Yes, this is a new listing</option>
                        <option>No, I've asked about listing before</option>
                        <option>No, I already have a listing</option>
                      </select>
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-medium">How many employees do you have?
                      <select value={employees} onChange={(event) => setEmployees(event.target.value)} className="form-input">
                        <option value="">Select an option</option>
                        <option>It's just me</option>
                        <option>2 - 5 employees</option>
                        <option>6 - 10 employees</option>
                        <option>10+ employees</option>
                      </select>
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-medium">Do you have an ABN?
                      <select value={hasAbn} onChange={(event) => setHasAbn(event.target.value)} className="form-input">
                        <option value="">Select an option</option>
                        <option value="Yes">Yes, I have an ABN</option>
                        <option value="No">No, I don't have an ABN</option>
                      </select>
                    </label>
                    {hasAbn === "Yes" && (
                      <label className="flex flex-col gap-2 text-sm font-medium">ABN
                        <input value={abn} onChange={(event) => setAbn(event.target.value)} inputMode="numeric" className="form-input" placeholder="11 digits" autoComplete="off" />
                      </label>
                    )}
                  </div>
                )}

                {step === 7 && (
                  <div className="flex flex-col gap-5">
                    <p className="text-sm leading-6 text-[#9aa995]">Optional. These answers are not published on the public profile, and nothing is saved from this form.</p>
                    <label className="flex flex-col gap-2 text-sm font-medium">What is your business structure?
                      <select value={structure} onChange={(event) => setStructure(event.target.value)} className="form-input">
                        <option value="">Select an option</option>
                        <option>I own the business</option>
                        <option>I am in a partnership/co-own the business</option>
                        <option>I work for the business (not the owner)</option>
                        <option>I own the business under a franchise agreement</option>
                        <option>I'm looking for employment</option>
                      </select>
                    </label>
                    {structure === "I'm looking for employment" && (
                      <p className="text-sm leading-6 text-[#9aa995]">This directory lists lawn businesses, not jobs. You can finish the form, but we will not publish a job ad.</p>
                    )}
                    <label className="flex flex-col gap-2 text-sm font-medium">Years working in the industry
                      <select value={years} onChange={(event) => setYears(event.target.value)} className="form-input">
                        <option value="">Select an option</option>
                        <option>Less than 1 year</option>
                        <option>1 - 4 years</option>
                        <option>5 - 9 years</option>
                        <option>10 years or more</option>
                      </select>
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-medium">How did you hear about MyScapez?
                      <select value={heard} onChange={(event) => setHeard(event.target.value)} className="form-input">
                        <option value="">Select an option</option>
                        <option>Word of mouth/referral</option>
                        <option>TV</option>
                        <option>Radio</option>
                        <option>Spotify</option>
                        <option>YouTube</option>
                        <option>Social media</option>
                        <option>In the news/press</option>
                        <option>Google</option>
                        <option>ChatGPT</option>
                        <option>Other - Please specify below</option>
                      </select>
                    </label>
                    {heard === "Other - Please specify below" && (
                      <label className="flex flex-col gap-2 text-sm font-medium">Tell us where <span className="font-normal text-[#657162]">Optional</span>
                        <input value={heardOther} onChange={(event) => setHeardOther(event.target.value)} className="form-input" placeholder="e.g. flyer, podcast, billboard" />
                      </label>
                    )}
                  </div>
                )}

                {step === steps.length - 1 && <TurnstileField onToken={setTurnstileToken} />}
                {error && <p role="alert" className="text-sm text-[#ff9f9f]">{error}</p>}

                <div className="flex flex-wrap gap-3">
                  {step > 0 && (
                    <button type="button" onClick={() => { setError(""); setStep((current) => current - 1) }} className="min-h-14 rounded-full border border-white/15 px-6 text-sm text-[#d9e3d7]">
                      Back
                    </button>
                  )}
                  {step < steps.length - 1 ? (
                    <button type="button" onClick={goNext} className="glow-button min-h-14 rounded-full px-7 font-semibold text-[#081006]">
                      Next <ArrowRight className="ml-2 inline" aria-hidden="true" />
                    </button>
                  ) : (
                    <button type="submit" disabled={sending} className="glow-button min-h-14 rounded-full px-7 font-semibold text-[#081006] disabled:opacity-60">
                      Preview my profile <ArrowRight className="ml-2 inline" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.08] px-5 py-8 text-sm text-[#657162]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <span>© 2026 Myscapez · ABN 79 501 664 159</span>
          <a href="/about" className="transition hover:text-[#9cff12]">About MyScapez</a>
        </div>
      </footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        url: `${siteUrl}/directory`,
        mainEntity: directoryAnswers.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Sample lawn business profiles",
        itemListElement: exampleListings.map((listing, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: listing.name,
          url: `${siteUrl}/directory/${listing.slug}`,
        })),
      }) }} />
    </main>
  )
}

export default DirectoryPage
