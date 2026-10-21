import type { Metadata } from "next"
import { categoryBySlug } from "@/lib/service-categories"

const category = categoryBySlug("lawn-care")

export const metadata: Metadata = {
  title: category.metaTitle,
  description: category.metaDescription,
  alternates: { canonical: category.path },
  openGraph: { title: category.metaTitle, description: category.metaDescription, url: category.path },
}

export default function LawnCareLayout({ children }: { children: React.ReactNode }) {
  return children
}
