'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

function Balance() {
  return (
    <div className={'flex flex-row justify-between'}>
      <h1 className={'font-medium text-lg'}>Total Balance</h1>
      <div className={'flex flex-row items-baseline gap-2'}>
        <p className={'text-5xl font-bold'}>$1000000.00</p>
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
  )
}

type Action = 'send' | 'receive'

function Actions({
  action,
  setAction
}: {
  action: Action
  setAction: (action: Action) => void
}) {
  return (
    <Tabs value={action} onValueChange={value => setAction(value as Action)}>
      <TabsList className={'w-full text-lg p-1 bg-tertiary rounded-full'}>
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

type WalletProps = {
  alias: string
  balance: number
  isShielded: boolean
}

function Wallet({ alias, balance, isShielded }: WalletProps) {
  return (
    <Button
      variant={'ghost'}
      className={cn(
        'flex',
        'flex-row',
        'bg-tertiary',
        'rounded-sm',
        'justify-between',
        'items-center',
        'py-3',
        'px-4',
        'mb-1',
        'w-full',
        'text-start',
        'gap-4'
      )}
    >
      <div className={'flex flex-col gap-1'}>
        <p className={'font-bold text-lg'}>{alias}</p>
        <div
          className={cn(
            'flex',
            'px-3',
            'py-0.5',
            'rounded-full',
            'font-medium',
            'border',
            isShielded
              ? [
                  'bg-accent-variant',
                  'text-secondary',
                  'dark:text-secondary-invert',
                  'border-accent-variant'
                ]
              : ['border-secondary', 'text-secondary']
          )}
        >
          <p className={'text-xs'}>{isShielded ? 'Shielded' : 'Transparent'}</p>
        </div>
      </div>
      <p className={'text-4xl font-bold'}>${balance}</p>
    </Button>
  )
}

function Wallets() {
  const ref = useRef<HTMLUListElement>(null)
  const [scrollMaxToLeft, setScrollMaxToLeft] = useState(true)
  const [scrollMaxToRight, setScrollMaxToRight] = useState(true)

  useEffect(() => {
    const scrollElement = ref.current

    if (scrollElement === null) {
      return
    }

    function isScrolledToMaxRight(element: HTMLElement) {
      const { scrollWidth, scrollLeft, clientWidth } = element
      return scrollWidth - scrollLeft - clientWidth < 1
    }

    function isScrolledToMaxLeft(element: HTMLElement) {
      return element.scrollLeft < 1
    }

    const scrollListener = () => {
      setScrollMaxToLeft(isScrolledToMaxLeft(scrollElement))
      setScrollMaxToRight(isScrolledToMaxRight(scrollElement))
    }
    scrollListener()

    scrollElement?.addEventListener('scroll', scrollListener)

    return () => {
      scrollElement?.removeEventListener('scroll', scrollListener)
    }
  }, [])

  const wallets = [
    { id: 1, alias: 'papsan', balance: 999999, isShielded: true },
    { id: 2, alias: 'papsan', balance: 1, isShielded: false },
    { id: 3, alias: 'karman', balance: 0, isShielded: true }
  ]

  return (
    <div className={'relative'}>
      <div
        className={cn(
          'absolute',
          'inset-0',
          'pointer-events-none',
          'transition-opacity',
          'list-gradient-left',
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
          scrollMaxToRight && 'opacity-0'
        )}
      />
      <ul className={'flex flex-row gap-1 overflow-x-scroll'} ref={ref}>
        {wallets.map(wallet => (
          <li key={wallet.id} className={''}>
            <Wallet {...wallet} />
          </li>
        ))}
      </ul>
    </div>
  )
}

const sendFormSchema = z.object({
  recipient: z.string().min(1, 'Required'),
  amount: z.string().min(1, 'Required'),
  memo: z.string().optional()
})

function SendForm() {
  const form = useForm<z.infer<typeof sendFormSchema>>({
    resolver: zodResolver(sendFormSchema),
    defaultValues: {
      recipient: '',
      amount: '',
      memo: ''
    }
  })

  function onSubmit(values: z.infer<typeof sendFormSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form
        className={'flex flex-col gap-4'}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name={'recipient'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipient</FormLabel>
              <FormMessage />
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'amount'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormMessage />
              <div className={'relative'}>
                <FormControl>
                  <Input
                    {...field}
                    type={'number'}
                    className={'input-number-appearance-none'}
                  />
                </FormControl>
                <Button
                  type={'button'}
                  variant={'outline'}
                  size={'sm'}
                  className={'absolute right-1.5 top-[50%] translate-y-[-50%]'}
                >
                  MAX
                </Button>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'memo'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Memo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size={'lg'} className={'w-full'} type={'submit'}>
          Next
        </Button>
      </form>
    </Form>
  )
}

function Receive() {
  return null
}

export default function Home() {
  const [action, setAction] = useState<Action>('send')

  return (
    <main
      className={cn(
        'flex',
        'flex-col',
        'w-full',
        'bg-secondary',
        'max-w-[600px]',
        'rounded-sm',
        'p-4',
        'gap-4'
      )}
    >
      <Balance />
      <Actions action={action} setAction={setAction} />
      <Wallets />
      {action === 'send' ? <SendForm /> : <Receive />}
    </main>
  )
}
