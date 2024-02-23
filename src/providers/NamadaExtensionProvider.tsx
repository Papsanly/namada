'use client'

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { Namada } from '@namada/integrations'
import { chains } from '@namada/chains'
import { Account } from '@namada/types'

type NamadaExtensionContext =
  | {
      isConnected: false
      connect: () => void
    }
  | {
      isConnected: true
      connect: () => void
      accounts: readonly Account[]
    }

const NamadaExtensionContext = createContext<NamadaExtensionContext | null>(
  null
)

export default function NamadaExtensionProvider({
  children
}: {
  children: ReactNode
}) {
  const [isConnected, setIsIsConnected] = useState(false)
  const [accounts, setAccounts] = useState<readonly Account[]>([])
  const namada = useMemo(() => new Namada(chains['namada']), [])

  const connect = useCallback(async () => {
    try {
      if (namada.detect()) {
        await namada.connect()
      } else {
        return
      }
    } catch (e) {
      localStorage.removeItem('extension-connected')
    }
    const accounts = (await namada.accounts()) ?? []
    setAccounts(accounts)
    setIsIsConnected(true)
    localStorage.setItem('extension-connected', 'true')
  }, [namada])

  useEffect(() => {
    if (localStorage.getItem('extension-connected') !== null) {
      connect().then()
    }
  }, [connect])

  return (
    <NamadaExtensionContext.Provider value={{ isConnected, accounts, connect }}>
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
  return context
}

export function useAccounts() {
  const context = useNamadaExtension()
  if (!context.isConnected) {
    throw Error('useAccounts should be used only when extension is connected')
  }
  return context.accounts
}
