import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description: "MyScapez connects homeowners with lawn mowing and garden care businesses, and keeps contact details off the public profile.",
  alternates: { canonical: "/about" },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
