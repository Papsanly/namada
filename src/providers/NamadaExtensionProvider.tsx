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
import { Account as NamadaAccount } from '@namada/types'

export type Account = NamadaAccount & { balance: number | undefined }

type ConnectionResult = 'user-rejected' | 'not-detected' | 'success'

type NamadaExtensionContext =
  | {
      isConnected: false
      connect: () => Promise<ConnectionResult>
      connectWithRetry: () => Promise<ConnectionResult>
    }
  | {
      isConnected: true
      accounts: Account[]
    }

const NamadaExtensionContext = createContext<NamadaExtensionContext | null>(
  null
)

async function connectExtension(namada: Namada) {
  try {
    if (namada.detect()) {
      await namada.connect()
    } else {
      return 'not-detected'
    }
  } catch (e) {
    return 'user-rejected'
  }
  return 'success'
}

async function fetchAccounts(namada: Namada) {
  const namadaAccounts = (await namada.accounts()) ?? []
  return namadaAccounts.map(account => ({ ...account, balance: undefined }))
}

export default function NamadaExtensionProvider({
  children
}: {
  children: ReactNode
}) {
  const [isConnected, setIsConnected] = useState(false)
  const [accounts, setAccounts] = useState<Account[]>([])
  const namada = useMemo(() => new Namada(chains['namada']), [])

  const connect = useCallback(async (): Promise<ConnectionResult> => {
    const connectionResult = await connectExtension(namada)
    if (connectionResult === 'success') {
      setAccounts(await fetchAccounts(namada))
      setIsConnected(true)
      localStorage.setItem('extension-connected', 'true')
    } else if (connectionResult === 'user-rejected') {
      localStorage.removeItem('extension-connected')
    }
    return connectionResult
  }, [namada])

  const connectWithRetry = useCallback(
    async (retryCount = 10, interval = 100): Promise<ConnectionResult> => {
      for (let attempt = 0; attempt < retryCount; attempt++) {
        const res = await connect()
        if (res !== 'not-detected') return res
        await new Promise(resolve => setTimeout(resolve, interval))
      }
      return 'not-detected'
    },
    [connect]
  )

  useEffect(() => {
    if (localStorage.getItem('extension-connected') !== null) {
      connectWithRetry().then()
    }
  }, [connectWithRetry])

  return (
    <NamadaExtensionContext.Provider
      value={{
        isConnected,
        accounts,
        connect,
        connectWithRetry
      }}
    >
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
