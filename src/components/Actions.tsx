import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export type Action = 'send' | 'receive'

export default function Actions({
  action,
  setAction
}: {
  action: Action
  setAction: (action: Action) => void
}) {
  return (
    <Tabs value={action} onValueChange={value => setAction(value as Action)}>
      <TabsList className={'w-full text-lg bg-tertiary rounded-full'}>
        <TabsTrigger value={'send'} className={'flex-1'}>
          Send
        </TabsTrigger>
        <TabsTrigger value={'receive'} className={'flex-1'}>
          Receive
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
