import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SendForm from '@/components/SendForm'
import Receive from '@/components/Receive'

export default function Actions() {
  return (
    <Tabs defaultValue={'send'}>
      <TabsList className={'w-full text-lg bg-tertiary rounded-full'}>
        <TabsTrigger value={'send'} className={'flex-1'}>
          Send
        </TabsTrigger>
        <TabsTrigger
          value={'receive'}
          className={'flex-1 data-[state=active]:bg-accent-variant'}
        >
          Receive
        </TabsTrigger>
      </TabsList>
      <TabsContent value={'send'}>
        <SendForm />
      </TabsContent>
      <TabsContent value={'receive'}>
        <Receive />
      </TabsContent>
    </Tabs>
  )
}
