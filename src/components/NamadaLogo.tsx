'use client'

import { JSX } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'

export default function NamadaLogo(): JSX.Element {
  const { resolvedTheme } = useTheme()

  return resolvedTheme === 'dark' ? (
    <Image
      src={'/namada-yellow.gif'}
      alt={'Namada Logo'}
      style={{ objectFit: 'contain', objectPosition: 'left' }}
      fill
      priority
    />
  ) : (
    <Image
      src={'/namada-black.gif'}
      alt={'Namada Logo'}
      style={{ objectFit: 'contain' }}
      fill
      priority
    />
  )
}
