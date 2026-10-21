import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Job store",
  alternates: { canonical: "/crm" },
  robots: { index: false, follow: false },
}

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return children
}
