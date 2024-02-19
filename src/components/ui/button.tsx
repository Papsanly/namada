import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  cn(
    'inline-flex',
    'items-center',
    'justify-center',
    'whitespace-nowrap',
    'rounded-full',
    'text-sm',
    'font-bold',
    'disabled:pointer-events-none',
    'disabled:opacity-50',
    'shadow-sm'
  ),
  {
    variants: {
      variant: {
        default: 'bg-accent text-primary dark:text-primary-invert',
        secondary: 'bg-secondary rounded-sm text-secondary',
        ghost: ''
      },
      size: {
        default: 'px-4 py-1',
        sm: 'px-2 py-1 text-xs',
        lg: 'px-4 py-1 text-lg'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
