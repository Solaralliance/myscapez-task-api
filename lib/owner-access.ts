type Session = { email: string; token?: string } | null

type BusinessRecord = { id: string; email: string; ownerToken?: string }

type LeadContact = { id: string; name: string; phone: string; email: string }

type LeadRecord = {
  id: string
  customerId: string
  matchedBusinessIds: string[]
  matchedContacts?: LeadContact[]
}

/** The business tied to this browser token. An email or id on its own is not permission. */
export function ownedBusiness<T extends BusinessRecord>(businesses: T[], session: Session) {
  if (!session?.token || !session.email) return null
  return businesses.find((business) => business.email.toLowerCase() === session.email.toLowerCase() && business.ownerToken === session.token) ?? null
}

/** Leads for that business only. A requested id that is not theirs returns nothing, including no confirmation the other record exists. */
export function leadsForOwner<T extends LeadRecord>(leads: T[], business: BusinessRecord | null, requestedBusinessId?: string | null) {
  if (!business) return []
  if (requestedBusinessId && requestedBusinessId !== business.id) return []
  return leads
    .filter((lead) => lead.matchedBusinessIds.includes(business.id))
    .map((lead) => ({
      ...lead,
      matchedContacts: (lead.matchedContacts ?? [])
        .filter((contact) => contact.id === business.id)
        .map((contact) => ({ ...contact, phone: "", email: "" })),
    }))
}

export function leadForOwner<T extends LeadRecord>(leads: T[], business: BusinessRecord | null, leadId: string) {
  return leadsForOwner(leads, business).find((lead) => lead.id === leadId) ?? null
}
