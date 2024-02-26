import * as React from 'react'

import { cn } from '@/lib/utils'
import { FieldError } from 'react-hook-form'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, name, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex',
          'h-9',
          'w-full',
          'rounded-sm',
          'bg-primary',
          'px-3',
          'py-1',
          'text-sm',
          'shadow-sm',
          'transition-colors',
          'file:font-medium',
          'placeholder:text-secondary',
          'disabled:cursor-not-allowed',
          'disabled:opacity-50',
          error && 'border-2 border-destructive',
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
