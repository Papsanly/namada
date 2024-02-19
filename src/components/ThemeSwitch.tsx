'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { BsFillMoonFill, BsSunFill } from 'react-icons/bs'
import { RiComputerFill } from 'react-icons/ri'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

export default function ThemeSwitch() {
  const { theme: currentTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const themes = [
    { theme: 'dark', icon: <BsFillMoonFill size={11} key={'dark'} /> },
    { theme: 'system', icon: <RiComputerFill size={11} key={'system'} /> },
    { theme: 'light', icon: <BsSunFill size={11} key={'light'} /> }
  ]

  useEffect(() => setMounted(true), [])

  return (
    mounted && (
      <Tabs value={currentTheme} onValueChange={setTheme}>
        <TabsList className={cn('dark:border-2', 'dark:border-accent')}>
          {themes.map(({ theme, icon }) => (
            <TabsTrigger
              key={theme}
              value={theme}
              className={'aspect-square p-1.5 !transition-all'}
            >
              {icon}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    )
  )
}
