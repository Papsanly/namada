'use client'

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
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Accounts from '@/components/Accounts'
import { Namada } from '@namada/integrations'
import { chains } from '@namada/chains'

const sendFormSchema = z.object({
  wallet: z.string().min(1, 'Required'),
  recipient: z.string().min(1, 'Required'),
  amount: z.coerce.number().positive('Must be greater than 0'),
  memo: z.string()
})

export default function SendForm() {
  const form = useForm<z.infer<typeof sendFormSchema>>({
    resolver: zodResolver(sendFormSchema),
    defaultValues: {
      wallet: '',
      recipient: '',
      amount: 0,
      memo: ''
    }
  })

  async function onSubmit(values: z.infer<typeof sendFormSchema>) {
    const namada = new Namada(chains['namada'])
    if (namada.detect()) {
      await namada.connect()
      console.log(await namada.accounts())
      console.log(values)
    } else {
      console.log('Namada extension not detected')
    }
  }

  const { errors } = form.formState

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name={'wallet'}
          render={({ field }) => (
            <FormItem>
              <p className={'text-lg font-bold'}>Select a Wallet</p>
              <FormMessage />
              <FormControl>
                <Accounts
                  {...field}
                  error={errors.wallet}
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'recipient'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipient</FormLabel>
              <FormMessage />
              <FormControl>
                <Input {...field} error={errors.recipient} />
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
                  <Input {...field} type={'number'} error={errors.amount} />
                </FormControl>
                <Button
                  type={'button'}
                  variant={'secondary'}
                  size={'sm'}
                  className={cn(
                    'absolute',
                    'right-1.5',
                    'top-[50%]',
                    'translate-y-[-50%]'
                  )}
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
                <Input {...field} error={errors.memo} />
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
