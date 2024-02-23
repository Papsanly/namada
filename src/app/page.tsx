'use client'

import { cn } from '@/lib/utils'
import Actions from '@/components/Actions'
import Balance from '@/components/Balance'
import { useNamadaExtension } from '@/providers/NamadaExtensionProvider'
import { Button } from '@/components/ui/button'

export default function Home() {
  const namadaExtension = useNamadaExtension()

  return (
    <main
      className={cn(
        'flex',
        'flex-col',
        'w-full',
        'bg-secondary',
        'max-w-[625px]',
        'rounded-sm',
        'p-4',
        'gap-4'
      )}
    >
      {namadaExtension.isConnected ? (
        <>
          <Balance />
          <Actions />
        </>
      ) : (
        <Button onClick={namadaExtension.connectWithRetry}>
          Connect Namada Extension
        </Button>
      )}
    </main>
  )
}
