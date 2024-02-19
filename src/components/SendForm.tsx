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

const sendFormSchema = z.object({
  recipient: z.string().min(1, 'Required'),
  amount: z.coerce.number().positive('Must be greater than 0'),
  memo: z.string().optional()
})

export default function SendForm() {
  const form = useForm<z.infer<typeof sendFormSchema>>({
    resolver: zodResolver(sendFormSchema),
    defaultValues: {
      recipient: '',
      amount: 0,
      memo: ''
    }
  })

  function onSubmit(values: z.infer<typeof sendFormSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                  <Input {...field} type={'number'} />
                </FormControl>
                <Button
                  type={'button'}
                  variant={'outline'}
                  size={'sm'}
                  className={cn(
                    'absolute',
                    'right-1.5',
                    'top-[50%]',
                    'opacity-50',
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
