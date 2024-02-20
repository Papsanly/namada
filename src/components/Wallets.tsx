import { cn } from '@/lib/utils'
import { FaCopy } from 'react-icons/fa6'
import ScrollArea from '@/components/ui/ScrollArea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { RadioGroupProps } from '@radix-ui/react-radio-group'

export type WalletProps = {
  id: number
  alias: string
  balance: number
  isShielded: boolean
}

function Wallet({ alias, balance, isShielded }: WalletProps) {
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
    </div>
  )
}

export default function Wallets({
  wallets,
  ...props
}: RadioGroupProps & {
  wallets: WalletProps[]
}) {
  return (
    <ScrollArea className={'rounded-sm has-[:focus-visible]:default-ring'}>
      <RadioGroup {...props} className={'flex flex-row gap-1'}>
        {wallets.map(wallet => (
          <div key={wallet.id}>
            <Label className={'relative'}>
              <RadioGroupItem
                className={'peer absolute opacity-0'}
                value={`${wallet.id}`}
              />
              <Wallet {...wallet} />
            </Label>
          </div>
        ))}
      </RadioGroup>
    </ScrollArea>
  )
}
