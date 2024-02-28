'use client'

import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'

export default function Background() {
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const mouseMoveHandler = (e: MouseEvent) => {
      console.log(e.x, e.y)
      setPos({
        x: (e.x / window.innerWidth) * 100,
        y: (e.y / window.innerHeight) * 100
      })
    }

    window.addEventListener('mousemove', mouseMoveHandler)
    setMounted(true)

    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler)
    }
  }, [])

  return (
    mounted && (
      <div
        className={cn(
          'fixed',
          'inset-0',
          'flex',
          'items-center',
          'justify-center',
          'z-[-10]',
          'pointer-events-none',
          'transition-all',
          'opacity-15',
          resolvedTheme === 'light' && 'mix-blend-multiply',
          resolvedTheme === 'dark' && 'mix-blend-screen'
        )}
      >
        <div
          style={{
            background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, transparent, ${resolvedTheme === 'dark' ? 'black' : 'white'} 500px)`
          }}
          className={'fixed inset-0'}
        />
        <Image
          width={2193}
          height={1719}
          className={'z-[-20] dark:invert scale-[1.7]'}
          src={'/background.svg'}
          alt={'Background'}
          priority
        />
      </div>
    )
  )
}
