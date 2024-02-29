'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function NetYetImplemented() {
  const rounter = useRouter()

  return (
    <div
      className={cn(
        'p-4',
        'bg-[var(--main-page-background)]',
        'rounded-sm',
        'space-y-1',
        'backdrop-blur-sm'
      )}
    >
      <h1 className={'font-bold text-xl'}>Not Yet Implemented</h1>
      <Button className={'w-full'} onClick={() => rounter.back()}>
        Back
      </Button>
    </div>
  )
}
