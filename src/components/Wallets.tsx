'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import { FaCopy } from 'react-icons/fa6'

type WalletProps = {
  alias: string
  balance: number
  isShielded: boolean
  selected: boolean
}

function Wallet({ alias, selected, balance, isShielded }: WalletProps) {
  return (
    <Button
      variant={'ghost'}
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
        selected
          ? ['border-primary', 'dark:border-accent']
          : 'border-transparent'
      )}
    >
      <div className={'flex flex-col'}>
        <p className={'font-bold text-lg'}>{alias}</p>
        <div className={'flex items-center gap-1'}>
          <p className={'text-secondary text-xs'}>tnam123123...123123</p>
          <FaCopy size={9} className={'text-secondary'} />
        </div>
      </div>
      <div className={'flex flex-col items-end'}>
        <p className={'text-3xl font-bold'}>{balance} NAM</p>
        <p className={'text-secondary'}>$999 USD</p>
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
    </Button>
  )
}

type WalletsProps = {
  selectedId: number
  wallets: {
    id: number
    alias: string
    balance: number
    isShielded: boolean
  }[]
}

export default function Wallets({ wallets, selectedId }: WalletsProps) {
  const ref = useRef<HTMLUListElement>(null)
  const [scrollMaxToLeft, setScrollMaxToLeft] = useState(true)
  const [scrollMaxToRight, setScrollMaxToRight] = useState(true)

  useEffect(() => {
    const scrollElement = ref.current

    if (scrollElement === null) {
      return
    }

    function isScrolledToMaxRight(element: HTMLElement) {
      const { scrollWidth, scrollLeft, clientWidth } = element
      return scrollWidth - scrollLeft - clientWidth < 1
    }

    function isScrolledToMaxLeft(element: HTMLElement) {
      return element.scrollLeft < 1
    }

    const scrollListener = () => {
      setScrollMaxToLeft(isScrolledToMaxLeft(scrollElement))
      setScrollMaxToRight(isScrolledToMaxRight(scrollElement))
    }
    scrollListener()

    scrollElement?.addEventListener('scroll', scrollListener)

    return () => {
      scrollElement?.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <div className={'relative'}>
      <div
        className={cn(
          'absolute',
          'inset-0',
          'pointer-events-none',
          'transition-opacity',
          'list-gradient-left',
          'z-10',
          scrollMaxToLeft && 'opacity-0'
        )}
      />
      <div
        className={cn(
          'absolute',
          'inset-0',
          'pointer-events-none',
          'transition-opacity',
          'list-gradient-right',
          'z-10',
          scrollMaxToRight && 'opacity-0'
        )}
      />
      <ul className={'flex flex-row gap-1 overflow-x-scroll'} ref={ref}>
        {wallets.map(wallet => (
          <li key={wallet.id} className={''}>
            <Wallet {...wallet} selected={wallet.id === selectedId} />
          </li>
        ))}
      </ul>
    </div>
  )
}
