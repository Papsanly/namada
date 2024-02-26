'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useTotalBalance } from '@/providers/NamadaExtensionProvider'
import LoadingSpinner from '@/assets/LoadingSpinner'
import { Tokens } from '@namada/types'
import { cn } from '@/lib/utils'

export default function Balance() {
  const balance = useTotalBalance()

  return (
    <div className={'flex flex-row justify-between'}>
      <h1 className={'font-medium text-lg'}>Total Balance</h1>
      <div className={'flex flex-col items-end gap-1'}>
        <div
          className={cn(
            'flex',
            'flex-row',
            'gap-1',
            'items-center',
            'text-5xl',
            'font-bold',
            'text-nowrap'
          )}
        >
          {balance !== undefined ? balance : <LoadingSpinner height={30} />}{' '}
          {Tokens['NAM'].symbol}
        </div>
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
