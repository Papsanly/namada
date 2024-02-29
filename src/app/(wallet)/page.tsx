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
import { useQueryState } from 'nuqs'
import {
  useAccounts,
  useConnectedNamadaExtension
} from '@/providers/NamadaExtensionProvider'
import BigNumber from 'bignumber.js'
import { AccountType, TransferMsgValue, TxMsgValue } from '@namada/types'

const sendFormSchema = z.object({
  wallet: z.string().min(1, 'Required'),
  recipient: z.string().min(1, 'Required'),
  amount: z.coerce.number().positive('Must be greater than 0'),
  fee: z.coerce.number().positive('Must be greater than 0'),
  memo: z.string()
})

export default function SendForm() {
  const [recipient, setRecipient] = useQueryState('recipient')
  const { namada } = useConnectedNamadaExtension()
  const { accounts, defaultAccountAddress } = useAccounts()

  const form = useForm<z.infer<typeof sendFormSchema>>({
    resolver: zodResolver(sendFormSchema),
    defaultValues: {
      wallet: defaultAccountAddress,
      recipient: recipient ?? '',
      amount: 0,
      fee: 0,
      memo: ''
    }
  })

  async function onSubmit(values: z.infer<typeof sendFormSchema>) {
    const chain = await namada.getChain()
    if (!chain) return
    const { address: token } = chain.currency
    if (!token) return

    const args: TransferMsgValue = {
      source: values.wallet,
      target: values.recipient,
      token,
      amount: new BigNumber(values.amount),
      nativeToken: token
    }

    const publicKey = accounts.find(
      account => account.address === values.wallet
    )?.publicKey

    const gasLimit = 20000

    const txArgs: TxMsgValue = {
      token,
      feeAmount: new BigNumber(values.fee / gasLimit),
      gasLimit: new BigNumber(gasLimit),
      chainId: chain.chainId,
      publicKey,
      memo: values.memo
    }

    const signer = namada.signer()
    if (!signer) return

    try {
      await signer.submitTransfer(args, txArgs, AccountType.Mnemonic)
      console.log('Transaction was approved by user and submitted via the SDK')
    } catch (e) {
      console.error(`Transaction was rejected: ${e}`)
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
                <Input
                  {...field}
                  onChange={async e => {
                    const value = e.target.value.trim()
                    await setRecipient(value === '' ? null : value)
                    field.onChange(value)
                  }}
                  error={errors.recipient}
                />
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
                  variant={'secondary'}
                  size={'sm'}
                  className={cn(
                    'absolute',
                    'right-1.5',
                    'top-[50%]',
                    'translate-y-[-50%]',
                    'active:translate-y-[calc(-50%+1px)]'
                  )}
                  onClick={() => {
                    const activeWallet = form.getValues().wallet
                    const activeBalance = accounts.find(
                      account => account.address == activeWallet
                    )?.balance
                    if (activeBalance !== undefined && !isNaN(activeBalance)) {
                      form.setValue('amount', activeBalance)
                    }
                  }}
                >
                  MAX
                </Button>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'fee'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fee</FormLabel>
              <FormControl>
                <Input {...field} error={errors.fee} />
              </FormControl>
              <FormMessage />
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
