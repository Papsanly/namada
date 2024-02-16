import Providers from './providers'
import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './global.css'
import Header from '@/components/Header'
import { cn } from '@/lib/utils'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk'
})

export const metadata: Metadata = {
  title: 'Namada App',
  icons: '/favicon.png'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'flex',
          'flex-col',
          'gap-8',
          'items-center',
          'w-full',
          'container',
          spaceGrotesk.variable
        )}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
