import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'

import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCheck } from '@fortawesome/free-solid-svg-icons'

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

/**
 * @author wahyu setiawan
 *
 *
 */

const selectTriggerVariant = cva(
  'flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-12 py-8 text-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:flex [&>span]:justify-center [&>span]:items-center',
  {
    variants: {
      variant: {
        default: '',
        sm: 'rounded-full flex flex-row gap-8 py-4 px-12 justify-center items-center h-min',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

interface selectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariant> {}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  selectTriggerProps
>(({ className, variant, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(selectTriggerVariant({ variant, className }))}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <span className="h-16 w-16 opacity-50">
        <FontAwesomeIcon icon={faCaretDown} />
      </span>
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-8 data-[side=left]:slide-in-from-right-8 data-[side=right]:slide-in-from-left-8 data-[side=top]:slide-in-from-bottom-8 relative z-50 min-w-[8rem] overflow-hidden rounded-md border shadow-md',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-4 data-[side=left]:-translate-x-4 data-[side=right]:translate-x-4 data-[side=top]:-translate-y-4',
        className,
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          'p-4',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('text-sm py-8 pl-32 pr-8 font-semibold', className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'text-sm focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm py-8 pl-32 pr-8 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <span className="absolute left-8 flex h-16 w-16 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <span className="h-16 w-16">
          <FontAwesomeIcon icon={faCheck} />
        </span>
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('h-px bg-muted -mx-4 my-4', className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
}
