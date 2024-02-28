'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ThemeSwitch from '@/components/ThemeSwitch'
import NamadaLogo from '@/components/NamadaLogo'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

export default function Header() {
  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    const handler = () => setScroll(window.scrollY)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={cn(
        'flex',
        'flex-row',
        'sticky',
        'rounded-md',
        'top-0',
        'z-10',
        'py-2',
        'px-4',
        'mb-6',
        'justify-between',
        'items-center',
        'w-full',
        'gap-1',
        'backdrop-blur-sm',
        'transition-shadow',
        'shadow-sm'
      )}
    >
      <div className={'flex flex-1 justify-start min-w-[165px]'}>
        <NamadaLogo />
      </div>
      <Tabs defaultValue={'wallet'}>
        <TabsList className={'rounded-full dark:bg-transparent'}>
          <TabsTrigger value={'wallet'}>Wallet</TabsTrigger>
          <TabsTrigger value={'ibc'}>IBC</TabsTrigger>
          <TabsTrigger value={'staking'}>Staking</TabsTrigger>
          <TabsTrigger value={'proposals'}>Proposals</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className={'flex flex-1 justify-end'}>
        <ThemeSwitch />
      </div>
    </header>
  )
}
