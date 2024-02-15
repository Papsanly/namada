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
      width={175}
      height={22}
      style={{ objectFit: 'contain' }}
    />
  ) : (
    <Image
      src={'/namada-black.gif'}
      alt={'Namada Logo'}
      width={175}
      height={22}
      style={{ objectFit: 'contain' }}
    />
  )
}
