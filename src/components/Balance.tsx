import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export default function Balance({ balance }: { balance: number }) {
  return (
    <div className={'flex flex-row justify-between'}>
      <h1 className={'font-medium text-lg'}>Total Balance</h1>
      <div className={'flex flex-col items-end gap-1'}>
        <p className={'text-5xl font-bold text-nowrap'}>{balance} NAM</p>
        <div className={'flex flex-row gap-1'}>
          <p className={'font-bold text-secondary'}>$999</p>
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
    </div>
  )
}