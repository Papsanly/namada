import Accounts from '@/components/Accounts'
import { useEffect, useState } from 'react'
import { useAccounts } from '@/providers/NamadaExtensionProvider'
import QRCode from 'qrcode.react'
import { usePathname } from 'next/navigation'
import { FaCopy } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import CopyButton from '@/components/CopyButton'

export default function Receive() {
  const [account, setAccount] = useState<string | undefined>()
  const [link, setLink] = useState('')
  const pathname = usePathname()
  const { defaultAccountAddress } = useAccounts()
  useEffect(() => setAccount(defaultAccountAddress), [defaultAccountAddress])
  useEffect(() => {
    setLink(`${location.origin}${pathname}?recipient=${account}`)
  }, [pathname, account])

  return (
    <div className={'space-y-4'}>
      <div className={'space-y-1'}>
        <p className={'text-lg font-bold'}>Select a Wallet</p>
        <Accounts value={account} onValueChange={value => setAccount(value)} />
      </div>
      <QRCode size={250} className={'rounded-sm'} value={link} />
      <div className={'flex flex-row items-center gap-2.5 code'}>
        <div className={'truncate'}>
          <code className={'text-sm'}>{link}</code>
        </div>
        <CopyButton value={link} size={12} />
      </div>
    </div>
  )
}
