'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function NetYetImplemented() {
  const rounter = useRouter()

  return (
    <div className={'bg-secondary p-4 rounded-sm space-y-1'}>
      <h1 className={'font-bold text-xl'}>Not Yet Implemented</h1>
      <Button className={'w-full'} onClick={() => rounter.back()}>
        Back
      </Button>
    </div>
  )
}
