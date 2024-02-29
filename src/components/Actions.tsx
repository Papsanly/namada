import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabsProps } from '@radix-ui/react-tabs'

export default function Actions(props: TabsProps) {
  return (
    <Tabs {...props} defaultValue={'send'}>
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
    </Tabs>
  )
}
