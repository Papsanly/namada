'use client'

import { createContext, ReactNode, useContext } from 'react'

type NamadaExtensionContext =
  | {
      connected: true
      wallets: Wallet[]
    }
  | {
      connected: false
    }

export type Wallet = {
  id: number
  alias: string
  balance: number
  isShielded: boolean
}

const NamadaExtensionContext = createContext<NamadaExtensionContext | null>(
  null
)

export default function NamadaExtensionProvider({
  children
}: {
  children: ReactNode
}) {
  const wallets = [
    { id: 1, alias: 'papsan', balance: 999999, isShielded: true },
    { id: 2, alias: 'papsan', balance: 1, isShielded: false },
    { id: 3, alias: 'karman', balance: 0, isShielded: true }
  ]

  return (
    <NamadaExtensionContext.Provider value={{ connected: true, wallets }}>
      {children}
    </NamadaExtensionContext.Provider>
  )
}

export function useNamadaExtension() {
  const context = useContext(NamadaExtensionContext)
  if (!context) {
    throw Error(
      'useNamadaExtension should be used within <NamadaExtensionProvider/>'
    )
  }
  if (!context.connected) {
    throw Error(
      'useNamadaExtension should be used only when extension is connected'
    )
  }
  return context
}
