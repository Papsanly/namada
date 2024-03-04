'use client'

import { useEffect, useState } from 'react'
import { useNamadaExtension } from '@/providers/NamadaExtensionProvider'

export default function RPCStatus() {
  const [status, setStatus] = useState<boolean | null>(null)
  const { namada, isConnected } = useNamadaExtension()

  useEffect(() => {
    if (isConnected)
      setInterval(async () => {
        const chain = await namada.getChain()
        const rpcUrl = chain?.rpc
        if (rpcUrl) {
          try {
            const res = await fetch(rpcUrl)
            setStatus(res.ok)
          } catch (e) {
            setStatus(false)
          }
        }
      }, 5000)
  }, [isConnected, namada])

  return (
    <div className={'flex text-secondary flex-row gap-2 items-center text-xs'}>
      RPC Status:
      {status === null ? (
        <div className={'w-3 h-3 rounded-full bg-tertiary'} />
      ) : status ? (
        <div className={'w-3 h-3 rounded-full bg-success'} />
      ) : (
        <div className={'w-3 h-3 rounded-full bg-destructive'} />
      )}
    </div>
  )
}
