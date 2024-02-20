'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'

import Wallets from '@/components/Wallets'
import SendForm from '@/components/SendForm'
import Actions, { Action } from '@/components/Actions'
import Balance from '@/components/Balance'
import Receive from '@/components/Receive'

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
