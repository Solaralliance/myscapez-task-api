import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SEQ lawn directory",
  description: "Sample profiles for lawn mowing, lawn care and landscaping businesses in South East Queensland. Real listings are reviewed before they go public.",
  alternates: { canonical: "/directory" },
}

export default function DirectoryLayout({ children }: { children: React.ReactNode }) {
  return children
}
