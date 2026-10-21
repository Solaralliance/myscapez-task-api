import { ServiceCategoryView } from "@/components/service-category"
import { categoryBySlug } from "@/lib/service-categories"

export default function LandscapingPage() {
  return <ServiceCategoryView category={categoryBySlug("landscaping")} />
}
