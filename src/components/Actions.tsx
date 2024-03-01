'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Actions() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const url = pathname === '/' ? '/receive' : '/'
    router.prefetch(url)
  }, [pathname, router])

  return (
    <Tabs
      value={pathname === '/' ? 'send' : 'receive'}
      onValueChange={value => {
        router.push(value === 'send' ? '/' : '/receive')
      }}
      defaultValue={'send'}
    >
      <TabsList className={'w-full text-lg bg-tertiary rounded-full'}>
        <TabsTrigger value={'send'} className={'flex-1'}>
          Send
        </TabsTrigger>
        <TabsTrigger
          onMouseOver={() => router.prefetch('/receive')}
          value={'receive'}
          className={'flex-1 data-[state=active]:bg-accent-variant'}
        >
          Receive
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
