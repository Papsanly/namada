import Providers from './providers'
import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './global.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk'
})

export const metadata: Metadata = {
  title: 'Namada App'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={spaceGrotesk.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
