import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quote request",
  description: "What a MyScapez quote request asks for: the suburb, the job, the property and the lawn size. Photos are not uploaded.",
  alternates: { canonical: "/guides/request" },
}

export default function RequestGuideLayout({ children }: { children: React.ReactNode }) {
  return children
}
