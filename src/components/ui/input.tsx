import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex',
          'h-9',
          'w-full',
          'rounded-sm',
          'bg-primary',
          'px-4',
          'py-1',
          'text-sm',
          'shadow-sm',
          'transition-colors',
          'file:bg-primary',
          'file:text-sm',
          'file:font-medium',
          'placeholder:text-secondary',
          'focus-visible:outline-none',
          'focus-visible:ring-1',
          'focus-visible:ring-accent',
          'disabled:cursor-not-allowed',
          'disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
