import { siteUrl } from "@/lib/public-pages"

export function Crumbs({ items }: { items: { href: string; label: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: new URL(item.href, siteUrl).toString(),
    })),
  }
  return (
    <nav aria-label="Breadcrumb" className="relative z-10 mx-auto flex max-w-7xl px-5 pt-6 text-sm text-[#9ca99a] lg:px-10">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {index === items.length - 1 ? <span className="text-[#f2f6ef]">{item.label}</span> : <a href={item.href} className="hover:text-[#9cff12]">{item.label}</a>}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
    </nav>
  )
}
