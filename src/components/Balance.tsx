'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { chains } from '@namada/chains'
import { useAccounts } from '@/providers/NamadaExtensionProvider'

export default function Balance() {
  const accounts = useAccounts()
  const loaded = accounts.every(account => account.balance !== undefined)
  const totalBalance = accounts
    .map(account => account.balance)
    .reduce((acc, val) => (acc ?? 0) + (val ?? 0), 0)

  return (
    <div className={'flex flex-row justify-between'}>
      <h1 className={'font-medium text-lg'}>Total Balance</h1>
      <div className={'flex flex-col items-end gap-1'}>
        <p className={'text-5xl font-bold text-nowrap'}>
          {loaded ? totalBalance : '-'} {chains.namada.currency.symbol}
        </p>
        <div className={'flex flex-row gap-1'}>
          <p className={'font-bold text-secondary'}>$0</p>
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
    </div>
  )
}
