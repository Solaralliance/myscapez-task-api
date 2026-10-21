import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Request a mower",
  description: "Request lawn work in a South East Queensland suburb. The job is matched to a business that does that work in that suburb.",
  alternates: { canonical: "/request" },
}

export default function RequestLayout({ children }: { children: React.ReactNode }) {
  return children
}
