import Providers from './providers'
import type { Metadata } from 'next'
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import './global.css'
import Header from '@/components/Header'
import { cn } from '@/lib/utils'
import React from 'react'
import Background from '@/components/Background'
import Status from '@/components/Status'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk'
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono'
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
          'items-center',
          'w-full',
          spaceGrotesk.variable,
          jetBrainsMono.variable
        )}
      >
        <Providers>
          <Header />
          <div
            className={cn(
              'flex flex-col',
              'w-[calc(100%-theme(spacing.8))]',
              'max-w-[625px]',
              'gap-2'
            )}
          >
            <Status />
            {children}
          </div>
          <Background />
        </Providers>
      </body>
    </html>
  )
}
