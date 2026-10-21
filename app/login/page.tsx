'use client'

import { FormEvent, useState } from 'react'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') || '').trim()
    const password = String(form.get('password') || '')

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNotice('')
      setError('Enter a valid email address.')
      return
    }
    if (password.length < 8) {
      setNotice('')
      setError('Use at least 8 characters for your password.')
      return
    }

    setError('')
    setNotice('We couldn’t sign you in. Account access isn’t switched on yet, and your password was not sent.')
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050605] text-[#f2f6ef]">
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#050605]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-5 lg:px-10">
          <a href="/" aria-label="MyScapez home">
            <img src="/myscapez-logo-small.png" alt="MyScapez" className="h-10 w-auto" />
          </a>
          <nav className="flex items-center gap-5 text-sm text-[#a8b1a7] sm:gap-8">
            <a href="/" className="transition hover:text-[#9cff12]">Home</a>
            <a href="/request" className="glow-button rounded-full px-4 py-2 font-semibold text-[#081006]">Request a mower</a>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden px-5 pb-20 pt-16 lg:px-10 lg:pb-28 lg:pt-28">
        <div className="ambient-background" aria-hidden="true">
          <span className="ambient-orb ambient-orb-one" />
          <span className="ambient-orb ambient-orb-two" />
        </div>
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="eyebrow">Account</p>
            <h1 className="section-heading mt-4 max-w-xl">Welcome <span>back.</span></h1>
            <p className="mt-7 max-w-md text-lg leading-8 text-[#9ca99a]">Log in with the email and password for your MyScapez account.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="rounded-[28px] border border-[#9cff12]/25 bg-[#0d150b] p-6 sm:p-8" onInput={() => { if (error || notice) { setError(''); setNotice('') } }}>
            <h2 className="text-2xl font-semibold tracking-[-0.04em]">Log in</h2>
            <p className="mt-2 text-sm leading-6 text-[#7f8d7d]">Use the email you signed up with. Your password stays on this page.</p>

            <div className="mt-7 flex flex-col gap-5">
              <label className="flex flex-col gap-2 text-sm font-medium" htmlFor="email">
                Email
                <input id="email" name="email" type="email" autoComplete="email" inputMode="email" required className="form-input" placeholder="you@email.com" aria-invalid={error ? true : undefined} aria-describedby={error ? 'login-error' : undefined} />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium" htmlFor="password">
                Password
                <span className="relative block">
                  <input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required minLength={8} className="form-input has-toggle" placeholder="At least 8 characters" aria-invalid={error ? true : undefined} aria-describedby={error ? 'login-error' : 'password-hint'} />
                  <button type="button" onClick={() => setShowPassword((current) => !current)} className="absolute top-1/2 right-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full text-[#9cff12]" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                  </button>
                </span>
                <span id="password-hint" className="text-xs font-normal text-[#657162]">At least 8 characters.</span>
              </label>
            </div>

            {error && <p id="login-error" role="alert" className="mt-4 text-sm text-[#ff9f9f]">{error}</p>}
            {notice && <p role="status" className="mt-4 text-sm leading-6 text-[#c8d2c5]">{notice}</p>}

            <button type="submit" className="glow-button mt-6 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full px-7 font-semibold text-[#081006]">
              Log in <ArrowRight aria-hidden="true" />
            </button>
            <p className="mt-5 text-center text-sm text-[#7f8d7d]">Listing your business? <a href="/login/business" className="font-semibold text-[#9cff12]">Business log in</a></p>
          </form>
        </div>
      </section>

      <footer className="border-t border-white/[0.08] px-5 py-8 text-sm text-[#657162]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <span>© 2026 Myscapez · ABN 79 501 664 159</span>
          <a href="https://thehoneypot.com.au" target="_blank" rel="noreferrer" className="honeypot-link">Built by Honeypot</a>
        </div>
      </footer>
    </main>
  )
}
