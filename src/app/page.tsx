'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useState } from 'react'

import Wallets from '@/components/Wallets'
import SendForm from '@/components/SendForm'

function Balance({ balance }: { balance: number }) {
  return (
    <div className={'flex flex-row justify-between'}>
      <h1 className={'font-medium text-lg'}>Total Balance</h1>
      <div className={'flex flex-row items-baseline gap-2'}>
        <p className={'text-5xl font-bold'}>${balance}</p>
        <Select defaultValue={'usd'}>
          <SelectTrigger
            className={'font-bold align-sub text-secondary min-w-12'}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className={'font-bold'}>
            <SelectItem value={'usd'}>USD</SelectItem>
            <SelectItem value={'uah'}>UAH</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

type Action = 'send' | 'receive'

function Actions({
  action,
  setAction
}: {
  action: Action
  setAction: (action: Action) => void
}) {
  return (
    <Tabs value={action} onValueChange={value => setAction(value as Action)}>
      <TabsList className={'w-full text-lg bg-tertiary rounded-full'}>
        <TabsTrigger value={'send'} className={'flex-1'}>
          Send
        </TabsTrigger>
        <TabsTrigger value={'receive'} className={'flex-1'}>
          Receive
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

function Receive() {
  return null
}

export default function Home() {
  const [action, setAction] = useState<Action>('send')

  const wallets = [
    { id: 1, alias: 'papsan', balance: 999999, isShielded: true },
    { id: 2, alias: 'papsan', balance: 1, isShielded: false },
    { id: 3, alias: 'karman', balance: 0, isShielded: true }
  ]

  const totalBalance = wallets
    .map(wallets => wallets.balance)
    .reduce((val, acc) => acc + val, 0)

  return (
    <main
      className={cn(
        'flex',
        'flex-col',
        'w-full',
        'bg-secondary',
        'max-w-[600px]',
        'rounded-sm',
        'p-4',
        'gap-4'
      )}
    >
      <Balance balance={totalBalance} />
      <Actions action={action} setAction={setAction} />
      <Wallets wallets={wallets} selectedId={1} />
      {action === 'send' ? <SendForm /> : <Receive />}
    </main>
  )
}
