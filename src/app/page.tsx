import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Home() {
  return (
    <main
      className={
        'flex flex-col w-full bg-secondary max-w-[600px] rounded-sm p-4 gap-4'
      }
    >
      <div className={'flex flex-row justify-between'}>
        <h1 className={'font-medium text-lg'}>Total Balance</h1>
        <div className={'flex flex-row items-baseline gap-2'}>
          <p className={'text-5xl font-bold'}>$10.00</p>
          <Select defaultValue={'usd'}>
            <SelectTrigger
              className={'font-bold align-sub text-secondary min-w-12'}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className={'font-bold'}>
              <SelectItem value={'usd'}>USD</SelectItem>
              <SelectItem value={'uah'}>UAH</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Tabs defaultValue={'send'}>
        <TabsList className={'w-full p-1 bg-tertiary rounded-full'}>
          <TabsTrigger value={'send'} className={'flex-1'}>
            Send
          </TabsTrigger>
          <TabsTrigger value={'receive'} className={'flex-1'}>
            Receive
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </main>
  )
}
