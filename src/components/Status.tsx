'use client'

import { useEffect, useState } from 'react'
import { useNamadaExtension } from '@/providers/NamadaExtensionProvider'
import { Chain } from '@namada/types'

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
          const res = await fetch(`${rpcUrl}/block`, { cache: 'no-store' })
          const json = await res.json()
          const newBlockHeight = Number(
            json['result']['block']['header']['height']
          )
          const prevBlockHeightStr = localStorage.getItem('block-height')
          if (prevBlockHeightStr) {
            const prevBlockHeight = Number(prevBlockHeightStr)
            setNetworkStatus(prevBlockHeight !== newBlockHeight)
            setBlockHeight(newBlockHeight)
          }
          localStorage.setItem('block-height', newBlockHeight.toString())
        } catch (e) {
          setNetworkStatus(false)
        }
      }
    }
    let interval: ReturnType<typeof setInterval> | undefined
    if (isConnected) {
      updateStatus().then()
      interval = setInterval(updateStatus, 10000)
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
