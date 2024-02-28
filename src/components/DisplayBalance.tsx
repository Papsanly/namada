import { Button } from '@/components/ui/button'
import { TbReload } from 'react-icons/tb'
import LoadingSpinner from '@/assets/LoadingSpinner'
import { Tokens } from '@namada/types'
import React, { HTMLProps, MouseEventHandler } from 'react'
import { cn } from '@/lib/utils'

export default function DisplayBalance({
  balance,
  className,
  onReload,
  size = 20,
  ...props
}: HTMLProps<HTMLDivElement> & {
  balance: number | undefined
  onReload?: MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <div
      {...props}
      className={cn(
        'flex flex-row gap-1 items-center text-nowrap text-3xl font-bold',
        className
      )}
    >
      {balance === undefined ? (
        <LoadingSpinner size={size} />
      ) : isNaN(balance) ? (
        <Button variant={'ghost'} size={'ghost'} onClick={onReload}>
          <TbReload className={'text-destructive'} size={size} />
        </Button>
      ) : (
        balance
      )}{' '}
      {Tokens['NAM'].symbol}
    </div>
  )
}
