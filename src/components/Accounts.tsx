'use client'

import { cn } from '@/lib/utils'
import ScrollArea from '@/components/ui/scroll-area'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { RadioGroupProps } from '@radix-ui/react-radio-group'
import React, { useEffect, useState } from 'react'
import {
  useAccounts,
  useQueryBalance
} from '@/providers/NamadaExtensionProvider'
import { Account as AccountProps } from '@/providers/NamadaExtensionProvider'
import { FieldError } from 'react-hook-form'
import CopyText from '@/components/CopyText'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import DisplayBalance from '@/components/DisplayBalance'
import { usePathname } from 'next/navigation'

function Account({ alias, address, balance, isShielded }: AccountProps) {
  const queryBalance = useQueryBalance()
  const pathname = usePathname()

  useEffect(() => {
    queryBalance(address).then()
  }, [address, queryBalance])

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
        'transition-all',
        'hover:opacity-90',
        'peer-data-[state=checked]:border-primary',
        'peer-data-[state=checked]:dark:border-accent',
        pathname === '/receive' &&
          'peer-data-[state=checked]:dark:border-accent-variant'
      )}
    >
      <div className={'flex flex-col'}>
        <p className={'font-bold text-lg'}>{alias}</p>
        <div>
          <CopyText
            className={'text-secondary flex items-center gap-1'}
            size={9}
            value={address}
          >
            <p className={'text-xs'}>
              {address.slice(0, 8)}...{address.slice(address.length - 4)}
            </p>
          </CopyText>
        </div>
      </div>
      <div className={'flex flex-col items-end'}>
        <DisplayBalance
          onReload={() => queryBalance(address)}
          balance={balance}
        />
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

function Accounts(
  { error, ...props }: RadioGroupProps & { error?: FieldError },
  ref: React.Ref<HTMLDivElement>
) {
  const { accounts } = useAccounts()
  const [viewAll, setViewAll] = useState(false)

  return (
    <div className={'flex flex-col'}>
      <RadioGroup
        ref={ref}
        {...props}
        className={cn(
          'flex',
          'flex-col',
          'rounded-sm',
          'has-[:focus-visible]:default-ring',
          error && 'border-2 border-destructive'
        )}
      >
        <ScrollArea
          gradients={!viewAll}
          className={cn(
            'flex flex-row gap-1 snap-x snap-mandatory',
            viewAll && 'flex-col'
          )}
        >
          {accounts.map(wallet => (
            <div key={wallet.address} className={'snap-center'}>
              <Label className={'relative'}>
                <RadioGroupItem
                  className={'peer absolute opacity-0'}
                  value={wallet.address}
                />
                <Account {...wallet} />
              </Label>
            </div>
          ))}
        </ScrollArea>
      </RadioGroup>
      <Button
        variant={'ghost'}
        size={'ghost'}
        className={'mr-auto ml-auto text-secondary'}
        onClick={() => setViewAll(x => !x)}
      >
        {viewAll ? <FaCaretUp /> : <FaCaretDown />}
      </Button>
    </div>
  )
}

export default React.forwardRef(Accounts)
