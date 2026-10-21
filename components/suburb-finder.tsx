import { useState } from "react"
import { searchSuburbs } from "@/lib/seq-directory"

export function SuburbFinder({
  selected,
  onChange,
  single = false,
}: {
  selected: string[]
  onChange: (next: string[]) => void
  single?: boolean
}) {
  const [query, setQuery] = useState("")
  const results = searchSuburbs(query)
  const missed = query.trim().length >= 2 && results.length === 0

  function add(suburb: string) {
    if (single) onChange([suburb])
    else if (!selected.includes(suburb)) onChange([...selected, suburb])
    setQuery("")
  }

  return (
    <div className="flex flex-col gap-3">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="form-input"
        placeholder="Type a suburb, e.g. North Lakes"
        aria-label="Find a South East Queensland suburb"
        autoComplete="off"
      />
      {results.length > 0 && (
        <ul className="overflow-hidden rounded-2xl border border-white/10">
          {results.map((hit) => (
            <li key={hit.suburb}>
              <button type="button" onClick={() => add(hit.suburb)} className="flex min-h-11 w-full items-center justify-between px-4 text-left text-sm hover:bg-[#9cff12]/10">
                <span>{hit.suburb}</span>
                <span className="text-[#657162]">{hit.region}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {missed && <p className="text-sm text-[#9aa995]">No match in the South East Queensland list yet. Try the suburb name, or the region such as Redland.</p>}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((suburb) => (
            <button type="button" key={suburb} onClick={() => onChange(selected.filter((item) => item !== suburb))} className="min-h-11 rounded-full border border-[#9cff12] bg-[#9cff12]/10 px-3 text-sm text-[#d9f7c7]">
              {suburb} · remove
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
