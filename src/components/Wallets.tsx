import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FaCopy } from 'react-icons/fa6'
import ScrollArea from '@/components/ui/ScrollArea'

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
  return (
    <ScrollArea>
      <ul className={'flex flex-row gap-1'}>
        {wallets.map(wallet => (
          <li key={wallet.id} className={''}>
            <Wallet {...wallet} selected={wallet.id === selectedId} />
          </li>
        ))}
      </ul>
    </ScrollArea>
  )
}
