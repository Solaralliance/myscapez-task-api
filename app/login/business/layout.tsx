import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Business log in',
  description: 'Log in for lawn and garden businesses that want a free MyScapez directory listing.',
  alternates: { canonical: '/login/business' },
  robots: { index: false, follow: false },
}

export default function BusinessLoginLayout({ children }: { children: React.ReactNode }) {
  return children
}
