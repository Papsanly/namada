'use client'

import { useEffect, useState } from 'react'
import { useNamadaExtension } from '@/providers/NamadaExtensionProvider'
import { Chain } from '@namada/types'

const MAX_TIME_DIFF = 60000

export default function Status() {
  const [chain, setChain] = useState<Chain | undefined>()
  const [networkStatus, setNetworkStatus] = useState<boolean | null>(null)
  const [blockHeight, setBlockHeight] = useState<number | null>(null)
  const { namada, isConnected } = useNamadaExtension()

  useEffect(() => {
    if (isConnected) namada.getChain().then(setChain)
  }, [isConnected, namada])

  useEffect(() => {
    async function updateStatus() {
      const rpcUrl = chain?.rpc
      if (rpcUrl) {
        try {
          const res = await fetch(`${rpcUrl}/header`, { cache: 'no-store' })
          const json = await res.json()
          const blockHeight = Number(json['result']['header']['height'])
          const blockTime = new Date(json['result']['header']['time'])
          const timeDiff = Date.now() - blockTime.getTime()
          console.log(timeDiff)
          setNetworkStatus(timeDiff < MAX_TIME_DIFF)
          setBlockHeight(blockHeight)
        } catch (e) {
          console.error(e)
          setNetworkStatus(false)
        }
      }
    }
    let interval: ReturnType<typeof setInterval> | undefined
    if (isConnected) {
      updateStatus().then()
      interval = setInterval(updateStatus, MAX_TIME_DIFF)
    } else {
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [chain, isConnected, namada])

  return (
    <div className={'flex text-secondary flex-row gap-5 text-xs'}>
      <div className={'flex gap-1.5 items-center'}>
        Chain ID: <span className={'font-bold'}>{chain?.chainId}</span>
      </div>
      <div className={'flex gap-1.5 items-center'}>
        Network Status:
        {networkStatus === null ? (
          <div className={'w-3 h-3 rounded-full bg-tertiary'} />
        ) : networkStatus ? (
          <div className={'w-3 h-3 rounded-full bg-success'} />
        ) : (
          <div className={'w-3 h-3 rounded-full bg-destructive'} />
        )}
      </div>
      <div className={'flex gap-1.5 items-center'}>
        Block Height: <span className={'font-bold'}>{blockHeight}</span>
      </div>
    </div>
  )
}
