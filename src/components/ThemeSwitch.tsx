'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { BsFillMoonFill, BsSunFill } from 'react-icons/bs'
import { RiComputerFill } from 'react-icons/ri'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ThemeSwitch() {
  const { theme: currentTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const themes = [
    { theme: 'dark', icon: <BsFillMoonFill size={12} key={'dark'} /> },
    { theme: 'system', icon: <RiComputerFill size={12} key={'system'} /> },
    { theme: 'light', icon: <BsSunFill size={12} key={'light'} /> }
  ]

  useEffect(() => setMounted(true), [])

  return mounted ? (
    <Tabs value={currentTheme} onValueChange={setTheme}>
      <TabsList className={'border-accent bg-secondary rounded-full p-1'}>
        {themes.map(({ theme, icon }) => (
          <TabsTrigger
            key={theme}
            value={theme}
            className={'aspect-square p-2 !transition-all'}
          >
            {icon}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  ) : (
    <Tabs>
      <TabsList className={'border-accent bg-secondary rounded-full p-1'}>
        {themes.map(({ theme, icon }) => (
          <TabsTrigger
            disabled
            key={theme}
            value={theme}
            className={'aspect-square p-2'}
          >
            {icon}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
