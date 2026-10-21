"use client"

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#050605] px-6 text-center text-[#f2f6ef]">
      <div className="max-w-md">
        <p className="text-lg font-semibold">This page could not be loaded.</p>
        <button type="button" onClick={() => reset()} className="glow-button mt-6 min-h-12 rounded-full px-6 font-semibold text-[#081006]">Try again</button>
      </div>
    </main>
  )
}
