'use client'

import { cn } from '@/lib/utils'
import Actions from '@/components/Actions'
import Balance from '@/components/Balance'
import { useNamadaExtension } from '@/providers/NamadaExtensionProvider'
import { Button } from '@/components/ui/button'
import { ReactNode, useState } from 'react'
import NamadaNotDetected from '@/components/NamadaNotDetected'

export default function Wallet({ children }: { children: ReactNode }) {
  const namadaExtension = useNamadaExtension()
  const [open, setOpen] = useState(false)

  return (
    <main
      className={cn(
        'flex',
        'flex-col',
        'bg-[var(--main-page-background)]',
        'rounded-sm',
        'backdrop-blur-sm',
        'p-4',
        'gap-4'
      )}
    >
      {namadaExtension.isConnected ? (
        <>
          <Balance />
          <Actions />
          {children}
        </>
      ) : (
        <>
          <Button
            onClick={async () => {
              const connectionResult = await namadaExtension.connectWithRetry()
              if (connectionResult === 'not-detected') setOpen(true)
            }}
          >
            Connect Namada Extension
          </Button>
          <NamadaNotDetected open={open} onOpenChange={setOpen} />
        </>
      )}
    </main>
  )
}
