import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { WalletProps } from '@/components/Wallets'
import SendForm from '@/components/SendForm'

export default function Actions({ wallets }: { wallets: WalletProps[] }) {
  return (
    <Tabs defaultValue={'send'}>
      <TabsList className={'w-full text-lg bg-tertiary rounded-full'}>
        <TabsTrigger value={'send'} className={'flex-1'}>
          Send
        </TabsTrigger>
        <TabsTrigger value={'receive'} className={'flex-1'}>
          Receive
        </TabsTrigger>
      </TabsList>
      <TabsContent value={'send'}>
        <SendForm wallets={wallets} />
      </TabsContent>
      <TabsContent value={'receive'}></TabsContent>
    </Tabs>
  )
}
