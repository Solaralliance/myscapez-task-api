import "server-only"
import { track } from "@vercel/analytics/server"

export async function countEnquiry(kind: "lead" | "listing") {
  try {
    await track("enquiry", { kind })
  } catch {
    // A counting failure must not change the form result or write the request.
  }
}
