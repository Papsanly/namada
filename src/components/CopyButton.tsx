import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FaCopy } from 'react-icons/fa6'
import { MdDone } from 'react-icons/md'
import { IconBaseProps } from 'react-icons'

type CopyButtonProps = IconBaseProps & {
  value: string
}

export default function CopyButton({ value, size, ...props }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  return (
    <Button
      variant={'ghost'}
      size={'ghost'}
      onClick={async () => {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
      }}
    >
      {copied ? (
        <MdDone {...props} size={size && Number(size) + 2} />
      ) : (
        <FaCopy {...props} size={size} />
      )}
    </Button>
  )
}
