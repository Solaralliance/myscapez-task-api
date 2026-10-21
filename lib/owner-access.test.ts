import { leadForOwner, leadsForOwner, ownedBusiness } from "./owner-access.ts"

const businesses = [
  { id: "alpha@example.com", email: "alpha@example.com", ownerToken: "token-a", name: "Alpha Lawns", phone: "0400000001" },
  { id: "beta@example.com", email: "beta@example.com", ownerToken: "token-b", name: "Beta Lawns", phone: "0400000002" },
]

const leads = [
  {
    id: "lead-a",
    customerId: "cust-a",
    customerName: "Ada",
    phone: "0400111111",
    email: "ada@example.com",
    matchedBusinessIds: ["alpha@example.com"],
    matchedContacts: [
      { id: "alpha@example.com", name: "Alpha Lawns", phone: "0400000001", email: "alpha@example.com" },
      { id: "beta@example.com", name: "Beta Lawns", phone: "0400000002", email: "beta@example.com" },
    ],
  },
  {
    id: "lead-b",
    customerId: "cust-b",
    customerName: "Ben",
    phone: "0400222222",
    email: "ben@example.com",
    matchedBusinessIds: ["beta@example.com"],
    matchedContacts: [{ id: "beta@example.com", name: "Beta Lawns", phone: "0400000002", email: "beta@example.com" }],
  },
]

const alpha = ownedBusiness(businesses, { email: "alpha@example.com", token: "token-a" })
const failures: string[] = []

function check(name: string, condition: boolean) {
  if (!condition) failures.push(name)
}

check("own business resolves", alpha?.id === "alpha@example.com")
check("email of the other contractor is not enough", ownedBusiness(businesses, { email: "beta@example.com", token: "token-a" }) === null)
check("missing token finds nothing", ownedBusiness(businesses, { email: "beta@example.com" }) === null)
check("swapped business id returns no leads", leadsForOwner(leads, alpha, "beta@example.com").length === 0)
check("swapped lead id returns nothing", leadForOwner(leads, alpha, "lead-b") === null)
const own = leadsForOwner(leads, alpha, "alpha@example.com")
check("own id returns only own lead", own.length === 1 && own[0].id === "lead-a")
check("other contractor phone is removed", own[0]?.matchedContacts?.every((contact) => contact.id === "alpha@example.com" && contact.phone === "" && contact.email === "") === true)
check("no session and a lead id returns nothing", leadForOwner(leads, null, "lead-b") === null)

if (failures.length) {
  console.error(failures.join("\n"))
  process.exit(1)
}
console.log("owner-access checks passed")
