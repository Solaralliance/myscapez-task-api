import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Lawn services",
  description: "What MyScapez means by lawn mowing, lawn care and landscaping, and the jobs a South East Queensland business can switch on.",
  alternates: { canonical: "/services" },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
