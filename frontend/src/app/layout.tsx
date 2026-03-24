import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hospital Management',
  description: 'Hospital Management Frontend',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
