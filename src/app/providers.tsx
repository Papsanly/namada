'use client'

import { ThemeProvider } from 'next-themes'

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
      {children}
    </ThemeProvider>
  )
}
