'use client'

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
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
      namada: Namada
      connect: () => Promise<ConnectionResult>
      connectWithRetry: () => Promise<ConnectionResult>
    }
  | {
      isConnected: true
      namada: Namada
      accounts: Account[]
      defaultAccountAddress: string
      setAccounts: Dispatch<SetStateAction<Account[]>>
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
  return namadaAccounts
    .filter(account => !account.isShielded)
    .map(account => ({ ...account, balance: undefined }))
}

export default function NamadaExtensionProvider({
  children
}: {
  children: ReactNode
}) {
  const [isConnected, setIsConnected] = useState(false)
  const [accounts, setAccounts] = useState<Account[]>([])
  const [defaultAccountAddress, setDefaultAccountAddress] = useState('')
  const namada = useMemo(() => new Namada(chains['namada']), [])

  const connect = useCallback(async (): Promise<ConnectionResult> => {
    const connectionResult = await connectExtension(namada)
    if (connectionResult === 'success') {
      setAccounts(await fetchAccounts(namada))
      setDefaultAccountAddress((await namada.defaultAccount())?.address ?? '')
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
        namada,
        isConnected,
        accounts,
        defaultAccountAddress,
        setAccounts,
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

export function useConnectedNamadaExtension() {
  const context = useNamadaExtension()
  if (!context.isConnected) {
    throw Error('useAccounts should be used only when extension is connected')
  }
  return context
}

export function useAccounts() {
  const context = useConnectedNamadaExtension()
  return {
    accounts: context.accounts,
    defaultAccountAddress: context.defaultAccountAddress
  }
}

export function useTotalBalance() {
  const { accounts } = useAccounts()
  const loaded = accounts.every(account => account.balance !== undefined)
  const totalBalance = accounts
    .map(account => account.balance)
    .reduce((acc, val) => (acc ?? 0) + (val ?? 0), 0)
  return loaded ? totalBalance : undefined
}

export function useQueryBalance() {
  const { namada, setAccounts } = useConnectedNamadaExtension()

  const setBalance = useCallback(
    (address: string, balance: number | undefined) => {
      setAccounts(accounts =>
        accounts.map(account =>
          account.address === address ? { ...account, balance } : account
        )
      )
    },
    [setAccounts]
  )

  return useCallback(
    async (address: string) => {
      setBalance(address, undefined)
      const tokenAddress = (await namada.getChain())?.currency.address ?? ''
      const tokenBalances = await namada.queryBalances(address, [tokenAddress])
      const namadaBalance = tokenBalances.find(
        balance => balance.token === 'NAM'
      )
      const balance =
        namadaBalance !== undefined ? Number(namadaBalance.amount) : NaN
      setBalance(address, balance)
    },
    [namada, setBalance]
  )
}
