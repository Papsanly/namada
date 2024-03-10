import React, { ReactNode, useState } from 'react'
import { Button } from '@/components/ui/button'
import { FaCopy } from 'react-icons/fa6'
import { MdDone } from 'react-icons/md'
import { IconBaseProps } from 'react-icons'

type CopyTextProps = IconBaseProps & {
  children: ReactNode
  value: string
}

export default function CopyText({
  children,
  value,
  size,
  className,
  ...props
}: CopyTextProps) {
  const [copied, setCopied] = useState(false)

  return (
    <Button
      variant={'ghost'}
      size={'ghost'}
      className={className}
      onClick={async () => {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
      }}
    >
      {children}
      {copied ? (
        <MdDone className={'scale-125'} {...props} size={size} />
      ) : (
        <FaCopy {...props} size={size} />
      )}
    </Button>
  )
}
