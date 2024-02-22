'use client'

import { ThemeProvider } from 'next-themes'
import React from 'react'
import NamadaExtensionProvider from '@/providers/NamadaExtensionProvider'

export default function Providers({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider
      disableTransitionOnChange
      enableSystem
      defaultTheme={'system'}
      attribute={'class'}
    >
      <NamadaExtensionProvider>{children}</NamadaExtensionProvider>
    </ThemeProvider>
  )
}
