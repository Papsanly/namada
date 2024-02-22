'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

export default function NamadaLogo() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    mounted && (
      <Image
        src={'/namada-yellow.gif'}
        alt={'Namada Logo'}
        style={{ objectFit: 'contain', objectPosition: 'left' }}
        className={cn(resolvedTheme === 'light' && 'invert saturate-0')}
        width={150}
        height={22}
        priority
      />
    )
  )
}
