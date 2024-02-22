'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

function isScrolledToMaxRight(element: HTMLElement) {
  const { scrollWidth, scrollLeft, clientWidth } = element
  return scrollWidth - scrollLeft - clientWidth < 1
}

function isScrolledToMaxLeft(element: HTMLElement) {
  return element.scrollLeft < 1
}

export default function ScrollArea({
  children,
  className,
  ...props
}: React.HTMLProps<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null)
  const [scrollMaxToLeft, setScrollMaxToLeft] = useState(true)
  const [scrollMaxToRight, setScrollMaxToRight] = useState(true)

  useEffect(() => {
    const scrollElement = ref.current

    if (scrollElement === null) {
      return
    }

    const scrollListener = () => {
      setScrollMaxToLeft(isScrolledToMaxLeft(scrollElement))
      setScrollMaxToRight(isScrolledToMaxRight(scrollElement))
    }
    scrollListener()

    scrollElement.addEventListener('scroll', scrollListener)

    return () => {
      scrollElement.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <div className={cn('relative', className)} {...props}>
      <div
        className={cn(
          'absolute',
          'inset-0',
          'pointer-events-none',
          'transition-opacity',
          'list-gradient-left',
          'z-10',
          scrollMaxToLeft && 'opacity-0'
        )}
      />
      <div
        className={cn(
          'absolute',
          'inset-0',
          'pointer-events-none',
          'transition-opacity',
          'list-gradient-right',
          'z-10',
          scrollMaxToRight && 'opacity-0'
        )}
      />
      <div className={'overflow-x-scroll'} ref={ref}>
        {children}
      </div>
    </div>
  )
}
