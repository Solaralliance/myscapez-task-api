"use client"

import { useEffect, useState } from "react"
import { businessSession, loadStore, type LeadRecord } from "@/lib/match-store"
import { leadsForOwner, ownedBusiness } from "@/lib/owner-access"
import { jobById } from "@/lib/work-catalog"


function CrmPage() {
  const [ready, setReady] = useState(false)
  const [denied, setDenied] = useState(false)
  const [leads, setLeads] = useState<LeadRecord[]>([])
  const [businessName, setBusinessName] = useState("")

  useEffect(() => {
    const session = businessSession()
    const store = loadStore()
    const business = ownedBusiness(store.businesses, session)
    const requested = new URLSearchParams(window.location.search).get("businessId") || new URLSearchParams(window.location.search).get("id") || new URLSearchParams(window.location.search).get("lead")
    if (requested && (!business || (requested !== business.id && !leadsForOwner(store.leads, business).some((lead) => lead.id === requested)))) {
      setDenied(true)
      setLeads([])
      setReady(true)
      return
    }
    const visible = leadsForOwner(store.leads, business)
    setLeads(requested && requested !== business?.id ? visible.filter((lead) => lead.id === requested) : visible)
    setBusinessName(business?.name || "")
    setReady(true)
  }, [])

  if (!ready) return null

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050605] text-[#f2f6ef]">
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#050605]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between gap-3 px-5 lg:px-10">
          <a href="/" aria-label="MyScapez home"><img src="/myscapez-logo-small.png" alt="MyScapez" className="h-10 w-auto" /></a>
          <a href="/dashboard" className="text-sm text-[#a8b1a7] hover:text-[#9cff12]">Dashboard</a>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-10">
        <p className="eyebrow">Lead list</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">Where each job is stored</h1>
        <p className="mt-4 max-w-2xl leading-7 text-[#9aa995]">{businessName ? `Jobs matched to ${businessName}. Another contractor's id does not open their enquiries.` : "Sign in from the business login in this browser. This page does not list every enquiry."}</p>
        <div className="mt-8 flex flex-col gap-4">
          {denied && <p className="text-sm text-[#9aa995]">That record is not available to this login.</p>}
          {!denied && leads.length === 0 && <p className="text-sm text-[#657162]">No jobs for this business yet.</p>}
          {leads.map((lead) => (
            <article key={lead.id} className="rounded-[24px] border border-white/10 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-semibold">{jobById(lead.category)?.group}: {jobById(lead.category)?.title}</h2>
                <p className="text-sm font-semibold text-[#9cff12]">{lead.bucket} · {lead.score}</p>
              </div>
              <p className="mt-2 text-sm text-[#9aa995]">{lead.customerName} · {lead.suburb} · {lead.propertyType || "Property not set"} · {lead.lawnSize || "Size not set"} · {lead.frequency || "Frequency not set"}</p>
              {lead.extras?.length ? <p className="mt-1 text-sm text-[#9aa995]">Extras: {lead.extras.join(", ")}</p> : null}
              {lead.photoCount ? <p className="mt-1 text-sm text-[#657162]">{lead.photoCount} photo{lead.photoCount === 1 ? "" : "s"} counted. The files were not uploaded.</p> : null}
              <p className="mt-2 text-sm text-[#c8d2c5]">Contact details are hidden.</p>
              <p className="mt-2 text-sm text-[#c8d2c5]">
                {lead.matchedContacts?.length
                  ? lead.matchedContacts.map((business) => business.name).join(", ")
                  : lead.matchedBusinessIds.length
                    ? "Stored with a matched business"
                    : "No business. Kept in the no-coverage list."}
              </p>
              <ul className="mt-3 text-sm leading-6 text-[#657162]">{lead.reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default CrmPage
