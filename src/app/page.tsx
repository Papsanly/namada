'use client'

import { cn } from '@/lib/utils'
import Actions from '@/components/Actions'
import Balance from '@/components/Balance'
import { useNamadaExtension } from '@/providers/NamadaExtensionProvider'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'

export default function Home() {
  const namadaExtension = useNamadaExtension()
  const [open, setOpen] = useState(false)

  return (
    <main
      className={cn(
        'flex',
        'flex-col',
        'w-[calc(100%-theme(spacing.8))]',
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
        <>
          <Button
            onClick={async () => {
              const connectionResult = await namadaExtension.connectWithRetry()
              if (connectionResult === 'not-detected') setOpen(true)
            }}
          >
            Connect Namada Extension
          </Button>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Namada Extension not detected
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Would you like to download it?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction
                  onClick={() =>
                    window.open(
                      'https://chromewebstore.google.com/detail/namada-extension/hnebcbhjpeejiclgbohcijljcnjdofek'
                    )
                  }
                >
                  Download
                </AlertDialogAction>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </main>
  )
}
