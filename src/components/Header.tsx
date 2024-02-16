import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ThemeSwitch from '@/components/ThemeSwitch'
import NamadaLogo from '@/components/NamadaLogo'

export default function Header() {
  return (
    <header
      className={'flex flex-row justify-between items-center w-full gap-1'}
    >
      <div className={'flex flex-1 justify-start relative h-6 min-w-[165px]'}>
        <NamadaLogo />
      </div>
      <Tabs defaultValue={'wallet'}>
        <TabsList className={'bg-secondary rounded-full p-1 h-10'}>
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
