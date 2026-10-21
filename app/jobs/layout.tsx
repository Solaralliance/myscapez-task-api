import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Lawn jobs",
  description: "How a lawn business on MyScapez chooses the jobs and suburbs it wants. MyScapez does not take a cut of the job.",
  alternates: { canonical: "/jobs" },
}

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return children
}
