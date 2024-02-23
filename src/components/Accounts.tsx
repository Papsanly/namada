import { cn } from '@/lib/utils'
import { FaCopy } from 'react-icons/fa6'
import ScrollArea from '@/components/ui/scroll-area'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { RadioGroupProps } from '@radix-ui/react-radio-group'
import React from 'react'
import { useFormField } from '@/components/ui/form'
import { useAccounts } from '@/providers/NamadaExtensionProvider'
import { chains } from '@namada/chains'
import { Account as AccountProps } from '@namada/types'

function Account({ alias, address, isShielded }: AccountProps) {
  const balance = 0

  return (
    <div
      className={cn(
        'flex',
        'flex-row',
        'bg-primary',
        'dark:bg-tertiary',
        'rounded-sm',
        'justify-between',
        'items-center',
        'py-3',
        'px-4',
        'mb-1',
        'w-full',
        'text-start',
        'gap-6',
        'border-secondary',
        'relative',
        'border-2',
        'text-nowrap',
        'border-transparent',
        'peer-data-[state=checked]:border-primary',
        'peer-data-[state=checked]:dark:border-accent'
      )}
    >
      <div className={'flex flex-col'}>
        <p className={'font-bold text-lg'}>{alias}</p>
        <div className={'flex items-center gap-1'}>
          <p className={'text-secondary text-xs'}>
            {address.slice(0, 8)}...{address.slice(address.length - 4)}
          </p>
          <FaCopy size={9} className={'text-secondary'} />
        </div>
      </div>
      <div className={'flex flex-col items-end'}>
        <p className={'text-3xl font-bold'}>
          {balance} {chains.namada.currency.symbol}
        </p>
        <p className={'text-secondary'}>$0 USD</p>
      </div>
      <div
        className={cn(
          'flex',
          'px-1.5',
          'rounded-br-sm',
          'rounded-tl-sm',
          'font-medium',
          'absolute',
          'top-[-2px]',
          'left-[-2px]',
          'border-2',
          isShielded
            ? ['text-accent-variant', 'border-accent-variant']
            : ['border-secondary', 'text-secondary']
        )}
      >
        <p className={'text-[0.6rem] leading-4'}>
          {isShielded ? 'Shielded' : 'Transparent'}
        </p>
      </div>
    </div>
  )
}

function Accounts(props: RadioGroupProps, ref: React.Ref<HTMLDivElement>) {
  const { error } = useFormField()
  const accounts = useAccounts()

  return (
    <ScrollArea
      className={cn(
        'rounded-sm',
        'has-[:focus-visible]:default-ring',
        error && 'border-2 border-destructive'
      )}
    >
      <RadioGroup ref={ref} {...props} className={'flex flex-row gap-1'}>
        {accounts.map(wallet => (
          <div key={wallet.address}>
            <Label className={'relative'}>
              <RadioGroupItem
                className={'peer absolute opacity-0'}
                value={wallet.address}
              />
              <Account {...wallet} />
            </Label>
          </div>
        ))}
      </RadioGroup>
    </ScrollArea>
  )
}

export default React.forwardRef(Accounts)