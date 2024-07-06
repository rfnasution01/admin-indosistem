import { cn } from '@/utils/cn'
import * as React from 'react'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex',
          'resize-none',
          'min-h-[80px]',
          'w-full',
          'rounded-md',
          'border',
          'border-input',
          'bg-transparent',
          'px-12',
          'py-8',
          'text-[2rem] phones:text-[2.4rem]',
          'ring-offset-background',
          'placeholder:text-muted-foreground',
          'focus-visible:outline-none',
          'focus-visible:ring-1',
          'focus-visible:ring-ring',
          'focus-visible:ring-offset-2',
          'focus:ring-indigo-500',
          'disabled:cursor-not-allowed',
          'disabled:opacity-50',
          'disabled:bg-form-disabled',
          'bg-white',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }
