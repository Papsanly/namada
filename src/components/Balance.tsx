'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  useAccounts,
  useQueryBalance,
  useTotalBalance
} from '@/providers/NamadaExtensionProvider'
import React from 'react'
import DisplayBalance from '@/components/DisplayBalance'

export default function Balance() {
  const balance = useTotalBalance()
  const { accounts } = useAccounts()
  const queryBalance = useQueryBalance()

  return (
    <div className={'flex flex-row justify-between'}>
      <h1 className={'font-medium text-lg'}>Total Balance</h1>
      <div className={'flex flex-col items-end gap-1'}>
        <DisplayBalance
          onReload={() => {
            accounts.forEach(account => {
              if (account.balance !== undefined && isNaN(account.balance))
                queryBalance(account.address).then()
            })
          }}
          size={30}
          className={'text-5xl'}
          balance={balance}
        />
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
