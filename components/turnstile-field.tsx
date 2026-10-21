"use client"

import { useEffect, useRef } from "react"

type TurnstileApi = {
  render: (element: HTMLElement, options: { sitekey: string; callback: (token: string) => void }) => void
}

export function TurnstileField({ onToken }: { onToken: (token: string) => void }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const holder = useRef<HTMLDivElement>(null)
  const onTokenRef = useRef(onToken)
  onTokenRef.current = onToken

  useEffect(() => {
    if (!siteKey || !holder.current) return
    let cancelled = false
    const script = document.createElement("script")
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js"
    script.async = true
    document.head.appendChild(script)
    const timer = window.setInterval(() => {
      const turnstile = (window as unknown as { turnstile?: TurnstileApi }).turnstile
      if (!turnstile || !holder.current || cancelled) return
      window.clearInterval(timer)
      turnstile.render(holder.current, { sitekey: siteKey, callback: (token) => onTokenRef.current(token) })
    }, 200)
    return () => {
      cancelled = true
      window.clearInterval(timer)
    }
  }, [siteKey])

  if (!siteKey) return null
  return <div ref={holder} className="min-h-16" />
}
