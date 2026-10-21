import { ServiceCategoryView } from "@/components/service-category"
import { categoryBySlug } from "@/lib/service-categories"

export default function MowingPage() {
  return <ServiceCategoryView category={categoryBySlug("mowing")} />
}
