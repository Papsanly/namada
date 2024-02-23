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

type ConnectionResult = 'user-rejected' | 'not-detected' | 'success'

type NamadaExtensionContext =
  | {
      isConnected: false
      connect: () => Promise<ConnectionResult>
    }
  | {
      isConnected: true
      connect: () => Promise<ConnectionResult>
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

  const connect = useCallback(async (): Promise<ConnectionResult> => {
    try {
      if (namada.detect()) {
        await namada.connect()
      } else {
        return 'not-detected'
      }
    } catch (e) {
      localStorage.removeItem('extension-connected')
      return 'user-rejected'
    }
    const accounts = (await namada.accounts()) ?? []
    setAccounts(accounts)
    setIsIsConnected(true)
    localStorage.setItem('extension-connected', 'true')
    return 'success'
  }, [namada])

  const connectWithRetry = useCallback(
    async (retryCount = 10, interval = 100) => {
      for (let attempt = 0; attempt < retryCount; attempt++) {
        const res = await connect()
        if (res !== 'not-detected') return
        await new Promise(resolve => setTimeout(resolve, interval))
      }
    },
    [connect]
  )

  useEffect(() => {
    if (localStorage.getItem('extension-connected') !== null) {
      connectWithRetry().then()
    }
  }, [connectWithRetry])

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
