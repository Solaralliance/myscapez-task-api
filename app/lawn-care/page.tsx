import { ServiceCategoryView } from "@/components/service-category"
import { categoryBySlug } from "@/lib/service-categories"

export default function LawnCarePage() {
  return <ServiceCategoryView category={categoryBySlug("lawn-care")} />
}
