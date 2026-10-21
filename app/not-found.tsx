export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#050605] px-6 text-center text-[#f2f6ef]">
      <div className="max-w-md">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9cff12]">404</p>
        <h1 className="mt-4 text-4xl font-semibold">That page is not here.</h1>
        <p className="mt-4 leading-7 text-[#9ca99a]">The directory only lists lawn mowing, lawn care and landscaping in South East Queensland.</p>
        <a href="/" className="glow-button mt-8 inline-flex min-h-12 items-center rounded-full px-6 font-semibold text-[#081006]">Back home</a>
      </div>
    </main>
  )
}
